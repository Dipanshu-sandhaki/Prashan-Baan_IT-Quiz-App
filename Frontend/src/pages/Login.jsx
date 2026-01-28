import React from "react";
import LoginForm from "../components/LoginForm";
import Header from "../utils/Header";
import Footer from "../utils/Footer";
import images from "../assets/images";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  // ⭐ GUEST MODE FUNCTION
  const handleGuestMode = () => {
    localStorage.setItem("guest", "true");
    localStorage.setItem("userId", "guest-local-id");
    localStorage.setItem("username", "Guest User");
    navigate("/studentDashboard");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-start via-middle to-end text-white relative overflow-hidden items-center px-0 bg-cover bg-no-repeat w-screen bg-center h-screen">
      {/* Background Effects */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-green-400 opacity-20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-600 opacity-20 rounded-full blur-3xl animate-bounce"></div>

      <Header />

      {/* Main Content */}
      <div className="flex-grow flex flex-row w-full max-w-6xl gap-10 mx-auto items-center justify-between px-6">
        {/* Left Image */}
        <div className="md:block w-1/2 flex justify-center">
          <img
            src={images.login}
            alt="Login Illustration"
            className="w-[500px] h-auto"
          />
        </div>

        {/* Right: Login Section */}
        <div className="w-full md:w-1/2 flex items-center justify-center">
          <div className="h-[500px] w-[450px] p-8 rounded-2xl shadow-lg text-white m-8 backdrop-blur-md bg-gray-900/60 border border-white/20">
            <h2 className="text-5xl font-bold mb-4 mt-14">Login Now</h2>
            <p className="text-gray-300 mb-6 text-lg">
              Enter your account details
            </p>

            {/* Normal Login Form */}
            <LoginForm />

            {/* ⭐ Guest Mode Button */}
            <button
              onClick={handleGuestMode}
              className="w-full mt-6 py-3 rounded-xl bg-yellow-500 text-black font-semibold hover:bg-yellow-400 transition-all duration-200"
            >
              Continue as Guest 👤
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Login;
