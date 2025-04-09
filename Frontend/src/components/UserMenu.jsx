import React, { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { fetchUserData } from "../utils/api"

const UserMenu = () => {
  const [name, setName] = useState();
  const [showUserInfo, setShowUserInfo] = useState(false);

  useEffect(() => {
    const getUserData = async () => {
      const userName = await fetchUserData();
      setName(userName.username);
    };
    getUserData();
  }, []);

  const toggleUserInfo = () => {
    setShowUserInfo((prev) => !prev);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleUserInfo}
        className="flex items-center gap-2 px-2 py-2 bg-button1 text-white font-bold rounded-2xl shadow-md hover:bg-blue-800"
      >
        <FaUserCircle className="text-lg" />
      </button>

      {showUserInfo && (
        <div className="absolute right-0 mt-2 w-56 bg-white text-black rounded-lg shadow-xl p-4">
          <p className="font-semibold">👤 {name}</p>
          <p className="text-gray-600">🕒 {new Date().toLocaleTimeString()}</p>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
