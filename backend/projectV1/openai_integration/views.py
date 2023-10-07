from django.http import JsonResponse
from .services import generate_response

def openai_endpoint(request):
    # Get the list of keywords from the request
    keywords = request.GET.get('keywords', '').split(',')
    
    # Formulate a prompt for OpenAI
    prompt = f"Using the keywords {', '.join(keywords)}, identify three primary categories that best represent the user's domain. List only the three categories, separated by commas."




    # Get the response from OpenAI
    category = generate_response(prompt)

    return JsonResponse({'category': category})
