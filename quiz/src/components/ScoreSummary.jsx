import React from 'react';
import { useLocation } from 'react-router-dom';
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Grid,
  Button,
  Box,
  Chip,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; // Correctly imported
import ReplayIcon from '@mui/icons-material/Replay';
import { green } from '@mui/material/colors';

const ScoreSummary = () => {
  const location = useLocation();
  const { result } = location.state || {};

  if (!result) return <div>No results to display</div>;

  return (
    <Box sx={{ padding: 4, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Grid container spacing={4} justifyContent="center">
        {/* Score Card */}
        <Grid item xs={12} md={6}>
          <Card variant="outlined" sx={{ padding: 3, textAlign: 'center', boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h4" gutterBottom>
                Your Score: {result.score}/{result.totalQuestions}
              </Typography>
              <Chip
                label={result.score / result.totalQuestions >= 0.7 ? "Great job!" : "Keep trying!"}
                color={result.score / result.totalQuestions >= 0.7 ? "success" : "warning"}
                sx={{ marginBottom: 2 }}
              />
              <Typography variant="body1" color="text.secondary">
                {result.score / result.totalQuestions >= 0.7
                  ? "You passed the quiz!"
                  : "Don't worry, try again!"}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Correct Answers Card */}
        <Grid item xs={12} md={6}>
          <Card variant="outlined" sx={{ padding: 3, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Correct Answers
              </Typography>
              <List>
                {result.correctAnswers.map((answer, index) => (
                  <React.Fragment key={index}>
                    <ListItem>
                      <CheckCircleIcon sx={{ color: green[500], marginRight: 1 }} />
                      <ListItemText
                        primary={<strong>Q{index + 1}:</strong>}
                        secondary={
                          <>
                            {answer.questionText}
                            <br />
                            <strong>Correct Answer:</strong> {answer.correctAnswer}
                          </>
                        }
                      />
                    </ListItem>
                    {index < result.correctAnswers.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Button
        variant="contained"
        color="primary"
        startIcon={<ReplayIcon />}
        sx={{ marginTop: 4, padding: '10px 20px', borderRadius: '20px' }}
        onClick={() => window.location.reload()}
      >
        Retake Quiz
      </Button>
    </Box>
  );
};

export default ScoreSummary;
