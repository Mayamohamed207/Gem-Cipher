import React, { useState, useEffect, useCallback } from 'react';
import HomePage from './pages/HomePage/HomePage';
import MapPage from './pages/MapPage/MapPage';
import QuestionsPage from './pages/QuestionsPage/QuestionsPage';
import GameChallengePage from './pages/GameChallengePage/GameChallengePage';
import type { UserInfo } from './pages/HomePage/HomePage';
import './App.css';

const AppStage = {
  HOME_INFO: '/',
  MAP_SELECTION: '/map',
  QUESTIONS: '/questions',
  GAME_CHALLENGE: '/game-challenge',
} as const;

type AppStageType = (typeof AppStage)[keyof typeof AppStage];

const App: React.FC = () => {
  const [currentStage, setCurrentStage] = useState<AppStageType>(AppStage.HOME_INFO);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [selectedMode, setSelectedMode] = useState<'kids' | 'learning' | 'game' | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string | undefined>(undefined);
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Apply theme class to both body AND html on mount and when theme changes
  useEffect(() => {
    const themeClass = isDarkMode ? 'dark-mode' : 'light-mode';
    const removeClass = isDarkMode ? 'light-mode' : 'dark-mode';
    
    document.body.classList.remove(removeClass);
    document.body.classList.add(themeClass);
    document.documentElement.classList.remove(removeClass);
    document.documentElement.classList.add(themeClass);
    
    console.log('Theme changed to:', themeClass); // Debug log
  }, [isDarkMode]);

  const getHashStage = useCallback((hash: string): AppStageType => {
    const path = hash.slice(1) || '/';
    if (path.startsWith(AppStage.GAME_CHALLENGE)) return AppStage.GAME_CHALLENGE;
    if (path.startsWith(AppStage.QUESTIONS)) return AppStage.QUESTIONS;
    if (path.startsWith(AppStage.MAP_SELECTION)) return AppStage.MAP_SELECTION;
    return AppStage.HOME_INFO;
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      const newStage = getHashStage(hash);
      setCurrentStage(newStage);
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [getHashStage]);

  const handleInitialSelect = (id: string, info: UserInfo) => {
    setUserInfo(info);
    setSelectedMode(id as 'kids' | 'learning' | 'game');
    window.location.hash = AppStage.MAP_SELECTION;
  };

  const handleRoomSelect = (roomId: string, level?: string) => {
    setSelectedRoom(roomId);
    setSelectedLevel(level);
    if (selectedMode === 'game') {
      window.location.hash = AppStage.GAME_CHALLENGE;
      return;
    }
    if (selectedMode === 'kids' || selectedMode === 'learning') {
      window.location.hash = AppStage.QUESTIONS;
    }
  };

  const handleGameChallengeComplete = () => {
    setSelectedRoom(null);
    window.location.hash = AppStage.MAP_SELECTION;
  };

  const handleQuestionsFinish = () => {
    alert('Your experience data has been logged! Returning to experience selection.');
    setUserInfo(null);
    setSelectedMode(null);
    setSelectedRoom(null);
    setSelectedLevel(undefined);
    window.location.hash = AppStage.HOME_INFO;
  };

  const toggleTheme = () => {
    setIsDarkMode(prev => {
      console.log('Toggling from', prev ? 'dark' : 'light', 'to', !prev ? 'dark' : 'light');
      return !prev;
    });
  };

  // Determine which page component to render
  let CurrentComponent = null;

  if (currentStage === AppStage.HOME_INFO) {
    CurrentComponent = (
      <HomePage 
        onExperienceSelect={handleInitialSelect} 
        onToggleTheme={toggleTheme} 
        isDark={isDarkMode} 
      />
    );
  } else if (currentStage === AppStage.MAP_SELECTION && selectedMode) {
    CurrentComponent = (
      <MapPage 
        mode={selectedMode} 
        onRoomSelected={handleRoomSelect}
     
      />
    );
  } else if (currentStage === AppStage.GAME_CHALLENGE) {
    const hashParts = window.location.hash.split('/').filter(p => p);
    const roomFromHash = hashParts[1];
    const finalRoom = selectedRoom || roomFromHash;
    if (finalRoom) {
      CurrentComponent = (
        <GameChallengePage 
          room={finalRoom} 
          onComplete={handleGameChallengeComplete}
        
        />
      );
    }
  } else if (currentStage === AppStage.QUESTIONS) {
    const hashParts = window.location.hash.split('/').filter(p => p);
    const [modeFromHash, roomFromHash, levelFromHash] = hashParts.slice(1);
    const finalMode = selectedMode || (modeFromHash as 'kids' | 'learning' | 'game');
    const finalRoom = selectedRoom || roomFromHash;
    const finalLevel = selectedLevel || (levelFromHash !== 'none' ? levelFromHash : undefined);
    if (finalMode && finalRoom) {
      CurrentComponent = (
        <QuestionsPage
          mode={finalMode}
          room={finalRoom}
          level={finalLevel}
          onFinish={handleQuestionsFinish}
        
        />
      );
    }
  }

  if (!CurrentComponent) {
    CurrentComponent = (
      <div className="fallbackPage">
        <h1>404 Not Found</h1>
        <p>The path you seek does not exist.</p>
        <button onClick={() => window.location.hash = AppStage.HOME_INFO}>
          Return Home
        </button>
      </div>
    );
  }

  return (
    <div className={`App ${isDarkMode ? 'theme-dark' : 'theme-light'}`}>
      {CurrentComponent}
    </div>
  );
};

export default App;