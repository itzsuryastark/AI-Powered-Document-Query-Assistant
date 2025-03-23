import openai
import os
from dotenv import load_dotenv

# Load API key from .env file
load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

def generate_summary(text):
    try:
        response = openai.ChatCompletion.create(
            model="gpt-4-turbo",
            messages=[
                {"role": "system", "content": "You are an advanced AI assistant. Your job is to summarize text accurately and concisely. Always provide a complete numbered list with no missing points. Ensure the response is well-structured and does not end abruptly."},
                {"role": "user", "content": f"Summarize the following text:\n\n{text}\n\nProvide a well-structured summary with clear points in a numbered list format."}
            ],
            max_tokens=1500,  # Increased token limit
            temperature=0.5
        )

        summary = response['choices'][0]['message']['content'].strip()

        # Confidence score filtering (Mocking it, as OpenAI API doesn't return confidence)
        confidence_score = 0.9  # Assume high confidence by default

        if confidence_score < 0.5:  # Threshold for valid responses
            return "I'm not confident in this response. Please provide more details."

        # Check for incomplete responses
        if summary.endswith("...") or summary[-1].isdigit():
            return "The response seems incomplete. Please try again with more context."

        return summary
    except Exception as e:
        print(f"OpenAI API Error: {e}")
        return f"OpenAI API Error: {e}"