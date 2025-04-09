import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import images from "../assets/images.jsx";
import Header from "../utils/Header.jsx";
import Footer from "../utils/Footer.jsx";
import { FaCheckCircle } from "react-icons/fa";

const Completion = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    const redirect = setTimeout(() => {
      navigate("/about");
    }, 10000);

    return () => {
      clearInterval(timer);
      clearTimeout(redirect);
    };
  }, [navigate]);

  const bgImage = {
    width: "100%",
    height: "18rem",
    backgroundImage: `url(${images.Itquiz})`,
    backgroundSize: "contain",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-start via-middle to-end text-white relative overflow-hidden items-center px-0 bg-cover bg-no-repeat w-screen bg-center h-screen">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 flex flex-col justify-center items-center text-center gap-8 w-full max-w-5xl px-4 relative">
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-lg text-center max-w-md flex flex-col items-center gap-4">
          <FaCheckCircle className="text-green-500 text-6xl" />
          <h2 className="text-white text-2xl font-bold mt-4">
            Your Test Submitted Successfully
          </h2>
          <p className="text-gray-300 mt-2">
            Thank you for participating in <br />
            <span className="font-semibold">Prashan Baan - IT Utsav 3.0</span>
          </p>

          {/* Timer and Link */}
          <p className="text-sm text-gray-400 mt-4">
            <Link
              to="/about"
              className="text-white underline hover:text-blue-300 transition"
            >
              Know about developer
            </Link>{" "}
            in <span className="text-white font-semibold">{countdown}</span> seconds...
          </p>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Completion;
