import React from 'react';
import { motion } from 'framer-motion';
import styles from './ExperiencePicker.module.css';

interface Experience {
  id: string;
  title: string;
  description: string;
  icon: string; 
}

const experiences: Experience[] = [
  { 
    id: 'game', 
    title: 'Interactive Challenge', 
    description: 'Solve historical puzzles and capture rare digital artifacts to compete with fellow explorers.', 
    icon: "𓆣" // Scarab for Game/Challenge
  },
  { 
    id: 'kids', 
    title: 'Family Adventure', 
    description: 'Age-appropriate tours with simplified facts, animated stories, and fun, hands-on activities.', 
    icon: "𓇋" // Reed Leaf / Single Stroke (Child/Family)
  },
  { 
    id: 'learning', 
    title: 'Educational Tour', 
    description: 'Deep dive into curatorial notes, archaeological context, and expert academic insights.', 
    icon: "𓁈" // Eye/Udjat (Knowledge/Learning)
  },
];

interface ExperiencePickerProps {
  onSelect: (experienceId: string) => void;
}

const getCardColorClass = (id: string): string => {
    switch (id) {
        case 'game':
            return styles.cardGame;
        case 'kids':
            return styles.cardKids;
        case 'learning':
            return styles.cardLearning;
        default:
            return '';
    }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const ExperiencePicker: React.FC<ExperiencePickerProps> = ({ onSelect }) => {
  return (
    <motion.div 
      className={styles.pickerContainer}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h2 
        className={styles.heading}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        Select Your Experience Mode
      </motion.h2>
      
      <motion.p 
        className={styles.subtext}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        Choose how you would like to explore the museum today
      </motion.p>

      <motion.div className={styles.cardsGrid} variants={containerVariants}>
        {experiences.map((exp) => (
          <motion.div
            key={exp.id}
            className={`${styles.experienceCard} ${getCardColorClass(exp.id)}`}
            onClick={() => onSelect(exp.id)}
            variants={{
                hidden: { opacity: 0, y: 50, scale: 0.9 },
                visible: { 
                    opacity: 1, 
                    y: 0, 
                    scale: 1,
                    transition: {
                        duration: 0.6,
                        ease: [0.22, 1, 0.36, 1]
                    }
                }
            }}
            whileHover={{ 
              y: -15, 
              scale: 1.03,
              transition: { duration: 0.3 }
            }}
            whileTap={{ scale: 0.98 }}
            viewport={{ once: true }}
          >
            <div className={styles.cardBackground}></div>
            <div className={styles.cardContent}>
              <motion.div 
                className={styles.iconWrapper}
                whileHover={{ rotate: 360, scale: 1.2 }}
                transition={{ duration: 0.6 }}
              >
                {exp.icon}
              </motion.div>
              <h3 className={styles.cardTitle}>{exp.title}</h3>
              <p className={styles.cardDescription}>{exp.description}</p>
              <motion.button 
                className={styles.selectButton}
                whileHover={{ scale: 1.08, x: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                BEGIN JOURNEY 𓆣
              </motion.button>
            </div>
            <div className={styles.cardGlow}></div>
            <div className={styles.cardSparkle} /> 
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default ExperiencePicker;