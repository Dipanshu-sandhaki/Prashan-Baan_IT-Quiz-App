import mongoose from "mongoose";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { successResponse, errorResponse } from "../../utils/responseHandler.js";
import Question from "../../models/questions.model.js";
import Quiz from "../../models/quiz.model.js";
import cache from "../../config/cache.js";

// ========================================
// GET ALL QUIZZES
// ========================================
export const getAllQuiz = asyncHandler(async (req, res) => {
  try {
    const quizzes = await Quiz.find({}).lean();
    return successResponse(res, 200, "Quizzes fetched successfully", quizzes);
  } catch (error) {
    console.error("❌ getAllQuiz Error:", error);
    return errorResponse(res, 500, "Internal Server Error");
  }
});

// ========================================
// GET QUESTIONS BY QUIZ ID  (COMPLETE FIX)
// ========================================
export const getQuestions = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Step 1: Validate ObjectID
  let objectId = null;
  try {
    objectId = new mongoose.Types.ObjectId(id);
  } catch (err) {
    return errorResponse(res, 400, "Invalid Quiz ID format");
  }

  // Step 2: Check quiz exists
  const quiz = await Quiz.findById(objectId).lean();
  if (!quiz) {
    return errorResponse(res, 404, "Quiz not found");
  }

  // Step 3: Check cache
  const cacheKey = `quiz_questions_${id}`;
  let questions = cache.get(cacheKey);

  // Step 4: If not in cache → fetch from DB
  if (!questions) {
    questions = await Question.find({ quiz_id: objectId }).lean();

    if (!questions.length) {
      return errorResponse(res, 404, "No Questions Found for this quiz");
    }

    cache.set(cacheKey, questions);
  }

  // Step 5: Send final response
  return successResponse(res, 200, "Questions fetched successfully", {
    total_questions: quiz.total_question,
    duration: quiz.duration,
    question: questions,
  });
});

// ========================================
// SUBMIT QUIZ  (GUEST + NORMAL USER FIX)
// ========================================
export const submitQuiz = asyncHandler(async (req, res) => {
  const { user_id, quiz_id, answers } = req.body;

  if (!answers || typeof answers !== "object" || Object.keys(answers).length === 0) {
    return errorResponse(res, 400, "Answers must be a non-empty object");
  }

  const StudentAttempt =
    (await import("../../models/studentAttempt.model.js")).default;

  await StudentAttempt.create({
    student_id: user_id || "guest",
    quiz_id,
    answers: Object.values(answers || {}),
  });

  return successResponse(res, 200, "Quiz submitted successfully");
});
