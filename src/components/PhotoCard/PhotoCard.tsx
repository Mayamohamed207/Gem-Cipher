// src/components/PhotoCard/PhotoCard.tsx
import React from 'react';
import styles from './PhotoCard.module.css';

const PhotoCard: React.FC = () => {
    return (
        <div className={styles.photoCardContainer}>
            <div className={styles.imagePlaceholder}>
                <span className={styles.glyphIcon}>𓋹</span>
                <p className={styles.caption}>
                    The Eye of Horus witnesses your enrollment.
                </p>
            </div>
            <div className={styles.infoBox}>
                <h4 className={styles.infoTitle}>PHARAOH VR ACCESS</h4>
                <p>Complete your profile to unlock the time stream.</p>
            </div>
        </div>
    );
};

export default PhotoCard;