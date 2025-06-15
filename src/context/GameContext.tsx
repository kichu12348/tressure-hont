import React, { createContext, useState, useContext, useEffect } from 'react';

interface GameContextType {
  name: string;
  currentLevel: number;
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  email?: string;
  advanceLevel: () => void;
}

const GameContext = createContext<GameContextType>({
  name: '',
  currentLevel: 1,
  setName: () => {},
  advanceLevel: () => {},
  setEmail: () => {},
  email: ''
});

export const useGame = () => useContext(GameContext);

interface GameProviderProps {
  children: React.ReactNode;
}

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const [name, setNameState] = useState<string>('');
  const [email, setEmailState] = useState<string>('');
  const [currentLevel, setCurrentLevel] = useState<number>(1);
  
  // Load state from localStorage on initial load
  useEffect(() => {
    const savedName = localStorage.getItem('treasureHunt_name');
    const savedLevel = localStorage.getItem('treasureHunt_level');
    const savedEmail = localStorage.getItem('treasureHunt_email');
    if (savedEmail) {
      setEmailState(savedEmail);
    }
    
    if (savedName) {
      setNameState(savedName);
    }
    
    if (savedLevel) {
      setCurrentLevel(parseInt(savedLevel, 10));
    }
  }, []);
  
  const setName = (newName: string) => {
    setNameState(newName);
    localStorage.setItem('treasureHunt_name', newName);
  };

  const setEmail = (newEmail: string) => {
    setEmailState(newEmail);
    localStorage.setItem('treasureHunt_email', newEmail);
  }
  
  const advanceLevel = () => {
    const newLevel = currentLevel + 1;
    setCurrentLevel(newLevel);
    localStorage.setItem('treasureHunt_level', newLevel.toString());
  };
  
  return (
    <GameContext.Provider value={{ name, currentLevel, setName, advanceLevel, setEmail, email }}>
      {children}
    </GameContext.Provider>
  );
};
