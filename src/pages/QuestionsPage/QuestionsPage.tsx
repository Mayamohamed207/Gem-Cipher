import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, Trophy, ArrowRight, LogOut, Sparkles } from 'lucide-react';
import { QUESTIONS, type Question, type RoomQuestionSet } from '../../data/questions';
import styles from './QuestionsPage.module.css';
import kaperIntroVideo from '../../assets/images/kaperIntro.mp4';
import question1Video from '../../assets/images/Question 1 - level 1.mp4';
import question2Video from '../../assets/images/Question 2 - level 1.mp4';
import question3Video from '../../assets/images/Question 3 - level 1.mp4';
import question4Video from '../../assets/images/Question 4 - level 1.mp4';
import ThemeToggle from '../../components/ToggleTheme/ThemeContext';

const questionVideos = [question1Video, question2Video, question3Video, question4Video];

interface QuestionsPageProps {
    room: string;
    mode: 'kids' | 'learning' | 'game';
    level?: string;
    onFinish: () => void;
}

type LevelKey = keyof RoomQuestionSet;
type RoomKey = keyof typeof QUESTIONS;

const FinalPrompt: React.FC<{ room: string; totalScore: number; onContinue: () => void; onExit: () => void }> = ({ room, totalScore, onContinue, onExit }) => (
    <motion.div
        key="final"
        className={styles.finalPromptCard}
        initial={{ opacity: 0, scale: 0.9, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5, type: 'spring' }}
    >
        <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        >
            <Trophy size={100} className={styles.trophyIcon} />
        </motion.div>
        <h3 className={styles.finalHeader}>Challenge Complete!</h3>
        <p className={styles.finalScore}>
            You earned <span className={styles.scoreHighlight}>{totalScore}</span> points in {room}
        </p>
        <div className={styles.finalActions}>
            <motion.button 
                onClick={onContinue} 
                className={styles.advanceButton} 
                whileHover={{ scale: 1.05, y: -2 }} 
                whileTap={{ scale: 0.95 }}
            >
                <ArrowRight size={20} />
                Advance to Next Level
            </motion.button>
            <motion.button 
                onClick={onExit} 
                className={styles.exitButton} 
                whileHover={{ scale: 1.05, y: -2 }} 
                whileTap={{ scale: 0.95 }}
            >
                <LogOut size={20} />
                Exit Experience
            </motion.button>
        </div>
    </motion.div>
);

const QuestionStep: React.FC<{ 
    q: Question; 
    index: number; 
    total: number; 
    onAnswer: (isCorrect: boolean, feedback: string, selectedAnswer: string) => void;
    answeredOption: string | null;
    isCorrectAnswer: boolean | null;
}> = ({ q, index, total, onAnswer, answeredOption, isCorrectAnswer }) => {
    const handleOptionClick = (option: string) => {
        if (answeredOption !== null) return;
        const isCorrect = option.trim().toLowerCase() === q.correctAnswer.trim().toLowerCase();
        onAnswer(isCorrect, q.feedback, option);
    };

    return (
        <motion.div
            key={q.id}
            className={styles.questionForm}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        >
            <div className={styles.questionHeader}>
                <motion.span 
                    className={styles.questionBadge}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring' }}
                >
                    Question {index + 1}/{total}
                </motion.span>
            </div>
            
            <motion.h3 
                className={styles.questionLabel}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
            >
                {q.text}
            </motion.h3>
            
            <div className={styles.optionCardContainer}>
                {q.options.map((option, idx) => {
                    const isSelected = answeredOption === option;
                    const isCorrectOption = option.trim().toLowerCase() === q.correctAnswer.trim().toLowerCase();
                    let cardState = '';
                    if (answeredOption !== null) {
                        if (isSelected && isCorrectAnswer) cardState = styles.correctAnswer;
                        else if (isSelected && !isCorrectAnswer) cardState = styles.wrongAnswer;
                        else if (isCorrectOption && !isCorrectAnswer) cardState = styles.showCorrect;
                    }
                    
                    return (
                        <motion.div
                            key={option}
                            className={`${styles.optionCard} ${isSelected ? styles.selected : ''} ${cardState}`}
                            onClick={() => handleOptionClick(option)}
                            initial={{ x: -50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.2 + idx * 0.1 }}
                            whileHover={answeredOption === null ? { scale: 1.03, y: -4 } : {}}
                            whileTap={answeredOption === null ? { scale: 0.97 } : {}}
                            style={{ cursor: answeredOption === null ? 'pointer' : 'not-allowed' }}
                        >
                            <div className={styles.optionCheckbox}>
                                {isSelected && isCorrectAnswer && <CheckCircle2 size={24} />}
                                {isSelected && !isCorrectAnswer && <XCircle size={24} />}
                                {!isSelected && isCorrectOption && answeredOption !== null && !isCorrectAnswer && <CheckCircle2 size={24} />}
                            </div>
                            <span className={styles.optionText}>{option}</span>
                        </motion.div>
                    );
                })}
            </div>
            
            <AnimatePresence>
                {answeredOption !== null && (
                    <motion.div
                        className={styles.inlineFeedback}
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.9 }}
                        transition={{ duration: 0.4 }}
                    >
                        <motion.div 
                            className={styles.feedbackIcon}
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: 'spring', stiffness: 200 }}
                        >
                            {isCorrectAnswer ? <CheckCircle2 size={56} /> : <XCircle size={56} />}
                        </motion.div>
                        <h4 className={isCorrectAnswer ? styles.correct : styles.incorrect}>
                            {isCorrectAnswer ? 'Excellent Work!' : 'Not Quite Right'}
                        </h4>
                        <div className={styles.keeperFeedback}>
                            <Sparkles size={24} className={styles.sparkleIcon} />
                            <p>{q.feedback}</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

