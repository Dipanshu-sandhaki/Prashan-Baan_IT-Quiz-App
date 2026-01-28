import dotenv from "dotenv";
dotenv.config({ path: ".env" });
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import adminQuiz from './routes/admin/quiz.route.js';
import adminDashboard from './routes/admin/dashboard.route.js';

import authRoutes from './routes/auth.route.js';

// 👇 IMPORTANT — Correct Import for Competition Routes
import competitionRoutesManager from './routes/user/competition.route.js';

import compilerRouteManager from './routes/user/coding.route.js';

import dbConnect from './utils/dbConnection.js';
import { authenticateUser, authorizeRoles } from './middleware/auth.middleware.js';

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: '*' }));
app.use(helmet());
app.use(morgan('dev'));

// DB connect
dbConnect();

// Test Route
app.get('/api/v1/', (req, res) => {
  res.send("Hello world! Welcome to Quiz Application");
});

// Auth Routes
app.use('/api/v1/auth', authRoutes);

// Admin Routes
app.use('/api/v1/admin', authenticateUser, authorizeRoles('admin'), adminDashboard);
app.use('/api/v1/admin', authenticateUser, authorizeRoles('admin'), adminQuiz);

// PUBLIC ROUTES FOR STUDENT (NO AUTH REQUIRED)
app.use('/api/v1/competition', competitionRoutesManager);

// Coding Compiler (PUBLIC)
app.use('/api/v1/compiler', compilerRouteManager);

export default app;
