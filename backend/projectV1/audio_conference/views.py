from django.http import JsonResponse
from django.shortcuts import render

def land_page(request):
    result = {
        'success' : True,
        'message' : "Audio Conference Page",
        'data' : None
    }
    return JsonResponse(result, status=200)