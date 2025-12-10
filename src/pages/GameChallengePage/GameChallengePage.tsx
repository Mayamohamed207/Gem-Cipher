// src/pages/GameChallengePage/GameChallengePage.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Upload, X, Check, Star, MessageSquare } from 'lucide-react';
import styles from './GameChallengePage.module.css';

interface GameChallengePageProps {
  room: string;
  onComplete: () => void;
}

const roomNames: Record<string, string> = {
  room1: 'Royal Treasures',
  room2: 'Sacred Tombs',
  room3: 'Temple of Gods',
  room4: 'Daily Life Hall',
  room5: 'Hieroglyph Gallery',
  room6: 'Mummification Chamber',
  room7: 'War & Conquest',
  room8: 'Artisan Workshop',
  room9: 'Jewelry & Beauty',
  room10: 'Great Hall',
  room11: 'Astronomy Tower',
  room12: 'Scribes Library'
};

const GameChallengePage: React.FC<GameChallengePageProps> = ({ room, onComplete }) => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const [feedback, setFeedback] = useState({
    experience: '',
    favorite: [] as string[],
    rating: 0,
    improvements: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const roomName = roomNames[room] || room;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setUploadedImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleUploadClick = () => {
    if (uploadedImage) setShowFeedback(true);
  };

  const toggleFavorite = (item: string) => {
    setFeedback(prev => ({
      ...prev,
      favorite: prev.favorite.includes(item)
        ? prev.favorite.filter(f => f !== item)
        : [...prev.favorite, item]
    }));
  };

  const handleFeedbackSubmit = async () => {
    setIsSubmitting(true);

    const photoData = {
      imageUrl: uploadedImage,
      room: roomName,
      timestamp: Date.now(),
      votes: 0,
      feedback
    };

    await new Promise(res => setTimeout(res, 1000));

    onComplete();
  };

  return (
    <div className={styles.pageContainer}>
      <motion.div
        className={styles.challengeCard}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className={styles.header}>
          <Camera className={styles.cameraIcon} />
          <h1 className={styles.title}>Photo Challenge</h1>
          <p className={styles.roomName}>
            <span className={styles.hieroglyph}>𓋹</span>
            {roomName}
          </p>
        </div>

        <motion.div
          className={styles.challengeText}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <p>Your mission: Capture the most captivating moment in this gallery!</p>
          <p>The top 3 photos from the last hour will be featured on the Winners Dashboard.</p>
        </motion.div>

        <div className={styles.uploadSection}>
          {!uploadedImage ? (
            <motion.label
              className={styles.uploadZone}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className={styles.fileInput}
              />
              <Upload className={styles.uploadIcon} />
              <p className={styles.uploadText}>Click to upload your photo</p>
              <p className={styles.uploadHint}>Or drag and drop</p>
            </motion.label>
          ) : (
            <div className={styles.imagePreview}>
              <motion.img
                src={uploadedImage}
                alt="Uploaded"
                className={styles.previewImage}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
              />
              <motion.button
                className={styles.changeButton}
                onClick={() => setUploadedImage(null)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={20} />
                Change Photo
              </motion.button>
            </div>
          )}
        </div>

        {uploadedImage && !showFeedback && (
          <motion.button
            className={styles.uploadButton}
            onClick={handleUploadClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Check size={24} />
            Upload & Continue
          </motion.button>
        )}
      </motion.div>

      {/* FEEDBACK MODAL */}
      <AnimatePresence>
        {showFeedback && (
          <motion.div
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className={styles.feedbackModal}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
            >
              <div className={styles.modalHeader}>
                <MessageSquare className={styles.feedbackIcon} />
                <h2 className={styles.modalTitle}>Quick Feedback</h2>
                <button className={styles.closeButton} onClick={() => setShowFeedback(false)}>
                  <X size={24} />
                </button>
              </div>

              <div className={styles.feedbackContent}>
                {/* Experience */}
                <div className={styles.questionBlock}>
                  <label className={styles.questionLabel}>How was your experience?</label>
                  <div className={styles.radioGroup}>
                    {["Excellent", "Good", "Fair", "Poor"].map(option => (
                      <label key={option} className={styles.radioLabel}>
                        <input
                          type="radio"
                          name="experience"
                          value={option}
                          checked={feedback.experience === option}
                          onChange={e =>
                            setFeedback({ ...feedback, experience: e.target.value })
                          }
                          className={styles.radioInput}
                        />
                        <span className={styles.radioCustom}></span>
                        {option}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Favorites */}
                <div className={styles.questionBlock}>
                  <label className={styles.questionLabel}>What did you enjoy most?</label>
                  <div className={styles.checkboxGroup}>
                    {["Artifacts", "Information", "Interactive Elements", "Atmosphere"].map(
                      item => (
                        <label key={item} className={styles.checkboxLabel}>
                          <input
                            type="checkbox"
                            checked={feedback.favorite.includes(item)}
                            onChange={() => toggleFavorite(item)}
                            className={styles.checkboxInput}
                          />
                          <span className={styles.checkboxCustom}>
                            <Check size={14} />
                          </span>
                          {item}
                        </label>
                      )
                    )}
                  </div>
                </div>

                {/* Stars */}
                <div className={styles.questionBlock}>
                  <label className={styles.questionLabel}>Rate this gallery</label>
                  <div className={styles.starRating}>
                    {[1, 2, 3, 4, 5].map(star => (
                      <motion.button
                        key={star}
                        className={`${styles.star} ${
                          feedback.rating >= star ? styles.starActive : ""
                        }`}
                        onClick={() => setFeedback({ ...feedback, rating: star })}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Star size={32} fill={feedback.rating >= star ? "#FFD700" : "none"} />
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Suggestions */}
                <div className={styles.questionBlock}>
                  <label className={styles.questionLabel}>Any suggestions?</label>
                  <select
                    value={feedback.improvements}
                    onChange={e =>
                      setFeedback({ ...feedback, improvements: e.target.value })
                    }
                    className={styles.selectInput}
                  >
                    <option value="">Select an option</option>
                    <option value="More information">More information</option>
                    <option value="Better lighting">Better lighting</option>
                    <option value="More interactive elements">More interactive elements</option>
                    <option value="Clearer signage">Clearer signage</option>
                    <option value="Nothing, it was perfect">Nothing, it was perfect</option>
                  </select>
                </div>
              </div>

              <motion.button
                className={styles.submitButton}
                onClick={handleFeedbackSubmit}
                disabled={isSubmitting || !feedback.experience || feedback.rating === 0}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isSubmitting ? "Submitting..." : "Submit & Return to Map"}
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GameChallengePage;
