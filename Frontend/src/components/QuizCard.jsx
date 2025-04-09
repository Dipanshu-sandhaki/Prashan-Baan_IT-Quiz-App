import React from "react";

const formatTime = (seconds) => {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${hrs}h ${mins}m ${secs}s`;
};

const QuizCard = ({ quiz, status, color, testDate, timer }) => {
  const isActive = status === "Ongoing"; // Button active during quiz time

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-[720px] h-[400px] flex flex-col justify-center items-center text-center border border-gray-200 hover:shadow-xl transition duration-300">
      <h3 className="text-xl font-semibold text-gray-800">{quiz.title}</h3>
      <p className="text-gray-600 mt-2">{quiz.description}</p>
      <p className="text-gray-700 font-medium mt-2">
        Status: <span className="font-semibold">{status}</span>
      </p>
      <p className="text-gray-700 font-medium">Test Date: {testDate}</p>

      {timer !== null && (
        <p className="text-lg text-blue-600 font-bold mt-2">
          {status === "Starting Soon" ? `Starts in: ${formatTime(timer)}` : `Time left to start: ${formatTime(timer)}`}
        </p>
      )}

      <button
        className={`mt-4 px-6 py-2 text-white font-bold rounded-lg transition ${
          isActive
            ? "bg-green-600 hover:bg-green-700 cursor-pointer"
            : "bg-gray-400 cursor-not-allowed"
        }`}
        disabled={!isActive}
      >
        {status === "Expired" ? "View Results" : "Start Quiz"}
      </button>
    </div>
  );
};

export default QuizCard;
