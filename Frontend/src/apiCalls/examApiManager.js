import axios from "axios";
import showAlert from "../components/alertMessage/Alert";

const baseURL = import.meta.env.VITE_API_URL;
const baseURL2 = import.meta.env.VITE_API_URL2;
const baseURL3 = import.meta.env.VITE_API_URL3;
const getAuthToken = () => localStorage.getItem("token");

export const getAllQuizes = async () => {
  try {
    console.log(baseURL);
    const token = getAuthToken();
    const response = await axios.get(`${baseURL}/competition/all-quiz`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(response.data.data);
    // console.log(response.data['data'].question);
    return response.data["data"];
  } catch (error) {
    console.error("Error fetching quiz questions:", error);
    throw error;
  }
};

export const getAllQuestions = async (quizId) => {
  try {
    console.log(baseURL);
    const token = getAuthToken();
    const response = await axios.get(
      `${baseURL}/competition/question/${quizId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data["data"];
  } catch (error) {
    console.error("Error fetching quiz questions:", error);
    throw error;
  }
};

// Submit Quiz
export const SubmitQuizToDB = async (user_id, quiz_id, answers) => {
  try {
    const token = getAuthToken();
    const response = await axios.post(
      `${baseURL2}/competition/submit-quiz`,
      {
        user_id: user_id,
        quiz_id: quiz_id,
        answers: answers,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    showAlert({ title: "Error", text: "Something went wrong! Please contact to development team", icon: "error" });
    console.error(
      "Error in addNewStudent:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Get the api coding problems
export const getCodingProblems = async () => {
  try {
    const response = await axios.get(`${baseURL3}/problems`);
    return response.data["problem"];
  } catch (error) {
    console.error("Error fetching quiz questions:", error);
    throw error;
  }
};
