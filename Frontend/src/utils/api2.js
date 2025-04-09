import axios from "axios";
import { LANGUAGE_VERSIONS } from "./constants";

const API_BASE_URL = import.meta.env.VITE_API_URL;

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
    const response = await fetch(`${API_BASE_URL}/admin/user`);
    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }
    const data = await response.json();
    return data.name || "User";
  } catch (error) {
    console.error("Error fetching user data:", error);
    return "User";
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
 * Fetch all students (Admin Panel)
 */
export const fetchStudents = async () => {
  try {
    const { data } = await apiClient.get("/admin/all-users");
    return data.map((user, index) => ({
      id: `UU${index + 1}`,
      name: user.name,
      dob: user.dob.replace(/-/g, ""),
    }));
  } catch (error) {
    console.error("Error fetching students:", error);
    throw error;
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

export const executeCode = async (language, sourceCode) => {
  const { data } = await PISTON_API.post("/execute", {
    language,
    version: LANGUAGE_VERSIONS[language],
    files: [{ content: sourceCode }],
  });
  return data;
};
