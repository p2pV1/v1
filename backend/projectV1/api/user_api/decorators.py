from functools import wraps
from django.http import JsonResponse
from knox.auth import TokenAuthentication
from rest_framework import exceptions
import logging

# Setup logger for this module
logger = logging.getLogger(__name__)

def require_authenticated_and_valid_token(view_func):
    @wraps(view_func)
    def _wrapped_view(request, *args, **kwargs):
        try:
            # Check if the request path is a public endpoint
            if request.path in ['/public/endpoint1', '/public/endpoint2']:
                return view_func(request, *args, **kwargs)

            auth_token = request.COOKIES.get('auth_token')
            if not auth_token:
                logger.warning("Unauthorized access attempt - no token found")
                return JsonResponse({"status": False, "message": "Unauthorized - token not found", "data": None}, status=401)

            # Attach the token to the request header
            request.META['HTTP_AUTHORIZATION'] = f"Token {auth_token}"

            # Use knox's TokenAuthentication to validate the token
            token_auth = TokenAuthentication()
            user_auth_tuple = token_auth.authenticate(request)

            if user_auth_tuple:
                request.user, auth_token = user_auth_tuple
            else:
                logger.warning("Invalid token used for authentication")
                return JsonResponse({"status": False, "message": "Invalid token", "data": None}, status=401)

            if not request.user.is_active:
                logger.warning("User account is not active")
                return JsonResponse({"status": False, "message": "User account is not active", "data": None}, status=401)

            return view_func(request, *args, **kwargs)
        except exceptions.AuthenticationFailed as e:
            return JsonResponse(
                {
                    "status": False,
                    "message": str(e.detail),
                    "data": None
                },
                status=401
            )

    return _wrapped_view
