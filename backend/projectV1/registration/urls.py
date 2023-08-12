from django.urls import path
from . import views

app_name = 'registration'

urlpatterns = [
    path('', views.land_page, name='land_page'),
    path('signInWC', views.wld_login, name='wld_login'),
    path('callback', views.callback, name='callback'),
    path('view-login', views.view_login, name='view_login'),
    path('login', views.login, name='login'),
    path('logout', views.logout, name='logout'),
    path('register', views.register, name='register'),
]