from functools import wraps
from django.http import JsonResponse
from .middleware.auth_middleware import AuthenticationMiddleware
from rest_framework import exceptions 

def require_authenticated_and_valid_token(view_func):
    @wraps(view_func)
    def _wrapped_view(request, *args, **kwargs):
        try:
            authentication_middleware = AuthenticationMiddleware(view_func)
            response = authentication_middleware.process_request(request)

            if response and response.status_code == 401:
                return response 

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
