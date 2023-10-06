from django.db import models
from django.contrib.auth.models import User

class Profile(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    verified_at = models.DateField(null=True, blank=True)
    phone = models.TextField(max_length=20, blank=True)
    sub = models.TextField(max_length=100, blank=True)
    age = models.PositiveIntegerField(null=True, blank=True)  # New field
    name = models.CharField(max_length=100, null=True, blank=True)  # New field

    class Meta:
        db_table = 'profile'

class Product(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.name
