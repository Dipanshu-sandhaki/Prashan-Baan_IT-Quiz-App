import React, { useState, useEffect } from "react";
import QuizCard from "../components/QuizCard";

const quizData = [
  {
    title: "Prashaan Baan",
    description: "A test of knowledge.",
    testTime: new Date("2025-03-16T16:00:00").toISOString(), 
  },
];

const getStatus = (testTime) => {
  const testDate = new Date(testTime);
  const currentDateTime = new Date();
  const timeDiff = testDate - currentDateTime;
  const expirationTime = testDate.getTime() + 10 * 60 * 1000; 
  const isExpired = currentDateTime.getTime() > expirationTime;

  if (isExpired) {
    return { status: "Expired", color: "bg-red-600", timeLeft: null };
  } else if (timeDiff <= 0) {
    return {
      status: "Ongoing",
      color: "bg-green-600",
      timeLeft: Math.floor((expirationTime - currentDateTime.getTime()) / 1000),
    };
  } else if (timeDiff <= 12 * 60 * 60 * 1000) {
    return {
      status: "Starting Soon",
      color: "bg-yellow-500",
      timeLeft: Math.floor(timeDiff / 1000),
    };
  } else {
    return {
      status: "Upcoming",
      color: "bg-blue-500",
      timeLeft: null,
    };
  }
};

const QuizList = () => {
  const [timer, setTimer] = useState(null);
  const [statusInfo, setStatusInfo] = useState(getStatus(quizData[0].testTime));

  useEffect(() => {
    if (statusInfo.timeLeft !== null) {
      setTimer(statusInfo.timeLeft);

      const interval = setInterval(() => {
        setStatusInfo(getStatus(quizData[0].testTime));
        setTimer((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);

      return () => clearInterval(interval);
    }
  }, []);

  return (
    <div className="grid grid-cols-1 gap-6 mt-10 px-4">
      {quizData.map((quiz, index) => (
        <QuizCard
          key={index}
          quiz={quiz}
          status={statusInfo.status}
          color={statusInfo.color}
          testDate={new Date(quiz.testTime).toLocaleString()} 
          timer={timer}
        />
      ))}
    </div>
  );
};

export default QuizList;