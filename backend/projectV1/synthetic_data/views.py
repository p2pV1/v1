from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import HttpResponse

@api_view(['GET'])
def check_authentication_status(request):
    # This view checks if the user is authenticated
    if request.user.is_authenticated:
        return Response({'isAuthenticated': True})
    else:
        return Response({'isAuthenticated': False})

def create_synthetic_data(request):
    # Your logic here
    return HttpResponse('Data created.')
