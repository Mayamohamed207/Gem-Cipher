// src/components/WinnersDashboard/WinnersDashboard.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Camera, Clock } from 'lucide-react';
import styles from './WinnerDashboard.module.css';
import shot1 from './../../assets/images/shot1.png'
import shot2 from './../../assets/images/shot2.png'
import shot3 from './../../assets/images/shot3.png'

interface Winner {
  name: string;
  room: string;
  timestamp: number;
  imageUrl: string;
}

// DUMMY DATA - Top 3 winners
const dummyWinners: Winner[] = [
  {
    name: 'Maya Mohamed',
    room: 'Royal Treasures',
    timestamp: Date.now() - 15 * 60 * 1000, // 15 mins ago
    imageUrl: shot1
  },
  {
    name: 'Mohamed Ali',
    room: 'Sacred Tombs',
    timestamp: Date.now() - 32 * 60 * 1000, // 32 mins ago
    imageUrl: shot2
  },
  {
    name: 'Layla Hassan',
    room: 'Temple of Gods',
    timestamp: Date.now() - 48 * 60 * 1000, // 48 mins ago
    imageUrl: shot3
  }
];

const WinnersDashboard: React.FC = () => {
  const winners = dummyWinners;

  return (
    <motion.section 
      className={styles.dashboardSection}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
    >
      <div className={styles.container}>
        <motion.div 
          className={styles.header}
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6 }}
        >
         
          <h2 className={styles.title}>Top Captures This Hour</h2>
       
        </motion.div>

        <div className={styles.winnersGrid}>
          {winners.map((winner, index) => (
            <motion.div
              key={`${winner.name}-${winner.timestamp}`}
              className={`${styles.winnerCard} ${styles[`rank${index + 1}`]}`}
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              <div className={styles.rankBadge}>
                <span className={styles.rankNumber}>{index + 1}</span>
                {index === 0 && <span className={styles.rankEmoji}>👑</span>}
                {index === 1 && <span className={styles.rankEmoji}>🥈</span>}
                {index === 2 && <span className={styles.rankEmoji}>🥉</span>}
              </div>

              <div className={styles.imageWrapper}>
                <img 
                  src={winner.imageUrl} 
                  alt={`${winner.name}'s capture`}
                  className={styles.winnerImage}
                />
                <div className={styles.imageOverlay}>
                  <Camera className={styles.cameraIcon} />
                </div>
              </div>

              <div className={styles.winnerInfo}>
                <h3 className={styles.winnerName}>{winner.name}</h3>
           
       
              </div>

              <div className={styles.cardGlow}></div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

function formatTimeAgo(timestamp: number): string {
  const minutes = Math.floor((Date.now() - timestamp) / 60000);
  if (minutes < 1) return 'Just now';
  if (minutes === 1) return '1 min ago';
  if (minutes < 60) return `${minutes} mins ago`;
  return 'Recently';
}

export default WinnersDashboard;