import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import Footer from "../../utils/Footer";
import LoadingMenu from "../../components/loader";
import Result from "./Result";
import { motion } from "framer-motion";
import { generateResult, getAllQuizzes } from "../../apiCalls/adminApiManager"; // Assume getQuizList is added
import showAlert from "../alertMessage/Alert";

const ShowResult = () => {
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [quizId, setQuizId] = useState("");
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const data = await getAllQuizzes(); // API call to fetch quiz list
        
        if (data) {
          setQuizzes(data || []);
        } else {
          showAlert({ title: "Error", message: "Unable to fetch quizzes", icon: "error" });
        }
      } catch (error) {
        showAlert({ title: "Error", message: "Failed to load quiz list", icon: "error" });
      }
    };

    fetchQuizzes();
  }, []);

  const handleLogout = () => {
    window.location.href = "/login";
  };

  const handleClick = async () => {
    if (!quizId) return;

    setLoading(true);
    setGenerated(false);

    const result = await generateResult(quizId);

    if (result.status === 202) {
      setTimeout(() => {
        setLoading(false);
        setGenerated(true);
      }, 3000);
    } else {
      setLoading(false);
      showAlert("Error", result.message, "error");
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-start via-middle to-end">
      {loading && <LoadingMenu />}

      <Header handleLogout={handleLogout} />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar className="h-full flex-shrink-0" />

        <div className="flex-1 p-8 overflow-y-auto">
          {!generated ? (
            <div className="space-y-6">
              {/* Quiz Dropdown */}
              <div>
                <label className="block mb-2 text-lg font-medium text-white">
                  Select a Quiz
                </label>
                <select
                  value={quizId}
                  onChange={(e) => setQuizId(e.target.value)}
                  className="w-full p-3 rounded-lg shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">-- Choose a Quiz --</option>
                  {quizzes.map((quiz) => (
                    <option key={quiz._id} value={quiz._id}>
                      {quiz.quiz_name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Generate Button */}
              <div className="flex justify-start">
                <button
                  onClick={handleClick}
                  className={`relative flex items-center justify-center px-6 py-3 font-semibold text-white rounded-lg shadow-md transition-all ${quizId
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-gray-400 cursor-not-allowed"
                    }`}
                  disabled={!quizId || loading}
                >
                  {loading ? (
                    <>
                      <motion.div
                        className="absolute w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                      <span className="ml-6">Processing...</span>
                    </>
                  ) : (
                    "Generate Result"
                  )}
                </button>
              </div>
            </div>
          ) : (
            <Result />
          )}
        </div>
      </div>

      <Footer className="mt-auto" />
    </div>
  );
};

export default ShowResult;
