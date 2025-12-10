// src/components/MatrixBackground/MatrixCard.tsx
import React, { useEffect, useRef } from 'react';
import styles from './MatrixBackground.module.css';
import type { ReactNode } from 'react';

interface MatrixCardProps {
    children: ReactNode;
}

// A refined list of Egyptian Hieroglyphs for the "Matrix" effect
const hiero = [
    "𓁈", "𓂀", "𓋹", "𓆣", "𓁀", "𓀾", "𓀮", "𓀛", "𓃭", "𓇋",
    "𓏏", "𓎼", "𓉐", "𓏤", "𓍯", "𓋴", "𓎡", "𓊃", "𓅱", "𓂻",
    "𓇳", "𓈖", "𓆑", "𓂝", "𓊪", "𓅓", "𓈇", "𓊵", "𓍿", "𓈙",
    "𓉔", "𓂧", "𓇓", "𓏲", "𓊨", "𓎛", "𓁶", "𓆱", "𓏛", "𓅓",
    "𓊞", "𓆤", "𓉌", "𓈗", "𓋴𓏏", "𓅀", "𓇠", "𓁼", "𓅂", "𓄁"
];
// Increased count slightly for a generous top card area
const TOTAL_GLYPHS = 1000;

const MatrixCard: React.FC<MatrixCardProps> = ({ children }) => {
    const matrixRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const matrixContainer = matrixRef.current;
        if (!matrixContainer) return;

        matrixContainer.innerHTML = ''; 

        for (let i = 0; i < TOTAL_GLYPHS; i++) {
            const s = document.createElement("span");
            s.textContent = hiero[(i * 7) % hiero.length];
            s.style.fontSize = (20 + (i % 10)) + "px";
            
            if (i % 11 === 0) {
                // Initial glow color set in TS for immediate impact
                s.style.color = "rgba(245,210,80,0.95)";
                s.style.textShadow = "0 0 5px rgba(255,215,0,0.9), 0 0 8px rgba(255,215,0,0.6)";
            }
            // Staggered delay for the animation
            s.style.animationDelay = `${(i % 50) * 0.05}s`; 
            
            matrixContainer.appendChild(s);
        }
    }, []);

    
    return (
        <div className={styles.cardContainer}>
            <div ref={matrixRef} className={styles.matrix} aria-hidden="true" role="presentation">
            </div>
            <div className={styles.contentLayer}>
                {children}
            </div>
        </div>
    );
};

export default MatrixCard;