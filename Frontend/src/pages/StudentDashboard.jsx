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

  const examStatus = localStorage.getItem("isExamSubmitted");

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getAllQuizes();
        if (Array.isArray(data)) {
          setQuizzes(data);
        } else {
          console.error("Invalid data format:", data);
          setQuizzes([]); // Ensure quizzes is always an array
        }
      } catch (error) {
        console.error("Error fetching quizzes:", error);
        setQuizzes([]); // Prevents crashing if API fails
      }
    };

    if (examStatus === "No") {
      getData();
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-start via-middle to-end relative overflow-hidden px-0 bg-cover bg-no-repeat w-screen bg-center h-screen">
      {/* Header */}
      <StudentHeader />

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <StudentSidebar setActiveMenu={setActiveMenu} className="h-full flex-shrink-0" />

        {/* Page Content */}
        <div className="flex-1 p-8 overflow-y-auto">
          {activeMenu === "Instruction" && <StudentInstruction />}
          {activeMenu === "Quiz" && (
            <div className="flex flex-wrap gap-5">
              {quizzes.length > 0 ? (
                quizzes.map((q) => (
                  <StudentQuiz
                    key={q._id} // Use _id as key (best practice)
                    title={q.quiz_name}
                    description={q.description}
                    date={q.quiz_date}
                    time={q.quiz_time}
                    quizID={q._id}
                  />
                ))
              ) : (
                <p className="text-center text-gray-500 w-full">No quizzes available</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <Footer className="mt-auto" />
    </div>
  );
};

export default StudentDashboard;
