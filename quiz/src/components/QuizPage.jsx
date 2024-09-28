import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchQuizById, submitQuiz } from '../api';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  CircularProgress,
  Container,
  Box,
  LinearProgress,
  Chip,
  Tooltip,
} from '@mui/material';
import {
  CheckCircle,
  ArrowForward,
  Save,
  HelpOutline,
  QuestionAnswer,
} from '@mui/icons-material';

const QuizPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timer, setTimer] = useState(120);

  useEffect(() => {
    const getQuiz = async () => {
      try {
        const data = await fetchQuizById(id);
        setQuiz(data);
      } catch (error) {
        console.error("Error fetching quiz:", error);
      }
    };
    getQuiz();

    const timerInterval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(timerInterval);
          handleSubmit();
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [id]);

  const handleAnswerSelect = (questionIndex, answer) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionIndex]: answer,
    }));
  };

  const handleSubmit = async () => {
    try {
      const result = await submitQuiz(id, userAnswers);
      navigate('/score', { state: { result } });
    } catch (error) {
      console.error("Error submitting quiz:", error);
    }
  };

  const handleNextQuestion = () => {
    setCurrentQuestion((prev) => prev + 1);
  };

  if (!quiz) return <CircularProgress />; // Show a loading spinner while fetching

  const currentQ = quiz.questions[currentQuestion];

  return (
    <Container maxWidth="md" sx={{ my: 4 }}>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {quiz.title}
          </Typography>
          <Chip
            icon={<HelpOutline />}
            label={`Question ${currentQuestion + 1} of ${quiz.questions.length}`}
            color="info"
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <LinearProgress
            variant="determinate"
            value={(currentQuestion + 1) / quiz.questions.length * 100}
            sx={{ mb: 2 }}
          />
          <Typography variant="h6" gutterBottom>
            <QuestionAnswer /> {currentQ.questionText}
          </Typography>
          <Typography variant="body1" color="error" gutterBottom>
            Time Remaining: {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
          </Typography>
          <Grid container spacing={2} style={{ marginTop: '10px' }}>
            {currentQ.answerChoices.map((choice, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Tooltip title="Select this answer" arrow>
                  <Button
                    variant={userAnswers[currentQuestion] === choice ? 'contained' : 'outlined'}
                    color={userAnswers[currentQuestion] === choice ? 'success' : 'primary'}
                    onClick={() => handleAnswerSelect(currentQuestion, choice)}
                    fullWidth
                    endIcon={userAnswers[currentQuestion] === choice ? <CheckCircle /> : null}
                  >
                    {choice}
                  </Button>
                </Tooltip>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
        {currentQuestion < quiz.questions.length - 1 ? (
          <Button
            onClick={handleNextQuestion}
            variant="contained"
            color="primary"
            endIcon={<ArrowForward />}
            sx={{ flexGrow: 1, marginRight: '10px' }}
          >
            Next Question
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="success"
            endIcon={<Save />}
            sx={{ flexGrow: 1 }}
          >
            Submit Quiz
          </Button>
        )}
      </Box>
    </Container>
  );
};

export default QuizPage;
