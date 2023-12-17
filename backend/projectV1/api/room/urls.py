from django.urls import path
from . import views

urlpatterns = [
    path('rooms/', views.room_list_create),
    path('rooms/<slug:slug>/', views.room_detail),
    path('rooms/<slug:slug>/messages/', views.message_list_create),
    path('roooms_participant/participant/', views.add_participant),
    path('rooms/<slug:slug>/participants/', views.room_participants, name='room-participants'),
]