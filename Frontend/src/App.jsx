import React from "react";
import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Instructions from "./pages/Instructions";
import StudentDashboard from "./pages/StudentDashboard";
import CodeEditor from "./pages/CodeEditor/CodeEditor";
import AllQuizzes from "./pages/admin/quiz/allQuizzes";
import Landingpages from "./pages/landingPage/Landingpages";
import ShowStudentDetails from "./pages/admin/showStudentDetails";
import Quiz from "./components/Quiz";
import Completion from "./pages/Completion";
import QuizQuestions from "./pages/exam/QuizQuestion";
import ViewAllQuestions from "./pages/admin/quiz/viewQuestions";
import ShowResult from "./components/result/showResult";
import AddCoding from "./pages/admin/quiz/components/addCoding";
import ViewAllCodingQuestions from "./pages/admin/quiz/viewCodingQuestions";
import About from "./about";

import ProtectedRoute from "./routes/ProtectedRoute";

const App = () => {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Landingpages />} />
      <Route path="/login" element={<Login />} />
      <Route path="/about" element={<About />} />

      {/* Guest + Logged-in BOTH allowed */}
      <Route
        path="/studentDashboard"
        element={
          <ProtectedRoute allowGuest={true}>
            <StudentDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/instructions/:quizId"
        element={
          <ProtectedRoute allowGuest={true}>
            <Instructions />
          </ProtectedRoute>
        }
      />

      <Route
        path="/quiz/:quizId"
        element={
          <ProtectedRoute allowGuest={true}>
            <QuizQuestions />
          </ProtectedRoute>
        }
      />

      <Route
        path="/completion"
        element={
          <ProtectedRoute allowGuest={true}>
            <Completion />
          </ProtectedRoute>
        }
      />

      {/* Admin ONLY (no guest allowed) */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute allowGuest={false}>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/quizzes"
        element={
          <ProtectedRoute allowGuest={false}>
            <AllQuizzes />
          </ProtectedRoute>
        }
      />

      <Route
        path="/view-questions/:id"
        element={
          <ProtectedRoute allowGuest={false}>
            <ViewAllQuestions />
          </ProtectedRoute>
        }
      />

      <Route
        path="/view-coding-questions/:id"
        element={
          <ProtectedRoute allowGuest={false}>
            <ViewAllCodingQuestions />
          </ProtectedRoute>
        }
      />

      <Route
        path="/student-details"
        element={
          <ProtectedRoute allowGuest={false}>
            <ShowStudentDetails />
          </ProtectedRoute>
        }
      />

      <Route
        path="/add-quiz"
        element={
          <ProtectedRoute allowGuest={false}>
            <Quiz />
          </ProtectedRoute>
        }
      />

      <Route
        path="/result"
        element={
          <ProtectedRoute allowGuest={false}>
            <ShowResult />
          </ProtectedRoute>
        }
      />

      <Route
        path="/add-coding"
        element={
          <ProtectedRoute allowGuest={false}>
            <AddCoding />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;
