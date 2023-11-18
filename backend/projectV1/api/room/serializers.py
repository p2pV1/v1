from rest_framework import serializers
from room.models import ChatRoom, Message
from django.utils import timezone
from django.utils.text import slugify

class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatRoom
        fields = ('id', 'host', 'name', 'slug', 'private', 'created_at')
        extra_kwargs = {'host': {'read_only': True}, 'slug': {'read_only': True}}

    def validate(self, data):
        data['slug'] = self.generate_unique_slug(data.get('name', ''))
        return data

    def create(self, validated_data):
        validated_data['host'] = self.context['request'].user
        validated_data['created_at'] = timezone.now()
        return super(RoomSerializer, self).create(validated_data)

    def generate_unique_slug(self, room_name):
        base_slug = slugify(room_name)[:50]
        unique_slug = base_slug
        count = 1

        while ChatRoom.objects.filter(slug=unique_slug).exists():
            unique_slug = f"{base_slug}-{count}"
            count += 1

        return unique_slug

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ('id', 'room', 'user', 'content', 'timestamp')
        extra_kwargs = {'user': {'read_only': True}, 'timestamp': {'read_only': True}, 'room': {'read_only': True}}

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        validated_data['timestamp'] = timezone.now()
        if 'room' in self.context:
            validated_data['room'] = self.context['room']
        return super(MessageSerializer, self).create(validated_data)
