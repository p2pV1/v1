from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import permissions
from room.models import ChatRoom, Message
from .serializers import RoomSerializer, MessageSerializer, UserSerializer
from api.user_api.decorators import require_authenticated_and_valid_token as valid_token 
from django.contrib.auth.models import User

@api_view(["GET", "POST"])
@valid_token
def room_list_create(request):
    if request.method == 'GET':
        rooms = ChatRoom.objects.all()
        serializer = RoomSerializer(rooms, many=True)
        return Response(serializer.data, status=200)

    elif request.method == 'POST':
        serializer = RoomSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        data = {
            "status": False,
            "message": "Room creation failed",
            "data": {"errors": serializer.errors},
        }
        return Response(data, status=400)

@api_view(["GET", "PUT", "DELETE"])
@valid_token
def room_detail(request, slug):
    try:
        room = ChatRoom.objects.get(slug=slug)
    except ChatRoom.DoesNotExist:
        data = {
            "status": False,
            "message": "Room not found",
        }
        return Response(data, status=404)

    if request.method == 'GET':
        serializer = RoomSerializer(room)
        return Response(serializer.data, status=200)

    elif request.method == 'PUT':
        if request.user == room.host:
            serializer = RoomSerializer(room, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=200)
            data = {
                "status": False,
                "message": "Room update failed",
                "data": {"errors": serializer.errors},
            }
            return Response(data, status=400)
        else:
            raise permissions.PermissionDenied("You do not have permission to update this room.")

    elif request.method == 'DELETE':
        if request.user == room.host:
            room.delete()
            data = {
                "status": True,
                "message": "Room deleted successfully",
            }
            return Response(data, status=204)
        else:
            raise permissions.PermissionDenied("You do not have permission to delete this room.")
        
@api_view(["GET", "POST"])
@valid_token
def message_list_create(request, slug):
    try:
        room = ChatRoom.objects.get(slug=slug)
    except ChatRoom.DoesNotExist:
        return Response({
            "status": False,
            "message": "Room not found",
        }, status=404)

    if request.method == 'GET':
        messages = Message.objects.filter(room=room)
        serializer = MessageSerializer(messages, many=True)
        return Response(serializer.data, status=200)

    elif request.method == 'POST':
        serializer = MessageSerializer(data=request.data, context={'request': request, 'room': room})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)

        return Response({
            "status": False,
            "message": "Message creation failed",
            "data": {"errors": serializer.errors},
        }, status=400)
    
@api_view(["POST"])
@valid_token
def add_participant(request):
    try:
        chat_room = ChatRoom.objects.get(slug=request.data.get('slug'))
    except ChatRoom.DoesNotExist:
        data = {
            "status": False,
            "message": "Chat room not found",
        }
        return Response(data, status=404)

    if request.method == 'POST':
        user_to_add = request.data.get('email')
        if user_to_add:
            try:
                participant = User.objects.get(email=user_to_add)
            except User.DoesNotExist:
                data = {
                    "status": False,
                    "message": "User not found",
                }
                return Response(data, status=404)

            chat_room.participants.add(participant)
            chat_room.save()

            serializer = RoomSerializer(chat_room)
            data = {
                "status": True,
                "message": "Participant added successfully",
                "data": serializer.data,
            }
            return Response(data, status=200)
        else:
            data = {
                "status": False,
                "message": "User ID is required to add a participant",
            }
            return Response(data, status=400)
    
@api_view(["GET"])
@valid_token
def room_participants(request, slug):
    try:
        room = ChatRoom.objects.get(slug=slug)
    except ChatRoom.DoesNotExist:
        return Response({
            "status": False,
            "message": "Room not found",
        }, status=404)

    participants = room.participants.all()
    serializer = UserSerializer(participants, many=True)
    return Response({
        "status": True,
        "message": "Participants retrieved successfully",
        "participants": serializer.data
    }, status=200)