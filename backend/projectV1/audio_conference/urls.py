from django.urls import path
from . import views

app_name = 'audio_conference'

urlpatterns = [
    path('', views.land_page, name='land_page'),
]