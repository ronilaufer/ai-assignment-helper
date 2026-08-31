import React from 'react';
import { 
  BookOpen, 
  HelpCircle, 
  Lightbulb, 
  ListOrdered, 
  CheckCircle2 
} from 'lucide-react';

const STEPS = [
  { id: 1, title: 'מושגי יסוד', icon: BookOpen, desc: 'הגדרות ומשפטים שחובה להכיר' },
  { id: 2, title: 'הסבר השאלה', icon: HelpCircle, desc: 'מה מבקשים מאיתנו במילים פשוטות' },
  { id: 3, title: 'אינטואיציה', icon: Lightbulb, desc: 'הרעיון הכללי לפתרון' },
  { id: 4, title: 'הסבר הפתרון', icon: ListOrdered, desc: 'פירוק צעד-אחר-צעד' },
  { id: 5, title: 'פתרון פורמלי', icon: CheckCircle2, desc: 'ניסוח מלא ומדויק להגשה' },
];

export default function StepSelector({ selectedStep, chatHistories, handleStepClick }) {
  return (
    <div className="steps-row">
      {STEPS.map((step, index) => {
        const Icon = step.icon;
        const isSelected = selectedStep === step.id;
        const hasResponse = chatHistories[step.id] && chatHistories[step.id].length > 0;

        return (
          <React.Fragment key={step.id}>
            <button
              onClick={() => handleStepClick(step.id)}
              className={`step-button ${isSelected ? 'selected' : ''}`}
            >
              <div className="step-icon-container">
                <Icon size={20} color={isSelected ? '#6366f1' : '#64748b'} />
              </div>
              <span className="step-title">
                {step.title}
              </span>
              <span className="step-desc">
                {step.desc}
              </span>
              {hasResponse && (
                <span className="step-ready-badge">
                  ● מוכן
                </span>
              )}
            </button>
            {index < STEPS.length - 1 && (
              <div className="step-arrow-container">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12"></line>
                  <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
