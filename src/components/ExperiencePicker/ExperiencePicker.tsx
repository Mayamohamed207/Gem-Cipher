// src/components/ExperiencePicker/ExperiencePicker.tsx
import React from 'react';
import { motion } from 'framer-motion';
import styles from './ExperiencePicker.module.css';

// Import your map image
import museumMap from '../../assets/images/map.jpeg';

interface Experience {
  id: string;
  title: string;
  description: string;
  pharaoh: string;
}

// Updated experiences with simplified modes, keeping original icons
const experiences: Experience[] = [
  { 
    id: 'game', 
    title: 'GAME MODE', 
    description: 'Play and explore the museum in a fun and interactive way!', 
    pharaoh: '𓋴𓍯' 
  },
  { 
    id: 'kids', 
    title: 'KIDS MODE', 
    description: 'Child-friendly tour with interactive surprises and fun facts!', 
    pharaoh: '𓁈' 
  },
  { 
    id: 'learning', 
    title: 'LEARNING MODE', 
    description: 'Explore exhibits to learn more and understand their history.', 
    pharaoh: '𓇋' 
  },
];

interface ExperiencePickerProps {
  onSelect: (experienceId: string) => void;
  onRoomClick?: (roomId: string) => void;
}

// Helper function to map ID to the color class
const getCardColorClass = (id: string): string => {
    switch (id) {
        case 'game':
            return styles.cardPrimary; // Uses --primary as background
        case 'kids':
            return styles.cardSecondary; // Uses --secondary as background
        case 'learning':
            return styles.cardBlue; // Uses --blue as background
        default:
            return '';
    }
};

const ExperiencePicker: React.FC<ExperiencePickerProps> = ({ onSelect, onRoomClick }) => {
  return (
    <motion.div 
      className={`${styles.pickerContainer} glass-card`}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.h2 
        className={styles.heading}
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        CHOOSE YOUR EXPERIENCE
      </motion.h2>
      
      <motion.p 
        className={styles.subtext}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        Enter the golden path, choose your destiny from the sands of time:
      </motion.p>

      <div className={styles.cardsGrid}>
        {experiences.map((exp, index) => (
          <motion.div
            key={exp.id}
            /* Apply color class */
            className={`${styles.experienceCard} ${getCardColorClass(exp.id)}`}
            onClick={() => onSelect(exp.id)}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            /* REMOVED: whileHover for the card itself */
          >
            <motion.div 
              className={styles.pharaohIcon}
              /* REMOVED: whileHover animation on the icon */
            >
              {exp.pharaoh}
            </motion.div>
            <h3>{exp.title}</h3>
            <p>{exp.description}</p>
            <motion.button 
              className={styles.selectButton}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Select 𓆣
            </motion.button>
          </motion.div>
        ))}
      </div>

  
    </motion.div>
  );
};

export default ExperiencePicker;