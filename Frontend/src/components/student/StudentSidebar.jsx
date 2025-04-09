import React, { useState, useEffect, useRef } from "react";
import {
  FaBars,
  FaQuestionCircle,
  FaBook,
  FaUser,
} from "react-icons/fa";
import { fetchUserData } from "../../utils/api";

const StudentSidebar = ({ setActiveMenu }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [showStudentDetails, setShowStudentDetails] = useState(false);
  const [student, setStudent] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const sidebarRef = useRef(null); // Reference for sidebar

  const toggleSidebar = () => {
    setIsOpen((prev) => {
      if (prev) setShowStudentDetails(false); // Close student details when sidebar closes
      return !prev;
    });
  };

  const toggleStudentDetails = () => {
    if (!isOpen) setIsOpen(true); // Open sidebar if it's closed
    setShowStudentDetails((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpen(false); // Close sidebar when clicking outside
        setShowStudentDetails(false); // Also close student details
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const getStudentDetails = async () => {
      try {
        const data = await fetchUserData();
        setStudent({ name: data.name, erpId: data.username });
      } catch (err) {
        setError("Failed to fetch student details");
      } finally {
        setLoading(false);
      }
    };

    getStudentDetails();
  }, []);

  return (
    <div
      ref={sidebarRef}
      className={`bg-[url('/path/to/marble-texture.png')] bg-cover bg-center bg-no-repeat bg-opacity-70 text-white h-screen flex flex-col p-4 ${
        isOpen ? "w-[250px]" : "w-20"
      } transition-all duration-300`}
      style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
    >
      {/* Sidebar Toggle Button */}
      <button onClick={toggleSidebar} className="mb-6 focus:outline-none">
        <FaBars size={24} />
      </button>

      {/* Sidebar Menu */}
      <ul className="space-y-4 flex-1">
        <li className="flex flex-col">
          <div
            className="flex items-center space-x-2 p-2 hover:bg-blue-700 rounded cursor-pointer"
            onClick={toggleStudentDetails}
          >
            <FaUser />
            {isOpen && <span>Student Details</span>}
          </div>
          {/* Dropdown for Student Details */}
          {showStudentDetails && (
            <ul className="ml-6 mt-2 space-y-2 text-sm">
              {loading ? (
                <li>Loading...</li>
              ) : error ? (
                <li className="text-red-400">{error}</li>
              ) : (
                <>
                  <li>Name: {student.name}</li>
                  <li>Username: {student.erpId}</li>
                </>
              )}
            </ul>
          )}
        </li>

        <li
          className="flex items-center space-x-2 p-2 hover:bg-blue-700 rounded cursor-pointer"
          onClick={() => setActiveMenu("Quiz")}
        >
          <FaQuestionCircle />
          {isOpen && <span>Quiz</span>}
        </li>

        <li
          className="flex items-center space-x-2 p-2 hover:bg-blue-700 rounded cursor-pointer"
          onClick={() => setActiveMenu("Instruction")}
        >
          <FaBook />
          {isOpen && <span>Instruction</span>}
        </li>
      </ul>
    </div>
  );
};

export default StudentSidebar;
