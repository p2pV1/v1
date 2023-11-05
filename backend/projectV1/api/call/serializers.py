from rest_framework import serializers
from django.utils.text import slugify
from audio_conference.models import Room, RoomParticipant

class RoomSerializer(serializers.ModelSerializer):
    host = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Room
        fields = ['host', 'title', 'slug', 'description', 'start_time', 'password', 'is_active', 'private', 'participants']

    def create(self, validated_data):
        validated_data['host'] = self.context['request'].user
        instance = super(RoomSerializer, self).create(validated_data)
        instance.slug = self.generate_unique_slug(instance.title)
        instance.save()
        return instance

    def update(self, instance, validated_data):
        if instance.host != self.context['request'].user:
            raise serializers.ValidationError("You do not have permission to edit this room.")
        
        instance.title = validated_data.get('title', instance.title)
        if 'title' in validated_data:
            instance.slug = self.generate_unique_slug(validated_data['title'])
        instance.description = validated_data.get('description', instance.description)
        instance.start_time = validated_data.get('start_time', instance.start_time)
        instance.password = validated_data.get('password', instance.password)
        instance.is_active = validated_data.get('is_active', instance.is_active)
        instance.private = validated_data.get('private', instance.private)
        instance.participants = validated_data.get('participants', instance.participants)
        instance.save()
        return instance

    def generate_unique_slug(self, title):
        slug = slugify(title)
        unique_slug = slug
        num = 1
        while Room.objects.filter(slug=unique_slug).exists():
            unique_slug = f'{slug}-{num}'
            num += 1
        return unique_slug
