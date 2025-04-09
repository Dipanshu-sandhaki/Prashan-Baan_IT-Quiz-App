import axios from "axios";
import { LANGUAGE_VERSIONS } from "./constants";
import { problem } from "../data/QuizData";

const API_BASE_URL = import.meta.env.VITE_API_URL;
const baseURL2 = import.meta.env.VITE_API_URL2;
const getAuthToken = () => localStorage.getItem("token");

// Create an Axios instance for uniform API calls
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

/**
 * Login User
 */
export const loginUser = async (username, password) => {
  try {
    const { data } = await apiClient.post("/auth/login", {
      username,
      password,
    });
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Invalid credentials");
  }
};

/**
 * Fetch user data (Fallback: Returns "User" if API fails)
 */
export const fetchUserData = async () => {
  try {
    const userData = {
      name: localStorage.getItem("name") || null,
      username: localStorage.getItem("username") || null,
    };
    return userData;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return "Error";
  }
};

/**
 * Fetch logged-in student details.
 * Returns student data or default values if API fails.
 */
export const fetchStudentDetails = async () => {
  try {
    const { data } = await apiClient.get("/user/profile");
    return {
      name: data.name || "User",
      email: data.email || "user@gmail.com",
      erpId: data.erpId || "UU243600000",
    };
  } catch (error) {
    console.error("Error fetching student details:", error);
    return { name: "User", email: "user@gmail.com", erpId: "UU243600000" };
  }
};

/**
 * Delete a student (Admin)
 */
export const deleteStudent = async (id) => {
  try {
    await apiClient.delete(`/admin/delete-user/${id}`);
    return true;
  } catch (error) {
    console.error("Error deleting student:", error);
    return false;
  }
};

/**
 * Add a new student (Admin)
 */
export const addStudent = async (newStudent) => {
  try {
    const { data } = await apiClient.post("/admin/add-user", newStudent);
    return data;
  } catch (error) {
    console.error("Error adding student:", error);
    throw error;
  }
};

/**
 * Update student details (Admin)
 */
export const updateStudent = async (id, updatedStudent) => {
  try {
    const { data } = await apiClient.put(
      `/admin/update-user/${id}`,
      updatedStudent
    );
    return data;
  } catch (error) {
    console.error("Error updating student:", error);
    throw error;
  }
};

/**
 * Fetch quiz results
 */
export const fetchResults = async () => {
  try {
    const { data } = await apiClient.get("/results");
    return data;
  } catch (error) {
    console.error("Error fetching results:", error);
    throw error;
  }
};

/**
 * Execute Code using Piston API
 */
const PISTON_API = axios.create({ baseURL: "https://emkc.org/api/v2/piston" });
const baseURL3 = import.meta.env.VITE_API_URL3;

// export const executeCode = async (language, sourceCode) => {
//   const { data } = await PISTON_API.post("/execute", {
//     language,
//     version: LANGUAGE_VERSIONS[language],
//     files: [{ content: sourceCode }],
//   });
//   return data;
// };

// export const executeCode = async (language, code, problemId) => {
//   // await axios.get(`${baseURL3}/problems`);
//   const data = await axios.post(`${baseURL3}/submit`, {
//     language,
//     code,
//     problemId,
//   });

//   return data.data["results"];
// };

export const executeCode = async (language, code, problemId) => {
  try {
    console.log("problemId",problemId);
    const response = await axios.post(`${baseURL3}/submit`, {
      language,
      code,
      problemId,
    });

    if (response.data.error) {
      console.log(response.data.details);
      return { error: response.data.error, details: response.data.details };
    }

    return (
      response.data.results ||
      response.data.output || { error: "Unexpected response format" }
    );
  } catch (error) {
    return {
      error: "API Request Failed",
      details: error.response?.data?.details || error.message,
    };
  }
};

export const updateTheCodeToDB = async (problem_id, student_id, marks, code, status) => {
  try {
    const token = getAuthToken();

    const response = await axios.post(
      `${baseURL2}/competition/submit-problem`,
      {
        problem_id,
        student_id,
        marks,
        code,
        status, // Fixed naming from statusIs to status
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

    return {
      error: "API Request Failed",
      details: error.response?.data?.details || error.message,
    };
  }
};

