from django.shortcuts import render
from django.http import JsonResponse

def index(request):
    result = {
        'success' : True,
        'message' : "User Registration Page",
        'data' : None
    }
    return JsonResponse(result, status=200)
