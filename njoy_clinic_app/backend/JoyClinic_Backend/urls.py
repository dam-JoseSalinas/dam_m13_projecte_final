"""
URL configuration for JoyClinic_Backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from tasks.views import profileDefault, login, profile, all_events, add_event, update, register, remove, edit_profile_with_token, contar_pacientes, contar_eventos, profileDoctor, loginDoctor, all_Appointments, add_Appointments, update_Appointment, delete_Appointment, contar_doctores
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path('admin/', admin.site.urls),
    path('all_events/', all_events, name='all_events'), 
    path('add_event/', add_event, name='add_event'), 
    path('update/<int:event_id>/', update, name='update'),
    path('remove/<int:event_id>/', remove, name='remove'),
    path('image/', profileDefault),
    path('update_Appointment/<int:appointment_id>/', update_Appointment, name='update_Appointment'),
    path('delete_Appointment/<int:appointment_id>/', delete_Appointment, name='delete_Appointment'),
    path('', include('tasks.urls')),
    path('login/', login),
    path('register', register),
    re_path('profile', profile),
    re_path('updateProfile', edit_profile_with_token),
    re_path('count', contar_pacientes),
    re_path('events', contar_eventos),
    path('doctor_perfil/', profileDoctor),
    path('doctor/', loginDoctor),
    re_path('citas/', all_Appointments),
    re_path('agregar_cita/', add_Appointments),
    re_path('doctorsCount', contar_doctores)
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)