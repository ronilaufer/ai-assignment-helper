import React, { useState } from 'react';

export default function Header({ geminiApiKey, setGeminiApiKey }) {
  const [showKey, setShowKey] = useState(false);

  const handleKeyChange = (e) => {
    const val = e.target.value;
    setGeminiApiKey(val);
    localStorage.setItem('gemini_api_key', val);
  };

  return (
    <header className="app-header">
      <h1 className="header-title">
        AI Homework Assistant 🎓
      </h1>
      <p className="header-subtitle">
        עוזר אישי לפתרון מטלות לימודיות ב-5 שלבים מובנים ומבוקרים
      </p>

      <div className="api-key-container">
        <div className="api-key-header">
          <span className="api-key-label">מפתח API של Gemini:</span>
          {geminiApiKey ? (
            <span className="api-key-badge-status">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              מוגדר
            </span>
          ) : (
            <span className="api-key-badge-status missing">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
              חסר
            </span>
          )}
        </div>
        <div className="api-key-input-wrapper">
          <input
            type={showKey ? 'text' : 'password'}
            className="api-key-input"
            value={geminiApiKey}
            onChange={handleKeyChange}
            placeholder="הזן מפתח API של Gemini (מתחיל ב-AIzaSy...)"
          />
          <button
            type="button"
            className="api-key-toggle-btn"
            onClick={() => setShowKey(!showKey)}
            title={showKey ? 'הסתר מפתח' : 'הצג מפתח'}
          >
            {showKey ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                <line x1="1" y1="1" x2="23" y2="23"></line>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
