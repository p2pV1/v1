from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.authtoken.serializers import AuthTokenSerializer
from .decorators import require_authenticated_and_valid_token as valid_token
from .serializers import UserRegistrationSerializer, PasswordChangeSerializer
from knox.auth import AuthToken
from registration.models import Token
from django.contrib.auth.models import User
from registration.models import Profile
import jwt
import random
import string
from django.http import JsonResponse
from datetime import datetime
from django.conf import settings
from django.utils.timezone import now
import logging
from .mail import verification_token, send_verification_email, send_password_email

# import logging
# logger = logging.getLogger(__name__)

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
    #Create response object

    # logger.info("Request Headers: %s", request.headers)

    # # Print some key headers   
    # logger.info("X-Forwarded-For: %s", request.headers.get('X-Forwarded-For'))
    # logger.info("X-Cloud-Trace-Context: %s", request.headers.get('X-Cloud-Trace-Context'))
    # logger.info("Host: %s", request.headers.get('Host'))

    response = Response(data, status=200)

    # Set the cookie with a duration of 7 days
    # Ensure the Secure and SameSite attributes are set correctly

    origin = request.META.get('HTTP_ORIGIN')

    # Calculate the max age (7 days in seconds)
    max_age_seconds = 7 * 24 * 60 * 60

    # Define common cookie attributes
    cookie_attributes = {
        'samesite': 'Lax' if origin and origin.startswith('http://localhost') else 'None',
        'domain': 'localhost' if origin and origin.startswith('http://localhost') else 'backend-service-rojjrgeqna-ue.a.run.app',
        'path': '/',  # Specify the desired path for the cookie
        'max_age': max_age_seconds,
    }

    # Conditionally set httponly and secure
    if not (origin and origin.startswith('http://localhost')):
        cookie_attributes['httponly'] = True
        cookie_attributes['secure'] = True


    response.set_cookie('auth_token', token, **cookie_attributes)

    response["Access-Control-Allow-Credentials"] = "true"

    return response

@api_view(["GET"])
@valid_token
def get_user_data(request):
    user = request.user
    profile = Profile.objects.get(user=user)
    group_names = list(user.groups.values_list('name', flat=True))
    data = {
        "status": True,
        "message": "Authenticated user info",
        "data": {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "phone": profile.phone,
            "group": group_names,
        },
    }

    return Response(data, status=200)

@api_view(["GET"])
@valid_token
def is_authenticated(request):
    return Response(
        {
            "status": True,
            "message": "Authenticated user",
            "data": None  # or include user data if needed
        },
        status=200
    )

@api_view(["POST"])
@valid_token
def logout(request):
    token = request.GET.get('token')
    data = {"status": True, "message": "Logout Successful", "data": {"token": token}}
    #Create response object
    response = Response(data, status=200)
    origin = request.META.get('HTTP_ORIGIN')
    if origin and origin.startswith('http://localhost'):
        response.set_cookie(
            'auth_token', 
            None, 
            httponly=True, 
            secure=True, 
            max_age=7*24*60*60, 
        )
    else:
        response.set_cookie(
            'auth_token', 
            None, 
            httponly=True, 
            secure=True, 
            max_age=7*24*60*60, 
            samesite='None', 
            domain='backend-service-rojjrgeqna-ue.a.run.app'
        )
    return response


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

@api_view(["PUT"])
@valid_token
def change_password(request):
    user = request.user
    serializer = PasswordChangeSerializer(data=request.data, context={'request': request})

    if serializer.is_valid():
        user.set_password(serializer.validated_data['new_password'])
        user.save()
        data = {
            "status": True,
            "message": "Password changed successfully",
        }
        return Response(data, status=200)

    errors = serializer.errors
    data = {
        "status": False,
        "message": "Password change failed",
        "data": {"errors": errors},
    }
    return Response(data, status=400)

@api_view(["GET"])
def verify_email(request):
    token = request.GET.get('token')
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
        user = User.objects.get(id=payload['user_id'], email=payload['email'])
        profile = user.profile
        profile.verified_at = datetime.now()
        profile.save()
        return JsonResponse({"status": True, "message": "Email verified successfully"})
    except jwt.ExpiredSignatureError:
        return JsonResponse({"status": False, "message": "Token has expired"})
    except jwt.InvalidTokenError:
        return JsonResponse({"status": False, "message": "Invalid token"})
    except User.DoesNotExist:
        return JsonResponse({"status": False, "message": "User does not exist"})
    
@api_view(["POST"])
def forgot_password(request):
    email = request.POST.get('email')
    if email:
        try:
            user = User.objects.get(email=email)
            chars = string.ascii_uppercase + string.digits
            token = ''.join(random.choice(chars) for _ in range(6))
            send_password_email(user, token)
            return JsonResponse({"status": True, "message": "Email sent successfully"})
        except User.DoesNotExist:
            return JsonResponse({"status": False, "message": 'User not found'})
    else:
        return JsonResponse({"status": False, "message": 'Email parameter not provided'})
    
@api_view(["POST"])
def validate_token(request):
    token = request.POST.get('token')
    if token:
        try:
            token_model = Token.objects.get(token=token)
            current_datetime = now()
            if current_datetime < token_model.valid_till:
                return JsonResponse({"status": True, "message": 'Valid Token'})
            else:
                return JsonResponse({"status": False, "message": 'Token Expired'})
        except User.DoesNotExist:
            return JsonResponse({"status": False, "message": 'Invalid Token'})
    else:
        return JsonResponse({"status": False, "message": 'Token Required'})
    
@api_view(["POST"])
def update_password(request):
    token = request.POST.get('token')
    new_password = request.POST.get('password')
    
    if not token:
        return JsonResponse({"status": False, "message": 'Token Required'})

    if not new_password:
        return JsonResponse({"status": False, "message": 'New password is required'})

    try:
        token_model = Token.objects.get(token=token)
        current_datetime = now()
        
        if current_datetime >= token_model.valid_till:
            return JsonResponse({"status": False, "message": 'Token Expired'})

        user = token_model.user
        user.set_password(new_password)
        user.save()

        token_model.delete()

        return JsonResponse({"status": True, "message": 'Password updated successfully'})

    except Token.DoesNotExist:
        return JsonResponse({"status": False, "message": 'Invalid Token'})