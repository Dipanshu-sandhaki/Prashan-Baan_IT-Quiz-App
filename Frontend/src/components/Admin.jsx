import React, { useEffect } from "react";
import {
  FaUserGraduate,
  FaClipboardList,
  FaCheckCircle,
  FaBookOpen,
  FaPlusCircle,
  FaChartBar,
} from "react-icons/fa";
import { Link, Navigate, useNavigate } from "react-router";

const Admin = ({ setActiveMenu, user, quiz }) => {
  // Admin Panel Options
  const stats = [
    {
      title: "Total Students",
      value: user,
      icon: <FaUserGraduate className="text-blue-600 text-3xl" />,
      section: "StudentDetails",
      link: "/student-details",
    },
    {
      title: "Active Quizzes",
      value: quiz,
      icon: <FaClipboardList className="text-green-600 text-3xl" />,
      section: "Quiz",
      link: "/student-details",
    },
    {
      title: "Ended Quizzes",
      value: 0,
      icon: <FaCheckCircle className="text-red-600 text-3xl" />,
      section: "Quiz",
      link: "/quizzes",
    },
    {
      title: "Student Details",
      value: "View",
      icon: <FaBookOpen className="text-purple-600 text-3xl" />,
      section: "StudentDetails",
      link: "/student-details",
    },
    {
      title: "Add Quiz",
      value: "+",
      icon: <FaPlusCircle className="text-yellow-600 text-3xl" />,
      section: "Quiz",
      link: "/quizzes",
    },
    {
      title: "Results",
      value: "Check",
      icon: <FaChartBar className="text-indigo-600 text-3xl" />,
      section: "Result",
      link: "/result",
    },
  ];

  const navigate = useNavigate();

  const moveTo = (link) => {
    // navigate(`/${link}`, { relative: "path" });
    navigate(`${link}`);

  };

  return (
    <div className="p-6">
      {" "}
      {/* Fixed height & scrollable */}
      <h1 className="text-2xl text-gray-100 font-bold mb-6">Admin Panel</h1>
      {/* Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-gray-100 hover:text-black">
        {stats.map((stat, index) => (
          <div
            key={index}
            onClick={() => moveTo(stat.link)} // Update active section
            className="p-6 border border-gray-100 hover:bg-secondary rounded-lg shadow-md flex items-center space-x-4 cursor-pointer transition text-white hover:text-black"
          >
            {stat.icon}
            <div className="text-gray-100">
              <h2 className="text-lg font-semibold text-gray ">{stat.title}</h2>
              <p className="text-gray-100 text-xl font-bold ">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
