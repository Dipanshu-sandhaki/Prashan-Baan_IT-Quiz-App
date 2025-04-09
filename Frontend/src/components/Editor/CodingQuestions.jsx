import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CodingQuestions = ({ setCurrentProblem, codingQuestions, index }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [submittedQuestions, setSubmittedQuestions] = useState(new Set());

  const navigate = useNavigate();

  const handleQuestionChange = (index) => {
    setCurrentIndex(index);
    setCurrentProblem(index);
  };

  useEffect(() => {
    setCurrentIndex(index);
  }, [index]);

  return (
    <div className="p-4 border border-gray-700 rounded-lg bg-gray-900 text-white h-full flex flex-col">
      {/* Header with Question Title and Number Buttons */}
      <div className="flex justify-between items-center sticky top-0 z-10 bg-gray-900 pb-4">
        <h2 className="text-lg font-semibold">Question {currentIndex + 1}</h2>
        <div className="flex gap-2 bg-white/10 backdrop-blur-md p-2 rounded-lg shadow-md">
          {Object.values(codingQuestions).map((_, index) => (
            <button
              key={index}
              className={`px-3 py-2 border rounded-md transition shadow-md ${
                index === currentIndex
                  ? "bg-blue-500 text-white"
                  : submittedQuestions.has(index)
                  ? "bg-green-500 text-white"
                  : "bg-gray-700 text-gray-300"
              } backdrop-blur-lg bg-white/20 border-white/30`}
              onClick={() => handleQuestionChange(index)}
            >
              Coding {index + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Scrollable Question Content */}
      <div className="overflow-y-auto flex-grow [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-800 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-600 hover:[&::-webkit-scrollbar-thumb]:bg-gray-500 pr-2">
        <p className="mt-2 text-gray-300">
          {codingQuestions[currentIndex].title}
        </p>

        {/* Description */}
        <div className="mt-4 p-2 border border-gray-600 rounded-md bg-gray-800">
          <p className="text-sm text-gray-400 whitespace-pre-wrap break-words">
            {codingQuestions[currentIndex].description}
          </p>
        </div>

        {/* Test Cases */}
        <div className="mt-4 p-2 border border-gray-600 rounded-md bg-gray-800 mb-4">
          <h3 className="text-sm font-semibold text-gray-300">Test Cases:</h3>
          <div className="mt-2 space-y-2">
            {Object.values(codingQuestions[currentIndex].testCases).map(
              (testCase, i) => (
                <div
                  key={i}
                  className="text-sm text-gray-400 p-2 bg-gray-700 rounded"
                >
                  <p>
                    <strong>Input:</strong> {JSON.stringify(testCase.input)}
                  </p>
                  <p>
                    <strong>Output:</strong> {JSON.stringify(testCase.expected)}
                  </p>
                  <p>
                    <em>{testCase.explanation}</em>
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </div>

      {/* Fixed Navigation Buttons */}
      <div className="sticky bottom-0 bg-gray-900 pt-4">
        <div className="flex justify-between">
          <button
            className="px-4 py-2 border rounded-md hover:bg-blue-500 hover:text-white transition disabled:opacity-50"
            onClick={() => handleQuestionChange(currentIndex - 1)}
            disabled={currentIndex === 0}
          >
            Previous Question
          </button>

          <button
            className="px-4 py-2 border border-green-500 text-green-500 rounded-md hover:bg-green-500 hover:text-white transition disabled:opacity-50"
            onClick={() => handleQuestionChange(currentIndex + 1)}
            disabled={currentIndex === codingQuestions.length - 1}
          >
            Next Question
          </button>
        </div>
      </div>
    </div>
  );
};

export default CodingQuestions;
