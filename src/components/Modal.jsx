import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

const ANIMATION_DURATION = 200; // ms

const Modal = ({ open, onClose, title, children }) => {
  const [show, setShow] = useState(open);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (open) {
      setShow(true);
      setExiting(false);
    } else if (show) {
      setExiting(true);
      const timeout = setTimeout(() => {
        setShow(false);
        setExiting(false);
      }, ANIMATION_DURATION);
      return () => clearTimeout(timeout);
    }
  }, [open]);

  useEffect(() => {
    if (!show) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose?.();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [show, onClose]);

  if (!show) return null;

  return createPortal(
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-200 ${exiting ? 'opacity-0' : 'opacity-100'} bg-black/40 backdrop-blur-sm`}
      style={{ transitionProperty: 'opacity, backdrop-filter' }}
    >
      <div
        className={`relative bg-white rounded-xl shadow-2xl max-w-lg w-full mx-4 transform transition-all duration-200 ${exiting ? 'scale-95 opacity-0' : 'scale-100 opacity-100'} animate-fadeIn`}
        style={{ transitionProperty: 'opacity, transform' }}
      >
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-3 right-3 p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>
        {title && (
          <div className="px-6 pt-6 pb-2 text-lg font-semibold text-gray-800">{title}</div>
        )}
        <div className="px-6 pb-6 pt-2">{children}</div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
