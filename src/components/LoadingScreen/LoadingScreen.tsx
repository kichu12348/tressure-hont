import React, { useState, useEffect } from 'react';
import styles from './LoadingScreen.module.css';

interface LoadingScreenProps {
  onLoadingComplete?: () => void;
  loadingTime?: number; // Time in milliseconds
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ 
  onLoadingComplete,
  loadingTime = 3000 // Default loading time: 3 seconds
}) => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);
  
  const loadingTexts = [
    "Initializing security protocols...",
    "Establishing secure connection...",
    "Decrypting mission data...",
    "Authenticating access...",
    "Loading mission parameters..."
  ];

  // Handle loading progress
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            if (onLoadingComplete) onLoadingComplete();
          }, 500);
          return 100;
        }
        return prev + 1;
      });
    }, loadingTime / 100);

    return () => clearInterval(interval);
  }, [loadingTime, onLoadingComplete]);

  // Blinking cursor effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 500);
    
    return () => clearInterval(cursorInterval);
  }, []);

  // Change loading text over time
  useEffect(() => {
    const textInterval = setInterval(() => {
      const textIndex = Math.floor((progress / 100) * loadingTexts.length);
      const currentText = loadingTexts[Math.min(textIndex, loadingTexts.length - 1)];
      setLoadingText(currentText);
    }, 500);
    
    return () => clearInterval(textInterval);
  }, [progress]);

  return (
    <div className={styles.loadingScreen}>
      <div className={styles.content}>
        <h1 className={styles.title}>SYSTEM BOOT</h1>
        
        <div className={styles.terminal}>
          <div className={styles.terminalHeader}>
            <span>TERMINAL WINDOW</span>
          </div>
          <div className={styles.terminalBody}>
            <div className={styles.terminalLine}>
              $ {loadingText}{cursorVisible ? '_' : ' '}
            </div>
            
            <div className={styles.progressContainer}>
              <div 
                className={styles.progressBar} 
                style={{ width: `${progress}%` }}
              ></div>
              <div className={styles.progressText}>
                {progress}% COMPLETE
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* IEDC Branding */}
      <div className={styles.branding}>
        <img src="/iedc_logo.svg" alt="IEDC Logo" className={styles.brandingLogo} />
        <span>Powered by IEDC</span>
      </div>
    </div>
  );
};

export default LoadingScreen;
