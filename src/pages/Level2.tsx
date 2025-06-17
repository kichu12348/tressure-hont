import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import quizQuestions, { Question } from '../utils/quizData';
import styles from './Level2.module.css';

const Level2: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [quizEnded, setQuizEnded] = useState(false);
  const [passed, setPassed] = useState(false);
  
  const { advanceLevel } = useGame();
  const navigate = useNavigate();
  
  // Shuffle questions on component mount
  const [questions, setQuestions] = useState<Question[]>([]);
  
  useEffect(() => {
    const shuffled = [...quizQuestions].sort(() => 0.5 - Math.random());
    setQuestions(shuffled.slice(0, 8)); // Only use 8 questions
  }, []);

  // Timer
  useEffect(() => {
    if (timeLeft > 0 && !quizEnded) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !quizEnded) {
      endQuiz();
    }
  }, [timeLeft, quizEnded]);

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    // Check if answer is correct
    if (selectedOption === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
    
    // Move to next question or end quiz if all questions answered
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption('');
    } else {
      endQuiz();
    }
  };

  const endQuiz = () => {
    setQuizEnded(true);
    if (score + (selectedOption === questions[currentQuestion]?.correctAnswer ? 1 : 0) >= 5) {
      setPassed(true);
      advanceLevel();
    }
  };

  const restartQuiz = () => {
    const shuffled = [...quizQuestions].sort(() => 0.5 - Math.random());
    setQuestions(shuffled.slice(0, 8));
    setCurrentQuestion(0);
    setSelectedOption('');
    setScore(0);
    setTimeLeft(60);
    setQuizEnded(false);
    setPassed(false);
  };

  const navigateToNextLevel = () => {
    navigate('/level/3');
  };

  // Loading state
  if (questions.length === 0) {
    return <div className={styles.container}>Loading quiz...</div>;
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>LEVEL 2: Timed STEM Quiz</h1>
        <p>Answer at least 5 questions correctly to proceed.</p>
      </header>
      
      {!quizEnded ? (
        <>
          <div className={`${styles.timer} ${timeLeft <= 10 ? styles.dangerTimer : ''}`}>
            {timeLeft}
          </div>
          
          <div className={styles.panel}>
            <div className={styles.questionText}>
              {`${currentQuestion + 1}/${questions.length}: ${questions[currentQuestion].text}`}
            </div>
            
            <div className={styles.options}>
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  className={`${styles.option} ${selectedOption === option ? styles.selected : ''}`}
                  onClick={() => handleOptionSelect(option)}
                >
                  {option}
                </button>
              ))}
            </div>
            
            <button 
              className={styles.button} 
              onClick={handleNextQuestion}
              disabled={!selectedOption}
            >
              {currentQuestion < questions.length - 1 ? 'NEXT QUESTION' : 'FINISH QUIZ'}
            </button>
          </div>
        </>
      ) : (
        <div className={styles.panel}>
          <div className={styles.results}>
            <h2>Quiz Complete</h2>
            <div className={`${styles.score} ${passed ? styles.highScore : styles.lowScore}`}>
              Your score: {score}/{questions.length}
            </div>
            
            {passed ? (
              <>
                <div className={styles.success}>
                  ACCESS GRANTED! Level 3 unlocked.
                </div>
                <div className={styles.clueText}>
                  <p>CLUE FOR LEVEL 3:</p>
                  <p>TREASURE</p>
                </div>
                <button 
                  onClick={navigateToNextLevel} 
                  className={styles.button}
                >
                  PROCEED TO LEVEL 3
                </button>
              </>
            ) : (
              <>
                <p>You need at least 5 correct answers to proceed. Try again!</p>
                <button onClick={restartQuiz} className={styles.button}>
                  RESTART QUIZ
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Level2;
