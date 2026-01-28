import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import images from "../assets/images.jsx";
import Header from "../utils/Header.jsx";
import Footer from "../utils/Footer.jsx";
import { FaCheckCircle } from "react-icons/fa";

const Completion = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);

  const isGuest = localStorage.getItem("guestUser") === "true";
  const storedAnswers = JSON.parse(localStorage.getItem("guestAnswers")) || [];

  const [guestScore, setGuestScore] = useState(0);
  const [guestTotal, setGuestTotal] = useState(0);

  // ---------------------------
  // 🟢 CALCULATE GUEST RESULT
  // ---------------------------
  useEffect(() => {
    if (isGuest && storedAnswers.length > 0) {
      let score = 0;

      storedAnswers.forEach((ans) => {
        if (ans.answer_status === "right") score++;
      });

      setGuestScore(score);
      setGuestTotal(storedAnswers.length);
    }
  }, [isGuest, storedAnswers]);

  // ---------------------------
  // 🔵 REDIRECT ONLY FOR LOGGED-IN USERS
  // ---------------------------
  useEffect(() => {
    if (isGuest) return; // guest ko redirect mat karo

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
  }, [navigate, isGuest]);

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

          {/* =======================
              🟣 Guest Result Block
          ======================== */}
          {isGuest && (
            <>
              <p className="text-gray-300 mt-2">
                Thank you for testing the full quiz as a guest user!
              </p>

              <div className="mt-4 bg-white/20 px-4 py-3 rounded-lg">
                <p className="text-white text-lg font-semibold">
                  Score: {guestScore} / {guestTotal}
                </p>
                <p className="text-gray-300 text-sm mt-1">
                  *This result is not saved in database — Guest Mode Preview*
                </p>
              </div>

              <Link
                to="/about"
                className="mt-6 text-yellow-300 underline hover:text-white transition"
              >
                Know about the developer
              </Link>
            </>
          )}

          {/* =========================
              🔵 Logged-in User Block
          ========================== */}
          {!isGuest && (
            <>
              <p className="text-gray-300 mt-2">
                Thank you for participating in <br />
                <span className="font-semibold">Prashan Baan - IT Utsav 3.0</span>
              </p>

              <p className="text-sm text-gray-400 mt-4">
                <Link
                  to="/about"
                  className="text-white underline hover:text-blue-300 transition"
                >
                  Know about developer
                </Link>{" "}
                in <span className="text-white font-semibold">{countdown}</span>{" "}
                seconds...
              </p>
            </>
          )}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Completion;
