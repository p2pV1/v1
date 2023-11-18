from django.db import models
from django.contrib.auth.models import User

class ChatRoom(models.Model):
    host = models.OneToOneField(User, on_delete=models.CASCADE, related_name='conference_room')
    participants = models.ManyToManyField(User, related_name='user_rooms')
    name = models.CharField(max_length=250)
    slug = models.CharField(max_length=250)
    private = models.BooleanField(default=False)
    created_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        db_table = 'room'

class Message(models.Model):
    room = models.ForeignKey(ChatRoom, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'message'
