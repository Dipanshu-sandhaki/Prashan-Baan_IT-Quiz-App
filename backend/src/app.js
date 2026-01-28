import dotenv from "dotenv";
dotenv.config({ path: ".env" });

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import adminQuiz from "./routes/admin/quiz.route.js";
import adminDashboard from "./routes/admin/dashboard.route.js";
import authRoutes from "./routes/auth.route.js";
import competitionRoutesManager from "./routes/user/competition.route.js";
import compilerRouteManager from "./routes/user/coding.route.js";

import dbConnect from "./utils/dbConnection.js";
import { authenticateUser, authorizeRoles } from "./middleware/auth.middleware.js";

const app = express();

// ----------------------------------------------------
// 🔥 FIXED CORS CONFIG (Vercel + Localhost support)
// ----------------------------------------------------
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://prashan-baan-it-quiz-app.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// ✅ Allow OPTIONS preflight requests globally
app.options("*", cors());

// ----------------------------------------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("dev"));

// ----------------------------------------------------
// DB Connection
// ----------------------------------------------------
dbConnect();

// ----------------------------------------------------
// Test Route
// ----------------------------------------------------
app.get("/api/v1/", (req, res) => {
  res.send("Hello world! Welcome to Quiz Application");
});

// ----------------------------------------------------
// Authentication Routes
// ----------------------------------------------------
app.use("/api/v1/auth", authRoutes);

// ----------------------------------------------------
// ADMIN ROUTES (Protected)
// ----------------------------------------------------
app.use(
  "/api/v1/admin",
  authenticateUser,
  authorizeRoles("admin"),
  adminDashboard
);

app.use(
  "/api/v1/admin",
  authenticateUser,
  authorizeRoles("admin"),
  adminQuiz
);

// ----------------------------------------------------
// PUBLIC STUDENT ROUTES
// ----------------------------------------------------
app.use("/api/v1/competition", competitionRoutesManager);

// ----------------------------------------------------
// PUBLIC COMPILER ROUTES
// ----------------------------------------------------
app.use("/api/v1/compiler", compilerRouteManager);

export default app;
