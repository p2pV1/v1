"""
ASGI config for projectV1 project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.1/howto/deployment/asgi/
"""

import os
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from room import routing as chat_routing

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'projectV1.settings')

# Initialize Django ASGI application early to ensure the AppRegistry
# is populated before importing the consumers module.
django_asgi_app = get_asgi_application()

# Import your websocket routing
# from myapp import routing as myapp_routing

application = ProtocolTypeRouter({
    "http": django_asgi_app,
    "websocket": AuthMiddlewareStack(
        URLRouter(
            chat_routing.websocket_urlpatterns
        )
    ),
})
