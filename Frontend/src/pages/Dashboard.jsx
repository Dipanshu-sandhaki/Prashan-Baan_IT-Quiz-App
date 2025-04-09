import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Admin from "../components/Admin";
import Footer from "../utils/Footer";
import { getDashboardData } from "../apiCalls/adminApiManager";

const Dashboard = () => {
  const handleLogout = () => {
    window.location.href = "/login";
  };

  const [users,setUsers]= useState(0);
  const [quiz, setQuiz]=useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getDashboardData();
      setQuiz(data.total_quiz);
      setUsers(data.total_users);
    };

    fetchData();
  }, []);

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-start via-middle to-end">
      {/* Header */}
      <Header handleLogout={handleLogout} />

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar (Fixed height, doesn't shrink) */}
        <Sidebar className="h-full flex-shrink-0" />

        {/* Page Content (Expands properly) */}
        <div className="flex-1 p-8 overflow-y-auto">
          <Admin user={users} quiz={quiz} />
        </div>
      </div>

      {/* Footer (Always at bottom) */}
      <Footer className="mt-auto" />
    </div>
  );
};

export default Dashboard;