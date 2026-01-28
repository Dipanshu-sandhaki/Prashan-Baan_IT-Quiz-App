import axios from "axios";

const baseURL = "https://prashnaban.onrender.com/api/v1";
const baseURL2 = "https://prashnaban.onrender.com/api/v1";
const getAuthToken = () => localStorage.getItem("token");
const token = getAuthToken();


// Get All Student Data
export const getAllStudent = (async (page = 1, limit = 10) => {
    try {
        const response = await axios.get(`${baseURL}/admin/all-users`, {
            params: { page, limit },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data['data'];
    } catch (error) {
        console.error("Error fetching quiz questions:", error);
        throw error;
    }
});

// Add new student or user into the database
export const addNewStudent = async (username, name, number, password) => {
    try {
        const response = await axios.post(`${baseURL}/auth/register`,
            {
                "name": name,
                "username": username,
                "number": number,
                "password": password,
            }, { headers: { "Content-Type": "application/json" }, Authorization: `Bearer ${token}`,});
        return response;
    } catch (error) {
        console.error("Error in addNewStudent:", error.response?.data || error.message);
        throw error;
    }
};

// Delete a student or user from the database
export const deleteUser = async (id) => {
    try {
      const token = localStorage.getItem("token"); // or get it from your auth context/state
  
      const response = await axios.delete(
        `${baseURL}/admin/delete-user/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      console.log(response);
      return response;
    } catch (error) {
      console.error("Error in Delete student:", error.response?.data || error.message);
      throw error;
    }
  };
  


// Get All Quiz Data
export const getAllQuizzes = (async () => {
    try {
        const response = await axios.get(`${baseURL}/admin/all-quizzes`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        console.log(response.data);
        return response.data['data']['data'];

    } catch (error) {
        console.error("Error fetching quiz questions:", error);
        throw error;
    }
});
// Add new quiz 
export const addNewQuiz = async (quizData) => {
    try {
        const response = await axios.post(`${baseURL}/admin/create-quiz`, quizData,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            }
        );
        console.log(response);
        return response;
    } catch (error) {
        console.log(error)
        console.error("Error in addNewStudent:", error.response?.data || error.message);
        throw error;
    }
}
// Get All the question of a quiz buy id
export const quizAllQuestions = async (id, page = 1, limit = 10) => {
    try {
        const response = await axios.get(
            `${baseURL}/admin/get-question/${id}?page=${page}&limit=${limit}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response;
    } catch (error) {
        console.error("Error in quiz:", error.response?.data || error.message);
        throw error;
    }
};

// Get All the coding questions
export const allCodingQuestions = async (page = 1, limit = 10) => {
    try {
        const response = await axios.get(
            `${baseURL}/admin/all-problems?page=${page}&limit=${limit}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data.data;
    } catch (error) {
        console.error("Error in quiz:", error.response?.data || error.message);
        throw error;
    }
};

// Add new quiz 
export const addNewCodingProblem = async (quizData) => {
    try {
        const response = await axios.post(`${baseURL2}/admin/add-problem`, quizData,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            }
        );
        console.log(response);
        return response;
    } catch (error) {
        console.log(error)
        console.error("Error in addNewStudent:", error.response?.data || error.message);
        throw error;
    }
}

// update Coding Problem By Id
export const handleUpdateProblem = async (problemId) => {
    try {
        const response = await axios.put(`${baseURL2}/admin/problem/${problemId}`, {
            title,
            description,
            marks,
            negative_marks,
            testCases,
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (err) {
        console.error("Failed to update problem", "error");
        throw error;
    }
};

// Delete Test case
export const deleteTestCase = async (problemId, testCaseId) => {
    try {
        const response = await axios.delete(`${baseURL2}/admin/delete-problem/${problemId}/testcase/${testCaseId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (err) {
        console.error("Failed to delete test case", "error");
        throw error;
    }
}

// Delete Coding Problem By Id
export const deleteCodingProblem = async (problemId) => {
    try {
        const response = await axios.delete(`${baseURL2}/admin/delete-problem/${problemId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (err) {
        console.error("Failed to delete test case", "error");
        throw error;
    }
}


// Add new quiz 
export const addNewQuestion = async (id, questionData) => {
    try {
        const response = await axios.post(`${baseURL}/admin/add-question/${id}`, questionData,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            }
        );
        console.log(response);
        return response;
    } catch (error) {
        console.log(error)
        console.error("Error in addNewStudent:", error.response?.data || error.message);
        throw error;
    }
}

// Get Quiz By Id
export const getQuizById = async (id) => {
    try {
        const response = await axios.get(`${baseURL2}/admin//get-quiz/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        console.log(response.data['data']);
        return response.data['data'];

    }
    catch (error) {
        console.error("Error fetching quiz questions:", error);
        throw error;
    }
}

// Update Quiz By Id
export const updateQuizById = async (id, data) => {
    try {
        const response = await axios.post(`${baseURL2}/admin/update-quiz/${id}`, { data },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            }
        );
        console.log(response);
        return response;
    } catch (error) {
        console.log(error)
        console.error("Error in DeleteQuiz:", error.response?.data || error.message);
        throw error;
    }
};

// Delete a Quiz By Id
export const deleteQuizById = async (id) => {
    try {
        const response = await axios.post(`${baseURL2}/admin/delete-quiz/${id}`, {},
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            }
        );
        console.log(response);
        return response;
    } catch (error) {
        console.log(error)
        console.error("Error in DeleteQuiz:", error.response?.data || error.message);
        throw error;
    }
};

// Get Result of Student 
export const getResult = async () => {
    try {
        const response = await axios.get(`${baseURL2}/admin/results`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        return response.data['data'];
    } catch (error) {
        console.error("Error fetching quiz questions:", error);
        throw error;
    }
};


export const getResultsByQuizId = async (quizId) => {
    try {
        const response = await axios.get(`${baseURL}/admin/results/${quizId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return response.data; // No need for .json()
    } catch (error) {
        console.error("❌ Failed to fetch results:", error.response?.data || error.message);
        return { error: "Failed to fetch results" };
    }
};


// Get data of dashboard
export const getDashboardData = (async () => {
    try {
        const response = await axios.get(`${baseURL2}/admin/all-data`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        return response.data['data'];

    } catch (error) {
        console.error("Error fetching quiz questions:", error);
        throw error;
    }
});


export const updateCodingProblem = async (problemId, data) => {
    try {
        const response = await axios.post(`${baseURL2}/admin/update-problem/${problemId}`, data,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });

        return response; // or response, depending on your backend setup
    }
    catch (error) {
        console.error("Error updating problem:", error);
        throw error;
    }
};


// Get token from localStorage
const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    };
};

// Generate Student Result
export const generateResult = async (quiz_id) => {
    try {
        console.log(quiz_id);
        const response = await axios.post(
            `${baseURL2}/admin/generate-result/${quiz_id}`,
            {},
            { headers: getAuthHeaders() }
        );

        return response;
    } catch (error) {
        console.error("Error in Generating Result:", error.response?.data || error.message);
        throw error;
    }
};

// Generate or Show Student Result
export const generateOrShowResult = async (quiz_id) => {
    try {

        console.log("My token is:", token);
        console.log("Quiz ID is:", quiz_id);
        // ✅ Correct URL now using quiz_id as a route param
        const resultRes = await axios.get(`${baseURL2}/admin/results/${quiz_id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        console.log(resultRes);

        const existingResults = resultRes.data?.data || [];

        if (existingResults.length > 0) {
            console.log("✅ Result already exists.");
            return {
                status: "exists",
                data: existingResults,
            };
        }

        // Generate result if not exists
        const generateRes = await axios.post(
            `${baseURL2}/admin/generate-result/${quiz_id}`,
            {},
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        // Fetch the result again after generation
        const newResult = await axios.get(`${baseURL2}/admin/results/${quiz_id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        console.log("✅ Result generated and fetched.");
        return {
            status: "generated",
            data: newResult.data?.data,
        };
    } catch (error) {
        console.error("❌ Error generating/showing result:", error.response?.data || error.message);
        throw error;
    }
};





