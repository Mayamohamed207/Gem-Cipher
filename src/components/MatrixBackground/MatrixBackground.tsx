import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import styles from './MatrixBackground.module.css';

const hiero = ["𓁈","𓂀","𓋹","𓆣","𓁀","𓀾","𓀮","𓀛","𓃭","𓇋","𓏏","𓎼","𓉐","𓏤","𓍯","𓋴","𓎡","𓊃","𓅱","𓂻"];

const MatrixCard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const matrixRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const matrixContainer = matrixRef.current;
    if (!matrixContainer) return;

    matrixContainer.innerHTML = '';
    const TOTAL_GLYPHS = 600;

    for (let i = 0; i < TOTAL_GLYPHS; i++) {
      const span = document.createElement("span");
      span.textContent = hiero[(i * 7) % hiero.length];
      span.style.fontSize = `${20 + (i % 6)}px`;
      
      if (i % 11 === 0) {
        span.style.color = "rgba(245,210,80,0.95)";
        span.style.textShadow = "0 0 8px rgba(255,215,0,0.8)";
      }
      
      matrixContainer.appendChild(span);
    }
  }, []);

  return (
    <motion.div 
      className={`${styles.cardContainer} glass-card`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
    >
      <div ref={matrixRef} className={styles.matrix} />
      <div className={styles.contentLayer}>
        {children}
      </div>
    </motion.div>
  );
};

export default MatrixCard;
