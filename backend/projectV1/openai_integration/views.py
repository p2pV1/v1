# views.py

from django.http import JsonResponse
from .services import generate_keyword_list

def openai_endpoint(request):
    # Get the list of keywords from the request
    keywords = request.GET.get('keywords', '').split(',')
    
    # Generate a list of keywords or categories
    keyword_list = generate_keyword_list(keywords)

    # Select the top three categories from the list
    top_categories = keyword_list[:3]

    return JsonResponse({'categories': top_categories})
