import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Instructions from "./pages/Instructions";
import "./App.css";
import StudentDashboard from "./pages/StudentDashboard";
import CodeEditor from "./pages/CodeEditor/CodeEditor";
import AllQuizzes from "./pages/admin/quiz/allQuizzes";
import Landingpages from "./pages/landingPage/Landingpages";
// import showStudentDetails from "./pages/admin/showStudentDetails";
import ShowStudentDetails from "./pages/admin/showStudentDetails";
import Quiz from "./components/Quiz";
import Completion from "./pages/Completion";

import QuizQuestions from "./pages/exam/QuizQuestion";
import ViewAllQuestions from "./pages/admin/quiz/viewQuestions";
import ShowResult from "./components/result/showResult";

import AddCoding from "./pages/admin/quiz/components/addCoding";
import ViewAllCodingQuestions from "./pages/admin/quiz/viewCodingQuestions";
import About from "./about";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Landingpages />} />
      <Route path="/login" element={<Login />} />
      <Route path="/instructions/:quizId" element={<Instructions />} />
      <Route path="/quiz/:quizId" element={<QuizQuestions />} />
      <Route path="/studentDashboard" element={<StudentDashboard />} />
      <Route path="/codeEditor" element={<CodeEditor />} />
      <Route path="/landingPage" element={<Landingpages />}/>
      <Route path="/completion" element={<Completion />}/>
      <Route path="/about" element={<About/>}/>

      {/* Admin Routes Started */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/quizzes" element={<AllQuizzes />} />
      <Route path="/view-questions/:id" element={<ViewAllQuestions />} />
      <Route path="/view-coding-questions/:id" element={<ViewAllCodingQuestions />} />
      <Route path="/student-details" element={<ShowStudentDetails />} />
      <Route path="/add-quiz" element={<Quiz />} />
      <Route path="/result" element={<ShowResult/>}/>
      <Route path="/add-coding" element={<AddCoding/>} />
      {/* Admin Routes Ended */}
    </Routes>
  );
};

export default App;