const QuestionsPage: React.FC<QuestionsPageProps> = ({ room, mode, level: initialLevel, onFinish }) => {
    const [currentStep, setCurrentStep] = useState<'intro' | 'question' | 'final'>('intro');
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [currentLevel, setCurrentLevel] = useState(initialLevel || 'Beginner');
    const [totalScore, setTotalScore] = useState(0);
    const [showSmallVideo, setShowSmallVideo] = useState(false);
    const [playAttemptFailed, setPlayAttemptFailed] = useState(false);
    const [isQuestionVideoFinished, setIsQuestionVideoFinished] = useState(false);
    const [answeredOption, setAnsweredOption] = useState<string | null>(null);
    const [isCorrectAnswer, setIsCorrectAnswer] = useState<boolean | null>(null);
    const [isDark, setIsDark] = useState(false);

    const handleThemeToggle = () => setIsDark(prev => !prev);

    const introVideoRef = useRef<HTMLVideoElement>(null);
    const questionVideoRef = useRef<HTMLVideoElement>(null);

    const { questionSet, levelDisplay, error: dataError } = useMemo(() => {
        try {
            const modeKey = (mode === 'kids' ? 'kids' : currentLevel.toLowerCase()) as LevelKey;
            const roomKey = room as RoomKey;
            const qs: readonly Question[] = QUESTIONS[roomKey][modeKey];
            const display = mode === 'kids' ? 'Kids Mode' : `Learning Mode - ${currentLevel}`;
            return { questionSet: qs, levelDisplay: display, error: null };
        } catch {
            return { questionSet: [], levelDisplay: '', error: 'Error loading questions.' };
        }
    }, [room, mode, currentLevel]);

    useEffect(() => {
        setIsQuestionVideoFinished(false);
        setAnsweredOption(null);
        setIsCorrectAnswer(null);
    }, [currentQuestionIndex]);

    useEffect(() => {
        if (currentStep === 'intro' && introVideoRef.current) {
            const playPromise = introVideoRef.current.play();
            if (playPromise !== undefined) playPromise.catch(() => setPlayAttemptFailed(true));
        }
    }, [currentStep]);

    useEffect(() => {
        if (currentStep === 'question' && questionVideoRef.current && !isQuestionVideoFinished) {
            const playPromise = questionVideoRef.current.play();
            if (playPromise !== undefined) playPromise.catch(console.error);
        }
    }, [currentStep, currentQuestionIndex, isQuestionVideoFinished]);

    if (dataError) return <div className={styles.questionsPageContainer}><h1>Error</h1><p>{dataError}</p></div>;

    const currentQuestion = questionSet[currentQuestionIndex];
    const totalQuestions = questionSet.length;
    const progress = ((currentQuestionIndex + (answeredOption ? 1 : 0)) / totalQuestions) * 100;

    const handleAnswerSubmission = (isCorrect: boolean, feedback: string, selectedAnswer: string) => {
        setAnsweredOption(selectedAnswer);
        setIsCorrectAnswer(isCorrect);
        if (isCorrect && currentQuestion) setTotalScore(s => s + currentQuestion.points);
        setTimeout(() => {
            const nextIndex = currentQuestionIndex + 1;
            if (nextIndex < totalQuestions) {
                setCurrentQuestionIndex(nextIndex);
                setCurrentStep('question');
            } else setCurrentStep('final');
        }, 5000);
    };

    const handleContinueInRoom = () => {
        const levels = ['Beginner', 'Intermediate', 'Expert'];
        const currentLevelIndex = levels.indexOf(currentLevel);
        const nextLevelIndex = currentLevelIndex + 1;
        if (nextLevelIndex < levels.length) {
            setCurrentLevel(levels[nextLevelIndex]);
            setCurrentQuestionIndex(0);
            setCurrentStep('question');
            setTotalScore(0);
        } else onFinish();
    };

    const handleIntroEnd = () => {
        setShowSmallVideo(true);
        setCurrentStep('question');
    };

    const handleStartVideo = () => {
        if (introVideoRef.current) introVideoRef.current.play().catch(console.error);
    };

    const handleQuestionVideoEnd = () => setIsQuestionVideoFinished(true);

    const currentQuestionVideo = questionVideos[currentQuestionIndex] ?? kaperIntroVideo;

    return (
        <motion.div 
            className={`${styles.questionsPageContainer} ${isDark ? styles.darkTheme : styles.lightTheme}`} 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 0.6 }}
        >
            <div className={styles.themeToggleWrapper}>
                <ThemeToggle isDark={isDark} onToggle={handleThemeToggle} />
            </div>

            <motion.div 
                className={styles.headerSection}
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
            >
                <h1 className={styles.heading}>{room.toUpperCase()}</h1>
                <p className={styles.levelDisplay}>{levelDisplay}</p>
                <motion.div 
                    className={styles.scoreDisplay}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                >
                    <Trophy size={28} />
                    <span>{totalScore} Points</span>
                </motion.div>
            </motion.div>

            <div className={styles.progressBarContainer}>
                <motion.div 
                    className={styles.progressBar} 
                    initial={{ width: 0 }} 
                    animate={{ width: `${progress}%` }} 
                    transition={{ duration: 0.6, ease: 'easeOut' }} 
                />
                <span className={styles.progressLabel}>
                    {currentStep !== 'final' ? `${currentQuestionIndex + 1}/${totalQuestions}` : 'Complete'}
                </span>
            </div>

            <AnimatePresence mode="wait">
                {currentStep === 'intro' && (
                    <motion.div 
                        className={styles.keeperVideoContainer} 
                        key="intro-video" 
                        initial={{ opacity: 0, scale: 0.9 }} 
                        animate={{ opacity: 1, scale: 1 }} 
                        exit={{ opacity: 0, scale: 0.9 }} 
                        transition={{ duration: 0.5 }}
                    >
                        <video 
                            ref={introVideoRef} 
                            src={kaperIntroVideo} 
                            playsInline 
                            autoPlay 
                            controls={false} 
                            className={styles.videoPlayer} 
                            onEnded={handleIntroEnd} 
                        />
                        {playAttemptFailed && (
                            <motion.button 
                                className={styles.startButtonOverlay} 
                                onClick={handleStartVideo} 
                                initial={{ opacity: 0, scale: 0.8 }} 
                                animate={{ opacity: 1, scale: 1 }} 
                                whileHover={{ scale: 1.1 }} 
                                whileTap={{ scale: 0.9 }}
                            >
                                <Sparkles size={24} />
                                Begin Your Journey
                            </motion.button>
                        )}
                        <motion.button 
                            className={styles.skipButton} 
                            onClick={handleIntroEnd}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Skip Introduction
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>

            {showSmallVideo && currentStep === 'question' && !isQuestionVideoFinished && (
                <motion.div 
                    className={`${styles.keeperVideoContainer} ${styles.smallVideo}`} 
                    key={`question-video-container-${currentQuestionIndex}`} 
                    initial={{ opacity: 0, scale: 0.5, x: 100, y: 100 }} 
                    animate={{ opacity: 1, scale: 1, x: 0, y: 0 }} 
                    exit={{ opacity: 0, scale: 0.5 }} 
                    transition={{ duration: 0.5, type: 'spring' }}
                >
                    <video 
                        ref={questionVideoRef} 
                        key={`video-${currentQuestionIndex}`} 
                        src={currentQuestionVideo} 
                        playsInline 
                        autoPlay 
                        controls={false} 
                        className={styles.videoPlayerSmall} 
                        onEnded={handleQuestionVideoEnd} 
                    />
                </motion.div>
            )}

            <AnimatePresence mode="wait">
                {currentStep === 'question' && currentQuestion && (
                    <QuestionStep 
                        q={currentQuestion} 
                        index={currentQuestionIndex} 
                        total={totalQuestions} 
                        onAnswer={handleAnswerSubmission} 
                        answeredOption={answeredOption} 
                        isCorrectAnswer={isCorrectAnswer} 
                    />
                )}
                {currentStep === 'final' && (
                    <FinalPrompt 
                        room={room} 
                        totalScore={totalScore} 
                        onContinue={handleContinueInRoom} 
                        onExit={onFinish} 
                    />
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default QuestionsPage;