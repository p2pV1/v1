from django.urls import path
from .consumer import ChatConsumer  # Replace with your actual consumer class name

websocket_urlpatterns = [
    path('ws/room/<slug:slug>/', ChatConsumer.as_asgi()),
]