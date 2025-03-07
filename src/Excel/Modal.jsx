import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-lg relative">
        <button
          onClick={onClose}
          className="absolute top-0 right-0 m-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-700"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
