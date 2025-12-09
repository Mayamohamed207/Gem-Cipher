// src/pages/HomePage/HomePage.tsx
import React, { useState } from 'react';
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
    onRegister: (name: string, email: string) => Promise<void>;
    isRegistered: boolean;
    virtualNfcId: string | null;
}

// --- Component ---
// The component is now simplified to only focus on the welcome message and the mode picker.
const HomePage: React.FC<HomePageProps> = ({ onExperienceSelect, onRegister, isRegistered, virtualNfcId }) => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    
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

    /**
     * Handle registration form submission
     */
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!name.trim() || !email.trim()) {
            alert('Please fill in all fields');
            return;
        }

        if (!virtualNfcId) {
            alert('Device ID not received. Please restart the app.');
            return;
        }

        setIsSubmitting(true);
        await onRegister(name, email);
        setIsSubmitting(false);
    };

    return (
        <div className={styles.pageWrapper}>
            
            {/* -------------------- ROW 1: GLOWING MATRIX CARD (WELCOME) -------------------- */}
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
                                <button
                                    type="submit"
                                    disabled={isSubmitting || !virtualNfcId}
                                    style={{
                                        padding: '14px',
                                        backgroundColor: virtualNfcId ? '#00ff00' : '#666',
                                        color: '#000',
                                        border: 'none',
                                        borderRadius: '4px',
                                        fontSize: '18px',
                                        fontWeight: 'bold',
                                        cursor: virtualNfcId ? 'pointer' : 'not-allowed',
                                        marginTop: '10px',
                                        transition: 'all 0.3s ease',
                                        opacity: isSubmitting ? 0.7 : 1
                                    }}
                                >
                                    {isSubmitting ? 'Joining...' : virtualNfcId ? 'Join' : 'Waiting for Device ID...'}
                                </button>
                                {!virtualNfcId && (
                                    <p style={{ color: '#ff9900', fontSize: '12px', textAlign: 'center', margin: 0 }}>
                                        ⚠️ Waiting for Android device connection...
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
            
            {/* REMOVED: Enrollment Card, UserInfoForm, and TiltedCard sections */}
        </div>
    );
};

export default HomePage;