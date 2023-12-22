from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import permissions
from room.models import ChatRoom, Message
from .serializers import RoomSerializer, MessageSerializer, UserSerializer
from api.user_api.decorators import require_authenticated_and_valid_token as valid_token 
from django.contrib.auth.models import User
import logging
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
    
@api_view(["POST", "GET"])
@valid_token
def room_participants(request, slug):  # Accept slug as a parameter from the URL path
    logger.info("Accessed the room_participants view")
    logger.info(f"Received slug: {slug}")

    try:
        room = ChatRoom.objects.get(slug=slug)
        logger.info(f"Room found: {room}")
    except ChatRoom.DoesNotExist:
        logger.error(f"Room with slug {slug} not found")
        return Response({
            "status": False,
            "message": "Room not found",
        }, status=404)

    participant_count = request.GET.get('participant_count', 0)
    logger.info(f"Received participant_count: {participant_count}")
    try:
        participant_count = int(participant_count)
    except ValueError:
        logger.warning(f"Invalid participant_count received: {participant_count}")
        participant_count = 0

    participants = room.participants.all()
    logger.info(f"Total participants: {participants.count()}")

    start_index = participant_count
    end_index = start_index + 10
    selected_participants = participants[start_index:end_index]
    logger.info(f"Selected participants from index {start_index} to {end_index}")

    try:
        serializer = UserSerializer(selected_participants, many=True)
        logger.info("Serialization successful")
    except Exception as e:
        logger.error(f"Serialization failed: {e}")
        raise

    return Response({
        "status": True,
        "message": "Participants retrieved successfully",
        "participants": serializer.data
    }, status=200)

@api_view(["POST"])
@valid_token
def search_users_by_email(request):
    email_query = request.GET.get('email', '')

    matching_users = User.objects.filter(email__icontains=email_query)[:5]

    serializer = UserSerializer(matching_users, many=True)

    return Response({
        "status": True,
        "message": "Users retrieved successfully",
        "users": serializer.data
    }, status=200)
