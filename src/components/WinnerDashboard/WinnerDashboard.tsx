// src/components/WinnersDashboard/WinnersDashboard.tsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Camera, Clock } from 'lucide-react';
import styles from './WinnerDashboard.module.css';

interface PhotoSubmission {
  id: number;
  visitor_id: number;
  room_id: number;
  image_url: string;
  score: number;
  created_at: string;
  visitor?: {
    id: number;
    name: string;
    email: string;
  };
}

interface WinnersDashboardProps {
  roomId?: number; // Optional: Show winners for specific room, or all rooms if not provided
}

const WinnersDashboard: React.FC<WinnersDashboardProps> = ({ roomId }) => {
  const [winners, setWinners] = useState<PhotoSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWinners = async () => {
      try {
        setLoading(true);
        
        // If roomId is provided, fetch for that specific room
        // Otherwise, fetch top photos across all rooms (you may need a new backend endpoint for this)
        const url = roomId 
          ? `http://10.3.106.185:8000/rooms/${roomId}/dashboard`
          : `http://10.3.106.185:8000/rooms/1/dashboard`; // Default to room 1 for demo
        
        console.log('🔍 Fetching winners from:', url);
        const response = await fetch(url);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error('❌ Backend response error:', errorText);
          throw new Error(`Failed to fetch winners: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log('✅ Winners data:', data);
        setWinners(data);
        setError(null);
      } catch (err) {
        console.error('❌ Error fetching winners:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
        // Don't clear winners on error - keep showing old data
      } finally {
        setLoading(false);
      }
    };

    fetchWinners();
    
    // Refresh every 30 seconds to show new winners
    const interval = setInterval(fetchWinners, 30000);
    
    return () => clearInterval(interval);
  }, [roomId]);

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    // Handle UTC timestamp from backend
    const past = new Date(timestamp + (timestamp.endsWith('Z') ? '' : 'Z'));
    const diffMs = now.getTime() - past.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? 's' : ''} ago`;
    const diffHours = Math.floor(diffMins / 60);
    return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  };

  if (loading && winners.length === 0) {
    return (
      <motion.section 
        className={styles.dashboardSection}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className={styles.container}>
          <div className={styles.header}>
            <h2 className={styles.title}>Loading Top Captures...</h2>
          </div>
        </div>
      </motion.section>
    );
  }

  if (error) {
    return (
      <motion.section 
        className={styles.dashboardSection}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className={styles.container}>
          <div className={styles.header}>
            <h2 className={styles.title}>Top Captures This Hour</h2>
          </div>
          <p style={{ color: 'var(--text-primary)', textAlign: 'center', padding: '20px' }}>
            {error.includes('404') || error.includes('Failed to fetch') 
              ? 'Backend service unavailable. Check if rooms are created in database.' 
              : error}
          </p>
        </div>
      </motion.section>
    );
  }

  if (winners.length === 0) {
    return (
      <motion.section 
        className={styles.dashboardSection}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className={styles.container}>
          <div className={styles.header}>
            <h2 className={styles.title}>Top Captures This Hour</h2>
          </div>
          <p style={{ color: 'var(--text-primary)', textAlign: 'center', padding: '20px' }}>
            No photos yet. Be the first to capture a moment! 📸
          </p>
        </div>
      </motion.section>
    );
  }

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
              key={winner.id}
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
                  src={`http://10.3.106.185:8000${winner.image_url}`}
                  alt={`Photo submission #${winner.id}`}
                  className={styles.winnerImage}
                />
                <div className={styles.imageOverlay}>
                  <Camera className={styles.cameraIcon} />
                </div>
              </div>

              <div className={styles.winnerInfo}>
                <h3 className={styles.winnerName}>
                  {winner.visitor?.name || `Visitor ${winner.visitor_id}`}
                  <span style={{ fontSize: '0.7em', marginLeft: '8px', opacity: 0.8 }}>
                    Score: {winner.score}
                  </span>
                </h3>
                <p className={styles.winnerRoom}>Room {winner.room_id}</p>
                <p className={styles.winnerTime}>
                  <Clock size={14} />
                  {formatTimeAgo(winner.created_at)}
                </p>
              </div>

              <div className={styles.cardGlow}></div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default WinnersDashboard;