from rest_framework.response import Response
from rest_framework.decorators import api_view
from audio_conference.models import Room
from .serializers import RoomSerializer
from api.user_api.decorators import require_authenticated_and_valid_token as valid_token

@api_view(["GET"])
def test(request):
    data = {"status": True, "message": "Testing API for call", "data": None}
    return Response(data)

@api_view(['GET', 'POST'])
@valid_token
def room_list_create(request):
    if request.method == 'GET':
        rooms = Room.objects.all()
        serializer = RoomSerializer(rooms, many=True)
        return Response({"status": True, "message": "Room list retrieved.", "data": serializer.data})

    elif request.method == 'POST':
        serializer = RoomSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response({"status": True, "message": "Room created.", "data": serializer.data}, status=201)
        return Response({"status": False, "message": "Room creation failed.", "data": serializer.errors}, status=400)

@api_view(['GET', 'PUT', 'DELETE'])
@valid_token
def room_detail(request, slug):
    try:
        room = Room.objects.get(slug=slug)
    except Room.DoesNotExist:
        return Response({"status": False, "message": "Room not found.", "data": None}, status=404)

    if request.method == 'GET':
        serializer = RoomSerializer(room)
        return Response({"status": True, "message": "Room retrieved.", "data": serializer.data})

    elif request.method == 'PUT':
        room = Room.objects.get(slug=slug, host=request.user)
        serializer = RoomSerializer(room, data=request.data, context={'request': request})
        if serializer.is_valid():
            if room.host != request.user:
                return Response({"status": False, "message": "Permission denied.", "data": None}, status=403)
            serializer.save()
            return Response({"status": True, "message": "Room updated.", "data": serializer.data})
        return Response({"status": False, "message": "Room update failed.", "data": serializer.errors}, status=400)

    elif request.method == 'DELETE':
        if room.host != request.user:
            return Response({"status": False, "message": "Permission denied.", "data": None}, status=403)
        room.delete()
        return Response({"status": True, "message": "Room deleted.", "data": None}, status=204)
