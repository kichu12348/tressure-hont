import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { GameProvider, useGame } from './context/GameContext';
import NameModal from './components/Modal/NameModal';
import LoadingScreen from './components/LoadingScreen/LoadingScreen';
import Footer from './components/Footer/Footer';
import Home from './pages/Home';
import Level1 from './pages/Level1';
import Level2 from './pages/Level2';
import Level3 from './pages/Level3';
import Level4 from './pages/Level4';

import './App.css';


// Protected route component
const ProtectedRoute = ({ element, requiredLevel }: { element: JSX.Element, requiredLevel: number }) => {
  const { name, currentLevel } = useGame();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Show loading screen briefly when changing levels
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!name) {
    return <Navigate to="/" />;
  }

  if (currentLevel < requiredLevel) {
    return <Navigate to="/" />;
  }

  return loading ? <LoadingScreen /> : element;
};

const AppContent: React.FC = () => {
  const { name } = useGame();
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    // Show initial loading screen
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (initialLoading) {
    return <LoadingScreen onLoadingComplete={() => setInitialLoading(false)} />;
  }

  return (
    <div className="app-container">
      {!name && <NameModal />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/level/1" element={<ProtectedRoute element={<Level1 />} requiredLevel={1} />} />
        <Route path="/level/2" element={<ProtectedRoute element={<Level2 />} requiredLevel={2} />} />
        <Route path="/level/3" element={<ProtectedRoute element={<Level3 />} requiredLevel={3} />} />
        <Route path="/level/4" element={<ProtectedRoute element={<Level4 />} requiredLevel={4} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <GameProvider>
      <Router>
        <AppContent />
      </Router>
    </GameProvider>
  );
}

export default App;
