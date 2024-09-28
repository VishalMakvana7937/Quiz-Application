import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/quizzes'; // Replace with your backend URL

export const fetchQuizzes = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    throw error;
  }
};

export const fetchQuizById = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/${id}`);
  return response.data;
};

export const submitQuiz = async (id, userAnswers) => {
  const response = await axios.post(`${API_BASE_URL}/${id}/submit`, { userAnswers });
  return response.data;
};
