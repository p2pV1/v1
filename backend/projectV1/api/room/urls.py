from django.urls import path
from . import views

urlpatterns = [
    path('rooms/', views.room_list_create),
    path('rooms/<slug:slug>/', views.room_detail),
    path('rooms/<slug:slug>/messages/', views.message_list_create),
    path('rooms/participant/', views.add_participant),
    path('rooms/<slug:slug>/participants/', views.room_participants),
    path('users/all/', views.get_all_users),
]