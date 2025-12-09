// src/pages/HomePage/HomePage.tsx
import React from 'react';
import ExperiencePicker from '../../components/ExperiencePicker/ExperiencePicker';
// REMOVED: import UserInfoForm from '../../components/UserInfoForm/UserInfoForm';
// REMOVED: import TiltedCard from '../../components/TiltedCard/TiltedCard'; 
import styles from './HomePage.module.css';
import MatrixCard from '../../components/MatrixBackground/MatrixBackground';

// IMPORTANT: Define UserInfo as an empty placeholder or remove it entirely if no data is needed.
// Since App.tsx still expects an 'info' argument, we'll keep a minimal interface for compatibility.
export interface UserInfo {
    name: string;
    email: string;
    // Removed all other fields
}

// --- Component Props (Simplified) ---
interface HomePageProps {
    // The App component expects this signature, so we keep the `info: UserInfo` argument.
    onExperienceSelect: (id: string, info: UserInfo) => void; 
}

// --- Component ---
// The component is now simplified to only focus on the welcome message and the mode picker.
const HomePage: React.FC<HomePageProps> = ({ onExperienceSelect }) => {
    
    /**
     * SIMPLIFIED: Handles mode selection and passes dummy/default data back to App.tsx.
     */
    const handleModeSelection = (id: string) => {
        // Create minimal UserInfo object as placeholder since App.tsx expects it.
        const dummyUserInfo: UserInfo = {
            name: "Adventurer", // Default name
            email: "default@museum.com", // Default email
        };
        
        // Pass the selected mode ID and the dummy user info back to App.tsx
        onExperienceSelect(id, dummyUserInfo);
    };

    return (
        <div className={styles.pageWrapper}>
            
            {/* -------------------- ROW 1: GLOWING MATRIX CARD (WELCOME) -------------------- */}
            <MatrixCard>
                <div className={styles.matrixContent}>
                    <h1 className={styles.title}>WELCOME TO THE <span><span className={styles.glyph}>𓂀</span> PHARAOH MATRIX <span className={styles.glyph}>𓋹</span></span></h1>
                    {/* Add a direct instruction here */}
                    <p className={styles.subtitle}>Select your desired experience below to begin your journey through the museum.</p>
                </div>
            </MatrixCard>

            {/* -------------------- ROW 2: EXPERIENCE PICKER (Now main content) -------------------- */}
            {/* The multi-column layout is removed, and the experience picker takes the focus */}
            <section className={styles.scrollSection} id="experience-section">
                <ExperiencePicker onSelect={handleModeSelection} /> 
            </section>
            
            {/* REMOVED: Enrollment Card, UserInfoForm, and TiltedCard sections */}
        </div>
    );
};

export default HomePage;