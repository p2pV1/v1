from django.urls import path
from . import views

urlpatterns = [
    path("", views.test),
    path('rooms/', views.room_list_create),
    path('rooms/<int:slug>/', views.room_detail),
]