import React from "react";
import images from "../assets/images";

const Header = () => {
  return (
    <header className="p-4 w-full shadow-lg">
      <div className="grid grid-cols-3 md:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3">
        {/* Left: Logo */}
        <img src={images.Logo} alt="Logo" className="h-10 " />

        {/* Center: IT Utsav */}
        <div className="flex items-center justify-center gap-2">
          <img
            src={images.ITUtsav}
            alt="IT Utsav Logo"
            className="h-14 mb-1 w-14"
          />
          <h1 className="text-2xl font-semibold text-white shadow-lg">IT UTSAV 3.0</h1>
        </div>

        {/* Right: Placeholder or additional content (if needed) */}
        <div className="w-10"></div>
      </div>
    </header>
  );
};

export default Header;