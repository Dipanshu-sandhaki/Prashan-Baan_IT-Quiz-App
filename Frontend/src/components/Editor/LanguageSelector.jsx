import { LANGUAGE_VERSIONS } from "../../utils/constants";
import { useState, useEffect } from "react";
import { FaRegClock } from "react-icons/fa"; 

const languages = Object.entries(LANGUAGE_VERSIONS);
const ACTIVE_COLOR = "text-blue-400";

const LanguageSelector = ({ language, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20 * 60); // 20 minutes in seconds

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 10;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="flex items-center justify-between m-auto py-2 rounded-md w-full">
      {/* Language Selector on the Left */}
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="px-4 py-2 bg-gray-700 text-white rounded-md"
        >
          {language}
        </button>
        {isOpen && (
          <ul className="absolute mt-2 w-48 bg-gray-900 border border-gray-700 rounded-md shadow-lg z-10">
            {languages.map(([lang, version]) => (
              <li
                key={lang}
                className={`px-4 py-2 cursor-pointer hover:bg-gray-800 ${
                  lang === language ? "bg-gray-900 text-blue-400" : "text-white"
                }`}
                onClick={() => {
                  onSelect(lang);
                  setIsOpen(false);
                }}
              >
                {lang} <span className="text-gray-600 text-sm">({version})</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Timer on the Right */}
      <div className="flex items-center text-blue-600 font-semibold text-lg gap-2">
        <FaRegClock className="text-xl" /> {/* Timer icon */}
        {formatTime(timeLeft)}
      </div>
    </div>
  );
};

export default LanguageSelector;
