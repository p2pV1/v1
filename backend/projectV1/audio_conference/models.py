from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone


class Room(models.Model):
    host = models.ManyToManyField(User)
    title = models.CharField(max_length=200)
    slug = models.CharField(max_length=250)
    description = models.TextField(blank=True)
    start_time = models.DateTimeField(null=True, blank=True)
    password = models.CharField(max_length=50, blank=True)
    is_active = models.SmallIntegerField(default=0)
    private = models.BooleanField(default=False)
    participants = models.PositiveIntegerField(null=True, blank=True)

class RoomParticipant(models.Model):
    participants = models.ForeignKey(User, on_delete=models.CASCADE)
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    joined_at = models.DateTimeField(default=timezone.now)
    left_at = models.DateTimeField(null=True, blank=True)
    role = models.SmallIntegerField(default=0)