// src/pages/HomePage/HomePage.tsx
import React, { useState } from 'react';
import { ArrowDown } from 'lucide-react';
import { motion } from 'framer-motion';
import ExperiencePicker from '../../components/ExperiencePicker/ExperiencePicker';
import MatrixCard from '../../components/MatrixBackground/MatrixBackground';
import styles from './HomePage.module.css';

// CORRECT IMPORT PATH - adjust this based on where you save the ThemeToggle component
// If you save it as src/components/ThemeToggle/ThemeToggle.tsx, use:
import ThemeToggle from '../../components/ToggleTheme/ThemeContext';
import PhotocardImage from '../../assets/images/Grand-Egyptian-Museum.jpg';
import KaperImage from '../../assets/images/kaper.png';

export interface UserInfo {
    name: string;
    email: string;
}

interface HomePageProps {
    onExperienceSelect: (id: string, info: UserInfo) => void;
    onRegister: (name: string, email: string) => Promise<void>;
    isRegistered: boolean;
    virtualNfcId: string | null;
    isWaitingForNfc: boolean;
    onToggleTheme: () => void;
    isDark: boolean;
}

// --- Component ---
const HomePage: React.FC<HomePageProps> = ({ 
    onExperienceSelect, 
    onRegister, 
    isRegistered, 
    virtualNfcId, 
    isWaitingForNfc,
    onToggleTheme,
    isDark
}) => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    
    /**
     * SIMPLIFIED: Handles mode selection and passes dummy/default data back to App.tsx.
     */
    const handleModeSelection = (id: string) => {
        const dummyUserInfo: UserInfo = {
            name: "Visitor",
            email: "visitor@museum.com",
        };
        onExperienceSelect(id, dummyUserInfo);
    };

    /**
     * Handle registration form submission
     */
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!name.trim() || !email.trim()) {
            alert('Please fill in all fields');
            return;
        }

        setIsSubmitting(true);
        await onRegister(name, email);
        setIsSubmitting(false);
    };

    return (
        <div className={styles.pageWrapper}>
            {/* Theme Toggle Button */}
            <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
            
            {/* HERO SECTION WITH MATRIX BACKGROUND */}
            <MatrixCard>
                <div className={styles.matrixContent}>
                    <h1 className={styles.title}>WELCOME TO THE <span><span className={styles.glyph}>𓂀</span> PHARAOH MATRIX <span className={styles.glyph}>𓋹</span></span></h1>
                    {/* Add a direct instruction here */}
                    <p className={styles.subtitle}>
                        {isRegistered ? 'Select your desired experience below to begin your journey through the museum.' : 'Please register to begin your journey'}
                    </p>
                </div>
            </MatrixCard>

            {/* -------------------- CONDITIONAL: REGISTRATION FORM OR EXPERIENCE PICKER -------------------- */}
            {!isRegistered ? (
                <section className={styles.scrollSection}>
                    <MatrixCard>
                        <div style={{ padding: '40px', maxWidth: '500px', margin: '0 auto' }}>
                            <h2 style={{ color: '#00ff00', marginBottom: '24px', textAlign: 'center' }}>Join the Museum Experience</h2>
                            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                <div>
                                    <label style={{ color: '#00ff00', display: 'block', marginBottom: '8px', fontSize: '14px' }}>Name</label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Enter your name"
                                        style={{
                                            width: '100%',
                                            padding: '12px',
                                            backgroundColor: 'rgba(0, 255, 0, 0.1)',
                                            border: '1px solid #00ff00',
                                            borderRadius: '4px',
                                            color: '#00ff00',
                                            fontSize: '16px',
                                            fontFamily: 'inherit'
                                        }}
                                        required
                                    />
                                </div>
                                <div>
                                    <label style={{ color: '#00ff00', display: 'block', marginBottom: '8px', fontSize: '14px' }}>Email</label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email"
                                        style={{
                                            width: '100%',
                                            padding: '12px',
                                            backgroundColor: 'rgba(0, 255, 0, 0.1)',
                                            border: '1px solid #00ff00',
                                            borderRadius: '4px',
                                            color: '#00ff00',
                                            fontSize: '16px',
                                            fontFamily: 'inherit'
                                        }}
                                        required
                                    />
                                </div>
                                {isWaitingForNfc && (
                                    <div style={{
                                        padding: '12px',
                                        backgroundColor: 'rgba(255, 165, 0, 0.1)',
                                        border: '1px solid #ffa500',
                                        borderRadius: '4px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '10px'
                                    }}>
                                        <div style={{
                                            width: '20px',
                                            height: '20px',
                                            border: '2px solid #ffa500',
                                            borderTop: '2px solid transparent',
                                            borderRadius: '50%',
                                            animation: 'spin 1s linear infinite'
                                        }} />
                                        <p style={{ color: '#ffa500', fontSize: '14px', margin: 0 }}>
                                            📱 Reading NFC from device... Please wait
                                        </p>
                                    </div>
                                )}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    style={{
                                        padding: '14px',
                                        backgroundColor: '#00ff00',
                                        color: '#000',
                                        border: 'none',
                                        borderRadius: '4px',
                                        fontSize: '18px',
                                        fontWeight: 'bold',
                                        cursor: 'pointer',
                                        marginTop: '10px',
                                        transition: 'all 0.3s ease',
                                        opacity: isSubmitting ? 0.7 : 1
                                    }}
                                >
                                    {isSubmitting ? 'Joining...' : 'Join'}
                                </button>
                                {virtualNfcId && virtualNfcId.startsWith('WEB_') && (
                                    <p style={{ color: '#00ff00', fontSize: '12px', textAlign: 'center', margin: 0 }}>
                                        🌐 Web Mode - Device ID auto-generated
                                    </p>
                                )}
                            </form>
                        </div>
                    </MatrixCard>
                </section>
            ) : (
                <section className={styles.scrollSection} id="experience-section">
                    <ExperiencePicker onSelect={handleModeSelection} /> 
                </section>
            )}
        </div>
    );
};

export default HomePage;