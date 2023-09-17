from django.db import models
import uuid

class User(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(max_length=120)
    password = models.CharField(max_length=120)
    sub = models.CharField(max_length=120, null=True)
    verified_at = models.DateTimeField(null=True)

    class Meta:
        db_table = 'users'