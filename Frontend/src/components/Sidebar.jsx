import React, { useState } from "react";
import {
  FaBars,
  FaUserShield,
  FaQuestionCircle,
  FaChartBar,
  FaUserGraduate,
} from "react-icons/fa";
import { Link } from "react-router";

const Sidebar = ({ setActiveMenu }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div
      className={`text-white h-screen flex flex-col p-4  ${
        isOpen ? "w-[250px]" : "w-20"
      } transition-all duration-300 shadow-[0px_10px_40px_rgba(0,0,0,0.3)]`}
    >
      <div
        className={` text-white h-screen flex flex-col p-4 ${
          isOpen ? "w-[250px]" : "w-20"
        } transition-all duration-300`}
      >
        {/* Sidebar Toggle Button */}
        <button onClick={toggleSidebar} className="mb-6 focus:outline-none">
          <FaBars size={24} />
        </button>

        {/* Sidebar Menu */}
        <ul className="space-y-4 flex-1">
          <li
            className="flex items-center space-x-2 p-2 hover:bg-blue-700 rounded cursor-pointer"
            onClick={() => setActiveMenu("Admin")}
          >
            <FaUserShield />
            {isOpen && <Link to={"/dashboard"}>Admin</Link>}
          </li>
          <li
            className="flex items-center space-x-2 p-2 hover:bg-blue-700 rounded cursor-pointer"
            onClick={() => setActiveMenu("Quiz")}
          >
            <FaQuestionCircle />
            {isOpen && <Link to={"/quizzes"}>Quiz</Link>}
          </li>
          <li
            className="flex items-center space-x-2 p-2 hover:bg-blue-700 rounded cursor-pointer"
            onClick={() => setActiveMenu("Result")}
          >
            <FaChartBar />
            {isOpen && <Link to={'/result'}>Result</Link>}
          </li>
          <li
            className="flex items-center space-x-2 p-2 hover:bg-blue-700 rounded cursor-pointer"
            onClick={() => setActiveMenu("StudentDetails")}
          >
            <FaUserGraduate />
            {isOpen && <Link to={"/student-details"}>Student Details</Link>}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;