from django.utils.deprecation import MiddlewareMixin
from knox.auth import TokenAuthentication
from django.http import JsonResponse
import logging

# Setup logger for this module
logger = logging.getLogger(__name__)

class AuthenticationMiddleware(MiddlewareMixin):
    def __init__(self, get_response):
        self.get_response = get_response

    # def process_request(self, request):
    #     # Bypass middleware for public (unauthenticated) endpoints
    #     if request.path in ['/public/endpoint1', '/public/endpoint2']:
    #         return None

    #     try:
    #         auth_token = request.COOKIES.get('auth_token')
    #         if not auth_token:
    #             logger.warning("Unauthorized access attempt - no token found")
    #             return JsonResponse({"status": False, "message": "Unauthorized - token not found"}, status=401)
            
    #         # Attach the token to the request header
    #         request.META['HTTP_AUTHORIZATION'] = f"Token {auth_token}"

    #         # Use knox's TokenAuthentication to validate the token
    #         token_auth = TokenAuthentication()
    #         user_auth_tuple = token_auth.authenticate(request)
            
    #         if user_auth_tuple:
    #             request.user, auth_token = user_auth_tuple
    #         else:
    #             logger.warning("Invalid token used for authentication")
    #             return JsonResponse({"status": False, "message": "Invalid token"}, status=401)

    #         return None

    #     except Exception as e:
    #         logger.error(f"Error in AuthenticationMiddleware: {str(e)}")
    #         return JsonResponse({"status": False, "message": "Internal Server Error"}, status=500)

    def process_request(self, request):
    # Bypass middleware for public (unauthenticated) endpoints
        if request.path in ['/public/endpoint1', '/public/endpoint2']:
            return None

        try:
            # Fetch the token from the Authorization header
            auth_header = request.META.get('HTTP_AUTHORIZATION')
            if not auth_header or not auth_header.startswith('Token '):
                logger.warning("Unauthorized access attempt - no authorization header found")
                return JsonResponse({"status": False, "message": "Unauthorized - Authorization header not found or invalid"}, status=401)
            
            auth_token = auth_header.split(' ')[1]

            # Use knox's TokenAuthentication to validate the token
            token_auth = TokenAuthentication()
            user_auth_tuple = token_auth.authenticate(request)
            
            if user_auth_tuple:
                request.user, auth_token = user_auth_tuple
            else:
                logger.warning("Invalid token used for authentication")
                return JsonResponse({"status": False, "message": "Invalid token"}, status=401)

            return None

        except Exception as e:
            logger.error(f"Error in AuthenticationMiddleware: {str(e)}")
            return JsonResponse({"status": False, "message": "Internal Server Error"}, status=500)


    def __call__(self, request):
        response = self.process_request(request)
        if not response:
            response = self.get_response(request)
        return response
