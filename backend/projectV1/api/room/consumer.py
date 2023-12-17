from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from room.models import Message, ChatRoom
from django.utils import timezone
import json
class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['slug']
        self.room_group_name = f'chat_{self.room_name}'
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        await self.accept()
    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message_text = text_data_json['message']
        # Save message to the database
        message = await self.save_message(message_text)
        # Send message to room group
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'content': message_text,
                'user_id': message.user.id,
                'timestamp': str(message.timestamp)
            }
        )
    @database_sync_to_async
    def save_message(self, message_text):
        # Assuming self.scope["user"] is the authenticated user
        room = ChatRoom.objects.get(slug=self.room_name)
        return Message.objects.create(
            room=room,
            user=self.scope['user'],
            content=message_text,
            timestamp=timezone.now()
        )
    async def chat_message(self, event):
        # Send a message down to the client
        await self.send(text_data=json.dumps({
            'content': event['message'],
            'user_id': event['user_id'],
            'timestamp': event['timestamp']
        }))