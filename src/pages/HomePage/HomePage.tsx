// src/pages/HomePage/HomePage.tsx
import React, { useState } from 'react';
import { ArrowDown } from 'lucide-react';
import { motion } from 'framer-motion';
import ExperiencePicker from '../../components/ExperiencePicker/ExperiencePicker';
import MatrixCard from '../../components/MatrixBackground/MatrixBackground';
import styles from './HomePage.module.css';
import ThemeToggle from '../../components/ToggleTheme/ThemeContext';
import PhotocardImage from '../../assets/images/Grand-Egyptian-Museum.jpg';
import KaperImage from '../../assets/images/kaper.png';
import WinnersDashboard from '../../components/WinnerDashboard/WinnerDashboard';
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
const museumStats = [
  { label: "Artifacts", value: "100,000+" },
  { label: "Spans", value: "5,000 Years" },
  { label: "Interactive", value: "12" },
  { label: "Daily Visitors", value: "(50,000+)" },
];

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
            
                     <MatrixCard>
                <div className={styles.matrixContent}>
                    <motion.div 
                        className={styles.heroContainer}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                    >
                        {/* Column 1: Title and Start Button */}
                        <div className={styles.heroContent}>
                            <div className={styles.titleWrapper}>
                                <h1 className={styles.title}>THE GEM<br/>Experience</h1>
                                <motion.span 
                                    className={styles.glyph}
                                    animate={{ rotateY: [0, -360], scale: [1, 1.1, 1] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                                >
                                    𓂀
                                </motion.span>
                            </div>
                            <p className={styles.subtitle}>Listenting To Every Voice</p>
                            <p className={styles.subtitle} style={{fontSize: '1.2rem'}}>Personalizing Your Experience, listening to your voice</p>
                            <button className={styles.startButton}>START YOUR JOURNEY</button>
                        </div>
                        
                        {/* Column 2: Photo Card */}
                        <div className={styles.photoCard}>
                            <img 
                                src={PhotocardImage} 
                                alt="Grand Egyptian Museum Exterior"
                            />
                            <div className={styles.photoCaption}>Giza, Egypt • Grand Opening 2024</div>
                        </div>
                    </motion.div>

                    {/* Stats Row */}
                    <div className={styles.statsContainer}>
                        {museumStats.map((stat) => (
                            <motion.div 
                                key={stat.label} 
                                className={styles.statCard}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 1.2 + museumStats.indexOf(stat) * 0.1 }}
                            >
                                <div className={styles.statValue}>{stat.value}</div>
                                <div className={styles.statLabel}>{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </MatrixCard>

            {/* -------------------- CONDITIONAL: REGISTRATION FORM OR EXPERIENCE PICKER -------------------- */}
            {!isRegistered ? (
                <section className={styles.scrollSection}>
                    <div style={{ 
                        padding: '40px 20px', 
                        maxWidth: '500px', 
                        margin: '20px auto',
                        border: '2px solid #a33013',
                        borderRadius: '12px',
                    }}>
                        <h2 style={{ color: '#a33013', marginBottom: '24px', textAlign: 'center' }}>Join the Museum Experience</h2>
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div>
                                <label style={{ color: '#a33013', display: 'block', marginBottom: '8px', fontSize: '14px' }}>Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Enter your name"
                                    style={{
                                        width: '100%',
                                        padding: '12px',
                                        backgroundColor: 'var(--bg1)',
                                        border: '1px solid var(--accent)',
                                        borderRadius: '4px',
                                        color: 'var(--text-primary)',
                                        fontSize: '16px',
                                        fontFamily: 'inherit',
                                        boxSizing: 'border-box'
                                    }}
                                    required
                                />
                            </div>
                            <div>
                                <label style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '8px', fontSize: '14px' }}>Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    style={{
                                        width: '100%',
                                        padding: '12px',
                                        backgroundColor: 'rgba(219, 200, 198, 0.1)',
                                        border: '1px solid #a33013',
                                        borderRadius: '4px',
                                        color:  'var(--text-primary)',
                                        fontSize: '16px',
                                        fontFamily: 'inherit',
                                        boxSizing: 'border-box'
                                    }}
                                    required
                                />
                            </div>
                            {isWaitingForNfc && (
                                <div style={{
                                    padding: '12px',
                                    backgroundColor: 'rgba(217, 101, 15, 0.1)',
                                    border: '1px solid var(--primary)',
                                    borderRadius: '4px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px'
                                }}>
                                    <div style={{
                                        width: '20px',
                                        height: '20px',
                                        border: '2px solid var(--primary)',
                                        borderTop: '2px solid transparent',
                                        borderRadius: '50%',
                                        animation: 'spin 1s linear infinite'
                                    }} />
                                    <p style={{ color: 'var(--primary)', fontSize: '14px', margin: 0 }}>
                                        📱 Reading NFC from device... Please wait
                                    </p>
                                </div>
                            )}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                style={{
                                    padding: '14px',
                                    backgroundColor: '#a33013',
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
                                <p style={{ color: '#a33013', fontSize: '12px', textAlign: 'center', margin: 0 }}>
                                    🌐 Web Mode - Device ID auto-generated
                                </p>
                            )}
                        </form>
                    </div>
                </section>
            ) : (
                <>
                    {/* Winners Dashboard */}
                    <WinnersDashboard />

                    {/* EXPERIENCE SECTION */}
                    <section className={styles.experienceSection} id="experience-section">
                        <ExperiencePicker onSelect={handleModeSelection} /> 
                    </section>
                </>
            )}
        </div>
    );
};

export default HomePage;
