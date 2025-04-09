import React, {useState, useEffect} from 'react'

function ExamTimer({ duration = 0, setTimer }) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (timeLeft > 0) {
      const interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
        setProgress((prev) => prev + (100 / duration)); // Update progress
        setTimer((prev) => prev - 1); // Update timer in parent component
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [timeLeft, duration]);

  // Convert timeLeft to mm:ss format
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const circleRadius = 45;
  const circleCircumference = 2 * Math.PI * circleRadius;

  return (
    <div className="flex flex-col items-center justify-center">
      <svg width="100" height="100" viewBox="0 0 100 100">
        {/* Background Circle */}
        <circle
          cx="50"
          cy="50"
          r={circleRadius}
          stroke="gray"
          strokeWidth="6"
          fill="none"
          opacity="0.6"
        />
        {/* Progress Circle */}
        <circle
          cx="50"
          cy="50"
          r={circleRadius}
          stroke="#32CD32"
          strokeWidth="6"
          fill="none"
          strokeDasharray={circleCircumference}
          strokeDashoffset={
            circleCircumference - (progress / 100) * circleCircumference
          }
          strokeLinecap="round"
          transform="rotate(-90 50 50)"
          className="transition-all duration-1000 ease-linear"
        />
        {/* Timer Text */}
        <text x="50" y="60" textAnchor="middle" fontSize="25" fill="white">
          {formatTime(timeLeft)}
        </text>
      </svg>
    </div>
  );
};



export default ExamTimer