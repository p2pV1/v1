from django.utils.deprecation import MiddlewareMixin
from knox.auth import TokenAuthentication
from django.http import JsonResponse

class AuthenticationMiddleware(MiddlewareMixin):
    def __init__(self, get_response):
        self.get_response = get_response

    def process_request(self, request):
        auth_token = request.COOKIES.get('auth_token')
        if not auth_token:
            # User is not authenticated, return a response with status 401 (Unauthorized)
            data = {
                "status": False,
                "message": "Unauthorized user token not found",
                "data": auth_token,
            }
            return JsonResponse(data, status=401)
        
        # Attach the token to the request header
        request.META['HTTP_AUTHORIZATION'] = f"Token {auth_token}"

        # Use knox's TokenAuthentication to validate the token
        token_auth = TokenAuthentication()
        user_auth_tuple = token_auth.authenticate(request)
        
        if user_auth_tuple:
            request.user, auth_token = user_auth_tuple
        else:
            data = {
                "status": False,
                "message": "Invalid token",
                "data": auth_token,
            }
            return JsonResponse(data, status=401)

        # If the token is valid and the user is set, just continue processing the request
        return None
