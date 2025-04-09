import React from "react";

const LoadingMenu = ({ size = "w-16 h-16", text = "Loading..." }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="flex flex-col items-center">
        <div
          className={`animate-spin rounded-full border-4 border-t-transparent border-white ${size}`}
        />
        <p className="mt-4 text-white text-lg">{text}</p>
      </div>
    </div>
  );
};

export default LoadingMenu;
