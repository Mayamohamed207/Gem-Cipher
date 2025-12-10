import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Info, ChevronRight } from 'lucide-react';
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
  { id: 'room1', name: 'Royal Treasures', levels: ['Beginner', 'Intermediate', 'Advanced'], top: '78.5%', left: '49%' },
  { id: 'room2', name: 'Sacred Tombs', levels: ['Beginner', 'Intermediate', 'Advanced'], top: '75%', left: '58.5%' },
  { id: 'room3', name: 'Temple of Gods', levels: ['Beginner', 'Intermediate', 'Advanced'], top: '80%', left: '72.5%' },
  { id: 'room4', name: 'Daily Life Hall', levels: ['Beginner', 'Intermediate', 'Advanced'], top: '64.5%', left: '64.7%' },
  { id: 'room5', name: 'Hieroglyph Gallery', levels: ['Beginner', 'Intermediate', 'Advanced'], top: '62%', left: '53%' },
  { id: 'room6', name: 'Mummification Chamber', levels: ['Beginner', 'Intermediate', 'Advanced'], top: '64%', left: '44%' },
  { id: 'room7', name: 'War & Conquest', levels: ['Beginner', 'Intermediate', 'Advanced'], top: '50%', left: '39%' },
  { id: 'room8', name: 'Artisan Workshop', levels: ['Beginner', 'Intermediate', 'Advanced'], top: '49%', left: '47.6%' },
  { id: 'room9', name: 'Jewelry & Beauty', levels: ['Beginner', 'Intermediate', 'Advanced'], top: '46%', left: '55.7%' },
  { id: 'room10', name: 'Great Hall', levels: ['Beginner', 'Intermediate', 'Advanced'], top: '31%', left: '49.1%' },
  { id: 'room11', name: 'Astronomy Tower', levels: ['Beginner', 'Intermediate', 'Advanced'], top: '35%', left: '41.5%' },
  { id: 'room12', name: 'Scribes Library', levels: ['Beginner', 'Intermediate', 'Advanced'], top: '33.1%', left: '32%' },
];

const MapPage: React.FC<MapPageProps> = ({ mode, onRoomSelected }) => {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string>('');
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

        {selectedRoom && mode === 'learning' && (
          <motion.div
            className={styles.detailsPanel}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className={styles.detailsHeader}>
              <Info size={28} color="var(--primary)" />
              <h2 className={styles.detailsTitle}>{selectedRoom.name}</h2>
            </div>

            {selectedRoom.levels && (
              <div className={styles.levelSelector}>
                <h3 className={styles.levelTitle}>Select Difficulty Level</h3>
                <div className={styles.levelButtons}>
                  {selectedRoom.levels.map((level) => (
                    <button
                      key={level}
                      className={`${styles.levelButton} ${selectedLevel === level ? styles.levelButtonActive : ''}`}
                      onClick={() => setSelectedLevel(level)}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button className={styles.proceedButton} onClick={handleProceed} disabled={!selectedLevel}>
              Begin Experience
              <ChevronRight size={20} />
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MapPage;
