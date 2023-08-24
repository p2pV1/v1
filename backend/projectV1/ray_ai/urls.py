from django.urls import path
from . import views

import logging

logger = logging.getLogger(__name__)

app_name = 'ray_ai'

urlpatterns = [
    # Uncomment the index view if you need it
    # path('', views.index, name='index'),

    # Change this to ray_train_view
    path('actor/', views.ray_train_view, name='actor'),
]

logger.info("URL patterns: %s", urlpatterns)
