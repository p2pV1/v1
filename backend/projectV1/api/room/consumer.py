from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
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
        user_id = text_data_json['user']

        message = await self.save_message(user_id, message_text)

        if message:
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type': 'chat_message',
                    'content': message_text,
                    'user_id': user_id,
                    'timestamp': str(message.timestamp)
                }
            )

    @database_sync_to_async
    def save_message(self, user_id, message_text):
        from django.contrib.auth.models import User
        from room.models import Message, ChatRoom
        
        try:
            user = User.objects.get(id=user_id)
            room = ChatRoom.objects.get(slug=self.room_name)
        except (User.DoesNotExist, ChatRoom.DoesNotExist):
            return None

        return Message.objects.create(
            room=room,
            user=user,
            content=message_text,
            timestamp=timezone.now()
        )

    async def chat_message(self, event):
        await self.send(text_data=json.dumps({
            'content': event['content'],
            'user': event['user_id'],
            'timestamp': event['timestamp']
        }))