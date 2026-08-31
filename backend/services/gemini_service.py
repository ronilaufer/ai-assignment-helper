# backend/services/gemini_service.py

# Responsible for communicating with gemini API

import os
import google.generativeai as genai
from .prompts import CONCEPTS_PROMPT, EXPLANATION_PROMPT, INTUITION_PROMPT, WALKTHROUGH_PROMPT, FORMAL_PROMPT

# define API key from .env file
genai.configure(api_key=os.environ.get("GEMINI_API_KEY"))
model = genai.GenerativeModel('gemini-3.5-flash')

# define function to get step response
def get_step_response(question_text: str, step_number: int, file_bytes: bytes = None, mime_type: str = None):
    prompts_map = {
        1: CONCEPTS_PROMPT,
        2: EXPLANATION_PROMPT,
        3: INTUITION_PROMPT,
        4: WALKTHROUGH_PROMPT,
        5: FORMAL_PROMPT
    }
    
    # get prompt from map
    selected_prompt = prompts_map.get(step_number, CONCEPTS_PROMPT)
    full_prompt = f"{selected_prompt}\n\n---\nהשאלה:\n{question_text}"
    
    # Prepare contents list for multimodal support
    contents = []
    if file_bytes and mime_type:
        contents.append({
            "mime_type": mime_type,
            "data": file_bytes
        })
    contents.append(full_prompt)
    
    # get response from model and get answer text
    response = model.generate_content(contents)
    return response.text

def get_chat_response(question_text: str, step_number: int, chat_history: list, new_message: str, file_bytes: bytes = None, mime_type: str = None):
    prompts_map = {
        1: CONCEPTS_PROMPT,
        2: EXPLANATION_PROMPT,
        3: INTUITION_PROMPT,
        4: WALKTHROUGH_PROMPT,
        5: FORMAL_PROMPT
    }
    
    selected_prompt = prompts_map.get(step_number, CONCEPTS_PROMPT)
    full_prompt = f"{selected_prompt}\n\n---\nהשאלה:\n{question_text}"
    
    # Reconstruct history for Gemini chat session
    formatted_history = []
    
    # 1. First user message (with file data if present)
    first_user_parts = []
    if file_bytes and mime_type:
        first_user_parts.append({
            "mime_type": mime_type,
            "data": file_bytes
        })
    first_user_parts.append(full_prompt)
    
    formatted_history.append({
        "role": "user",
        "parts": first_user_parts
    })
    
    # 2. Subsequent message history
    for msg in chat_history:
        formatted_history.append({
            "role": msg.get("role"),
            "parts": [msg.get("content")]
        })
        
    # Start chat and generate response
    chat = model.start_chat(history=formatted_history)
    response = chat.send_message(new_message)
    return response.text