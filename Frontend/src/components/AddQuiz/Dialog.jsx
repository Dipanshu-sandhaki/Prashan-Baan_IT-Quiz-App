import React, { useState } from "react";

export const Dialog = ({ children, open, onOpenChange }) => {
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity ${
        open ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
      onClick={() => onOpenChange(false)}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-96" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export const DialogTrigger = ({ children, onClick }) => {
  return <div onClick={onClick}>{children}</div>;
};

export const DialogContent = ({ children }) => {
  return <div>{children}</div>;
};
