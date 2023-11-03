from django.urls import path
from . import views

urlpatterns = [
    path("", views.test),
    path("login", views.login_api),
    path("user", views.get_user_data),
    path("register", views.registration_api),
    path("change_password", views.change_password),
    path('verify_email', views.verify_email),
    path('forgot_password', views.forgot_password),
    path('validate_token', views.validate_token),
    path('update_password', views.update_password),
]