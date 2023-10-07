from django.utils.deprecation import MiddlewareMixin
from knox.auth import AuthToken
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
                "message": "Unauthorized user",
                "data": None,
            }
            return JsonResponse(data, status=401)
        
        try:
            token = AuthToken.objects.get(token_key=auth_token)
            request.user = token.user
        except AuthToken.DoesNotExist:
            # Token is invalid, return a response with status 401 (Unauthorized)
            data = {
                "status": False,
                "message": "Invalid token",
                "data": None,
            }
            return JsonResponse(data, status=401)
