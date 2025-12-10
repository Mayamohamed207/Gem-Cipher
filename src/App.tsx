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

// Extend Window interface for Android bridge
declare global {
    interface Window {
        setAndroidNfcId?: (id: string) => void;
        onPhysicalCardScanned?: (uid: string) => void;
    }
}

const App: React.FC = () => {
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
            localStorage.setItem('device_type', 'android'); // Mark as Android device
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
            // Clear any WEB_ generated IDs on Android devices
            const cachedId = localStorage.getItem('virtual_nfc_id');
            if (cachedId && cachedId.startsWith('WEB_')) {
                console.log('🧹 Clearing web-generated ID on Android device');
                localStorage.removeItem('virtual_nfc_id');
            }
            
            nfcTimeout = window.setTimeout(() => {
                const cachedId = localStorage.getItem('virtual_nfc_id');
                const deviceType = localStorage.getItem('device_type');
                
                // Only use cached ID if it's from Android (not web-generated)
                if (cachedId && deviceType === 'android') {
                    console.log('⏱️ Using cached Android NFC ID:', cachedId);
                    setVirtualNfcId(cachedId);
                } else {
                    console.log('⏱️ NFC timeout - no valid Android ID available');
                    alert('⚠️ Could not read NFC. Please ensure NFC is enabled and try again.');
                }
                setIsWaitingForNfc(false);
            }, 5000); // Increased to 5 seconds for more reliable NFC reading
        } else if (!isAndroid) {
            // Not Android, load cached or generate immediately
            const cachedId = localStorage.getItem('virtual_nfc_id');
            if (cachedId) {
                console.log('💾 Loading cached ID for web:', cachedId);
                setVirtualNfcId(cachedId);
            } else {
                // Generate web ID immediately on laptop/browser
                const webId = `WEB_${crypto.randomUUID()}`;
                console.log('🌐 Auto-generated web NFC ID:', webId);
                localStorage.setItem('virtual_nfc_id', webId);
                localStorage.setItem('device_type', 'web');
                setVirtualNfcId(webId);
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
                onRegister={handleRegistration}
                isRegistered={isRegistered}
                virtualNfcId={virtualNfcId}
                isWaitingForNfc={isWaitingForNfc}
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