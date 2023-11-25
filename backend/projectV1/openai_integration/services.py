# openai_services.py

import openai
from django.conf import settings



def generate_response(prompt):
    response = openai.Completion.create(
        engine="babbage-002",
        prompt=prompt,
        max_tokens=150  # Adjust the max_tokens as needed
    )
    return response.choices[0].text.strip()

def generate_keyword_list(keywords):
    prompt = f"Based on the provided keywords: {', '.join(keywords)}, please generate three precise and relevant categories that best represent the user's domain. These categories should be clear and distinct, without any additional information or explanations."
    
    response = generate_response(prompt)
    
    # Filter out empty strings and irrelevant sentences
    filtered_categories = [category.strip() for category in response.split('\n') if category.strip()]

    # Select the top three categories from the filtered list
    top_categories = filtered_categories[:3]

    return top_categories
