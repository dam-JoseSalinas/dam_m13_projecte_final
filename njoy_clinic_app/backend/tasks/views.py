from django.shortcuts import render
from django.http import HttpResponse
from .models import Register, Event, Doctor, Message, Appointments
from rest_framework import viewsets
from .serializer import RegisterSerializer, EventSerializer, DoctorsSerializer, MessageSerializer, AppointmentSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.permissions import IsAuthenticated
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes
from django.http import JsonResponse 
import traceback 
from datetime import datetime

class RegisterAPIsREST(viewsets.ModelViewSet):
    serializer_class = RegisterSerializer
    queryset = Register.objects.all()

    def create(self, request, *args, **kwargs):
        serializer = RegisterSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()

            register = Register.objects.get(email=serializer.data['email'])
            register.set_password(serializer.data['psw'])
            register.save()

            refresh = RefreshToken.for_user(register)
            token = str(refresh.access_token)

            return Response({'token': token, "user": serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)

        if serializer.is_valid():
            serializer.save()

            if 'psw' in request.data:
                instance.set_password(request.data['psw'])
                instance.save()

                refresh = RefreshToken.for_user(instance)
                token = str(refresh.access_token)

                return Response({'token': token, "user": serializer.data}, status=status.HTTP_200_OK)

            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
def profileDefault(request):
    default_photo_url = 'http://127.0.0.1:8000/frontend/src/assets/images/foto_perfil/default.jpg'
    return HttpResponse(default_photo_url)

@api_view(['POST'])
def login(request):
    try:
        register = Register.objects.get(email=request.data['email'])
    except Register.DoesNotExist:
        raise AuthenticationFailed("Invalid email or password")

    if not register.check_password(request.data['psw']):
        raise AuthenticationFailed("Invalid email or password")

    refresh = RefreshToken.for_user(register)
    token = str(refresh.access_token)

    serializer = RegisterSerializer(instance=register)
    return Response({"token": token, "id": serializer.data["id"]}, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def profile(request):
    try:
        # Obtener el usuario autenticado desde el objeto de solicitud
        user = request.user
        # Buscar el registro asociado al usuario autenticado
        register = Register.objects.get(email=user.email)
        serializer = RegisterSerializer(instance=register)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Register.DoesNotExist:
        return Response({"message": "Profile not found."}, status=status.HTTP_404_NOT_FOUND)
    
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def edit_profile_with_token(request):
    try:
        user = request.user
        
        register = Register.objects.get(email=user.email)
        
        register.name = request.data.get('name', register.name)
        register.surname = request.data.get('surname', register.surname)
        register.number = request.data.get('number', register.number)
        register.email = request.data.get('email', register.email)
        register.psw = request.data.get('psw', register.psw)
        register.bio = request.data.get('bio', register.bio)
        register.birth_date = request.data.get('birth_date', register.birth_date)
        register.address = request.data.get('address', register.address)
        register.city = request.data.get('city', register.city)
        register.country = request.data.get('country', register.country)
        register.postal_code = request.data.get('postal_code', register.postal_code)
        
        register.save()
        
        if 'psw' in request.data:
            register.set_password(request.data['psw'])
            register.save()
            refresh = RefreshToken.for_user(register)
            token = str(refresh.access_token)
            return Response({'token': token, "user": RegisterSerializer(instance=register).data}, status=status.HTTP_200_OK)
        
        serializer = RegisterSerializer(instance=register)
        return JsonResponse(serializer.data, status=200)
    
    except Register.DoesNotExist:
        return JsonResponse({"error": "Profile not found."}, status=404)
    
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=400)

@api_view(['POST'])
def register(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        register = Register.objects.get(email=serializer.data['email'])
        register.set_password(serializer.data['psw'])
        register.save()
        refresh = RefreshToken.for_user(register)
        token = str(refresh.access_token)
        return Response({'token': token, "user": serializer.data}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def all_events(request):
    try:
        register_instance = Register.objects.get(email=request.user.email)
    except Register.DoesNotExist:
        return Response({"message": "Profile not found."}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        try:
            user_events = Event.objects.filter(owner=register_instance)
            event_list = []
            for event in user_events:
                event_dict = {
                    'id': event.id,
                    'title': event.name,
                    'start': event.start.strftime("%m/%d/%Y, %H:%M:%S"),
                    'end': event.end.strftime("%m/%d/%Y, %H:%M:%S"),
                    'owner': event.owner.name if event.owner else None
                }
                event_list.append(event_dict)
            return JsonResponse(event_list, safe=False)
        except Exception as e:
            print(e)
            return JsonResponse({"success": False, "message": "Internal Server Error"}, status=500)
    else:
        return JsonResponse({"success": False, "message": "Only GET requests are allowed"}, status=405)


@csrf_exempt
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_event(request):
    try:
        data = request.data
        start = data.get("start", None)
        end = data.get("end", None)
        title = data.get("title", None)

        if start is not None and end is not None and title is not None:
            owner = Register.objects.get(email=request.user.email)
            event = Event.objects.create(name=title, start=start, end=end, owner=owner)
            return Response({"success": True, "event_id": event.id}, status=status.HTTP_201_CREATED)
        else:
            return Response({"success": False, "message": "Missing required fields"}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({"success": False, "message": str(e)}, status=status.HTTP_400_BAD_REQUEST)


@csrf_exempt
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update(request, event_id):
    try:
        data = request.data
        event = Event.objects.get(id=event_id, owner__email=request.user.email)
        event.name = data.get('title', event.name)
        event.start = data.get('start', event.start)
        event.end = data.get('end', event.end)
        event.save()
        return Response({"success": True}, status=status.HTTP_200_OK)
    except Event.DoesNotExist:
        return Response({"success": False, "message": "Event not found or you do not have permission to edit it"}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"success": False, "message": str(e)}, status=status.HTTP_400_BAD_REQUEST)


@csrf_exempt
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def remove(request, event_id):
    try:
        event = Event.objects.get(id=event_id)
        event.delete()
        return Response({"success": True}, status=status.HTTP_200_OK)
    except Event.DoesNotExist:
        return Response({"success": False, "message": "Event not found"}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"success": False, "message": str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def contar_pacientes(request):
    num_pacientes = Register.objects.count()
    return Response({num_pacientes})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def contar_eventos(request):
    try:
        register_instance = Register.objects.get(email=request.user.email)
    except Register.DoesNotExist:
        return Response({"message": "Profile not found."}, status=status.HTTP_404_NOT_FOUND)

    try:
        user_events_count = Event.objects.filter(owner=register_instance).count()
        return Response({user_events_count})
    except Exception as e:
        print(e)
        return Response({"success": False, "message": "Internal Server Error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class DoctorsAPIsRest(viewsets.ModelViewSet):
    serializer_class = DoctorsSerializer
    queryset = Doctor.objects.all()

    def create(self, request, *args, **kwargs):
        serializer = DoctorsSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()

            doctors = Doctor.objects.get(email=serializer.data['email'])
            doctors.set_password(serializer.data['psw'])
            doctors.save()

            refresh = RefreshToken.for_user(doctors)
            token = str(refresh.access_token)

            return Response({'token': token, "doctor": serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)

        if serializer.is_valid():
            serializer.save()

            if 'psw' in request.data:
                instance.set_password(request.data['psw'])
                instance.save()

                refresh = RefreshToken.for_user(instance)
                token = str(refresh.access_token)

                return Response({'token': token, "doctor": serializer.data}, status=status.HTTP_200_OK)

            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['POST'])
def loginDoctor(request):
    # Verificar que el correo electrónico y la contraseña se proporcionen en la solicitud
    email = request.data.get('email')
    password = request.data.get('psw')

    if not email or not password:
        return Response({"detail": "Email and password are required."}, status=status.HTTP_400_BAD_REQUEST)

    try:
        # Buscar al doctor por correo electrónico
        doctor = Doctor.objects.get(email=email)
    except Doctor.DoesNotExist:
        # Si el doctor no se encuentra, lanzar un error de autenticación
        raise AuthenticationFailed("Invalid email or password")

    # Verificar si la contraseña proporcionada es correcta
    if not doctor.check_password(password):
        raise AuthenticationFailed("Invalid email or password")

    # Generar el token de acceso utilizando Simple JWT
    refresh = RefreshToken.for_user(doctor)
    token = str(refresh.access_token)

    # Serializar el objeto doctor
    serializer = DoctorsSerializer(instance=doctor)

    # Retornar el token y los datos del doctor en la respuesta
    return Response({"token": token, "id": serializer.data["id"]}, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def profileDoctor(request):
    try:
        user = request.user

        doctor = Doctor.objects.get(email=user.email)
        serializer = DoctorsSerializer(instance=doctor)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Doctor.DoesNotExist:
        return Response ({'message': "Doctor not found."}, status=status.HTTP_404_NOT_FOUND)
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def all_Appointments(request):
    try:
        # Obtener la instancia del doctor basada en el usuario autenticado
        doctor_instance = Doctor.objects.get(email=request.user.email)
    except Doctor.DoesNotExist:
        return Response({"message": "Doctor not found."}, status=status.HTTP_404_NOT_FOUND)

    try:
        # Obtener todas las citas del doctor
        doctor_Appointments = Appointments.objects.filter(of=doctor_instance)
        
        # Construir la lista de citas en formato JSON
        appointments_list = [
            {
                'id': appointment.id,
                'title': appointment.name,
                'day': appointment.day.strftime("%m/%d/%Y, %H:%M:%S"),
                'for': appointment.forWhom.name if appointment.forWhom else "Disponible",
                'of': appointment.of.name if appointment.of else None
            }
            for appointment in doctor_Appointments
        ]

        return JsonResponse(appointments_list, safe=False)
    except Exception as e:
        # Imprimir el error detallado en la consola para la depuración
        print(traceback.format_exc())
        return JsonResponse({"success": False, "message": "Internal Server Error"}, status=500)
    
@csrf_exempt
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_Appointments(request):
    try:
        data = request.data
        day = data.get("day", None)
        title = data.get("title", None)

        # Validar campos necesarios
        if not day or not title:
            return Response({"success": False, "message": "Missing required fields (day, title)"}, status=status.HTTP_400_BAD_REQUEST)

        # Convertir el día a un objeto datetime
        try:
            day = datetime.strptime(day, "%Y-%m-%dT%H:%M:%S")
        except ValueError:
            return Response({"success": False, "message": "Invalid date format. Use 'YYYY-MM-DDTHH:MM:SS'"}, status=status.HTTP_400_BAD_REQUEST)

        # Obtener la instancia del doctor autenticado
        try:
            doctor_owner = Doctor.objects.get(email=request.user.email)
        except Doctor.DoesNotExist:
            return Response({"success": False, "message": "Doctor not found."}, status=status.HTTP_404_NOT_FOUND)

        # Verificar duplicados de citas para el mismo doctor en el mismo horario
        if Appointments.objects.filter(of=doctor_owner, day=day).exists():
            return Response({"success": False, "message": "This doctor already has an appointment at this date and time."}, status=status.HTTP_409_CONFLICT)

        # Crear la cita
        appointment = Appointments.objects.create(
            name=title,
            day=day,
            of=doctor_owner,
            forWhom=None  # Inicialmente sin paciente asignado
        )

        return Response({"success": True, "appointment_id": appointment.id}, status=status.HTTP_201_CREATED)

    except Exception as e:
        # Imprimir el error detallado en la consola para la depuración
        print(traceback.format_exc())
        return Response({"success": False, "message": "Internal Server Error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
@csrf_exempt
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_Appointment(request, appointment_id):
    try:
        # Obtener la instancia de la cita a actualizar
        try:
            appointment = Appointments.objects.get(id=appointment_id)
        except Appointments.DoesNotExist:
            return Response({"success": False, "message": "Appointment not found."}, status=status.HTTP_404_NOT_FOUND)

        # Verificar si la cita ya tiene un paciente asignado
        if appointment.forWhom is not None:
            return Response({"success": False, "message": "This appointment is already booked by another patient."}, status=status.HTTP_409_CONFLICT)

        # Obtener el paciente autenticado desde el token
        try:
            patient = Register.objects.get(email=request.user.email)
        except Register.DoesNotExist:
            return Response({"success": False, "message": "Patient not found."}, status=status.HTTP_404_NOT_FOUND)

        # Asignar la cita al paciente autenticado
        appointment.forWhom = patient
        appointment.save()

        return Response({
            "success": True,
            "message": "Appointment updated successfully.",
            "appointment_details": {
                "day": appointment.day.strftime("%Y-%m-%dT%H:%M:%S"),
                "title": appointment.name,
                "doctor": appointment.of.email,
                "forWhom": patient.email
            }
        }, status=status.HTTP_200_OK)

    except Exception as e:
        # Imprimir el error detallado en la consola para la depuración
        print(traceback.format_exc())
        return Response({"success": False, "message": "Internal Server Error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@csrf_exempt
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_Appointment(request, appointment_id):
    try:
        # Obtener la instancia del doctor autenticado
        doctor_owner = Doctor.objects.filter(email=request.user.email).first()
        if not doctor_owner:
            return Response({"success": False, "message": "Doctor not found."}, status=status.HTTP_404_NOT_FOUND)

        # Verificar que la cita existe y pertenece al doctor autenticado
        appointment = Appointments.objects.filter(id=appointment_id, of=doctor_owner).first()
        if not appointment:
            return Response({"success": False, "message": "Appointment not found or you do not have permission to delete it."}, status=status.HTTP_404_NOT_FOUND)

        # Eliminar la cita
        appointment.delete()

        return Response({"success": True, "message": "Appointment deleted successfully."}, status=status.HTTP_200_OK)

    except Exception as e:
        # Imprimir el error detallado en la consola para la depuración
        print(traceback.format_exc())
        return Response({"success": False, "message": "Internal Server Error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def contar_doctores(request):
    num_doctores = Doctor.objects.count()
    return Response({num_doctores})
