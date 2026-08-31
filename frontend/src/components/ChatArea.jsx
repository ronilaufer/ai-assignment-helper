import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { Loader2 } from 'lucide-react';
import 'katex/dist/katex.min.css';

const STEP_TITLES = {
  1: 'מושגי יסוד',
  2: 'הסבר השאלה',
  3: 'אינטואיציה',
  4: 'הסבר הפתרון',
  5: 'פתרון פורמלי'
};

export default function ChatArea({
  selectedStep,
  activeHistory,
  loading,
  chatLoading,
  error,
  chatInput,
  setChatInput,
  handleSendChatMessage
}) {
  return (
    <div className="glass-card solution-card">
      {loading ? (
        <div className="loading-wrapper">
          <Loader2 size={36} className="animate-spin" />
          <span className="loading-text">מעבד את התשובה עם Gemini...</span>
        </div>
      ) : error ? (
        <div className="error-text">{error}</div>
      ) : selectedStep && activeHistory.length > 0 ? (
        <div className="chat-container">
          
          {/* Step Title */}
          <h3 className="solution-header-title">
            {STEP_TITLES[selectedStep]}
          </h3>

          {/* Chat Conversation History */}
          <div className="chat-history">
            {activeHistory.map((msg, idx) => {
              const isUser = msg.role === 'user';
              
              if (idx === 0 && !isUser) {
                return (
                  <div key={idx} className="markdown-body">
                    <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
                      {msg.content}
                    </ReactMarkdown>
                  </div>
                );
              }

              return (
                <div 
                  key={idx} 
                  className={`chat-bubble ${isUser ? 'user' : 'assistant'}`}
                >
                  <div className="bubble-label">
                    {isUser ? 'השאלה שלך:' : 'תשובת העוזר:'}
                  </div>
                  <div className={!isUser ? "markdown-body" : ""}>
                    <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
                      {msg.content}
                    </ReactMarkdown>
                  </div>
                </div>
              );
            })}

            {/* Chat Loading Indicator */}
            {chatLoading && (
              <div className="chat-loader-bubble">
                <Loader2 size={16} className="animate-spin" />
                <span className="chat-loader-text">חושב על תשובה...</span>
              </div>
            )}
          </div>

          {/* Chat Input Field */}
          <div className="chat-input-bar">
            <input 
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSendChatMessage();
                }
              }}
              placeholder="שאל שאלה על השלב הזה (לדוגמה: למה המעבר הזה נכון?)..."
              className="chat-input-field"
            />
            <button
              onClick={handleSendChatMessage}
              disabled={chatLoading || !chatInput.trim()}
              className="chat-send-btn"
            >
              שאל
            </button>
          </div>

        </div>
      ) : (
        <div className="empty-state">
          הקלד שאלה או העלה קובץ למעלה, ולחץ על אחד מ-5 השלבים כדי להתחיל ללמוד.
        </div>
      )}
    </div>
  );
}
