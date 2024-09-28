import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Updated imports
import QuizList from './components/QuizList';
import QuizPage from './components/QuizPage';
import ScoreSummary from './components/ScoreSummary';
import './App.css';

function App() {
  return (

      <div className="container">
        <Routes>
          <Route path="/" element={<QuizList />} />
          <Route path="/quiz/:id" element={<QuizPage />} />
          <Route path="/score" element={<ScoreSummary />} />
        </Routes>
      </div>

  );
}

export default App;
