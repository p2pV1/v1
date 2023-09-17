from django.db import models
from django.contrib.auth.models import User
import uuid

class User(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    class Meta:
        db_table = 'auth_user'