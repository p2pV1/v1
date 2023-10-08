from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.authtoken.serializers import AuthTokenSerializer
from .decorators import require_authenticated_and_valid_token as valid_token
from .serializers import UserRegistrationSerializer
from knox.auth import AuthToken

@api_view(["GET"])
def test(request):
    data = {"status": True, "message": "Testing API", "data": None}
    return Response(data)

@api_view(["POST"])
def login_api(request):
    serializer = AuthTokenSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.validated_data["user"]

    _, token = AuthToken.objects.create(user)

    data = {"status": True, "message": "Login Successfull", "data": {"token": token}}
    return Response(data, status=200)

@api_view(["GET"])
@valid_token
def get_user_data(request):
    user = request.user
    data = {
        "status": True,
        "message": "Authenticated user info",
        "data": {
            "id": user.id,
            "username": user.username,
            "email": user.email,
        },
    }

    return Response(data, status=200)


@api_view(["POST"])
def registration_api(request):
    serializer = UserRegistrationSerializer(data=request.data)

    if serializer.is_valid():
        user = serializer.save()

        _, token = AuthToken.objects.create(user)

        data = {
            "status": True,
            "message": "Registration Successful",
            "data": {"user_id": user.id, "token": token},
        }
        return Response(data, status=201)

    errors = serializer.errors
    data = {
        "status": False,
        "message": "Registration Failed",
        "data": {"errors": errors},
    }
    
    # Set cache-control headers to disable caching
    response = Response(data, status=400)
    response["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response["Pragma"] = "no-cache"
    response["Expires"] = "0"

    return response
