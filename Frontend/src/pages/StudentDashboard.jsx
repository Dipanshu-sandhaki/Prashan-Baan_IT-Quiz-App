import React, { useEffect, useState } from "react";
import Footer from "../utils/Footer";
import StudentHeader from "../components/student/StudentHeader";
import StudentSidebar from "../components/student/StudentSidebar";
import { StudentInstruction } from "../components/student/StudentInstruction";
import { StudentQuiz } from "../components/student/StudentQuiz";
import { getAllQuizes } from "../apiCalls/examApiManager";

const StudentDashboard = () => {
  const [activeMenu, setActiveMenu] = useState("Quiz");
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load quiz list
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const data = await getAllQuizes();
        setQuizzes(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Unable to load quizzes:", err);
        setQuizzes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-start via-middle to-end w-screen">
      <StudentHeader />

      <div className="flex flex-1 overflow-hidden">
        <StudentSidebar setActiveMenu={setActiveMenu} />

        <div className="flex-1 p-8 overflow-y-auto">
          {activeMenu === "Instruction" && <StudentInstruction />}

          {activeMenu === "Quiz" && (
            <>
              {loading ? (
                <p className="text-center text-gray-300">Loading quizzes...</p>
              ) : (
                <div className="flex flex-wrap gap-5">
                  {quizzes.length > 0 ? (
                    quizzes.map((q) => (
                      <StudentQuiz
                        key={q._id}
                        title={q.quiz_name}
                        description={q.description}
                        date={q.quiz_date}
                        time={q.quiz_time}
                        quizID={q._id}
                      />
                    ))
                  ) : (
                    <p className="text-center text-gray-300 w-full">
                      No quizzes available
                    </p>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default StudentDashboard;
