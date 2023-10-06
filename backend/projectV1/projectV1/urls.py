from django.http import HttpResponse
from django.urls import path, include
from django.contrib import admin
from . import views

urlpatterns = [

    # Changed index path
    # path('', views.index, name='home'),
    path('admin/', admin.site.urls),
    path('ray_ai/', include('ray_ai.urls')),
    path('registration/', include('registration.urls')),
    path('synthetic_data/', include('synthetic_data.urls')),
    path('audio/', include('audio_conference.urls')),
    path("api/", include("api.urls")),
    path('openai/', include('openai_integration.urls')),
]


def index(request):
    return HttpResponse("Welcome to the app!")
