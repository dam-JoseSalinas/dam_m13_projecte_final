from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from .models import Register, Doctor
import jwt
from django.conf import settings

class CustomAuthentication(BaseAuthentication):
    def authenticate(self, request):
        # Obtener las credenciales del encabezado de autorización
        auth_header = request.headers.get('Authorization')
        if not auth_header:
            return None
        
        # Separar el token del encabezado
        try:
            token = auth_header.split(' ')[1]
        except IndexError:
            raise AuthenticationFailed('Token mal formateado')
        
        # Validar el token y devolver el usuario asociado
        try:
            # Decodificar el token JWT utilizando la clave secreta
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
            user_id = payload['user_id']
            
            # Intentar obtener el usuario de la tabla Register
            try:
                user = Register.objects.get(id=user_id)
            except Register.DoesNotExist:
                # Si no se encuentra en Register, buscar en la tabla Doctor
                try:
                    user = Doctor.objects.get(id=user_id)
                except Doctor.DoesNotExist:
                    raise AuthenticationFailed('Usuario no encontrado')
            
            # Devolver el usuario autenticado
            return (user, None)
        
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Token expirado')
        except jwt.InvalidTokenError:
            raise AuthenticationFailed('Token inválido')
