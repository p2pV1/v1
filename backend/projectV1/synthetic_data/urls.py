from django.urls import path
from . import views

urlpatterns = [
    path('create/', views.create_synthetic_data, name='create_synthetic_data'),
]
