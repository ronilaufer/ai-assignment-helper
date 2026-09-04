# AI Homework Assistant 🎓

A structured AI-powered study helper designed to guide students through homework problems using a controlled, step-by-step pedagogical method. Instead of dumping raw solutions, the assistant helps users learn by breaking down any assignment question into 5 logical steps, with a follow-up interactive chat for each step.

---

## 🔗 Live Deployment URLs

* **Frontend Website**: [https://ai-assignment-helper-fronted.onrender.com](https://ai-assignment-helper-fronted.onrender.com)
* **Backend API**: [https://ai-assignment-helper-29ym.onrender.com](https://ai-assignment-helper-29ym.onrender.com)

---

## 🌟 Key Features

* **5-Step Learning Framework**:
  1. **Concepts (מושגי יסוד)**: Definitions, statements, and theorems necessary to approach the problem.
  2. **Question Explanation (הסבר השאלה)**: Rephrasing what the question asks and analyzing the inputs in plain language.
  3. **Intuition (אינטואיציה)**: The core idea and strategic thought process behind the solution.
  4. **Solution Explanation (הסבר הפתרון)**: Step-by-step walkthrough of the solution.
  5. **Formal Solution (פתרון פורמלי)**: Precise, rigorously formatted proof or answer using LaTeX.
* **Multimodal Uploads**: Support for drag-and-drop images (PNG, JPG) or PDF files of homework sheets.
* **Interactive Contextual Chat**: Ask follow-up questions under any specific step to get guidance from Gemini.
* **Premium Design**: Beautiful, responsive light-blue glassmorphic UI using custom rounded fonts (`Itim` and `Assistant`).
* **LaTeX Formula Rendering**: Beautiful rendering of mathematical equations and calculations.

---

## 📂 Project Structure

```
ai-assignment-helper/
│
├── backend/                   # FastAPI Server (Python)
│   ├── main.py                # Server routes & API endpoints
│   └── services/
│       ├── gemini_service.py  # Google Gemini API integration (gemini-1.5-flash-8b)
│       └── prompts.py         # Pedagogical prompt templates
│
└── frontend/                  # React Client (Vite)
    ├── src/
    │   ├── App.jsx            # Parent Container (State & API calls)
    │   ├── App.css            # Custom CSS classes & Light-Blue theme
    │   ├── components/        # Stateless Presentational Components
    │   │   ├── Header.jsx     # Header banner
    │   │   ├── QuestionInput.jsx # Input text & Drag-drop uploads
    │   │   ├── StepSelector.jsx  # Horizontal steps progress buttons
    │   │   └── ChatArea.jsx   # Solution renderer & follow-up chat UI
    │   ├── main.jsx           # App entry point
    │   └── index.css          # Global fonts & typography styles
    └── index.html             # Client HTML template & favicon settings
```

---

## 🚀 Getting Started

### 1. Backend Setup (FastAPI)

1. Open a terminal and navigate to the `backend/` folder:
   ```bash
   cd backend
   ```
2. Create and activate a Python virtual environment:
   ```bash
   python -m venv venv
   # On Windows:
   venv\Scripts\activate
   # On macOS/Linux:
   source venv/bin/activate
   ```
3. Install dependencies:
   ```bash
   pip install fastapi uvicorn google-generativeai python-multipart pydantic
   ```
4. Run the FastAPI server:
   ```bash
   uvicorn main:app --reload
   ```
   The backend will be running on `http://localhost:8000`.

### 2. Frontend Setup (React/Vite)

1. Open a new terminal and navigate to the `frontend/` folder:
   ```bash
   cd frontend
   ```
2. Install the node packages:
   ```bash
   npm install
   ```
3. Launch the local development server:
   ```bash
   npm run dev
   ```
   The application will be running on `http://localhost:5173`. Open this URL in your web browser to start using it!

### 3. Setup with Docker (Recommended)

If you have **Docker** and **Docker Compose** installed, you can start both the backend and frontend with a single command:

1. In the root directory, run:
   ```bash
   docker-compose up --build
   ```
2. Open `http://localhost:5173` in your browser. All code edits on your host machine will hot-reload automatically!

---

## 🔑 Gemini API Key Configuration
This application uses a **Bring Your Own Key (BYOK)** security design. You do not need to configure any environment variables or `.env` files on the server or host machine.
* When you open the frontend website, enter your Gemini API Key in the dedicated settings bar at the top of the page.
* You can generate a free API Key from [Google AI Studio](https://aistudio.google.com/app/apikey).
* Your key is securely stored in your browser's local storage and is never saved or logged by the server.

