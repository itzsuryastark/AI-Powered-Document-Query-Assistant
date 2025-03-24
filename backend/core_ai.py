import openai
import os
from dotenv import load_dotenv

# Load API key from .env file
load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

def generate_summary(text):
    try:
        response = openai.ChatCompletion.create(
            model="gpt-4-turbo",  # Upgraded to GPT-4 Turbo
            messages=[
                {"role": "system", "content": "You are a helpful assistant that summarizes text."},
                {"role": "user", "content": f"Summarize the following text:\n{text}"}
            ],
            max_tokens=500,  # Increased limit for better summaries
            temperature=0.5
        )
        summary = response['choices'][0]['message']['content'].strip()
        return summary
    except Exception as e:
        print(f"OpenAI API Error: {e}")
        return f"OpenAI API Error: {e}"

