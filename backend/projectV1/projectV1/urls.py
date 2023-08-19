from django.http import HttpResponse
from django.urls import path, include
from django.contrib import admin
from . import views

urlpatterns = [

    # Changed index path
    path('', views.index, name='home'),
    path('admin/', admin.site.urls),
    path('ray_ai/', include('ray_ai.urls')),
    path('registration/', include('registration.urls')),
<<<<<<< HEAD

=======
>>>>>>> 2f8bf19efaacaa0d2f9444e5de9e17b4548ac332
]


def index(request):
    return HttpResponse("Welcome to the app!")
