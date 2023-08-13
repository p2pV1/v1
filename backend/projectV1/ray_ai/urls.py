# urls.py

from django.urls import path
from . import views

import logging

logger = logging.getLogger(__name__)

app_name = 'ray_ai'

urlpatterns = [

    #   path('', views.index, name='index'),

    # Add this route to actor_view
    path('actor/', views.actor_view, name='actor'),

]


logger.info("URL patterns: %s", urlpatterns)
