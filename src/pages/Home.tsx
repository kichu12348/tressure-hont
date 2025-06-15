import React from 'react';
import { useGame } from '../context/GameContext';
import LevelCard from '../components/LevelCard/LevelCard';
import styles from './Home.module.css';

const Home: React.FC = () => {
  const { name, currentLevel } = useGame();
  
  const levels = [
    { id: 1, title: 'Text Clue Puzzle' },
    { id: 2, title: 'Timed STEM Quiz' },
    { id: 3, title: 'Cipher Challenge' },
    { id: 4, title: 'Final Submission' }
  ];

  const getLevelStatus = (levelId: number) => {
    if (levelId < currentLevel) return 'completed';
    if (levelId === currentLevel) return 'unlocked';
    return 'locked';
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Treasure Hunt Terminal</h1>
        <p className={styles.subtitle}>
          Welcome, <span className={styles.userName}>{name}</span>. 
          Complete each level to unlock the next challenge.
        </p>
      </header>
      
      <div className={styles.levelsGrid}>
        {levels.map(level => (
          <LevelCard 
            key={level.id}
            level={level.id}
            title={level.title}
            status={getLevelStatus(level.id)}
          />
        ))}
      </div>
      
      <footer className={styles.footer}>
        <p>USER: {name} | CURRENT ACCESS LEVEL: {currentLevel}</p>
        <p>SYSTEM TIME: {new Date().toLocaleString()}</p>
      </footer>
    </div>
  );
};

export default Home;
