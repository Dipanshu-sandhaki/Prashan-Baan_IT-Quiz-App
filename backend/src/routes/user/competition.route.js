import express from "express";
import {
  getQuestions,
  submitQuiz,
  getAllQuiz,
} from "../../controllers/user/competition.controller.js";

import { saveProblem } from "../../controllers/admin/codingProblem.controller.js";

const competitionRoutesManager = express.Router();

// PUBLIC ✔
competitionRoutesManager.get("/all-quiz", getAllQuiz);

// PUBLIC ✔
competitionRoutesManager.get("/questions/:id", getQuestions);

// Submit quiz ✔
competitionRoutesManager.post("/submit-quiz", submitQuiz);

// Submit coding problem
competitionRoutesManager.post("/submit-problem", saveProblem);

export default competitionRoutesManager;
