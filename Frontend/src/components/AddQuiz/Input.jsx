import React from "react";

const Input = ({ type = "text", className = "", ...props }) => {
  return (
    <input
      type={type}
      className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      {...props}
    />
  );
};

export default Input;
