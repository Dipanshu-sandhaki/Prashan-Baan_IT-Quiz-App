import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const PasswordInput = ({ password, setPassword }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative mb-6">
      <input
        className="form-control bg-transparent border-b-2 border-gray-400 rounded w-full p-2 pr-10 text-white placeholder:text-gray-300 focus:outline-none focus:border-blue-500"
        placeholder="Password"
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <span
        className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-600 opacity-70"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
      </span>
    </div>
  );
};

export default PasswordInput;