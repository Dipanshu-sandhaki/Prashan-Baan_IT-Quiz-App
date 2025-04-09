import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";
import Footer from "../../../utils/Footer";
import Card from "../../../components/AddQuiz/Card";
import CardContent from "../../../components/AddQuiz/CardContent";
import showAlert from "../../../components/alertMessage/Alert";
import { deleteQuizById, getAllQuizzes, getQuizById } from "../../../apiCalls/adminApiManager";
import LoadingMenu from "../../../components/loader";
import { Link } from "react-router";
import CreateQuiz from "./components/createQuizForm";

const AllQuizzes = () => {
  const [loading, setLoading] = useState(false);

  const [quizzes, setQuizzes] = useState([]);
  const [createQuiz, setCreateQuiz] = useState(false);
  const [quizToEdit, setQuizToEdit] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quizId, setQuizId] = useState(null);

  const [activeMenu, setActiveMenu]=useState("Admin");

  const handleLogout = () => {
    window.location.href = "/login";
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getAllQuizzes();
      setQuizzes(data);
      setLoading(false);

      console.log(data);
    } catch (error) {
      setLoading(false);
      showAlert({ title: "Error", text: error, icon: "error" });
    }
  };

  useEffect(() => {
    fetchData();
  }, [quizId]);

  const showCreateQuiz = () => {
    setCreateQuiz(true);
  };

  const handleView= (quizId)=>{
    setIsModalOpen(true); 
    setQuizId(quizId); 
  }

  const closeModal = () => {
    setIsModalOpen(false);
  };


   const handleCloseCreateQuiz = () => {
    setCreateQuiz(false);  // Close the CreateQuiz dialog
  };

  const handleNewQuiz = (newQuiz) => {
    fetchData();
    handleCloseCreateQuiz();
  }

  const editQuiz = async (id) => {
    const data = await getQuizById(id);

    if (data.length !== 0) {
      setQuizToEdit(data.data); // Set the quiz data to be edited
      setCreateQuiz(true);  // Open the CreateQuiz dialog for editing
    }
  }

  const deleteQuiz = async (id) => {
    setLoading(true);
    try {
      const data = await deleteQuizById(id);
      setLoading(false);
      showAlert({ title: "Success", text: "Quiz Deleted Successfully", icon: "success" });
      fetchData();
    } catch (error) {
      setLoading(false);
      showAlert({ title: "Error", text: error, icon: "error" });
    }
  }

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-start via-middle to-end">
      {loading && <LoadingMenu />}

      {/* Header */}
      <Header handleLogout={handleLogout} />

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar (Fixed height, doesn't shrink) */}
        <Sidebar
          setActiveMenu={setActiveMenu}
          className="h-full flex-shrink-0"
        />
        {createQuiz && <CreateQuiz show={true} onClose={handleCloseCreateQuiz} onQuizCreated={handleNewQuiz} quizToEdit={quizToEdit} />}

        {/* {createQuiz ? <CreateQuiz show={true} /> : ""} */}
        {/* Page Content (Expands properly) */}
        <div className="flex-1 p-8 overflow-y-auto">
          <div>
            <button
              className="btn bg-green-500 text-white rounded-md p-2"
              onClick={showCreateQuiz}
            >
              Create Quiz
            </button>
            <div className="mt-6 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {quizzes && quizzes.length > 0 ? (
                quizzes.map((quiz, index) => (
                  <div key={index} className="max-w-sm w-full mx-auto">
                    <div className="bg-white bg-opacity-0 border-2 border-white rounded-lg overflow-hidden shadow-lg p-4">
                      <p className="uppercase tracking-wide text-lg text-center font-bold text-white">
                        {quiz.quiz_name}
                      </p>
                      <div className="flex justify-between p-4 border-t border-gray-300 text-white text-sm">
                        <div className="flex items-center gap-2">
                          <svg
                            className="h-5 w-5 fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                          >
                            <path d="M19 4h-1V2h-2v2H8V2H6v2H5C3.9 4 3 4.9 3 6v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM5 20V9h14v11H5zm2-9h5v5H7v-5z" />
                          </svg>
                          <span className="font-bold">
                            {new Date(quiz.quiz_date).toLocaleDateString(
                              "en-GB"
                            )}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <svg
                            className="h-5 w-5 fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                          >
                            <path d="M11 14h2V8h-2v6zm1-12C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
                          </svg>
                          <span className="font-bold">
                            {(() => {
                              if (!quiz.quiz_time) return "Invalid Time";
                              let [hours, minutes] = quiz.quiz_time.split(":");
                              let period = +hours >= 12 ? "PM" : "AM";
                              hours = +hours % 12 || 12;
                              return `${hours}:${minutes} ${period}`;
                            })()}
                          </span>
                        </div>
                      </div>
                      <div className="px-4 pt-3 pb-4 border-t border-gray-300">
                        <div className="text-xs uppercase font-bold text-white tracking-wide">
                          Action
                        </div>
                        <div className="flex flex-wrap items-center pt-2 gap-2">
                          <button
                            onClick={() => { handleView(quiz._id)}}
                            className="btn bg-green-500 text-white rounded-md px-4 py-2 text-sm"
                          >
                            View
                          </button>

                          
                          <button
                            onClick={() => { editQuiz(quiz._id) }}
                            className="btn bg-blue-500 text-white rounded-md px-4 py-2 text-sm"
                          >
                            Edit 
                          </button>
                          <button onClick={() => { deleteQuiz(quiz._id) }}
                            className="btn bg-red-500 text-white rounded-md px-4 py-2 text-sm"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-white w-full">
                  No quizzes available
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
  <div
    className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40"
    onClick={closeModal} // Close on backdrop click
  >
    <div
      className="bg-white rounded-lg shadow-lg p-6 w-96"
      onClick={(e) => e.stopPropagation()} // Prevent modal click from bubbling
    >
      <h2 className="text-lg font-semibold mb-4">Quiz Question Option</h2>
      <div className="flex flex-col gap-3">
        <a
          href={`/view-questions/${quizId}`}
          className="bg-blue-600 text-white text-center py-2 px-4 rounded hover:bg-blue-700"
        >
          View All Questions
        </a>
        <a
          href={`/view-coding-questions/${quizId}`}
          className="bg-green-600 text-white text-center py-2 px-4 rounded hover:bg-green-700"
        >
          View Coding Questions 
        </a>
        <button
          onClick={closeModal}
          className="mt-4 text-gray-500 hover:text-gray-700 text-sm underline"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}


      {/* Footer (Always at bottom) */}
      <Footer className="mt-auto" />
    </div>
  );
};

export default AllQuizzes;
