const express = require('express');
const { getQuizzes, getQuizById, submitQuiz, createQuiz } = require('../controllers/quizController');
const router = express.Router();

// Get all quizzes
router.get('/', getQuizzes);

// Get quiz by ID
router.get('/:id', getQuizById);

// Submit quiz
router.post('/:id/submit', submitQuiz);

// Create a new quiz
router.post('/', createQuiz);

module.exports = router;
