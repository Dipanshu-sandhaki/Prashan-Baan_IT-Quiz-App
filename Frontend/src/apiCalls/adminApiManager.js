import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL;
const baseURL2 = import.meta.env.VITE_API_URL2;
const getAuthToken = () => localStorage.getItem("token");
const token = getAuthToken();


// Get All Student Data
export const getAllStudent = (async (page = 1, limit = 10) => {
    try {
        const response = await axios.get(`http://localhost:3000/api/v1/admin/all-users`, {
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
            }, { headers: { "Content-Type": "application/json" }, });
        return response;
    } catch (error) {
        console.error("Error in addNewStudent:", error.response?.data || error.message);
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
export const getResult = (async () => {
    try {
        const response = await axios.get(`${baseURL2}/admin/results`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        console.log(response.data.data);
        return response.data['data'];

    } catch (error) {
        console.error("Error fetching quiz questions:", error);
        throw error;
    }
});

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



// Generate Student Result
export const generateResult = async (quiz_id) => {
    try {
        console.log(quiz_id)
        const response = await axios.post(`${baseURL2}/admin/generate-result/${quiz_id}`,{},
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            }
        );

        return response;
    } catch (error) {
        console.log(error)
        console.error("Error in Generating Result:", error.response?.data || error.message);
        throw error;
    }
}