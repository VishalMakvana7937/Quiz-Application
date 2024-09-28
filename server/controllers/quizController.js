const Quiz = require('../models/quizModel');

// Create a new quiz
const createQuiz = async (req, res) => {
  const { quizzes } = req.body;

  if (!quizzes || quizzes.length === 0) {
    return res.status(400).json({ message: 'At least one quiz is required' });
  }

  try {
    const createdQuizzes = [];

    for (let quiz of quizzes) {
      const { title, description, questions } = quiz;

      // Validate each quiz
      if (!title || !questions || questions.length === 0) {
        return res.status(400).json({ message: 'Title and questions are required for each quiz' });
      }

      const newQuiz = new Quiz({
        title,
        description,
        questions
      });

      const savedQuiz = await newQuiz.save();
      createdQuizzes.push(savedQuiz);
    }

    res.status(201).json({
      message: `${createdQuizzes.length} quizzes created successfully`,
      quizzes: createdQuizzes
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all quizzes
const getQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.status(200).json(quizzes);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get a quiz by ID
const getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    res.status(200).json(quiz);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Submit quiz and calculate score
const submitQuiz = async (req, res) => {
  const { userAnswers } = req.body;
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    // Calculate score
    let score = 0;
    const correctAnswers = [];
    quiz.questions.forEach((question, index) => {
      if (question.correctAnswer === userAnswers[index]) {
        score++;
        correctAnswers.push({ questionText: question.questionText, correctAnswer: question.correctAnswer });
      }
    });

    res.status(200).json({
      score,
      totalQuestions: quiz.questions.length,
      correctAnswers
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getQuizzes,
  getQuizById,
  submitQuiz,
  createQuiz
};
