import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QUESTIONS, FEEDBACK_QUESTIONS, type Question, type FeedbackQuestion, type RoomQuestionSet } from '../../data/questions';
import styles from './QuestionsPage.module.css';

interface QuestionsPageProps {
    room: string;
    mode: 'kids' | 'learning' | 'game';
    level?: string;
    onFinish: () => void;
}

type LevelKey = keyof RoomQuestionSet;
type RoomKey = keyof typeof QUESTIONS;

const QuestionStep: React.FC<{
    q: Question,
    index: number,
    total: number,
    onAnswer: (isCorrect: boolean, feedback: string) => void
}> = ({ q, index, total, onAnswer }) => {
    const [userAnswer, setUserAnswer] = useState<string>('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const normalizedCorrect = String(q.correctAnswer).trim().toLowerCase();
        const normalizedUser = userAnswer.trim().toLowerCase();
        let isCorrect = q.type === 'number' || q.type === 'text' || q.type === 'radio'
            ? normalizedUser === normalizedCorrect
            : userAnswer.length > 2;
        onAnswer(isCorrect, q.feedback);
    };

    const inputProps = {
        required: true,
        className: styles.textInput,
        onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setUserAnswer(e.target.value),
        value: userAnswer,
    };

    return (
        <motion.form
            key={q.id}
            className={styles.questionForm}
            onSubmit={handleSubmit}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            <h3 className={styles.questionTitle}>
                Question {index + 1} of {total}
            </h3>
            <label className={styles.questionLabel}>{q.text}</label>

            {q.type === 'text' && <input type="text" {...inputProps} />}
            {q.type === 'number' && <input type="number" {...inputProps} />}
            {q.type === 'textarea' && <textarea rows={4} {...inputProps} className={styles.textArea} />}

            {q.type === 'radio' && q.options && (
                <div className={styles.optionCardContainer}>
                    {q.options.map(option => (
                        <div
                            key={option}
                            className={`${styles.optionCard} ${userAnswer === option ? styles.selected : ''}`}
                            onClick={() => setUserAnswer(option)}
                        >
                            {option}
                        </div>
                    ))}
                </div>
            )}

            {(q.type === 'select' || q.type === 'drawing') && (
                <p className={styles.placeholderInput}>[{q.type.toUpperCase()} INPUT AREA]</p>
            )}

            <motion.button type="submit" className={styles.submitButton} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                Submit Answer 💡
            </motion.button>
        </motion.form>
    );
};

// FeedbackStep and FinalPrompt remain unchanged, just CSS and small tweaks for option cards apply.

const QuestionsPage: React.FC<QuestionsPageProps> = ({ room, mode, level: initialLevel, onFinish }) => {
    const [currentStep, setCurrentStep] = useState<'question' | 'feedback' | 'final'>('question');
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [currentLevel, setCurrentLevel] = useState(initialLevel || 'Beginner');
    const [totalScore, setTotalScore] = useState(0);
    const [feedbackText, setFeedbackText] = useState('');

    const rawModeKey = (mode === 'kids' ? 'kids' : currentLevel.toLowerCase()) as LevelKey;
    const roomKey = room as RoomKey;
    const questionSet: Question[] = QUESTIONS[roomKey][rawModeKey];
    const currentQuestion = questionSet[currentQuestionIndex];

    const handleAnswerSubmission = (isCorrect: boolean, feedback: string) => {
        if (isCorrect) setTotalScore(s => s + (currentQuestion?.points || 0));
        setFeedbackText(feedback);
        setCurrentStep('feedback');
    };

    const handleNextQuestion = () => {
        const nextIndex = currentQuestionIndex + 1;
        if (nextIndex < questionSet.length) setCurrentQuestionIndex(nextIndex);
        else setCurrentStep('final');
        setCurrentStep('question');
    };

    const progress = (currentQuestionIndex / questionSet.length) * 100;

    return (
        <motion.div className={styles.questionsPageContainer} initial={{ x: 300, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ type: 'spring', stiffness: 100 }}>
            <h1 className={styles.heading}>{room.toUpperCase()}: {mode === 'kids' ? 'Kids Mode' : `Learning Mode (${currentLevel})`} Challenge 🏛️</h1>
            <p className={styles.subtext}>**Current Score:** {totalScore} points</p>

            <div className={styles.progressBarContainer}>
                <div className={styles.progressBar} style={{ width: `${progress}%` }}></div>
                <span className={styles.progressLabel}>
                    {currentStep !== 'final' ? `Question ${currentQuestionIndex + 1} of ${questionSet.length}` : 'Session Complete'}
                </span>
            </div>

            <AnimatePresence mode="wait">
                {currentStep === 'question' && currentQuestion && (
                    <QuestionStep q={currentQuestion} index={currentQuestionIndex} total={questionSet.length} onAnswer={handleAnswerSubmission} />
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default QuestionsPage;
