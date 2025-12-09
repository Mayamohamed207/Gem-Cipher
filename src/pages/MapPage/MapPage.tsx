import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './MapPage.module.css';
import museumMap from '../../assets/images/map.jpeg';

interface Room {
    id: string;
    top: string;
    left: string;
}

const mapRooms: Room[] = [
    { id: 'room1', top: '78.5%', left: '49%' }, 
    { id: 'room2', top: '75%', left: '58.5%' }, 
    { id: 'room3', top: '80%', left: '72.5%' }, 
    { id: 'room4', top: '64.5%', left: '64.7%' },
    { id: 'room5', top: '62%', left: '53%' },
    { id: 'room6', top: '64%', left: '44%' },
    { id: 'room7', top: '50%', left: '39%' },
    { id: 'room8', top: '49%', left: '47.6%' },
    { id: 'room9', top: '46%', left: '55.7%' },
    { id: 'room10', top: '31%', left: '49.1%' },
    { id: 'room11', top: '35%', left: '41.5%' },
    { id: 'room12', top: '33.1%', left: '32%' },
];

interface MapPageProps {
    mode: 'kids' | 'learning' | 'game';
    onRoomSelected: (roomId: string, level?: string) => void;
}

const MapPage: React.FC<MapPageProps> = ({ mode, onRoomSelected }) => {
    const [selectedLevel, setSelectedLevel] = useState<string | null>(null);

    const handleRoomClick = (roomId: string) => {
        if (mode === 'learning' && !selectedLevel) {
            alert("Please select your learning level first.");
            return;
        }
        onRoomSelected(roomId, selectedLevel || undefined);
    };

    const levels = ['Beginner', 'Intermediate', 'Expert'];
    const isMapReady = mode === 'kids' || selectedLevel !== null;

    return (
        <motion.div 
            className={styles.mapPageContainer}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className={styles.heading}>
                {mode === 'kids' ? 'KIDS TOUR' : 'LEARNING PATH'} | Select an Exhibit
            </h2>

            {mode === 'learning' && (
                <div className={styles.levelSelector}>
                    <p>Select Your Level:</p>
                    {levels.map(level => (
                        <label key={level}>
                            <input
                                type="radio"
                                name="learningLevel"
                                value={level}
                                checked={selectedLevel === level}
                                onChange={() => setSelectedLevel(level)}
                            />
                            {level}
                        </label>
                    ))}
                </div>
            )}

            <div className={styles.mapContainer}>
                <img src={museumMap} alt="Museum Map" className={styles.mapImage} />
                {mapRooms.map(room => (
                    <motion.div
                        key={room.id}
                        className={`${styles.mapArea} ${isMapReady ? styles.mapAreaActive : styles.mapAreaInactive}`}
                        style={{ top: room.top, left: room.left }}
                        onClick={() => handleRoomClick(room.id)}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                    />
                ))}
            </div>
        </motion.div>
    );
};

export default MapPage;
