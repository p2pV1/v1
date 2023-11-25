from django.http import HttpResponse
from django.urls import path, include
from django.contrib import admin
from registration.schema import schema 
# from room.schema import chat_schema 
from graphene_django.views import GraphQLView
# Import necessary modules for serving static files during development
from django.conf import settings
from django.conf.urls.static import static
from api.room.consumers import ChatConsumer

urlpatterns = [
    path('admin/', admin.site.urls),
    path('graphql/', GraphQLView.as_view(graphiql=True, schema=schema)),  
    # path('graphql/chat/', GraphQLView.as_view(graphiql=True, schema=chat_schema)),  
    path('ray_ai/', include('ray_ai.urls')),
    path('registration/', include('registration.urls')),
    path('synthetic_data/', include('synthetic_data.urls')),
    path('audio/', include('audio_conference.urls')),
    path("api/", include("api.user_api.urls")),
    path("api/call/", include("api.call.urls")),
    path("api/room/", include("api.room.urls")),
    path('openai/', include('openai_integration.urls')),
    path('ws/chat/<slug:slug>/', ChatConsumer.as_asgi()),
]

# Serve static files during development
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

def index(request):
    return HttpResponse("Welcome to the app!")
