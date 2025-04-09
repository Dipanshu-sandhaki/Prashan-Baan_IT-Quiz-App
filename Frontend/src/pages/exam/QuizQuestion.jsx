import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronsLeft, ChevronsRight, Check, CloudCog, Cog } from "lucide-react";
import Header from "../../utils/Header";
import { getAllQuestions, SubmitQuizToDB } from "../../apiCalls/examApiManager";
import { cheatingPrevention } from "../../utils/cheatingPreventManager";
import Footer from "../../utils/Footer";
import StudentHeader from "../../components/student/StudentHeader";
import Swal from "sweetalert2";
import { FaRegSquareCheck } from "react-icons/fa6";
import ExamTimer from "./examTimer";
import DoughnutChart from "./chart";
import HorizontalBarChart from "./chart";
import showAlert from "../../components/alertMessage/Alert";
import { time } from "framer-motion";

function QuizQuestions() {
  const { quizId } = useParams();
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

  let questionNumber = 1;

  const user_id = localStorage.getItem("userId");

  const categories = [
    "C Programming",
    "DBMS",
    "Networking",
    "Computer Fundamental",
  ];
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const navigate = useNavigate();
  // Save data for sort time for every question
  const [questionId, setQuestionId] = useState(null);
  const [selectedOptionValue, setSelectedOptionValue] = useState(null);
  const [ansResult, setAnsResult] = useState(null);
  // useEffect(() => {
  // cheatingPrevention();  
  // }, []);


  useEffect(() => {
    const timerChecker = async () => {
      if (timer <= 0) {
        await Swal.fire({
          title: "Time's Up!",
          text: "Your time is over. Submitting the quiz...",
          icon: "info",
          allowOutsideClick: false,
          showConfirmButton: true,
          timer: 3000, // auto-close after 2 seconds
        });
        handleSubmitQuiz();
      }
    }

    timerChecker();
  }, [timer]);

  // Fetch all questions
  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        setLoading(true);
        const questionData = await getAllQuestions(quizId);
        const data = questionData.question;

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
        setData((prevData) => {
          const newData = [...prevData];
          newData[newData.length - 1] = totalQuestion;
          return newData;
        });
        setCategoryStartIndexes(categoryIndexes);
      } catch (error) {
        console.error("Failed to load quiz questions.", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestion();
  }, [quizId]);

  // Update Chart Data
  useEffect(() => {
    const updateChart = () => {
      setData((prevData) => {
        const newData = [...prevData];
        newData[newData.length - 1] = totalQuestion;
        return newData;
      });

      setData((prevData) => {
        const newData = [...prevData];
        const mark = Object.keys(markReview).length;
        newData[newData.length - 2] = mark;
        return newData;
      });

      setData((prevData) => {
        const newData = [...prevData];
        newData[newData.length - 3] = Object.keys(answers).length;
        return newData;
      });
    };

    updateChart();
  }, [markReview, answers, totalQuestion]);

  useEffect(() => {
    if (questionsManager.length > 0) {
      const filteredQuestions = questionsManager.filter(
        (q) => q.category === selectedCategory
      );
      let index = categories.indexOf(selectedCategory);
      setQuestions(filteredQuestions);
      setCurrentQuestion(categoryStartIndexes[selectedCategory] - 1);
      setSelectedQuestion(categoryStartIndexes[selectedCategory] - 1);
    }
  }, [selectedCategory, questionsManager]);

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
        answerManager[currentQuestion] ?? markReviewManager[currentQuestion] ?? null
      );
    }
  }, [questions, currentQuestion, answers]);

  const nextQuestion = () => {
    setSelectedQuestion((prev) => prev + 1);
    setCurrentQuestion((prev) => prev + 1);
  };

  const previousQuestion = () => {
    const currentCategoryIndex = categories.indexOf(selectedCategory);

    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
      setSelectedQuestion((prev) => prev - 1);
    } else if (currentCategoryIndex > 0) {
      // If at the first question of a category (except first), move to the last question of the previous category
      const previousCategory = categories[currentCategoryIndex - 1];
      const previousCategoryQuestions = questionsManager.filter(
        (q) => q.category === previousCategory
      );

      setSelectedCategory(previousCategory);
      setCurrentQuestion(previousCategoryQuestions.length - 1); // Set to the last question of the previous category
    }
  };

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

    // Optional: remove from review if exists
    setMarkReview((prev) => {
      const updated = { ...prev };
      delete updated[currentQ._id];
      return updated;
    });

    setMarkReviewManager((prev) => {
      const updated = { ...prev };
      delete updated[currentQuestion];
      return updated;
    });

    setAnswerManager((prev) => ({
      ...prev,
      [currentQuestion]: selectedOption,
    }));

    setQuestionId(null);
    setSelectedOptionValue(null);
    setAnsResult("wrong");

    nextQuestion();
  };

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

    // Optional: remove from final answer if exists
    setAnswers((prev) => {
      const updated = { ...prev };
      delete updated[currentQ._id];
      return updated;
    });

    setAnswerManager((prev) => {
      const updated = { ...prev };
      delete updated[currentQuestion];
      return updated;
    });

    setMarkReview((prev) => ({
      ...prev,
      [questionId]: {
        question_id: questionId,
        selected_option: selectedOptionValue,
        answer_status: ansResult,
      },
    }));

    setMarkReviewManager((prev) => ({
      ...prev,
      [currentQuestion]: selectedOption,
    }));


    setQuestionId(null);
    setSelectedOptionValue(null);
    setAnsResult("wrong");

    nextQuestion();
  };


  const clearOption = () => {
    setSelectedOption(null);
    delete answers[currentQuestion];
    delete markReview[currentQuestion];
  };

  const selectQuizNumber = (event) => {
    let currentVal = parseInt(event.target.textContent) - 1;
    setCurrentQuestion(currentVal);
    setSelectedQuestion(currentVal);
  };

  const handleAnswerSelection = (index, option, questionId, answer) => {
    setSelectedOption(index);

    setQuestionId(questionId);
    setSelectedOptionValue(option);

    const ansResultLocal = answer === option ? "right" : "wrong";
    setAnsResult(ansResultLocal);
  };



  const submitQuiz = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to submit the quiz?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, submit it!",
      cancelButtonText: "No, keep solving",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const currentQ = questionsManager[currentQuestion];

        let finalAnswers = { ...answers };

        // Save current if not saved
        if (currentQ && selectedOption !== null && !finalAnswers[currentQ._id]) {
          const selectedOptValue = currentQ[`option${selectedOption + 1}`];
          finalAnswers[currentQ._id] = {
            question_id: currentQ._id,
            selected_option: selectedOptValue,
            answer_status: selectedOptValue === currentQ.answer ? "right" : "wrong",
          };
        }

        // Add mark for review entries
        for (const [qId, val] of Object.entries(markReview)) {
          if (!finalAnswers[qId]) {
            finalAnswers[qId] = val;
          }
        }


        const response = await SubmitQuizToDB(user_id, quizId, finalAnswers);

        console.log(response)


        if (!response.success || response.status === 400) {
          showAlert({
            title: "Error",
            message: "Something went wrong! Please contact the development team.",
            icon: "error",
          });
        } else {
          localStorage.setItem("isExamSubmitted", "yes");
          navigate("/completion");
        }
      }
    });
  };

  const handleSubmitQuiz = async () => {
    const currentQ = questionsManager[currentQuestion];
    let finalAnswers = { ...answers };

    // Save current if not saved
    if (currentQ && selectedOption !== null && !finalAnswers[currentQ._id]) {
      const selectedOptValue = currentQ[`option${selectedOption + 1}`];
      finalAnswers[currentQ._id] = {
        question_id: currentQ._id,
        selected_option: selectedOptValue,
        answer_status: selectedOptValue === currentQ.answer ? "right" : "wrong",
      };
    }

    // Add mark for review entries
    for (const [qId, val] of Object.entries(markReview)) {
      if (!finalAnswers[qId]) {
        finalAnswers[qId] = val;
      }
    }

    const response = await SubmitQuizToDB(user_id, quizId, finalAnswers);

    if (!response.success || response.status === 400) {
      showAlert({
        title: "Error",
        message: "Something went wrong! Please contact the development team.",
        icon: "error",
      });
    } else {
      navigate("/completion");
    }
  };

  useEffect(() => {
    cheatingPrevention(async (reason) => {
      const isSubmitted = localStorage.getItem("isExamSubmitted");
      if (isSubmitted === "yes") return;

      await Swal.fire({
        title: "Cheating Detected",
        text: `${reason} Submitting the quiz...`,
        icon: "warning",
        allowOutsideClick: false,
        showConfirmButton: false,
        timer: 5000,
      });

      await handleSubmitQuiz();
      localStorage.setItem("isExamSubmitted", "yes");

      navigate("/completion");
    });
  }, [handleSubmitQuiz, navigate]);


  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-start via-middle to-end text-white relative overflow-hidden items-center px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 bg-cover bg-no-repeat bg-center w-full">
      {loading ? (
        <div className="flex flex-grow justify-center items-center h-screen">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-start via-middle to-end text-white relative overflow-hidden items-center w-full bg-cover bg-no-repeat bg-center">
          <div className="w-full">
            <StudentHeader />
          </div>
          <div className="container mx-auto px-4" style={{ height: "auto" }}>
            {/* Category Selector */}
            <div className="flex flex-wrap justify-between items-center space-x-2 mb-4 relative">
              <div className="flex flex-wrap justify-start items-center space-x-2">
                {categories.map((category, index) => (
                  <button
                    key={index}
                    className={`px-4 py-2 rounded-md transition-all duration-200 ${selectedCategory === category
                      ? "bg-green-500 text-white"
                      : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-200"
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

            {/* Main Content */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Left Side - Question Panel */}
              <div className="md:col-span-2 bg-white bg-opacity-30 px-6 py-4 shadow rounded-md w-full">
                <h1 className="text-lg font-semibold mb-4 text-white">
                  Question {currentQuestion + 1}
                </h1>
                <hr className="mb-4" />

                <p className="text-md font-medium mb-4 text-white">
                  {questionsManager[currentQuestion]?.question ||
                    "Question is loading"}
                </p>

                <ul>
                  {options.map((option, index) => (
                    <li
                      key={index}
                      className={`p-3 border rounded-md cursor-pointer mb-2 transition-all 
                        ${selectedOption === index
                          ? "bg-blue-800 bg-opacity-60 text-white"
                          : "bg-gray-100 hover:bg-gray-200 text-black"
                        }`}

                      onClick={() =>
                        handleAnswerSelection(
                          index,
                          option,
                          questionsManager[currentQuestion]?._id,
                          questionsManager[currentQuestion]?.answer
                        )
                      }
                    >
                      {option}
                    </li>
                  ))}
                </ul>

                {/* Buttons */}
                <div className="flex flex-wrap justify-between mt-6 gap-2">
                  <button
                    className={`px-4 py-2 rounded transition ${currentQuestion === 0
                      ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                      : "bg-gray-400 text-white hover:bg-gray-500"
                      }`}
                    onClick={previousQuestion}
                    disabled={currentQuestion === 0}
                  >
                    <ChevronsLeft className="inline-block" /> Previous
                  </button>

                  <button
                    className={`px-4 py-2 rounded transition ${selectedOption === null &&
                      currentQuestion !== questionsManager.length - 1
                      ? "bg-blue-500 text-white hover:bg-blue-600"
                      : "bg-gray-300 text-gray-600 cursor-not-allowed"
                      }`}
                    onClick={() => nextQuestion()}
                    disabled={
                      selectedOption !== null ||
                      currentQuestion === questionsManager.length - 1
                    }
                  >
                    Next <ChevronsRight className="inline-block" />
                  </button>

                  <button
                    className={`px-4 py-2 rounded transition ${selectedOption !== null
                      ? "bg-yellow-500 text-white cursor-pointer"
                      : "bg-gray-300 text-gray-600 cursor-not-allowed"
                      }`}
                    onClick={() => clearOption()}
                    disabled={selectedOption === null}
                  >
                    Clear
                  </button>

                  <button
                    className="px-4 py-2 rounded transition bg-red-600 text-white hover:bg-red-700 flex items-center gap-2"
                    onClick={markForReview}
                    disabled={selectedOption === null}
                  >
                    <FaRegSquareCheck /> Mark For Review
                  </button>

                  <button
                    className={`px-4 py-2 rounded transition ${selectedOption !== null
                      ? "bg-green-500 text-white hover:bg-green-600"
                      : "bg-gray-300 text-gray-600 cursor-not-allowed"
                      }`}
                    onClick={saveAndNext}
                    disabled={selectedOption === null}
                  >
                    Save & Next
                  </button>
                </div>
              </div>

              {/* Right Side - Timer & Question Grid */}
              <div className="bg-white bg-opacity-30 p-6 shadow rounded-md overflow-y-auto max-h-96 w-full">
                {categories.map((category, index) => {
                  const count = parseInt(categoryQuestionCounder[index]) || 0;
                  const startNumber = questionNumber;
                  questionNumber += count;

                  return (
                    <div key={index}>
                      <p className="text-white text-sm font-semibold mb-2">
                        {category}
                      </p>
                      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2 mb-6">
                        {Array.from({ length: count }).map((_, i) => (
                          <div
                            key={i}
                            className={`h-10 w-10 text-center rounded-md border-2 font-semibold border-white cursor-pointer flex justify-center items-center transition-all ${selectedQuestion === startNumber + i - 1
                              ? "bg-green-500 text-white"
                              : answerManager[startNumber + i - 1] !==
                                undefined
                                ? "bg-green-300 text-white"
                                : markReviewManager[startNumber + i - 1] !== undefined
                                  ? "bg-red-400 text-white"
                                  : "bg-gray-400 hover:bg-gray-300 text-white"
                              }`}
                            onClick={selectQuizNumber}
                          >
                            {startNumber + i}
                            {answerManager[startNumber + i - 1] !==
                              undefined && (
                                <Check
                                  className="ml-1 w-4 h-4 text-white pointer-events-none"
                                  disabled="true"
                                />
                              )}

                            {markReviewManager[startNumber + i - 1] !== undefined && (
                              <Check
                                className="ml-1 w-4 h-4 text-white pointer-events-none"
                                disabled="true"
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
                <button
                  className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600"
                  onClick={submitQuiz}
                >
                  Submit Section 1
                </button>
              </div>
            </div>
          </div>
          <Footer className="mt-auto" />
        </div>
      )}
    </div>
  );
}

export default QuizQuestions;
