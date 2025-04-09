import React from "react";

const Label = ({ children, className = "", ...props }) => {
  return (
    <label className={`block font-medium mb-1 ${className}`} {...props}>
      {children}
    </label>
  );
};

export default Label;
