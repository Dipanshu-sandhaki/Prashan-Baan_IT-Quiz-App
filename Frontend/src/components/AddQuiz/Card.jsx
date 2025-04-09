import React, { useState } from "react";
import Label from "./Label";
import Input from "./Input";
import { Dialog } from "./Dialog";
import Button from "./Button";
import { FaTrash, FaEdit, FaFileUpload } from "react-icons/fa";

const Card = ({ quiz = {}, onDelete, onUpdate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [quizData, setQuizData] = useState({
    name: quiz.name || "",
    date: quiz.date || "",
    time: quiz.time || "",
    totalQuestions: quiz.totalQuestions || "",
    duration: quiz.duration || "",
    questions: quiz.questions || []
  });

  const handleChange = (e) => {
    setQuizData({ ...quizData, [e.target.name]: e.target.value });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const questions = JSON.parse(event.target.result);
          setQuizData({ ...quizData, questions });
        } catch (error) {
          alert("Invalid JSON format");
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <>
      <div
        className="bg-white shadow-md rounded-lg p-4 cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <h3 className="text-lg font-semibold">{quizData.name}</h3>
        <p>Date: {quizData.date}</p>
        <p>Time: {quizData.time}</p>
        <p>Total Questions: {quizData.totalQuestions}</p>
        <p>Duration: {quizData.duration} min</p>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <div className="p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Manage Quiz</h2>
          <Label>Quiz Name</Label>
          <Input name="name" value={quizData.name} onChange={handleChange} />
          <Label>Date</Label>
          <Input name="date" type="date" value={quizData.date} onChange={handleChange} />
          <Label>Time</Label>
          <Input name="time" type="time" value={quizData.time} onChange={handleChange} />
          <Label>Total Questions</Label>
          <Input name="totalQuestions" type="number" value={quizData.totalQuestions} onChange={handleChange} />
          <Label>Duration (in minutes)</Label>
          <Input name="duration" type="number" value={quizData.duration} onChange={handleChange} />
          <Label>Upload Questions (.json)</Label>
          <Input type="file" accept=".json" onChange={handleFileUpload} />
          <div className="flex gap-4 mt-4">
            <Button variant="outline" onClick={() => onDelete(quiz.id)}>
              <FaTrash /> Delete
            </Button>
            <Button variant="outline" onClick={() => onUpdate(quizData)}>
              <FaEdit /> Update
            </Button>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default Card;
