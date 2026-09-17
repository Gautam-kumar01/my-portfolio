import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import './Toast.css';

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="toast-notification-banner" role="alert">
      <CheckCircle2 size={16} className="toast-icon" />
      <span className="toast-text">{message}</span>
    </div>
  );
};
