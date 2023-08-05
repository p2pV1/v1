from django.http import HttpResponse
from django.urls import path, include
from django.contrib import admin
from . import views

urlpatterns = [

    path('', views.index, name='index'),

    path('admin/', admin.site.urls),
    path('registration/', include('registration.urls')),
    path('ray_ai/', include('ray_ai.urls')),

]

# views.py


def index(request):
    return HttpResponse("Welcome to the app!")
