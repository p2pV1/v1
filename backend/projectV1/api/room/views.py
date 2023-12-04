from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import permissions
from room.models import ChatRoom, Message
from .serializers import RoomSerializer, MessageSerializer
from api.user_api.decorators import require_authenticated_and_valid_token as valid_token 
from django.contrib.auth.models import User
import logging

# Create a logger instance
logger = logging.getLogger(__name__)

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
    
@api_view(["GET"])
@valid_token
def get_all_users(request):
    all_users = User.objects.all()
    user_emails = [user.email for user in all_users]

    return Response({
        "status": True,
        "message": "All users retrieved successfully",
        "users": user_emails,
    }, status=200)

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

    # Query all registered users
    all_users = User.objects.all()
    user_emails = [user.email for user in all_users]

    participants = room.participants.all()
    participant_emails = [participant.email for participant in participants]

    return Response({
        "status": True,
        "message": "Participants retrieved successfully",
        "participants": participant_emails,
        "all_users": user_emails,  # Include all registered users
    }, status=200)

@api_view(["POST"])
@valid_token
def add_participant(request):
    logger.info("Received request to add participant")

    # Log the request data
    logger.debug(f"Request data: {request.data}")

    try:
        chat_room = ChatRoom.objects.get(slug=request.data.get('slug'))
        logger.info(f"Chat room found: {chat_room.slug}")
    except ChatRoom.DoesNotExist:
        logger.warning(f"Chat room not found for slug: {request.data.get('slug')}")
        return Response({
            "status": False,
            "message": "Chat room not found",
        }, status=404)

    user_to_add = request.data.get('email')
    if user_to_add:
        try:
            participant = User.objects.get(email=user_to_add)
            logger.info(f"User found: {participant.email}")
        except User.DoesNotExist:
            logger.warning(f"User not found for email: {user_to_add}")
            return Response({
                "status": False,
                "message": "User not found",
            }, status=404)

        chat_room.participants.add(participant)
        chat_room.save()
        logger.info(f"Participant {participant.email} added to room {chat_room.slug}")

        serializer = RoomSerializer(chat_room)
        return Response({
            "status": True,
            "message": "Participant added successfully",
            "data": serializer.data,
        }, status=200)
    else:
        logger.warning("Email not provided in request data")
        return Response({
            "status": False,
            "message": "User ID is required to add a participant",
        }, status=400)
