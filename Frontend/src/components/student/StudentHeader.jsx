import React from "react";
import LogoSection from "../LogoSection"; // Assuming this contains the main logo
import UserMenu from "../UserMenu";
import images from "../../assets/images";

const StudentHeader = ({ bgColor }) => {
  return (
    <header className={`flex justify-between items-center p-4 shadow-lg ${bgColor}`}>
      {/* Left: Logo */}
      <img src={images.Logo} alt="Logo" className="h-10 " />

      {/* Center: IT Utsav */}
      <div className="flex items-center justify-center gap-2">
                <img
                  src={images.ITUtsav}
                  alt="IT Utsav Logo"
                  className="h-14 w-14"
                />
                <h1 className="text-2xl font-semibold text-white shadow-lg">IT UTSAV 3.0</h1>
              </div>

      {/* Right: User Menu */}
      <UserMenu />
    </header>
  );
};

export default StudentHeader;