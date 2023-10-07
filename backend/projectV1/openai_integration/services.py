import openai
from django.conf import settings

openai.api_key = settings.OPENAI_API_KEY

def generate_response(prompt):
    response = openai.Completion.create(
        engine="davinci",
        prompt=prompt,
        max_tokens=100  # Adjust as needed
    )
    return response.choices[0].text.strip()
