import React, { useState } from "react";

import { FaTrash, FaEdit, FaFileUpload } from "react-icons/fa";
import Button from "./AddQuiz/Button";
import Card from "./AddQuiz/Card";
import Input from "./AddQuiz/Input";
import Label from "./AddQuiz/Label";
import CardContent from "./AddQuiz/CardContent";

import { Dialog, DialogContent } from "./AddQuiz/Dialog";
import LoadingMenu from "./loader";
import { addNewQuiz } from "../apiCalls/adminApiManager";
import showAlert from "./alertMessage/Alert";

const Quiz = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [quizData, setQuizData] = useState({
    name: "",
    date: "",
    time: "",
    totalQuestions: "",
    totalMarks: "",
    perQuestionMarks: "",
    negativeMarks: "",
    duration: "",
  });
  const [isOpen, setIsOpen] = useState(false);
  const [expandedQuiz, setExpandedQuiz] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setQuizData({ ...quizData, [e.target.name]: e.target.value });
  };

  const createQuiz = async () => {
    try {
      const data = {
        quiz_name: quizData.name,
        quiz_date: quizData.date,
        quiz_time: quizData.time,
        total_question: quizData.totalQuestions,
        duration: quizData.duration,
        total_marks: quizData.totalMarks,
        per_question_marks: quizData.perQuestionMarks,
        negative_marks: quizData.negativeMarks,
      };
      setLoading(true);
      await addNewQuiz(data);
      setLoading(false);
      showAlert({
        title: "Success",
        text: "Quiz Created Successfully",
        icon: "success",
      });
    } catch (error) {
      setLoading(false);
      console.error(error);
      showAlert({ title: "Error", text: "Error", icon: "error" });
    }
  };

  const deleteQuiz = (id) => {
    setQuizzes(quizzes.filter((quiz) => quiz.id !== id));
  };

  const uploadQuestions = (e, id) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const questions = JSON.parse(event.target.result);
        setQuizzes(
          quizzes.map((quiz) =>
            quiz.id === id ? { ...quiz, questions } : quiz
          )
        );
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="p-6">
      {loading && <LoadingMenu />}
      <h1 className="text-3xl font-bold mb-4">Quiz Section</h1>
      <Button onClick={() => setIsOpen(true)}>Create Quiz</Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <h2 className="text-xl font-semibold">Create a New Quiz</h2>
          <div className="flex flex-col gap-3">
            <div>
              <Label>Quiz Name</Label>
              <Input
                name="name"
                value={quizData.name}
                onChange={handleChange}
                placeholder="Enter quiz name"
              />
            </div>

            <div className="flex justify-start items-center gap-4">
              <div className="flex-1">
                <Label>Date</Label>
                <Input
                  name="date"
                  type="date"
                  value={quizData.date}
                  onChange={handleChange}
                />
              </div>

              <div className="flex-1">
                <Label>Time</Label>
                <Input
                  name="time"
                  type="time"
                  value={quizData.time}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex justify-start items-center gap-4">
              <div className="flex-1">
                <Label>Total Questions</Label>
                <Input
                  name="totalQuestions"
                  type="number"
                  value={quizData.totalQuestions}
                  onChange={handleChange}
                />
              </div>

              <div className="flex-1">
                <Label>Total Marks</Label>
                <Input
                  name="totalMarks"
                  type="number"
                  value={quizData.totalMarks}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex justify-start items-center gap-4">
              <div className="flex-1">
                <Label>Marks/Question</Label>
                <Input
                  name="perQuestionMarks"
                  type="number"
                  value={quizData.perQuestionMarks}
                  onChange={handleChange}
                />
              </div>

              <div className="flex-1">
                <Label>Negative Marks</Label>
                <Input
                  name="negativeMarks"
                  type="number"
                  value={quizData.negativeMarks}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <Label>Duration (in minutes)</Label>
              <Input
                name="duration"
                type="number"
                value={quizData.duration}
                onChange={handleChange}
              />
            </div>
          </div>
          <Button onClick={createQuiz} className="mt-4">
            Save Quiz
          </Button>
        </DialogContent>
      </Dialog>

      <div className="mt-6 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {quizzes.map((quiz) => (
          <Card
            key={quiz.id}
            className="p-4 cursor-pointer"
            onClick={() => setExpandedQuiz(quiz.id)}
          >
            <CardContent>
              <h3 className="text-lg font-semibold">{quiz.name}</h3>
              <p>Date: {quiz.date}</p>
              <p>Time: {quiz.time}</p>
              <p>Total Questions: {quiz.totalQuestions}</p>
              <p>Duration: {quiz.duration} min</p>
              {expandedQuiz === quiz.id && (
                <div className="mt-4">
                  <Label>Upload Questions (JSON file)</Label>
                  <Input
                    type="file"
                    accept=".json"
                    onChange={(e) => uploadQuestions(e, quiz.id)}
                  />
                  <div className="flex gap-4 mt-2">
                    <Button
                      variant="outline"
                      onClick={() => deleteQuiz(quiz.id)}
                    >
                      <FaTrash /> Delete
                    </Button>
                    <Button variant="outline">
                      <FaEdit /> Edit
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Quiz;
