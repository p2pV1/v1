# projectV1/asgi.py

import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'projectV1.settings')

from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from api.room.routing import websocket_urlpatterns  # Replace 'my_app' with your app name

application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": AuthMiddlewareStack(
        URLRouter(
            websocket_urlpatterns
        )
    ),
})
