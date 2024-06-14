from rest_framework import serializers
from .models import Register, Event, Doctor, Appointments, Message


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Register
        fields = '__all__'
        #fields = ['id', 'name', 'surname', 'number', 'email', 'psw', 'bio', 'birth_date', 'address', 'city', 'country', 'postal_code', 'photo']

    def create(self, validated_data):
        # Realiza cualquier acción de creación necesaria
        return Register.objects.create(**validated_data)

class EventSerializer(serializers.ModelSerializer):
    owner_email = serializers.EmailField(source='owner.email', read_only=True)

    class Meta:
        model = Event
        fields = '__all__'
        #fields = ['id', 'name', 'start', 'end', 'owner_email']

class DoctorsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        fields = '__all__'
    
    def create(self, validated_data):
        # Realiza cualquier acción de creación necesaria
        return Doctor.objects.create(**validated_data)

class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointments
        fields = '__all__'

    def validate_day(self, value):
        if Appointments.objects.filter(of=self.instance.of, day=value).exists():
            raise serializers.ValidationError("El doctor ya tiene una cita en esta fecha y hora.")
        return value

class MessageSerializer(serializers.ModelSerializer):
    emisor_type = serializers.SerializerMethodField()
    emisor_id = serializers.IntegerField()
    receptor_type = serializers.SerializerMethodField()
    receptor_id = serializers.IntegerField()

    class Meta:
        model = Message
        fields = ['id', 'emisor_type', 'emisor_id', 'receptor_type', 'receptor_id', 'content', 'created_at']

    def get_emisor_type(self, obj):
        return obj.emisor_type.model_class()._meta.verbose_name.capitalize()

    def get_receptor_type(self, obj):
        return obj.receptor_type.model_class()._meta.verbose_name.capitalize()
