import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import UUlogo from "../assets/UULogomain.png";

const Header = ({ handleLogout }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const adminName = localStorage.getItem('username')||null;
  const currentTime = new Date().toLocaleTimeString();

  return (
    <div className="text-white flex items-center justify-between px-6 py-4 w-full shadow-xl">
      {/* Logo */}
      <img src={UUlogo} alt="UU Logo" className="w-46 h-12" />

      {/* Title */}
      <h1 className="text-xl font-bold">Admin Dashboard</h1>

      {/* User Profile */}
      <div className="relative">
        <FaUserCircle
          size={28}
          className="cursor-pointer"
          onClick={() => setShowDropdown(!showDropdown)}
        />
        {showDropdown && (
          <div className="absolute right-0 mt-2 w-48 bg-white text-black shadow-lg rounded-lg p-4">
            <p className="font-semibold">{adminName}</p>
            <p className="text-sm text-gray-600">{currentTime}</p>
            <button
              onClick={handleLogout}
              className="mt-2 w-full bg-red-600 text-white py-1 rounded"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;