import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const formatTime = (seconds) => {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${hrs}h ${mins}m ${secs}s`;
};

export const StudentQuiz = ({
  isDisable = false,
  title,
  description,
  date,
  time,
  quizstatus,
  quizID
}) => {
  const [quiz, setQuiz] = useState({});
  const [status, setStatus] = useState(quizstatus);
  const [testDate, setTestDate] = useState("N/A");
  const [timer, setTimer] = useState(null);
  const [startNow, setStartNow] = useState(isDisable);
  const navigate = useNavigate();

  const formatDateTime = (quizDate, quizTime) => {
    // Extract timestamp from quiz_date if it's an object
    let dateObj;
    if (quizDate?.$timestamp) {
      dateObj = new Date(parseInt(quizDate.$timestamp) * 1000); // Convert timestamp to milliseconds
    } else {
      dateObj = new Date(quizDate); // If it's already a date string, use it directly
    }

    // Extract hours and minutes from quiz_time
    const [hours, minutes] = quizTime.split(":").map(Number);

    // Set the extracted time to the date object
    dateObj.setHours(hours, minutes, 0); // 0 seconds

    // Format the date and time as "DD-MM-YYYY HH:mm:ss"
    return dateObj.toLocaleString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  };

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const data = {
          title: title,
          description: description,
          testDate: formatDateTime(date, time), // 3 PM IST converted to UTC
        };

        setQuiz({ title: title, description: description });
        setTestDate(data.testDate);
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      }
    };

    fetchQuizData();
  }, []);

  useEffect(() => {
    const func = () => {
      const quizStarted = new Date(testDate);
      const currentTime = new Date();
      setStartNow(currentTime < quizStarted);
      if (currentTime <= quizStarted && quizstatus !== "Expried" && quizstatus !=='Upcomming' && quizstatus!==null) {
        setStatus("Ongoing");
      }
    };

    func();

    const interval = setInterval(func, 1000);
    return () => clearInterval(interval);
  }, [testDate, quizstatus]);

  // Timer countdown effect
  useEffect(() => {
    if (timer !== null && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setStatus("Ongoing");
            setStartNow(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [timer]);

  return (
    <div className="p-6 text-white bg-opacity-30 shadow-lg rounded-lg w-[400px] text-center border border-gray-200 hover:shadow-xl transition-transform transform hover:scale-105 duration-300">
      <h2 className="text-2xl font-bold text-blue-100 mb-4">
        {quiz?.title || "Untitled Quiz"}
      </h2>
      <p className="mb-4 text-white">
        {quiz?.description || "No description available."}
      </p>
      <p className="text-white font-medium">
        Status:{" "}
        <span
          className={`font-semibold ${
            status === "Expired"
              ? "text-red-600"
              : status === "Ongoing"
              ? "text-orange-600"
              : "text-green-600"
          }`}
        >
          {status}
        </span>
      </p>
      <p className="text-white font-medium">
        Event Date: {new Date(testDate).toLocaleString()}
      </p>

      {timer !== null && status === "Starting Soon" && (
        <p className="text-lg text-blue-600 font-semibold mt-2">
          Starts in: {formatTime(timer)}
        </p>
      )}

      <button
        onClick={() => navigate(`/instructions/${quizID}`)}
        className={`mt-4 px-5 py-2 text-white font-semibold rounded-lg shadow-md transition-all duration-300 ${
          startNow
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-600 hover:bg-green-700"
        }`}
        disabled={startNow}
      >
        {status === "Expired" ? "View Results" : "Start Quiz"}
      </button>
    </div>
  );
};
