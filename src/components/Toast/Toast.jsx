import React, { useEffect } from 'react';
import { CheckCircle, X } from 'lucide-react';
import './Toast.scss';

const Toast = ({ message, isVisible, onClose, duration = 3000 }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose, duration]);

  if (!isVisible) return null;

  return (
    <div className="toast">
      <div className="toast__content">
        <CheckCircle className="toast__icon" />
        <p className="toast__message">{message}</p>
        <button onClick={onClose} className="toast__close">
          <X />
        </button>
      </div>
    </div>
  );
};

export default Toast;