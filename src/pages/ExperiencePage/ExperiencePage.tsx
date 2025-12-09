// src/pages/ExperiencePage/ExperiencePage.tsx
import React from 'react';
import ExperiencePicker from '../../components/ExperiencePicker/ExperiencePicker';

interface ExperiencePageProps {
    userInfo: { name: string; email: string };
    onExperienceSelect: (experienceId: string) => void;
}

const ExperiencePage: React.FC<ExperiencePageProps> = ({ userInfo, onExperienceSelect }) => {
    return (
        <div style={{ padding: '60px 20px', textAlign: 'center' }}>
            <h1 style={{ fontSize: '3em', color: 'var(--gold-bright-solid)', textShadow: 'var(--shadow-neon)' }}>
                HAIL, {userInfo.name.toUpperCase()}!
            </h1>
            <p style={{ fontSize: '1.2em', color: 'var(--text-secondary)', marginBottom: '40px' }}>
                Your journey through the annals of Kemet awaits.
            </p>
            <ExperiencePicker onSelect={onExperienceSelect} />
        </div>
    );
};

export default ExperiencePage;