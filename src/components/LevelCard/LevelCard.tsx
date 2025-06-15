import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LevelCard.module.css';

interface LevelCardProps {
  level: number;
  title: string;
  status: 'locked' | 'unlocked' | 'completed';
}

const LevelCard: React.FC<LevelCardProps> = ({ level, title, status }) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    if (status !== 'locked') {
      navigate(`/level/${level}`);
    }
  };
  
  return (
    <div 
      className={`${styles.card} ${styles[status]}`}
      onClick={handleClick}
    >
      {status === 'locked' && (
        <span className={`${styles.statusIcon} ${styles.lockedIcon}`}>🔒</span>
      )}
      
      {status === 'completed' && (
        <span className={`${styles.statusIcon} ${styles.completedIcon}`}>✓</span>
      )}
      
      <div className={styles.levelNumber}>LEVEL {level}</div>
      <div className={styles.levelTitle}>{title}</div>
      
      {status === 'locked' && <div>ACCESS DENIED</div>}
      {status === 'unlocked' && <div className="glow">AUTHORIZED</div>}
      {status === 'completed' && <div>COMPLETED</div>}
    </div>
  );
};

export default LevelCard;
