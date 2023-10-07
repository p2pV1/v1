from django.urls import path
from . import views
from graphene_django.views import GraphQLView
from .schema import schema

app_name = 'registration'

urlpatterns = [
    # path('', views.land_page, name='land_page'),
    path('graphql', GraphQLView.as_view(graphiql=True, schema=schema), name='graphql'),
    path('signInWC', views.wld_login, name='wld_login'),
    path('callback', views.callback, name='callback'),
    path('view_login', views.view_login, name='view_login'),
    path('login', views.login, name='login'),
    path('logout', views.logout, name='logout'),
    path('register', views.register, name='register'),
]
