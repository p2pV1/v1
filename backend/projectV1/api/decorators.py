from functools import wraps
from django.http import JsonResponse
from .middleware.auth_middleware import AuthenticationMiddleware

def require_authenticated_and_valid_token(view_func):
    @wraps(view_func)
    def _wrapped_view(request, *args, **kwargs):
        # Apply the custom middleware to validate the token and set request.user
        authentication_middleware = AuthenticationMiddleware(view_func)
        response = authentication_middleware.process_request(request)

        # Check if the middleware returned a response indicating an unauthorized user
        if response.status_code == 401:
            return response  # Return the middleware's response

        # Continue to the view if the user is authenticated and has a valid token
        return view_func(request, *args, **kwargs)

    return _wrapped_view
