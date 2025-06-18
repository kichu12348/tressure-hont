import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import styles from './Level1.module.css';

const Level1: React.FC = () => {
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const { advanceLevel } = useGame();
  const navigate = useNavigate();

  // The answer to the puzzle
  const correctAnswer = 'password';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (answer.toLowerCase().trim() === correctAnswer) {
      setError('');
      setSuccess(true);
      advanceLevel();
    } else {
      setError('Incorrect answer. Try again.');
    }
  };

  const navigateToNextLevel = () => {
    navigate('/level/2');
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>LEVEL 1: Text Clue Puzzle</h1>
        <p>Solve the riddle to unlock the next level.</p>
      </header>
      
      <div className={styles.panel}>
        <div className={`${styles.clueText} no-select`}>
          I am a construct of compliance,<br />
          Forged beneath constraint and choice.<br />
          Entropy defines my strength,<br />
          Yet routine erodes my voice.<br /><br />
          
          I precede permission.<br />
          I follow identity.<br />
          I am required, but not remembered.<br />
          I am known, yet never seen.<br /><br />
          
          When I mirror predictability,<br />
          I become your greatest flaw.
        </div>
        
        {!success ? (
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <span className={styles.inputPrefix}>&gt; </span>
              <input
                type="text"
                value={answer}
                onChange={e => setAnswer(e.target.value)}
                className={styles.input}
                placeholder="Enter your answer"
                autoFocus
              />
            </div>
            
            <button type="submit" className={styles.button}>
              SUBMIT ANSWER
            </button>
            
            {error && <div className={styles.error}>{error}</div>}
          </form>
        ) : (
          <div className={styles.success}>
            <p>ACCESS GRANTED! Level 2 unlocked.</p>
            <button 
              onClick={navigateToNextLevel} 
              className={`${styles.button} ${styles.navigateButton}`}
            >
              PROCEED TO LEVEL 2
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Level1;
