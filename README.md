# AI Homework Assistant 🎓

A structured AI-powered study helper designed to guide students through homework problems using a controlled, step-by-step pedagogical method. Instead of dumping raw solutions, the assistant helps users learn by breaking down any assignment question into 5 logical steps, with a follow-up interactive chat for each step.

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
│   ├── services/
│   │   ├── gemini_service.py  # Google Gemini API integration (gemini-3.5-flash)
│   │   └── prompts.py         # Pedagogical prompt templates
│   └── .env                   # Configuration file (API keys)
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
   pip install fastapi uvicorn google-generativeai python-multipart python-dotenv pydantic
   ```
4. Create a `.env` file in the `backend/` folder and add your Gemini API Key (obtained from [Google AI Studio](https://aistudio.google.com/)):
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```
5. Run the FastAPI server:
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

If you have **Docker** and **Docker Compose** installed, you can start both the backend and frontend with a single command without installing Python or Node.js locally:

1. Create the `./backend/.env` file with your API key:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```
2. In the root directory, run:
   ```bash
   docker-compose up --build
   ```
3. Open `http://localhost:5173` in your browser. All code edits on your host machine will hot-reload automatically!

