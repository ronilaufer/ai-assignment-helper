from fastapi import FastAPI, HTTPException, Form, UploadFile, File, Header
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional

import json

# Import functions from gemini_service!
from services.gemini_service import get_step_response, get_chat_response

# Create the server
app = FastAPI(title="AI Assignment Helper Server")

# Configure CORS - allows React to send requests to the server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows access from any origin during development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define the request structure: what should the frontend send to the server?
class StepRequest(BaseModel):
    question_text: str  # Question text
    step_number: int    # Step number (1 to 5)

# Basic health check route
@app.get("/")
def home():
    return {"status": "Server is up and running!"}

# Main endpoint - accepts question text and step number, returning Gemini's response
@app.post("/api/get-step")
async def process_step(
    question_text: str = Form(""),
    step_number: int = Form(...),
    file: UploadFile = File(None),
    x_gemini_api_key: Optional[str] = Header(None)
):
    # Validation: verify that the step number is between 1 and 5
    if not 1 <= step_number <= 5:
        raise HTTPException(status_code=400, detail="Step number must be between 1 and 5")
    
    api_key = x_gemini_api_key
    if not api_key or not api_key.strip():
        raise HTTPException(
            status_code=400, 
            detail="מפתח ה-API של Gemini חסר. אנא הזן מפתח תקין בראש האתר."
        )

    try:
        file_bytes = None
        mime_type = None
        if file:
            file_bytes = await file.read()
            mime_type = file.content_type
            
        # Invoke service function to get the AI response
        ai_response = get_step_response(question_text, step_number, api_key.strip(), file_bytes, mime_type)
        return {
            "step": step_number,
            "answer": ai_response
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Chat endpoint for step-specific follow-up questions
@app.post("/api/chat-step")
async def chat_step(
    question_text: str = Form(""),
    step_number: int = Form(...),
    chat_history_json: str = Form("[]"),
    new_message: str = Form(...),
    file: UploadFile = File(None),
    x_gemini_api_key: Optional[str] = Header(None)
):
    if not 1 <= step_number <= 5:
        raise HTTPException(status_code=400, detail="Step number must be between 1 and 5")
        
    api_key = x_gemini_api_key
    if not api_key or not api_key.strip():
        raise HTTPException(
            status_code=400, 
            detail="מפתח ה-API של Gemini חסר. אנא הזן מפתח תקין בראש האתר."
        )

    try:
        file_bytes = None
        mime_type = None
        if file:
            file_bytes = await file.read()
            mime_type = file.content_type
            
        try:
            chat_history = json.loads(chat_history_json)
        except Exception:
            chat_history = []
            
        ai_response = get_chat_response(question_text, step_number, chat_history, new_message, api_key.strip(), file_bytes, mime_type)
        return {
            "step": step_number,
            "answer": ai_response
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))