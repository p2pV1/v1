from django.urls import path
from . import views

app_name = 'ray_ai'

urlpatterns = [
    path('', views.index, name='index'),
]