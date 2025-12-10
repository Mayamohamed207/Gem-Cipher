// src/pages/HomePage/HomePage.tsx
import React from 'react';
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
    onToggleTheme: () => void;
    isDark: boolean;
}

const museumStats = [
  { label: "Artifacts", value: "100,000+" },
  { label: "Spans", value: "5,000 Years" },
  { label: "Interactive", value: "12" },
  { label: "Daily Visitors", value: "(50,000+)" },
];

const HomePage: React.FC<HomePageProps> = ({ onExperienceSelect, onToggleTheme, isDark }) => {
    
    const handleModeSelection = (id: string) => {
        const dummyUserInfo: UserInfo = {
            name: "Visitor",
            email: "visitor@museum.com",
        };
        onExperienceSelect(id, dummyUserInfo);
    };

    const scrollToExperience = () => {
        document.getElementById('experience-section')?.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    };

    return (
        <div className={styles.pageWrapper}>
            {/* Theme Toggle Button */}
            <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
            
            {/* HERO SECTION WITH MATRIX BACKGROUND */}
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
                                <h1 className={styles.title}>THE GRAND<br/>EGYPTIAN MUSEUM</h1>
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
                            <div className={styles.photoCaption}>Giza, Egypt • Grand Opening</div>
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

              {/* Winners Dashboard */}
                    <WinnersDashboard />

                    {/* Experience Picker */}

            {/* EXPERIENCE SECTION */}
            <section className={styles.experienceSection} id="experience-section">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <ExperiencePicker onSelect={handleModeSelection} /> 
                </motion.div>
            </section>
        </div>
    );
};

export default HomePage;
