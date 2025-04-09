import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import Footer from "../../utils/Footer";
import LoadingMenu from "../../components/loader";
import StudentDetails from "../../components/StudentDetails";

const ShowStudentDetails = () => {
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    window.location.href = "/login";
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-start via-middle to-end">

      {loading && <LoadingMenu />}

      {/* Header */}
      <Header handleLogout={handleLogout} />

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar (Fixed height, doesn't shrink) */}
        <Sidebar
          // setActiveMenu={setActiveMenu}
          className="h-full flex-shrink-0"
        />

        {/* Page Content (Expands properly) */}
        <div className="flex-1 p-8 overflow-y-auto">
          <StudentDetails />
        </div>
      </div>

      {/* Footer (Always at bottom) */}
      <Footer className="mt-auto" />
    </div>
  );
};

export default ShowStudentDetails;
