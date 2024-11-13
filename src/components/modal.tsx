"use client";

import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose?: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, children, onClose }) => {
  return isOpen ? (
    <div className="fixed inset-0 w-full h-full flex items-center justify-center z-[999] p-0 overflow-scroll no-scrollbar">
      <div className="fixed inset-0 backdrop-blur-md bg-opacity-10 z-[900]" />

      <div className="relative z-[999] w-full h-full max-w-screen-lg mx-auto rounded-lg shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-8 right-8 text-white p-2 rounded-full transition duration-200 ease-in-out"
        >
          X
        </button>

        <div className="w-full h-full">{children}</div>
      </div>
    </div>
  ) : null;
};

export default Modal;
