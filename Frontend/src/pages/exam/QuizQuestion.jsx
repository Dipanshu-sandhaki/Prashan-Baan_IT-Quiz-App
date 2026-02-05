import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronsLeft, ChevronsRight, Check } from "lucide-react";
import Header from "../../utils/Header";
import { getAllQuestions, SubmitQuizToDB } from "../../apiCalls/examApiManager";
import { startProctoring } from "../../utils/cheatingPreventManager";
import Footer from "../../utils/Footer";
import StudentHeader from "../../components/student/StudentHeader";
import Swal from "sweetalert2";
import { FaRegSquareCheck } from "react-icons/fa6";
import ExamTimer from "./examTimer";
import HorizontalBarChart from "./chart";
import showAlert from "../../components/alertMessage/Alert";

function QuizQuestions() {
  const { quizId } = useParams();

  // ⭐⭐⭐ GUEST MODE SUPPORT (MAIN FIX) ⭐⭐⭐
  const isGuest = localStorage.getItem("guestMode") === "true";

  const user_id = isGuest
    ? "guest-" + Math.random().toString(36).substring(2, 10) // safe dummy id
    : localStorage.getItem("userId"); // real logged in user

  // --------------------------------------------------------

  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [questionsManager, setQuestionsManager] = useState([]);
  const [categoryQuestionCounder, setCategoryQuestionCounder] = useState([]);
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [answerManager, setAnswerManager] = useState({});
  const [markReview, setMarkReview] = useState({});
  const [markReviewManager, setMarkReviewManager] = useState({});
  const [categoryStartIndexes, setCategoryStartIndexes] = useState({});
  const [selectedQuestion, setSelectedQuestion] = useState(0);
  const [timer, setTimer] = useState(10);
  const [totalQuestion, setTotalQuestion] = useState(0);
  const [data, setData] = useState([0, 0, 0]);
  const navigate = useNavigate();

  let questionNumber = 1;

  const categories = [
    "C Programming",
    "DBMS",
    "Networking",
    "Computer Fundamental",
  ];
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  const [questionId, setQuestionId] = useState(null);
  const [selectedOptionValue, setSelectedOptionValue] = useState(null);
  const [ansResult, setAnsResult] = useState(null);

  // Timer end → submit
  useEffect(() => {
    if (timer <= 0) {
      Swal.fire({
        title: "Time's Up!",
        text: "Your time is over. Submitting...",
        icon: "info",
        timer: 2000,
        allowOutsideClick: false,
      });
      handleSubmitQuiz();
    }
  }, [timer]);

  // Fetch questions
  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        setLoading(true);
        const questionData = await getAllQuestions(quizId);

        const data = questionData?.question ?? questionData?.questions ?? [];
        setQuestionsManager(data);

        setTimer(parseInt(questionData.duration) * 60);

        let startIndex = 1;
        const categoryIndexes = {};
        const counts = [];

        categories.forEach((category) => {
          const categoryQuestions = data.filter((q) => q.category === category);
          categoryIndexes[category] = startIndex;
          startIndex += categoryQuestions.length;
          counts.push(categoryQuestions.length);
        });

        setCategoryQuestionCounder(counts);
        setTotalQuestion(data.length);
        setCategoryStartIndexes(categoryIndexes);
      } catch (error) {
        showAlert({
          title: "Error",
          text: "Failed to load quiz questions",
          icon: "error",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchQuestion();
  }, [quizId]);

  // Chart Update
  useEffect(() => {
    setData([
      Object.keys(answers).length,
      Object.keys(markReview).length,
      totalQuestion,
    ]);
  }, [answers, markReview, totalQuestion]);

  // On category change
  useEffect(() => {
    if (questionsManager.length > 0) {
      const filtered = questionsManager.filter(
        (q) => q.category === selectedCategory,
      );
      setQuestions(filtered);
      setCurrentQuestion(categoryStartIndexes[selectedCategory] - 1);
      setSelectedQuestion(categoryStartIndexes[selectedCategory] - 1);
    }
  }, [selectedCategory, questionsManager]);

  // Update options + preselected
  useEffect(() => {
    if (
      questionsManager.length > 0 &&
      currentQuestion < questionsManager.length
    ) {
      setOptions([
        questionsManager[currentQuestion]?.option1,
        questionsManager[currentQuestion]?.option2,
        questionsManager[currentQuestion]?.option3,
        questionsManager[currentQuestion]?.option4,
      ]);

      setSelectedOption(
        answerManager[currentQuestion] ??
          markReviewManager[currentQuestion] ??
          null,
      );
    }
  }, [currentQuestion, questions]);

  // ---- Navigation ----
  const nextQuestion = () => {
    setSelectedQuestion((p) => p + 1);
    setCurrentQuestion((p) => p + 1);
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((p) => p - 1);
      setSelectedQuestion((p) => p - 1);
    }
  };

  // ---- Save & Next ----
  const saveAndNext = () => {
    const currentQ = questionsManager[currentQuestion];
    if (!currentQ || selectedOption === null) return;

    const selectedOptValue = currentQ[`option${selectedOption + 1}`];

    setAnswers((prev) => ({
      ...prev,
      [currentQ._id]: {
        question_id: currentQ._id,
        selected_option: selectedOptValue,
        answer_status: selectedOptValue === currentQ.answer ? "right" : "wrong",
      },
    }));

    setAnswerManager((prev) => ({
      ...prev,
      [currentQuestion]: selectedOption,
    }));

    nextQuestion();
  };

  // ---- Mark for Review ----
  const markForReview = () => {
    const currentQ = questionsManager[currentQuestion];

    if (!currentQ || selectedOption === null) return;

    const selectedOptValue = currentQ[`option${selectedOption + 1}`];

    setMarkReview((prev) => ({
      ...prev,
      [currentQ._id]: {
        question_id: currentQ._id,
        selected_option: selectedOptValue,
        answer_status: selectedOptValue === currentQ.answer ? "right" : "wrong",
      },
    }));

    setMarkReviewManager((prev) => ({
      ...prev,
      [currentQuestion]: selectedOption,
    }));

    nextQuestion();
  };

  const clearOption = () => setSelectedOption(null);

  const handleAnswerSelection = (index, option, qId, answer) => {
    setSelectedOption(index);
    setQuestionId(qId);
    setSelectedOptionValue(option);

    const ans = answer === option ? "right" : "wrong";
    setAnsResult(ans);
  };

  // -------- FINAL SUBMIT BUTTON --------
  const submitQuiz = () => {
    Swal.fire({
      title: "Submit Quiz?",
      icon: "warning",
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await finalSubmit();
      }
    });
  };

  // -------- CORE SUBMIT FUNCTION --------
  const finalSubmit = async () => {
    const finalAnswers = { ...answers };

    // mark for review included
    for (const [qId, val] of Object.entries(markReview)) {
      if (!finalAnswers[qId]) finalAnswers[qId] = val;
    }

    const response = await SubmitQuizToDB(user_id, quizId, finalAnswers);

    if (!response.success || response.status === 400) {
      showAlert({
        title: "Error",
        message: "Something went wrong!",
        icon: "error",
      });
    } else {
      localStorage.setItem("isExamSubmitted", "yes");
      navigate("/completion");
    }
  };

  // TIME UP → AUTO SUBMIT
  const handleSubmitQuiz = async () => {
    await finalSubmit();
  };

  // CHEATING PREVENTION
  useEffect(() => {
    const stop = startProctoring(async (reason) => {
      const isSubmitted = localStorage.getItem("isExamSubmitted");
      if (isSubmitted === "yes") return;

      Swal.fire({
        title: "Cheating Detected!",
        text: `${reason} \nSubmitting quiz...`,
        icon: "warning",
        timer: 3000,
      });

      await handleSubmitQuiz();
      navigate("/completion");
    });

    return () => stop(); // properly removes all listeners
  }, []);

  // BLOCK BACK BUTTON
  useEffect(() => {
    const blockBack = () => {
      Swal.fire({
        title: "Back Navigation Blocked",
        text: "You cannot go back during the exam.",
        icon: "error",
        timer: 2000,
        showConfirmButton: false,
      });

      window.history.pushState(null, null, window.location.href);
    };

    window.history.pushState(null, null, window.location.href);
    window.addEventListener("popstate", blockBack);

    return () => window.removeEventListener("popstate", blockBack);
  }, []);

  // --------------------------------------------------------

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-start via-middle to-end text-white px-4 w-full">
      {loading ? (
        <div className="flex flex-grow justify-center items-center h-screen">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="min-h-screen flex flex-col w-full">
          <StudentHeader />

          <div className="container mx-auto px-4">
            {/* Category Selector */}
            <div className="flex flex-wrap justify-between items-center mb-4">
              <div className="flex flex-wrap gap-2">
                {categories.map((category, index) => (
                  <button
                    key={index}
                    className={`px-4 py-2 rounded-md ${
                      selectedCategory === category
                        ? "bg-green-500 text-white"
                        : "bg-white border text-black"
                    }`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>

              <ExamTimer duration={timer} setTimer={setTimer} />
              <HorizontalBarChart chartData={data} />
            </div>

            {/* Main Layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Left: Question Box */}
              <div className="md:col-span-2 bg-white bg-opacity-30 px-6 py-4 rounded-md">
                <h1 className="text-lg font-semibold mb-4 text-white">
                  Question {currentQuestion + 1}
                </h1>

                <p className="text-md font-medium mb-4 text-white">
                  {questionsManager[currentQuestion]?.question}
                </p>

                <ul>
                  {options.map((option, index) => (
                    <li
                      key={index}
                      className={`p-3 border rounded-md cursor-pointer mb-2 ${
                        selectedOption === index
                          ? "bg-blue-800 text-white"
                          : "bg-gray-100 text-black"
                      }`}
                      onClick={() =>
                        handleAnswerSelection(
                          index,
                          option,
                          questionsManager[currentQuestion]?._id,
                          questionsManager[currentQuestion]?.answer,
                        )
                      }
                    >
                      {option}
                    </li>
                  ))}
                </ul>

                {/* Action Buttons */}
                <div className="flex flex-wrap justify-between mt-6 gap-2">
                  <button
                    className="px-4 py-2 bg-gray-400 text-white rounded"
                    onClick={previousQuestion}
                    disabled={currentQuestion === 0}
                  >
                    <ChevronsLeft /> Previous
                  </button>

                  <button
                    className="px-4 py-2 bg-gray-400 text-white rounded"
                    onClick={clearOption}
                    disabled={selectedOption === null}
                  >
                    Clear
                  </button>

                  <button
                    className="px-4 py-2 bg-yellow-500 text-white rounded"
                    onClick={markForReview}
                    disabled={selectedOption === null}
                  >
                    <FaRegSquareCheck /> Mark Review
                  </button>

                  <button
                    className="px-4 py-2 bg-green-500 text-white rounded"
                    onClick={saveAndNext}
                    disabled={selectedOption === null}
                  >
                    Save & Next
                  </button>
                </div>
              </div>

              {/* Right: Question Grid */}
              <div className="bg-white bg-opacity-30 p-6 rounded-md max-h-96 overflow-y-auto">
                {categories.map((category, index) => {
                  const count = parseInt(categoryQuestionCounder[index]) || 0;
                  const startNumber = questionNumber;
                  questionNumber += count;

                  return (
                    <div key={index}>
                      <p className="text-white font-semibold">{category}</p>

                      <div className="grid grid-cols-4 gap-2 my-2">
                        {Array.from({ length: count }).map((_, i) => (
                          <div
                            key={i}
                            className={`h-10 w-10 flex justify-center items-center rounded-md cursor-pointer ${
                              selectedQuestion === startNumber + i - 1
                                ? "bg-green-500 text-white"
                                : answerManager[startNumber + i - 1] !==
                                    undefined
                                  ? "bg-green-300 text-white"
                                  : markReviewManager[startNumber + i - 1] !==
                                      undefined
                                    ? "bg-red-400 text-white"
                                    : "bg-gray-400 text-white"
                            }`}
                            onClick={() => {
                              setCurrentQuestion(startNumber + i - 1);
                              setSelectedQuestion(startNumber + i - 1);
                            }}
                          >
                            {startNumber + i}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}

                <button
                  className="w-full mt-4 bg-red-500 text-white py-2 rounded-md"
                  onClick={submitQuiz}
                >
                  Submit Quiz
                </button>
              </div>
            </div>
          </div>

          <Footer />
        </div>
      )}
    </div>
  );
}

export default QuizQuestions;
