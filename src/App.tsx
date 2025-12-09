// src/App.tsx
import React, { useState, useEffect, useCallback } from 'react';
import HomePage from './pages/HomePage/HomePage';
import MapPage from './pages/MapPage/MapPage';
import QuestionsPage from './pages/QuestionsPage/QuestionsPage';
import type { UserInfo } from './pages/HomePage/HomePage'; // Import UserInfo interface for type safety

// --- 1. Define Application Stages and Routes ---
const AppStage = {
    HOME_INFO: '/',
    MAP_SELECTION: '/map',
    QUESTIONS: '/questions',
} as const;

type AppStageType = (typeof AppStage)[keyof typeof AppStage];

const App: React.FC = () => {
    // --- 2. State Management ---
    const [currentStage, setCurrentStage] = useState<AppStageType>(AppStage.HOME_INFO);
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    const [selectedMode, setSelectedMode] = useState<'kids' | 'learning' | 'game' | null>(null);
    const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
    const [selectedLevel, setSelectedLevel] = useState<string | undefined>(undefined);

    // --- Hash Router Logic ---
    const getHashStage = useCallback((hash: string): AppStageType => {
        const path = hash.slice(1) || '/'; // Remove '#' and default to '/'
        if (path.startsWith(AppStage.QUESTIONS)) return AppStage.QUESTIONS;
        if (path.startsWith(AppStage.MAP_SELECTION)) return AppStage.MAP_SELECTION;
        return AppStage.HOME_INFO;
    }, []);

    useEffect(() => {
        // Initial load and hash change listener
        const handleHashChange = () => {
            const hash = window.location.hash;
            const newStage = getHashStage(hash);
            setCurrentStage(newStage);
        };

        window.addEventListener('hashchange', handleHashChange);
        // Set initial stage based on URL
        handleHashChange(); 

        return () => window.removeEventListener('hashchange', handleHashChange);
    }, [getHashStage]);


    // --- 3. Stage Handlers (Now update the URL hash) ---
    
    const handleInitialSelect = (id: string, info: UserInfo) => {
        setUserInfo(info);
        setSelectedMode(id as 'kids' | 'learning' | 'game');
        
        if (id === 'game') {
             alert(`GAME MODE selected by ${info.name}. This mode currently skips the map and submits.`);
             handleQuestionsFinish(); 
             return;
        }
        // Navigate to /map route
        window.location.hash = AppStage.MAP_SELECTION;
    };

    const handleRoomSelect = (roomId: string, level?: string) => {
        setSelectedRoom(roomId);
        setSelectedLevel(level);
        // Navigate to /questions route, appending data to the hash for state preservation/readability
        window.location.hash = `${AppStage.QUESTIONS}/${selectedMode}/${roomId}/${level || 'none'}`;
    };

    const handleQuestionsFinish = () => {
        alert("Your experience data has been logged! Returning to experience selection.");
        
        // Reset state and navigate to / route
        setUserInfo(null);
        setSelectedMode(null);
        setSelectedRoom(null);
        setSelectedLevel(undefined);
        window.location.hash = AppStage.HOME_INFO;
    };


    // --- 4. Render Logic based on Stage ---
    let CurrentComponent = null;

    if (currentStage === AppStage.HOME_INFO) {
        CurrentComponent = (
            <HomePage 
                onExperienceSelect={handleInitialSelect} 
            />
        );
        
    } else if (currentStage === AppStage.MAP_SELECTION && selectedMode) {
        if (selectedMode === 'kids' || selectedMode === 'learning') {
            CurrentComponent = (
                <MapPage 
                    mode={selectedMode} 
                    onRoomSelected={handleRoomSelect} 
                />
            );
        }
    } else if (currentStage === AppStage.QUESTIONS) {
         // CRITICAL: Pull room/mode data from hash if state is lost (e.g., deep linking/refresh)
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
        } else {
            // Handle error state if questions link is visited without necessary data
            CurrentComponent = (
                <div style={{ color: 'white', padding: '50px', textAlign: 'center' }}>
                    <h1 style={{ color: 'var(--primary)' }}>Route Error</h1>
                    <p>Missing experience or room data. Please restart the journey.</p>
                    <button onClick={() => window.location.hash = AppStage.HOME_INFO} style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: 'var(--blue)', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                        Go Home
                    </button>
                </div>
            );
        }
    } else {
        // Fallback for unexpected state/route not found
        CurrentComponent = (
             <div style={{ color: 'white', padding: '50px', textAlign: 'center' }}>
                <h1 style={{ color: 'var(--primary)' }}>404 Not Found</h1>
                <p>The matrix path you seek does not exist.</p>
                <button onClick={() => window.location.hash = AppStage.HOME_INFO} style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: 'var(--blue)', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                    Restart Journey
                </button>
            </div>
        );
    }

    return (
        <div className="App">
            {CurrentComponent}
        </div>
    );
};

export default App;