import mongoose, { Schema } from "mongoose";

const quizSchema = new Schema(
  {
    quiz_name: { type: String, required: true },
    description: { type: String },
    total_marks: { type: Number, required: true },
    per_question_marks: { type: Number, required: true },
    negative_marks: { type: Number, required: true },
    total_question: { type: Number, required: true },

    // Duration in minutes
    duration: { type: Number, required: true },

    quiz_date: { type: Date, required: true },

    quiz_time: {
      type: String,
      required: true,
      validate: {
        validator: (v) => /^([0-1]\d|2[0-3]):([0-5]\d)$/.test(v),
        message: "Invalid time format! Use HH:MM",
      },
    },
  },
  { timestamps: true }
);

// 🔥 Hard-binding quiz collection name
const Quiz = mongoose.model("Quiz", quizSchema, "quizzes");

export default Quiz;
