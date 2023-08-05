from django.shortcuts import render
from django.http import JsonResponse

def index(request):
    result = {
        'success' : True,
        'message' : "ray_ai test api",
        'data' : None
    }
    return JsonResponse(result, status=200)

