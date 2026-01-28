import axios from "axios";
import showAlert from "../components/alertMessage/Alert";

// 🔥 Correct backend base URL
const baseURL = "http://localhost:3000/api/v1";

// --------------------------------------------------------
// GET TOKEN
// --------------------------------------------------------
const getAuthToken = () => localStorage.getItem("token");

// --------------------------------------------------------
// GENERATE SAFE AUTH HEADER (Guest + User Both Supported)
// --------------------------------------------------------
const getAuthHeader = () => {
  const token = getAuthToken();
  const guest = localStorage.getItem("guestMode") === "true";

  // Guest → no token required
  if (guest) {
    return {};
  }

  // Logged-in user → must send Bearer token
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// --------------------------------------------------------
// 1️⃣ GET ALL QUIZZES (SAFE FOR GUEST MODE)
// --------------------------------------------------------
export const getAllQuizes = async () => {
  try {
    console.log("📡 Fetching quizzes from:", `${baseURL}/competition/all-quiz`);

    const response = await axios.get(`${baseURL}/competition/all-quiz`, {
      headers: getAuthHeader(),
    });

    return Array.isArray(response.data?.data) ? response.data.data : [];
  } catch (error) {
    console.error("❌ Error fetching quizzes:", error);
    return [];
  }
};

// --------------------------------------------------------
// 2️⃣ GET ALL QUESTIONS OF A QUIZ
// --------------------------------------------------------
export const getAllQuestions = async (quizId) => {
  try {
    const response = await axios.get(
      `${baseURL}/competition/questions/${quizId}`,
      { headers: getAuthHeader() },
    );

    return response.data?.data;
  } catch (error) {
    console.error("❌ Error fetching quiz questions:", error);
    throw error;
  }
};

// --------------------------------------------------------
// 3️⃣ SUBMIT QUIZ (Guest + Auth Both Supported)
// --------------------------------------------------------
export const SubmitQuizToDB = async (user_id, quiz_id, answers) => {
  try {
    const response = await axios.post(
      `${baseURL}/competition/submit-quiz`,
      { user_id, quiz_id, answers },
      {
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeader(),
        },
      },
    );

    return response.data;
  } catch (error) {
    showAlert({
      title: "Error",
      text: "Something went wrong! Please contact development team",
      icon: "error",
    });

    console.error(
      "❌ Error in SubmitQuizToDB:",
      error.response?.data || error.message,
    );

    throw error;
  }
};

// --------------------------------------------------------
// 4️⃣ GET CODING PROBLEMS
// --------------------------------------------------------
export const getCodingProblems = async () => {
  try {
    const response = await axios.get(`${baseURL}/problems`);
    return response.data?.problem || [];
  } catch (error) {
    console.error("❌ Error fetching coding problems:", error);
    throw error;
  }
};
