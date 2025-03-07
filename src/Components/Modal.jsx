// src/Components/Modal.js
import React from 'react';

const Modal = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-gray-800  p-6 shadow-lg w-80 text-center text-white">
        <p className="text-lg font-semibold">{message}</p>
        <button
          onClick={onClose}
          className="mt-4 bg-amber-300 text-black px-4 py-2 rounded-lg hover:bg-amber-600 transition"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default Modal;
