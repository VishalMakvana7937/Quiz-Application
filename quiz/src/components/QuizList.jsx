import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchQuizzes } from '../api';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Grid,
  Container,
  Box,
  Chip,
} from '@mui/material';
import { AccessAlarm, QuestionAnswer } from '@mui/icons-material'; // Importing MUI icons

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const getQuizzes = async () => {
      try {
        const data = await fetchQuizzes();
        setQuizzes(data);
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      }
    };
    getQuizzes();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ my: 4 }}>
      <Typography variant="h2" gutterBottom align="center">
        Available Quizzes
      </Typography>
      <Grid container spacing={4}>
        {quizzes.map((quiz) => (
          <Grid item xs={12} sm={6} md={4} key={quiz._id}>
            <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <CardMedia
                component="img"
                alt={quiz.title}
                height="140" // You can adjust the height as needed
                image={quiz.image || 'https://via.placeholder.com/300'} // Use a placeholder if no image is provided
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5">{quiz.title}</Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {quiz.description}
                </Typography>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Chip
                    icon={<AccessAlarm />}
                    label="Time Limit: 10 mins" // Customize as per your data
                    color="primary"
                  />
                  <Chip
                    icon={<QuestionAnswer />}
                    label={`${quiz.questions.length} Questions`} // Example dynamic value
                    color="secondary"
                  />
                </Box>
              </CardContent>
              <Box sx={{ p: 2 }}>
                <Link to={`/quiz/${quiz._id}`} style={{ textDecoration: 'none' }}>
                  <Button variant="contained" color="primary" fullWidth>
                    Start Quiz
                  </Button>
                </Link>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default QuizList;
