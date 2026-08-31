import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import Header from './components/Header';
import QuestionInput from './components/QuestionInput';
import StepSelector from './components/StepSelector';
import ChatArea from './components/ChatArea';

const API_BASE_URL = 'https://ai-assignment-helper-29ym.onrender.com';

export default function App() {
  const [questionText, setQuestionText] = useState('');
  const [selectedStep, setSelectedStep] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [geminiApiKey, setGeminiApiKey] = useState(localStorage.getItem('gemini_api_key') || '');

  // File upload state variables
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState('');
  const [dragActive, setDragActive] = useState(false);

  // Chat history state by step
  const [chatHistories, setChatHistories] = useState({
    1: [],
    2: [],
    3: [],
    4: [],
    5: []
  });
  const [chatInputs, setChatInputs] = useState({
    1: '',
    2: '',
    3: '',
    4: '',
    5: ''
  });
  const [chatLoading, setChatLoading] = useState(false);

  const resetStates = () => {
    setChatHistories({ 1: [], 2: [], 3: [], 4: [], 5: [] });
    setChatInputs({ 1: '', 2: '', 3: '', 4: '', 5: '' });
    setSelectedStep(null);
    setError(null);
  };

  const handleFileChange = (selectedFile) => {
    if (!selectedFile) return;
    setFile(selectedFile);
    resetStates();

    // Create image previews
    if (selectedFile.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setFilePreview('');
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setFilePreview('');
    resetStates();
  };

  const handleStepClick = async (stepId) => {
    if (!questionText.trim() && !file) {
      alert('נא להכניס את טקסט השאלה או להעלות קובץ/תמונה תחילה');
      return;
    }

    if (!geminiApiKey.trim()) {
      alert('נא להכניס מפתח API של Gemini בראש הדף כדי להתחיל');
      setError('מפתח ה-API של Gemini חסר. אנא הזן מפתח בראש הדף כדי לפתור את השאלה.');
      return;
    }

    setSelectedStep(stepId);
    setError(null);

    // If we already have a response for this step, don't request it again
    if (chatHistories[stepId] && chatHistories[stepId].length > 0) return;

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('question_text', questionText);
      formData.append('step_number', stepId);
      if (file) {
        formData.append('file', file);
      }

      const res = await axios.post(`${API_BASE_URL}/api/get-step`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'X-Gemini-API-Key': geminiApiKey.trim()
        },
      });

      setChatHistories((prev) => ({
        ...prev,
        [stepId]: [{ role: 'model', content: res.data.answer }]
      }));
    } catch (err) {
      console.error(err);
      setError('אירעה שגיאה בתקשורת עם השרת. ודא שה-Backend רץ.');
    } finally {
      setLoading(false);
    }
  };

  const handleSendChatMessage = async (stepId) => {
    const messageText = chatInputs[stepId]?.trim();
    if (!messageText) return;

    if (!geminiApiKey.trim()) {
      alert('נא להכניס מפתח API של Gemini בראש הדף כדי להתחיל');
      setError('מפתח ה-API של Gemini חסר. אנא הזן מפתח בראש הדף כדי לשלוח הודעה.');
      return;
    }

    const userMessage = { role: 'user', content: messageText };
    const currentHistory = chatHistories[stepId] || [];
    const updatedHistory = [...currentHistory, userMessage];

    setChatHistories((prev) => ({
      ...prev,
      [stepId]: updatedHistory
    }));

    setChatInputs((prev) => ({
      ...prev,
      [stepId]: ''
    }));

    setChatLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('question_text', questionText);
      formData.append('step_number', stepId);
      formData.append('chat_history_json', JSON.stringify(currentHistory));
      formData.append('new_message', messageText);
      if (file) {
        formData.append('file', file);
      }

      const res = await axios.post(`${API_BASE_URL}/api/chat-step`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'X-Gemini-API-Key': geminiApiKey.trim()
        },
      });

      const modelMessage = { role: 'model', content: res.data.answer };
      setChatHistories((prev) => ({
        ...prev,
        [stepId]: [...updatedHistory, modelMessage]
      }));
    } catch (err) {
      console.error(err);
      setError('אירעה שגיאה בקבלת תשובה לשאלת ההמשך.');
      setChatHistories((prev) => ({
        ...prev,
        [stepId]: currentHistory
      }));
    } finally {
      setChatLoading(false);
    }
  };

  const activeHistory = selectedStep ? chatHistories[selectedStep] : [];

  return (
    <div className="app-container">
      
      {/* Background soft glowing blur elements (RTL-aligned soft pastel glow) */}
      <div className="glow-bg-1" />
      <div className="glow-bg-2" />

      {/* 1. Title/Header */}
      <Header geminiApiKey={geminiApiKey} setGeminiApiKey={setGeminiApiKey} />

      {!geminiApiKey.trim() && (
        <div className="warning-box">
          ⚠️ שים לב: עליך להזין מפתח API של Gemini בתיבה שלמעלה כדי להפעיל את פותר המטלות.
        </div>
      )}

      {/* 2. Question input / File upload */}
      <QuestionInput 
        questionText={questionText}
        setQuestionText={setQuestionText}
        file={file}
        filePreview={filePreview}
        dragActive={dragActive}
        handleFileChange={handleFileChange}
        handleDrag={handleDrag}
        handleDrop={handleDrop}
        handleRemoveFile={handleRemoveFile}
        resetStates={resetStates}
      />

      {/* 3. Steps Selector */}
      <StepSelector 
        selectedStep={selectedStep}
        chatHistories={chatHistories}
        handleStepClick={handleStepClick}
      />

      {/* 4. Explanation and Chat section */}
      <ChatArea 
        selectedStep={selectedStep}
        activeHistory={activeHistory}
        loading={loading}
        chatLoading={chatLoading}
        error={error}
        chatInput={chatInputs[selectedStep] || ''}
        setChatInput={(val) => setChatInputs(prev => ({ ...prev, [selectedStep]: val }))}
        handleSendChatMessage={() => handleSendChatMessage(selectedStep)}
      />
      
    </div>
  );
}