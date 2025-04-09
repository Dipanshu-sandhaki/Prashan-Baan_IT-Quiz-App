import React, { useEffect, useState } from "react";
import { Dialog, DialogContent } from "../../../../components/AddQuiz/Dialog";
import Label from "../../../../components/AddQuiz/Label";
import Input from "../../../../components/AddQuiz/Input";
import Button from "../../../../components/AddQuiz/Button";
import showAlert from "../../../../components/alertMessage/Alert";
import { addNewQuiz, updateQuizById } from "../../../../apiCalls/adminApiManager";

function CreateQuiz({ show, onClose, onQuizCreated, quizToEdit }) {
  const [isOpen, setIsOpen] = useState(show);
  const [loading, setLoading] = useState(false);
  const [quizData, setQuizData] = useState({
    name: "",
    description: "",
    date: "",
    time: "",
    totalQuestions: "",
    totalMarks: "",
    perQuestionMarks: "",
    negativeMarks: "",
    duration: "",
  });

  useEffect(() => {
    if (quizToEdit && Object.keys(quizToEdit).length > 0) {
      console.log("quizToEdit",quizToEdit)
      setQuizData({
        name: quizToEdit.quiz_name || "",
        description: quizToEdit.description || "",
        date: quizToEdit.quiz_date ? quizToEdit.quiz_date.split("T")[0] : "",
        time: quizToEdit.quiz_time || "",
        totalQuestions: quizToEdit.total_question || "",
        totalMarks: quizToEdit.total_marks || "",
        perQuestionMarks: quizToEdit.per_question_marks || "",
        negativeMarks: quizToEdit.negative_marks || "",
        duration: extractMinutes(quizToEdit.duration),
        _id: quizToEdit._id || "", // include _id so you can use it while updating
      });
    }
  }, [quizToEdit]);
  


  const extractMinutes = (durationString) => {
    if (!durationString) return "";

    const yearMatch = durationString.match(/^(\d{4})-/);
    if (yearMatch && parseInt(yearMatch[1]) > 0) {
      return parseInt(yearMatch[1]);
    }

    // fallback to parsing time
    const date = new Date(durationString);
    return date.getUTCHours() * 60 + date.getUTCMinutes();
  };

  const handleChange = (e) => {
    setQuizData({ ...quizData, [e.target.name]: e.target.value });
  };

  const createQuiz = async () => {
    try {
      const data = {
        quiz_name: quizData.name,
        description: quizData.description,
        quiz_date: quizData.date,
        quiz_time: quizData.time,
        total_question: quizData.totalQuestions,
        duration: quizData.duration,
        total_marks: quizData.totalMarks,
        per_question_marks: quizData.perQuestionMarks,
        negative_marks: quizData.negativeMarks,
      };
      setLoading(true);
      const newQuiz = await addNewQuiz(data);
      setLoading(false);
      showAlert({
        title: "Success",
        text: "Quiz Created Successfully",
        icon: "success",
      });
      onQuizCreated(newQuiz);
    } catch (error) {
      setLoading(false);
      console.error(error);
      showAlert({ title: "Error", text: "Error", icon: "error" });
    }
  };

  // updateQuizById
  const updateQuiz = async (id) => {
    try {
      const data = {
        quiz_name: quizData.name,
        description: quizData.description,
        quiz_date: quizData.date,
        quiz_time: quizData.time,
        total_question: quizData.totalQuestions,
        duration: quizData.duration,
        total_marks: quizData.totalMarks,
        per_question_marks: quizData.perQuestionMarks,
        negative_marks: quizData.negativeMarks,
      };
      setLoading(true);
      const newQuiz = await updateQuizById(id,data);
      setLoading(false);
      showAlert({
        title: "Success",
        text: "Quiz Updated Successfully",
        icon: "success",
      });
      onQuizCreated(newQuiz);
    } catch (error) {
      setLoading(false);
      console.error(error);
      showAlert({ title: "Error", text: "Error", icon: "error" });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
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

          <div>
            <Label>Quiz Description (Optional)</Label>
            <textarea
              rows="4"
              className="w-full rounded p-2.5 border-2 focus:border-blue-500"
              name="description"
              value={quizData.description}
              onChange={handleChange}
              placeholder="Write Quiz Description (Optional)"
            ></textarea>
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
        <Button  onClick={quizToEdit ? () => updateQuiz(quizData._id) : () => createQuiz()} className="mt-4">
          {(quizToEdit && Object.keys(quizToEdit).length>0) ? "Update Quiz" : "Create Quiz"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export default CreateQuiz;
