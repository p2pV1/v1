# chat/routing.py

from django.urls import re_path
from room import consumer

websocket_urlpatterns = [
    re_path(r'ws/chat/(?P<slug>\w+)/$', consumer.ChatConsumer.as_asgi()),
]
