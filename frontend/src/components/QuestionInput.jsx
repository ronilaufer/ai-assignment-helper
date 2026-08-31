import React from 'react';
import { UploadCloud, X, FileText, Image as ImageIcon } from 'lucide-react';

export default function QuestionInput({
  questionText,
  setQuestionText,
  file,
  filePreview,
  dragActive,
  handleFileChange,
  handleDrag,
  handleDrop,
  handleRemoveFile,
  resetStates
}) {
  return (
    <div className="glass-card input-card">
      <div className="input-grid">
        
        {/* Text Input */}
        <div className="input-column">
          <label className="input-label">
            הקלד או הדבק את השאלה:
          </label>
          <textarea
            rows={6}
            value={questionText}
            onChange={(e) => {
              setQuestionText(e.target.value);
              resetStates();
            }}
            placeholder="לדוגמה: הוכח כי לכל גרף קובי יש מספר זוגי של קודקודים..."
            className="textarea"
          />
        </div>

        {/* File Upload */}
        <div className="input-column">
          <label className="input-label">
            או העלה תמונה / קובץ (PDF):
          </label>
          
          {!file ? (
            <div
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              className={`upload-dropzone ${dragActive ? 'drag-active' : ''}`}
              onClick={() => document.getElementById('file-input').click()}
            >
              <UploadCloud size={38} color={dragActive ? '#6366f1' : '#94a3b8'} style={{ marginBottom: '12px' }} />
              <span className="upload-title">
                גרור לכאן קובץ או לחץ לבחירה
              </span>
              <span className="upload-subtitle">
                תומך בתמונות (PNG, JPG) וקבצי PDF
              </span>
              <input
                id="file-input"
                type="file"
                accept="image/*,application/pdf"
                onChange={(e) => handleFileChange(e.target.files[0])}
                style={{ display: 'none' }}
              />
            </div>
          ) : (
            <div className="upload-preview-card">
              <button 
                onClick={handleRemoveFile}
                className="remove-file-btn"
              >
                <X size={16} />
              </button>

              {filePreview ? (
                <img 
                  src={filePreview} 
                  alt="תצוגה מקדימה" 
                  style={{ maxHeight: '110px', maxWidth: '100%', borderRadius: '10px', objectFit: 'contain' }} 
                />
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  {file.type === 'application/pdf' ? (
                    <FileText size={48} color="#ef4444" style={{ marginBottom: '8px' }} />
                  ) : (
                    <ImageIcon size={48} color="#3b82f6" style={{ marginBottom: '8px' }} />
                  )}
                  <span className="preview-filename">
                    {file.name}
                  </span>
                  <span className="preview-filesize">
                    ({(file.size / 1024 / 1024).toFixed(2)} MB)
                  </span>
                </div>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
