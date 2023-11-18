import graphene
from graphene_django import DjangoObjectType
from .models import ChatRoom, Message

class ChatRoomType(DjangoObjectType):
    class Meta:
        model = ChatRoom
        fields = ('id', 'host', 'participants', 'name', 'slug', 'private', 'created_at')

class MessageType(DjangoObjectType):
    class Meta:
        model = Message
        fields = ('id', 'room', 'user', 'content', 'timestamp')

class Query(graphene.ObjectType):
    all_rooms = graphene.List(ChatRoomType)
    room_by_slug = graphene.Field(ChatRoomType, slug=graphene.String(required=True))
    all_messages = graphene.List(MessageType)
    messages_by_room = graphene.List(MessageType, room_slug=graphene.String(required=True))

    def resolve_all_rooms(root, info):
        # Query for all chat rooms
        return ChatRoom.objects.all()

    def resolve_room_by_slug(root, info, slug):
        # Query for a single room by slug
        return ChatRoom.objects.get(slug=slug)

    def resolve_all_messages(root, info):
        # Query for all messages
        return Message.objects.select_related('room').all()

    def resolve_messages_by_room(root, info, room_slug):
        # Query for messages in a specific room
        return Message.objects.filter(room__slug=room_slug).select_related('room').all()

chat_schema = graphene.Schema(query=Query)
