from django.urls import path
from . import views
from .views import check_authentication_status

urlpatterns = [
    path('create/', views.create_synthetic_data, name='create_synthetic_data'),
    path('check-authentication-status', check_authentication_status, name='check-authentication-status'),
]
