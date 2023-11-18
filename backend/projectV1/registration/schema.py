import graphene
from graphene_django.types import DjangoObjectType
from django.contrib.auth.models import User as UserModel
from room.models import ChatRoom, Message

class UserType(DjangoObjectType):
    class Meta:
        model = UserModel

class CreateUser(graphene.Mutation):
    class Arguments:
        email = graphene.String(required=True)
        password = graphene.String(required=True)
        # sub = graphene.String(required=False)
    
    user = graphene.Field(UserType)
    
    def mutate(self, info, email, password):
        user = UserModel(email=email, password=password, username=email)
        user.save()
        return CreateUser(user=user)

class UserLogin(graphene.Mutation):
    class Arguments:
        email = graphene.String(required=True)
        password = graphene.String(required=True)

    success = graphene.Boolean()
    user = graphene.Field(UserType)
    message = graphene.String()

    def mutate(self, info, email, password):
        user = UserModel.objects.filter(email=email, password=password).first()
        if user is None:
            return UserLogin(success=False, message="No user found with the provided credentials")
        
        return UserLogin(success=True, user=user, message="Login successful")
    



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

    


    

class Query(graphene.ObjectType):
    all_users = graphene.List(UserType)
    
    # CHAT Room START
    all_rooms = graphene.List(ChatRoomType)
    room_by_slug = graphene.Field(ChatRoomType, slug=graphene.String(required=True))
    all_messages = graphene.List(MessageType)
    messages_by_room = graphene.List(MessageType, room_slug=graphene.String(required=True))
    # CHAT ROOM END

    def resolve_all_users(self, info):
        return UserModel.objects.all()
    


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


class Mutation(graphene.ObjectType):
    create_user = CreateUser.Field()
    user_login = UserLogin.Field()

schema = graphene.Schema(query=Query, mutation=Mutation)
