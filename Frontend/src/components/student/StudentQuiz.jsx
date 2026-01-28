import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// -----------------------
// Format countdown
// -----------------------
const formatTime = (seconds) => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${h}h ${m}m ${s}s`;
};

// -----------------------
// Convert date+time → JS Date
// -----------------------
const getDateTimeObject = (quizDate, quizTime) => {
  try {
    const dateObj = new Date(quizDate);
    const [hrs, mins] = quizTime.split(":").map(Number);
    dateObj.setHours(hrs, mins, 0, 0);
    return dateObj;
  } catch {
    return new Date();
  }
};

// -----------------------
// Format full datetime
// -----------------------
const formatDateTime = (dateObj) => {
  return dateObj.toLocaleString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};

export const StudentQuiz = ({
  title,
  description,
  date,
  time,
  quizID,
}) => {
  const navigate = useNavigate();

  // ⭐ Detect Guest Mode
  const isGuest = localStorage.getItem("guestMode") === "true";

  // Guest Mode Logic → Always Fast-Start
  const [status, setStatus] = useState(isGuest ? "Ongoing" : "Upcoming");
  const [timer, setTimer] = useState(isGuest ? null : null);
  const [startNow, setStartNow] = useState(isGuest ? false : true);
  const [testDate, setTestDate] = useState(null);

  // -----------------------
  // For logged-in users only
  // -----------------------
  useEffect(() => {
    if (isGuest) return; // Guest skip everything

    const quizDateObj = getDateTimeObject(date, time);
    setTestDate(quizDateObj);
  }, [date, time, isGuest]);

  useEffect(() => {
    if (isGuest || !testDate) return;

    const checkState = () => {
      const now = new Date();

      if (now < testDate) {
        const diff = Math.floor((testDate - now) / 1000);
        setTimer(diff);
        setStatus("Upcoming");
        setStartNow(true);
      } else {
        setStatus("Ongoing");
        setTimer(null);
        setStartNow(false);
      }
    };

    checkState();
    const interval = setInterval(checkState, 1000);

    return () => clearInterval(interval);
  }, [testDate, isGuest]);

  useEffect(() => {
    if (isGuest) return;

    if (timer !== null && timer > 0) {
      const interval = setInterval(() => {
        setTimer(prev => (prev > 1 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer, isGuest]);

  return (
    <div className="p-6 text-white bg-opacity-30 shadow-lg rounded-lg w-[400px] text-center border border-gray-300 hover:shadow-xl transition-transform hover:scale-105 duration-300">
      
      <h2 className="text-2xl font-bold mb-2">{title}</h2>

      <p className="mb-4 text-gray-200">
        {description || "No description available."}
      </p>

      {/* Status */}
      <p className="text-white font-medium">
        Status:{" "}
        <span
          className={`font-semibold ${
            status === "Upcoming"
              ? "text-green-400"
              : status === "Ongoing"
              ? "text-orange-400"
              : "text-red-500"
          }`}
        >
          {isGuest ? "Guest Instant Access" : status}
        </span>
      </p>

      {/* Event Date */}
      {!isGuest && (
        <p className="text-gray-100">
          Event: {testDate ? formatDateTime(testDate) : "N/A"}
        </p>
      )}

      {/* Countdown (Not for guest) */}
      {!isGuest && status === "Upcoming" && timer !== null && (
        <p className="text-blue-400 font-semibold mt-2">
          Starts in: {formatTime(timer)}
        </p>
      )}

      {/* Start Quiz Button */}
      <button
        onClick={() => navigate(`/instructions/${quizID}`)}
        disabled={!isGuest && startNow}
        className={`mt-4 px-5 py-2 text-white font-semibold rounded-lg shadow-md transition-all duration-300 ${
          isGuest
            ? "bg-green-600 hover:bg-green-700"
            : startNow
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-600 hover:bg-green-700"
        }`}
      >
        {isGuest ? "Start Instantly (Guest)" : "Start Quiz"}
      </button>
    </div>
  );
};
