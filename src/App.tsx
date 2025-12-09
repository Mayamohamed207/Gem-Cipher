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

// Extend Window interface for Android bridge
declare global {
    interface Window {
        setAndroidNfcId?: (id: string) => void;
        onPhysicalCardScanned?: (uid: string) => void;
    }
}

const App: React.FC = () => {
    // --- 2. State Management ---
    const [currentStage, setCurrentStage] = useState<AppStageType>(AppStage.HOME_INFO);
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    const [selectedMode, setSelectedMode] = useState<'kids' | 'learning' | 'game' | null>(null);
    const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
    const [selectedLevel, setSelectedLevel] = useState<string | undefined>(undefined);
    
    // --- Android Bridge State ---
    const [virtualNfcId, setVirtualNfcId] = useState<string | null>(null);
    const [isRegistered, setIsRegistered] = useState<boolean>(() => {
        return localStorage.getItem('user_registered') === 'true';
    });
    const [isWaitingForNfc, setIsWaitingForNfc] = useState<boolean>(() => {
        // Detect if we're in Android WebView - always wait for fresh NFC on Android
        const isAndroid = /android/i.test(navigator.userAgent);
        return isAndroid;
    });

    // --- Helper: Get or Generate NFC ID (Device Agnostic) ---
    const getOrGenerateNfcId = useCallback((): string => {
        // Priority 1: Check if Android injected NFC ID via bridge
        if (virtualNfcId) {
            console.log('🔵 Using existing NFC ID:', virtualNfcId);
            return virtualNfcId;
        }

        // Priority 2: Check localStorage for existing ID
        const storedId = localStorage.getItem('virtual_nfc_id');
        if (storedId) {
            console.log('💾 Using stored NFC ID:', storedId);
            setVirtualNfcId(storedId);
            return storedId;
        }

        // Priority 3: Fallback - Generate web-based ID
        const webId = `WEB_${crypto.randomUUID()}`;
        console.log('🌐 Generated web NFC ID:', webId);
        localStorage.setItem('virtual_nfc_id', webId);
        setVirtualNfcId(webId);
        return webId;
    }, [virtualNfcId]);

    // --- Android Bridge Setup ---
    useEffect(() => {
        // Create global function for Android to set virtual NFC ID
        window.setAndroidNfcId = (id: string) => {
            console.log('📱 Android Bridge: Received virtual NFC ID:', id);
            setVirtualNfcId(id);
            localStorage.setItem('virtual_nfc_id', id);
            setIsWaitingForNfc(false); // NFC received, stop waiting
        };

        // Create global function for physical card scanning
        window.onPhysicalCardScanned = (uid: string) => {
            console.log('💳 Physical Card Scanned:', uid);
            alert(`Physical Card Found: ${uid}`);
            // TODO: Send to backend for verification
        };

        // For Android: Wait for fresh NFC, but fallback to cached after 3 seconds
        let nfcTimeout: number | null = null;
        const isAndroid = /android/i.test(navigator.userAgent);
        
        if (isAndroid && isWaitingForNfc) {
            nfcTimeout = window.setTimeout(() => {
                const cachedId = localStorage.getItem('virtual_nfc_id');
                if (cachedId) {
                    console.log('⏱️ Using cached NFC ID:', cachedId);
                    setVirtualNfcId(cachedId);
                } else {
                    console.log('⏱️ NFC timeout - switching to web mode');
                }
                setIsWaitingForNfc(false);
            }, 3000); // Reduced to 3 seconds for better UX
        } else if (!isAndroid) {
            // Not Android, load cached or generate immediately
            const cachedId = localStorage.getItem('virtual_nfc_id');
            if (cachedId) {
                setVirtualNfcId(cachedId);
            }
            setIsWaitingForNfc(false);
        }

        // Cleanup
        return () => {
            delete window.setAndroidNfcId;
            delete window.onPhysicalCardScanned;
            if (nfcTimeout) window.clearTimeout(nfcTimeout);
        };
    }, [isWaitingForNfc]);

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


    // --- Registration Handler ---
    const handleRegistration = async (name: string, email: string) => {
        // Get or generate device ID (works on Android, web, and laptop)
        const deviceId = getOrGenerateNfcId();

        try {
            // TODO: Replace with your laptop IP address
            const response = await fetch('http://10.3.106.185:8000/api/auth/login-register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    email,
                    virtual_nfc_id: deviceId,
                }),
            });

            if (!response.ok) {
                throw new Error(`Registration failed: ${response.statusText}`);
            }

            const data = await response.json();
            console.log('✅ Registration successful:', data);
            
            // Mark as registered
            localStorage.setItem('user_registered', 'true');
            localStorage.setItem('user_name', name);
            localStorage.setItem('user_email', email);
            setIsRegistered(true);
            
            alert(`Welcome, ${name}! Registration successful.`);
        } catch (error) {
            console.error('❌ Registration error:', error);
            alert(`Registration failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    };

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
                onRegister={handleRegistration}
                isRegistered={isRegistered}
                virtualNfcId={virtualNfcId}
                isWaitingForNfc={isWaitingForNfc}
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
            
            {/* Debug Footer */}
            <div style={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                color: '#00ff00',
                padding: '8px 16px',
                fontSize: '12px',
                fontFamily: 'monospace',
                borderTop: '1px solid #00ff00',
                zIndex: 9999,
                textAlign: 'center'
            }}>
                🔧 Debug | Device ID: {virtualNfcId || 'Waiting for Android...'} | Registered: {isRegistered ? '✅' : '❌'}
            </div>
        </div>
    );
};

export default App;