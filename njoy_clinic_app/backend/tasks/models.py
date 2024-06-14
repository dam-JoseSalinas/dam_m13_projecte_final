from django.db import models
from django.core.exceptions import ValidationError
from django.core.validators import EmailValidator
from django.contrib.auth.hashers import make_password, check_password
from django.contrib.contenttypes.fields import GenericForeignKey
from django.utils.translation import gettext_lazy as _
from django.contrib.contenttypes.models import ContentType

def validate_password(value):
    if len(str(value)) < 8:
        raise ValidationError('La password debe tener mas de 8 caracteres')
    
def validate_number(value):
    try:
        number = int(value)
    except ValueError:
        raise ValidationError('El número debe contener solo dígitos.')

    if len(str(number)) != 9:
        raise ValidationError('El número debe tener exactamente 9 dígitos.')
    
def validate_doctor_email(value):
    if not value.endswith('@joyclinc.es'):
        raise ValidationError('El correo electrónico debe tener el dominio @joyclinc.es')

class Register(models.Model):
    name = models.CharField(max_length=200)
    surname = models.CharField(max_length=200)
    number = models.CharField(max_length=200, unique=True, validators=[validate_number]) 
    email = models.EmailField(max_length=200, unique=True, validators=[EmailValidator(message='Ingrese un correo válido.')])
    psw = models.CharField(max_length=200, validators=[validate_password])

    bio = models.TextField(blank=True)
    birth_date = models.DateField(null=True, blank=True, default=None)
    address = models.CharField(max_length=100, blank=True, default=None, null=True)
    city = models.CharField(max_length=100, blank=True, default=None, null=True)
    country = models.CharField(max_length=100, blank=True, default=None, null=True)
    postal_code = models.CharField(max_length=20, blank=True, default=None, null=True)
    photo = models.ImageField(blank=True, upload_to='', default='default.jpg')

    def set_password(self, raw_password):
        self.psw = make_password(raw_password)
    
    def check_password(self, raw_password):
        return check_password(raw_password, self.psw)
    
    def is_authenticated(self):
        return True
    
    def get_appointments(self):
        return self.appointments.all()
    
    def __str__(self) -> str:
        return self.name
    
class Event(models.Model):
    name = models.CharField(max_length=255, null=True, blank=True)
    start = models.DateTimeField(null=True, blank=True)
    end = models.DateTimeField(null=True, blank=True)
    owner = models.ForeignKey(Register, on_delete=models.CASCADE, related_name='events')

    def __str__(self):
        return f"{self.name} (Correo electrónico del propietario: {self.owner.email})"
    
class Doctor(models.Model):
    name = models.CharField(max_length=200)
    surname = models.CharField(max_length=200)
    number = models.CharField(max_length=200, unique=True, validators=[validate_number]) 
    email = models.EmailField(max_length=200, unique=True, blank=False, null=False, validators=[
        EmailValidator(message='Ingrese un correo válido.'),
        validate_doctor_email
    ])
    psw = models.CharField(max_length=200, validators=[validate_password])
    specialty = models.CharField(max_length=200, blank=False, null=False)

    def set_password(self, raw_password):
        self.psw = make_password(raw_password)
    
    def check_password(self, raw_password):
        return check_password(raw_password, self.psw)
    
    def is_authenticated(self):
        return True
    
    def get_appointments(self):
        return self.medical_appointments.all()  

    def __str__(self):
        return f"Dr. {self.name} {self.surname} - {self.specialty}"
    
class Appointments(models.Model):
    name = models.CharField(max_length=200, null=False, blank=False)
    day = models.DateTimeField(null=False, blank=False)
    forWhom = models.ForeignKey(Register, on_delete=models.CASCADE, related_name='appointment', null=True, blank=True)
    of = models.ForeignKey(Doctor, on_delete=models.CASCADE, related_name='medical_appointment')

    def clean(self):
        # Ejemplo de validación para evitar citas duplicadas en el mismo horario para el mismo doctor
        if Appointments.objects.filter(of=self.of, day=self.day).exists():
            raise ValidationError('Este doctor ya tiene una cita en esta fecha y hora.')

    def __str__(self):
        return f"Appointment: {self.name} with Dr. {self.of.name} on {self.day}"
  
class Message(models.Model):
    USER_TYPES = (
        ('doctor', _('Doctor')),
        ('register', _('Register')),
    )

    emisor_type = models.ForeignKey(ContentType, on_delete=models.CASCADE, related_name='emisor_messages')
    emisor_id = models.PositiveIntegerField()
    emisor = GenericForeignKey('emisor_type', 'emisor_id')

    receptor_type = models.ForeignKey(ContentType, on_delete=models.CASCADE, related_name='receptor_messages')
    receptor_id = models.PositiveIntegerField()
    receptor = GenericForeignKey('receptor_type', 'receptor_id')

    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Message from {self.emisor} to {self.receptor} at {self.created_at}"
