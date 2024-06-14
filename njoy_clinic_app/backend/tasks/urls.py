from django.urls import path, include
from rest_framework import routers
from tasks import views

# Configuración del enrutador
router = routers.DefaultRouter()
router.register(r'registros', views.RegisterAPIsREST)
router.register(r'doctores', views.DoctorsAPIsRest)

# URLs de la aplicación
urlpatterns = [
    path("api/v1/", include(router.urls)),
]
