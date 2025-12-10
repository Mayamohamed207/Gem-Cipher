import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, ChevronRight, X } from 'lucide-react';
import styles from './MapPage.module.css';
import museumMap from '../../assets/images/map.jpeg';
import ThemeToggle from '../../components/ToggleTheme/ThemeContext';

interface MapPageProps {
  mode: 'kids' | 'learning' | 'game';
  onRoomSelected: (roomId: string, level?: string) => void;
}

interface Room {
  id: string;
  name: string;
  levels?: string[];
  top: string;
  left: string;
}

const rooms: Room[] = [
  { id: 'room1', name: 'Royal Treasures', levels: ['Visitor', 'Scribe Apprentice', 'High Official'], top: '78.5%', left: '49%' },
  { id: 'room2', name: 'Sacred Tombs', levels: ['Visitor', 'Scribe Apprentice', 'High Official'], top: '75%', left: '58.5%' },
  { id: 'room3', name: 'Temple of Gods', levels: ['Visitor', 'Scribe Apprentice', 'High Official'], top: '80%', left: '72.5%' },
  { id: 'room4', name: 'Daily Life Hall', levels: ['Visitor', 'Scribe Apprentice', 'High Official'], top: '64.5%', left: '64.7%' },
  { id: 'room5', name: 'Hieroglyph Gallery', levels: ['Visitor', 'Scribe Apprentice', 'High Official'], top: '62%', left: '53%' },
  { id: 'room6', name: 'Mummification Chamber', levels: ['Visitor', 'Scribe Apprentice', 'High Official'], top: '64%', left: '44%' },
  { id: 'room7', name: 'War & Conquest', levels: ['Visitor', 'Scribe Apprentice', 'High Official'], top: '50%', left: '39%' },
  { id: 'room8', name: 'Artisan Workshop', levels: ['Visitor', 'Scribe Apprentice', 'High Official'], top: '49%', left: '47.6%' },
  { id: 'room9', name: 'Jewelry & Beauty', levels: ['Visitor', 'Scribe Apprentice', 'High Official'], top: '46%', left: '55.7%' },
  { id: 'room10', name: 'Great Hall', levels: ['Visitor', 'Scribe Apprentice', 'High Official'], top: '31%', left: '49.1%' },
  { id: 'room11', name: 'Astronomy Tower', levels: ['Visitor', 'Scribe Apprentice', 'High Official'], top: '35%', left: '41.5%' },
  { id: 'room12', name: 'Scribes Library', levels: ['Visitor', 'Scribe Apprentice', 'High Official'], top: '33.1%', left: '32%' },
];

// ⬇ NEW: Level descriptions
const levelDescriptions: Record<string, string> = {
  "Visitor": "A relaxed exploration mode with simple questions and smooth interactions.",
  "Scribe Apprentice": "Moderate difficulty with more puzzles and detail-focused questions.",
  "High Official": "The expert challenge — historically deep, complex, and logic heavy."
};

const MapPage: React.FC<MapPageProps> = ({ mode, onRoomSelected }) => {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string>('');
  const [hoveredLevel, setHoveredLevel] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState<boolean>(true);

  const handleRoomClick = (room: Room) => {
    if (mode === 'kids' || mode === 'game') {
      onRoomSelected(room.id);
      return;
    }
    setSelectedRoom(room);
    setSelectedLevel('');
  };

  const handleProceed = () => {
    if (selectedRoom && selectedLevel) {
      onRoomSelected(selectedRoom.id, selectedLevel);
    }
  };

  const handleClosePopup = () => {
    setSelectedRoom(null);
    setSelectedLevel('');
  };

  return (
    <div className={`${styles.pageContainer} ${darkMode ? 'theme-dark' : 'theme-light'}`}>
      <motion.div
        className={styles.header}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className={styles.toggleWrapper} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <ThemeToggle isDark={darkMode} onToggle={() => setDarkMode(prev => !prev)} />
        </div>

        <p className={styles.subtitle}>
          {mode === 'kids'
            ? 'Click on any room marker to begin your adventure'
            : 'Select a room, then choose your difficulty level to proceed'}
        </p>
      </motion.div>

      <div className={styles.contentWrapper}>
        <motion.div
          className={styles.mapContainer}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className={styles.mapImageWrapper}>
            <img src={museumMap} alt="Museum Floor Plan" className={styles.mapImage} />
            {rooms.map((room, index) => {
              const isSelected = selectedRoom?.id === room.id;
              return (
                <motion.div
                  key={room.id}
                  className={`${styles.roomMarker} ${isSelected ? styles.roomMarkerActive : ''}`}
                  style={{ top: room.top, left: room.left }}
                  onClick={() => handleRoomClick(room)}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ scale: 1.2 }}
                />
              );
            })}
          </div>
        </motion.div>

        {/* POPUP MODAL */}
        <AnimatePresence>
          {selectedRoom && mode === 'learning' && (
            <>
              {/* BACKDROP */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={handleClosePopup}
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  backgroundColor: 'rgba(0,0,0,0.6)',
                  zIndex: 999,
                  backdropFilter: 'blur(3px)'
                }}
              />

              {/* POPUP PANEL */}
              <motion.div
                className={styles.detailsPanel}
                style={{
                  position: 'fixed',
                  top: '50%',
                  left: '50%',
                  zIndex: 1000,
                  width: '90%',
                  maxWidth: '650px',
                  maxHeight: '90vh',
                  overflowY: 'auto',
                }}
                initial={{ opacity: 0, x: '-50%', y: '-40%', scale: 0.9 }}
                animate={{ opacity: 1, x: '-50%', y: '-50%', scale: 1 }}
                exit={{ opacity: 0, x: '-50%', y: '-40%', scale: 0.9 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
              >
                <div className={styles.detailsHeader} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Info size={28} color="var(--primary)" />
                    <h2 className={styles.detailsTitle}>{selectedRoom.name}</h2>
                  </div>
                  <button 
                    onClick={handleClosePopup}
                    style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                  >
                    <X size={24} />
                  </button>
                </div>

                {/* LEVELS SECTION */}
                {selectedRoom.levels && (
                  <div className={styles.levelSelector}>
                    <h3 className={styles.levelTitle}>Select Difficulty Level</h3>
                    <div className={styles.levelButtons}>
                      {selectedRoom.levels.map((level) => (
                        <div key={level} className={styles.levelButtonWrapper}>
                          <button
                            className={`${styles.levelButton} ${selectedLevel === level ? styles.levelButtonActive : ''}`}
                            onClick={() => setSelectedLevel(level)}
                            onMouseEnter={() => setHoveredLevel(level)}
                            onMouseLeave={() => setHoveredLevel(null)}
                          >
                            {level}
                          </button>

                          {/* DESCRIPTION TOOLTIP */}
                          <AnimatePresence>
                            {hoveredLevel === level && (
                              <motion.div
                                className={styles.levelTooltip}
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 5 }}
                                transition={{ duration: 0.2 }}
                              >
                                {levelDescriptions[level]}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <button 
                  className={styles.proceedButton} 
                  onClick={handleProceed} 
                  disabled={!selectedLevel}
                >
                  Begin Experience
                  <ChevronRight size={20} />
                </button>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MapPage;
