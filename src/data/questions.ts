// src/data/questions.ts

// --- Core Types ---
interface Question {
    id: number;
    text: string;
    type: 'text' | 'number' | 'radio' | 'textarea' | 'select' | 'drawing';
    options?: string[]; // For radio/select questions
    correctAnswer: string; // Expected answer for validation
    feedback: string;      // Keeper's response (Feedback column)
    points: number;        // Points awarded for correct answer (if applicable)
}

interface FeedbackQuestion {
    id: number;
    text: string;
    type: 'radio' | 'textarea';
    options?: string[];
}

interface RoomQuestionSet {
    kids: Question[];
    beginner: Question[];
    intermediate: Question[];
    expert: Question[];
}

// NOTE: We rely on the inferred type of QUESTIONS for QuestionData

// --- Combined and Structured Question Data for MVP (All in Room 1) ---

const QUESTIONS = {
    'room1': { // ALL QUESTIONS ARE NOW UNDER ROOM 1 FOR MVP
        // --- KIDS MODE Questions (Originally room1 kids) ---
        // FIX: Add `as Question[]` here to assert the mutable type
        kids: [
            { id: 1, text: "The biggest tomb belonged to a pharaoh who lived a very long time ago. What was the name of this king?", type: 'text' as const, correctAnswer: "Horus", feedback: "Horus was a god associated with the sky, kingship, and protection. His name means 'The Distant One'.", points: 10 },
            { id: 2, text: "How many cats can you find in this room?", type: 'number' as const, correctAnswer: "1", feedback: "Indeed! There is one cat on a pedestal here to honor Bastet, the goddess of protection and cats.", points: 10 },
            { id: 3, text: "Is the pharaoh smiling? (Yes/No)", type: 'radio' as const, options: ['Yes', 'No'], correctAnswer: "Yes", feedback: "Yes, many pharaohs were shown smiling to represent the happiness of the gods.", points: 10 },
            { id: 4, text: "The walls have colorful drawings on them. What color is the big mummy case?", type: 'text' as const, correctAnswer: "Golden/Gold", feedback: "The color gold represented the flesh of the gods and immortality.", points: 10 },
            { id: 5, text: "What is the name of this room?", type: 'text' as const, correctAnswer: "The Gods", feedback: "This room contains artifacts dedicated to the powerful Gods of the Egyptian pantheon.", points: 10 },
            { id: 6, text: "The keeper is showing me what people used to do every day. What did they use to write on?", type: 'text' as const, correctAnswer: "Papyrus", feedback: "Papyrus was a thick paper-like material made from the pith of the papyrus plant.", points: 10 },
            { id: 7, text: "How many big statues are there?", type: 'number' as const, correctAnswer: "2", feedback: "There are two major seated statues, likely of a scribe and his wife, emphasizing literacy.", points: 10 },
            { id: 8, text: "I'm looking at the big stone box that held a mummy. Is the big stone box called a coffin or a sarcophagus?", type: 'radio' as const, options: ['Coffin', 'Sarcophagus'], correctAnswer: "Sarcophagus", feedback: "The sarcophagus is the large outer coffin, typically made of stone.", points: 10 },
        ] as Question[], // <-- FIX APPLIED HERE

        // --- BEGINNER Questions (Originally room1, room2, room3 beginner sets) ---
        // FIX: Add `as Question[]` here to assert the mutable type
        beginner: [
            { id: 1, text: "What is the name of the biggest sarcophagus in this room?", type: 'text' as const, correctAnswer: "Horus's sarcophagus", feedback: "The name of the sarcophagus is named after the king it contained, Horus. It is a grand display of craftsmanship.", points: 25 },
            { id: 2, text: "The keeper is telling me about the gods. Name two major gods depicted on the wall carvings.", type: 'text' as const, correctAnswer: "Horus, Osiris, Anubis, etc.", feedback: "The most prominent gods here are Horus (sky/kingship) and Osiris (underworld).", points: 25 },
            { id: 3, text: "Which historical period does this collection represent?", type: 'select' as const, options: ['Old Kingdom', 'Middle Kingdom', 'New Kingdom'], correctAnswer: "New Kingdom", feedback: "This area primarily features artifacts from the New Kingdom (c. 1550–1070 BC).", points: 25 },
            { id: 4, text: "The keeper said, 'The belief in the afterlife is key to the culture'. Why do you think the belief in the afterlife was so important to the Egyptians?", type: 'textarea' as const, correctAnswer: "It influenced burial practices, art, religion, etc.", feedback: "The belief in the afterlife drove the elaborate process of mummification and the creation of magnificent tombs.", points: 25 },
            { id: 5, text: "Which material is used for the small statues in this hall?", type: 'text' as const, correctAnswer: "Wood/Terracotta", feedback: "The small statues are often made of painted wood or fired terracotta.", points: 25 },
            { id: 6, text: "What's the name of the most important god of the dead?", type: 'text' as const, correctAnswer: "Anubis", feedback: "Anubis, the jackal-headed god, oversaw embalming and guided souls to the underworld.", points: 25 },
        ] as Question[], // <-- FIX APPLIED HERE

        // --- INTERMEDIATE Questions (Originally room1, room2, room3 intermediate sets) ---
        // FIX: Add `as Question[]` here to assert the mutable type
        intermediate: [
            { id: 1, text: "Explain the significance of the Ankh symbol in this exhibit.", type: 'textarea' as const, correctAnswer: "It represents 'life' or 'eternal life'.", feedback: "The Ankh is an Egyptian hieroglyphic symbol that represented 'life'. It was often held by gods, especially those associated with the afterlife.", points: 40 },
            { id: 2, text: "What artifact here was a gift from a foreign dignitary?", type: 'text' as const, correctAnswer: "A small bird statue", feedback: "The small bird statue (possibly a Falcon representing Horus) was a gift from a foreign dignitary to cement an alliance.", points: 40 },
            { id: 3, text: "Estimate the age of the statues using clues, in years.", type: 'number' as const, correctAnswer: "3000", feedback: "These statues date back approximately 3,000 years, primarily from the New Kingdom period.", points: 40 },
        ].concat([
            { id: 4, text: "Analyze the symbolism in the wall paintings showing agriculture.", type: 'textarea' as const, correctAnswer: "Symbolism relates to the flooding of the Nile and abundance.", feedback: "The paintings symbolize the fertility of the Nile and the cycle of death and rebirth inherent in the agricultural season.", points: 40 },
            { id: 5, text: "Explain the purpose of Canopic Jars in the burial process.", type: 'textarea' as const, correctAnswer: "To store the internal organs (lungs, liver, stomach, intestines).", feedback: "The Canopic Jars held the viscera, each jar guarded by one of the four sons of Horus.", points: 40 },
        ]) as Question[], // <-- FIX APPLIED HERE

        // --- EXPERT Questions (Originally room1, room2, room3 expert sets) ---
        // FIX: Add `as Question[]` here to assert the mutable type
        expert: [
            { id: 1, text: "Critique the conservation efforts applied to the textile artifacts in this room.", type: 'textarea' as const, correctAnswer: "Focus on humidity control, lighting, and material stability.", feedback: "Conservation efforts must balance public access with preservation, focusing on controlling environmental factors like UV light, temperature, and humidity to slow decay.", points: 50 },
            { id: 2, text: "Propose an alternative dating for the central stele based on stylistic analysis, and justify your proposal.", type: 'textarea' as const, correctAnswer: "Analysis should reference early dynasty styles or later Roman influences.", feedback: "The central stele's dating is firm, but a justifiable alternative dating based on specific iconographic differences could be argued.", points: 50 },
        ].concat([
            { id: 3, text: "Discuss the influence of foreign cultures in these artifacts, specifically ceramics.", type: 'textarea' as const, correctAnswer: "Referencing Minoan, Mycenaean, or Levantine trade influence.", feedback: "Ceramics from the Late Bronze Age often show trade connections with the Aegean and Levant regions, indicating cultural exchange.", points: 50 },
            { id: 4, text: "Evaluate the complexity of the Weighing of the Heart ritual.", type: 'textarea' as const, correctAnswer: "Focus on Ma'at (truth/justice) and Thoth (scribal/knowledge).", feedback: "The ritual was central to the Egyptian religious cosmology, determining the deceased's worthiness for the afterlife by balancing the heart against the feather of Ma'at.", points: 50 },
        ]) as Question[], // <-- FIX APPLIED HERE
    },
} as const; // We keep 'as const' here to preserve literal key types ('room1', 'kids', etc.)

// Define QuestionData based on the inferred type of QUESTIONS
type QuestionData = typeof QUESTIONS;

// --- Feedback Questions for Exit Prompt (Unchanged) ---
const FEEDBACK_QUESTIONS: FeedbackQuestion[] = [
    { id: 1, text: "Did you feel like you learned something new in this exhibit?", type: 'radio', options: ['Yes, definitely', 'A little bit', 'Not really'] },
    { id: 2, text: "How engaging were the questions for your chosen level?", type: 'radio', options: ['Very engaging', 'Moderately engaging', 'A bit boring'] },
    { id: 3, text: "Do you have any suggestions for improving this exhibit or the questions?", type: 'textarea' },
];

export { QUESTIONS, FEEDBACK_QUESTIONS, type Question, type FeedbackQuestion, type RoomQuestionSet, type QuestionData };