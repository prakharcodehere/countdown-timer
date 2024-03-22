import React from 'react';

const Modal = ({ isOpen = true, onClose, message, borderColor = "green" }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className={`bg-white p-8 rounded-lg shadow-lg border-4 border-${borderColor} max-w-md w-full`}>
        <h2 className="text-2xl font-bold mb-4">{message}</h2>
        <button onClick={onClose} class="button-30" role="button">Close</button>
      </div>
    </div>
  );
};

export default Modal;










