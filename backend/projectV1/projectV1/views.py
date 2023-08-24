from django.http import HttpResponse


def create_synthetic_data(request):
    return HttpResponse('Hello World!!!')
