// src/data/questions.ts

// --- Core Types ---
interface Question {
    id: number;
    text: string;
    type: 'radio'; // All questions are now multiple-choice
    options: string[]; // For MCQ
    correctAnswer: string; // Expected answer
    feedback: string;      // Keeper's response
    points: number;       // Points awarded
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

// --- QUESTIONS Object ---
const QUESTIONS: Record<string, RoomQuestionSet> = {
    room1: {
        // --- KIDS MODE (Child 5-10) ---
        // NOTE: Checkpoints/Intros/Rewards (IDs 5, 10, 15, 20, 25 and 3, 8, 13, 18, 23) are omitted 
        // or moved to FeedbackQuestion to strictly fit the 'Question' interface.
        kids: [
            // 1: Economy
            { id: 1, text: "Hi! 👋 I am Ka-aper. We are at a place called a 'Hwt'. It looks like a village, but it is actually a factory farm built by the King! Who decided to build this big farm?", type: 'radio', options: ["A farmer named Bob", "The Pharaoh (The King)!"], correctAnswer: "The Pharaoh (The King)!", feedback: "That's right! The Pharaoh founded these $hwt$ farms.", points: 10 },
            { id: 2, text: "We don't have money like coins or dollars yet. 🚫💰 We pay people with Bread and Beer! It is payday! What do I give the workers?", type: 'radio', options: ["Gold coins", "Yummy bread and beer!"], correctAnswer: "Yummy bread and beer!", feedback: "Exactly! Bread and beer were the basic wages.", points: 10 },
            // ID 3: Feedback - Omitted or moved to separate Feedback list.
            { id: 4, text: "See those round buildings? They are called Granaries. That is where we hide the grain to keep it safe. What is inside the round buildings?", type: 'radio', options: ["Sleeping cows 🐮", "Food (Grain) 🌾"], correctAnswer: "Food (Grain) 🌾", feedback: "Correct! The granaries are our state bank.", points: 10 },
            // ID 5: Checkpoint - Omitted

            // 2: Administration
            { id: 6, text: "The King is the biggest boss. But his helper is called the Vizier. He wears a long dress and tells us what to do. Who is the King's special helper?", type: 'radio', options: ["The Vizier", "The Mommy"], correctAnswer: "The Vizier", feedback: "The Vizier ($Tjati$) was the King's chief administrator.", points: 10 },
            { id: 7, text: "The King wants us to build a Sun Temple for the god Ra. ☀️ It has a big stone needle called an obelisk. Which god does the King love the most right now?", type: 'radio', options: ["Ra (The Sun) ☀️", "The Moon 🌙"], correctAnswer: "Ra (The Sun) ☀️", feedback: "The 5th Dynasty was obsessed with the Sun god Ra.", points: 10 },
            // ID 8: Feedback - Omitted
            { id: 9, text: "The priests at the temple have a special paper called an Exemption. It means 'Do Not Touch!' Can I take the priest's lunch?", type: 'radio', options: ["Yes, take it!", "No, the King protects them! 🛡️"], correctAnswer: "No, the King protects them! 🛡️", feedback: "Exemption decrees protected temples and staff from taxes/labor.", points: 10 },
            // ID 10: Checkpoint - Omitted

            // 3: Daily Life
            { id: 11, text: "Scribes are the only ones who can read. They use special pens made of reed plants. 🌿 How do I write down how many cows we have?", type: 'radio', options: ["With a reed pen and papyrus", "With a computer"], correctAnswer: "With a reed pen and papyrus", feedback: "Papyrus and reed pens were the tools of the scribe.", points: 10 },
            { id: 12, text: "We write in two ways! Hieroglyphs are pretty pictures for walls. Hieratic is squiggly writing for paper. I need to write a quick letter. Which writing is faster?", type: 'radio', options: ["Squiggly writing (Hieratic) ✍️", "Picture writing (Hieroglyphs)"], correctAnswer: "Squiggly writing (Hieratic) ✍️", feedback: "Hieratic was the quick, cursive form for administrative use.", points: 10 },
            // ID 13: Feedback - Omitted
            { id: 14, text: "My dad was an Overseer, and his dad was an Overseer. In Egypt, you usually do the same job as your dad! When I grow up, what job will I probably have?", type: 'radio', options: ["The same job as my dad", "An astronaut"], correctAnswer: "The same job as my dad", feedback: "Social mobility was low; jobs were often hereditary.", points: 10 },
            // ID 15: Checkpoint - Omitted

            // 4: Beliefs
            { id: 16, text: "If I get sick, I can write a letter to my grandpa who is in heaven. It is called a Letter to the Dead. I have a tummy ache and the doctor can't fix it. Who can I ask for help?", type: 'radio', options: ["My Grandpa's ghost 👻", "A crocodile"], correctAnswer: "My Grandpa's ghost 👻", feedback: "Letters to the Dead were requests for intervention by ancestors.", points: 10 },
            { id: 17, text: "We put little statues in the tomb called Shabtis. They do all the work for us in the afterlife! I don't want to wash dishes in heaven. Who will do it for me?", type: 'radio', options: ["My Shabti statue", "The King"], correctAnswer: "My Shabti statue", feedback: "Shabtis were magical servant figures to work for the deceased.", points: 10 },
            // ID 18: Feedback - Omitted
            { id: 19, text: "Most people live in mud-brick houses in the village (Njwt), not in the palace. Where do the farmers sleep?", type: 'radio', options: ["In mud houses 🏠", "In the pyramid"], correctAnswer: "In mud houses 🏠", feedback: "Ordinary people lived in simple mud-brick homes.", points: 10 },
            // ID 20: Checkpoint - Omitted

            // 5: The End
            { id: 21, text: "The King stopped building big pyramids because he ran out of money and the local bosses got too strong. Why are there no more big pyramids?", type: 'radio', options: ["The King lost his power 📉", "The aliens took them"], correctAnswer: "The King lost his power 📉", feedback: "The decentralization of power led to the end of the Old Kingdom.", points: 10 },
            { id: 22, text: "When the King is weak, the country splits into pieces. We call this the First Intermediate Period. What happened when the Old Kingdom ended?", type: 'radio', options: ["Egypt split into small parts 🧩", "Everyone had a party"], correctAnswer: "Egypt split into small parts 🧩", feedback: "The country fragmented into competing regional states.", points: 10 },
            // ID 23: Feedback - Omitted
            { id: 24, text: "Even though the Kingdom ended, people kept making art and telling stories. Did people disappear after the pyramids?", type: 'radio', options: ["No, they kept living and making art", "Yes, they vanished"], correctAnswer: "No, they kept living and making art", feedback: "Civilization continued, it just changed form.", points: 10 },
            // ID 25: Reward - Omitted
        ],

        // --- BEGINNER (Teen/Adult Level 1) ---
        beginner: [
            // 1: Economy
            // ID 0: Intro_Info - Omitted
            { id: 1, text: "What is the main purpose of this place?", type: 'radio', options: ["Producing food for the King", "A vacation spot"], correctAnswer: "Producing food for the King", feedback: "The $hwt$ (estates) were agricultural centers for the crown.", points: 25 },
            { id: 2, text: "How do I pay workers?", type: 'radio', options: ["Bread/Beer", "Gold Coins"], correctAnswer: "Bread/Beer", feedback: "Wages were paid in rations, primarily grain and beer.", points: 25 },
            // ID 3: Feedback - Omitted
            { id: 3, text: "Does the layout of this exhibit make it easy to see the artifacts?", type: 'radio', options: ["Yes", "No Crowded"], correctAnswer: "", feedback: "", points: 25 },
            { id: 4, text: "What is in the round silo?", type: 'radio', options: ["Grain", "Sand"], correctAnswer: "Grain", feedback: "The silo (granary) stored the state's wealth.", points: 25 },
            
// ID 5: Checkpoint - Omitted

            // 2: Administration
            // ID 5.1: Intro_Info - Omitted
            { id: 4, text: "Who runs the country for the Pharaoh?", type: 'radio', options: ["The Vizier", "The General"], correctAnswer: "The Vizier", feedback: "The Vizier ($Tjati$) was the highest non-royal official.", points: 25 },
            { id: 7, text: "Which god does the 5th Dynasty King love?", type: 'radio', options: ["Ra (Sun)", "Moon"], correctAnswer: "Ra (Sun)", feedback: "The 5th Dynasty saw the rise of the solar cult of Ra.", points: 25 },
            // ID 8: Feedback - Omitted
            { id: 9, text: "What is a 'Decree'?", type: 'radio', options: ["A royal order", "A poem"], correctAnswer: "A royal order", feedback: "A decree was a formal order issued by the king's administration.", points: 25 },
            // ID 10: Checkpoint - Omitted

            // 3: Daily Life
            // ID 10.1: Intro_Info - Omitted
            { id: 11, text: "Which writing is used for fast paperwork?", type: 'radio', options: ["Hieratic", "Hieroglyphs"], correctAnswer: "Hieratic", feedback: "Hieratic was the quick, cursive script for daily administration.", points: 25 },
            { id: 12, text: "Who teaches you your job?", type: 'radio', options: ["Your father", "School teacher"], correctAnswer: "Your father", feedback: "Skills and offices were typically passed down hereditarily.", points: 25 },
            // ID 13: Feedback - Omitted
            { id: 14, text: "Where do normal people live?", type: 'radio', options: ["Mud-brick villages", "Palaces"], correctAnswer: "Mud-brick villages", feedback: "The majority of the population lived in simple, perishable houses.", points: 25 },
            // ID 15: Checkpoint - Omitted

            // 4: Beliefs
            // ID 15.1: Intro_Info - Omitted
            { id: 16, text: "Who are 'Letters to the Dead' addressed to?", type: 'radio', options: ["Ancestors", "Gods"], correctAnswer: "Ancestors", feedback: "They were written to deceased family members for help.", points: 25 },
            { id: 17, text: "Why put servant statues in a tomb?", type: 'radio', options: ["To work for you", "To look nice"], correctAnswer: "To work for you", feedback: "Shabti figures were magically animated to perform labor.", points: 25 },
            // ID 18: Feedback - Omitted
            { id: 19, text: "Who brings food to the tomb?", type: 'radio', options: ["The Ka-Priest", "The King"], correctAnswer: "The Ka-Priest", feedback: "The Ka-Priest was responsible for maintaining the funerary cult.", points: 25 },
            // ID 20: Checkpoint - Omitted

            // 5: The End
            // ID 20.1: Intro_Info - Omitted
            { id: 21, text: "Who took power from the King?", type: 'radio', options: ["Local Governors (Nomarchs)", "The Army"], correctAnswer: "Local Governors (Nomarchs)", feedback: "Provincial governors gained hereditary power, weakening the center.", points: 25 },
            { id: 22, text: "What happened after the collapse?", type: 'radio', options: ["Egypt split (First Intermediate Period)", "Peace"], correctAnswer: "Egypt split (First Intermediate Period)", feedback: "The collapse led to a period of political fragmentation and civil war.", points: 25 },
            // ID 23: Feedback - Omitted
            { id: 24, text: "Did people forget the Pyramids?", type: 'radio', options: ["No, they revered them", "Yes"], correctAnswer: "No, they revered them", feedback: "Pyramids remained important religious and symbolic structures.", points: 25 },
            // ID 25: Reward - Omitted
        ],

        // --- INTERMEDIATE (Teen/Adult Level 2) ---
        intermediate: [
            // 1: Economy
            // ID 0: Intro_Info - Omitted
            { id: 1, text: "How does a Hwt differ from a Njwt?", type: 'radio', options: ["Hwt is planned/state-run", "Njwt is a natural village"], correctAnswer: "Hwt is planned/state-run", feedback: "The $hwt$ was a centrally planned economic foundation, not a natural settlement.", points: 40 },
            { id: 2, text: "What is the standard wage unit?", type: 'radio', options: ["Grain rations", "Copper debens"], correctAnswer: "Grain rations", feedback: "The primary unit of value and wage was grain (barley/emmer).", points: 40 },
            // ID 3: Feedback - Omitted
            { id: 4, text: "Why are Granaries vital?", type: 'radio', options: ["They act as the state bank", "They store weapons"], correctAnswer: "They act as the state bank", feedback: "Grain storage was the basis of economic power and credit.", points: 40 },
            // ID 5: Checkpoint - Omitted

            // 2: Administration
            // ID 5.1: Intro_Info - Omitted
            { id: 6, text: "How did the selection of the Vizier change over time?", type: 'radio', options: ["It stayed within powerful families", "It became elected"], correctAnswer: "It stayed within powerful families", feedback: "The office of Vizier often became concentrated in a few elite families.", points: 40 },
            { id: 7, text: "What new monument is built in the 5th Dynasty?", type: 'radio', options: ["Sun Temples", "Libraries"], correctAnswer: "Sun Temples", feedback: "Monumental Sun Temples were characteristic of the 5th Dynasty.", points: 40 },
            // ID 8: Feedback - Omitted
            { id: 9, text: "Where were royal decrees displayed?", type: 'radio', options: ["Carved on temple walls (Stelae)", "On papyrus only"], correctAnswer: "Carved on temple walls (Stelae)", feedback: "Royal decrees were publicly inscribed on stone stelae.", points: 40 },
            // ID 10: Checkpoint - Omitted

            // 3: Daily Life
            // ID 10.1: Intro_Info - Omitted
            { id: 11, text: "Why use Hieratic instead of Hieroglyphs?", type: 'radio', options: ["Speed and efficiency", "It looks holier"], correctAnswer: "Speed and efficiency", feedback: "Hieratic was faster to write for bureaucratic purposes.", points: 40 },
            { id: 12, text: "What is the 'Household' (pr)?", type: 'radio', options: ["An extended economic family unit", "A nuclear family"], correctAnswer: "An extended economic family unit", feedback: "The 'Household' was a large socio-economic unit encompassing extended kin and staff.", points: 40 },
            // ID 13: Feedback - Omitted
            { id: 14, text: "How is the village organized?", type: 'radio', options: ["By kinship/clan", "By military rank"], correctAnswer: "By kinship/clan", feedback: "Village structure was based on family and clan units.", points: 40 },
            // ID 15: Checkpoint - Omitted

            // 4: Beliefs
            // ID 15.1: Intro_Info - Omitted
            { id: 16, text: "What was a common reason for writing to the Dead?", type: 'radio', options: ["Solving family disputes", "Asking for rain"], correctAnswer: "Solving family disputes", feedback: "Letters often dealt with social and legal problems.", points: 40 },
            { id: 17, text: "What is a 'Shabti'?", type: 'radio', options: ["A magical servant worker", "A god"], correctAnswer: "A magical servant worker", feedback: "Shabtis were intended to substitute for the deceased in corvée labor.", points: 40 },
            // ID 18: Feedback - Omitted
            { id: 19, text: "How do you pay the priest forever?", type: 'radio', options: ["With a land endowment", "With gold"], correctAnswer: "With a land endowment", feedback: "Funerary cults were typically funded by dedicated land (endowments).", points: 40 },
            // ID 20: Checkpoint - Omitted

            // 5: The End
            // ID 20.1: Intro_Info - Omitted
            { id: 21, text: "What sign proves the decline of the central state?", type: 'radio', options: ["Large elite tombs far from Memphis", "Burning pyramids"], correctAnswer: "Large elite tombs far from Memphis", feedback: "Elite tombs in the provinces show Nomarchs accumulating independent wealth and power.", points: 40 },
            { id: 22, text: "Did civilization die?", type: 'radio', options: ["No, local culture flourished", "Yes"], correctAnswer: "No, local culture flourished", feedback: "The Egyptian state collapsed, but culture and art continued locally.", points: 40 },
            // ID 23: Feedback - Omitted
            { id: 24, text: "Who reunited Egypt later?", type: 'radio', options: ["Thebes (Middle Kingdom)", "Nubia"], correctAnswer: "Thebes (Middle Kingdom)", feedback: "The Kings of the 11th Dynasty from Thebes eventually reunified the country.", points: 40 },
            // ID 25: Reward - Omitted
        ],

        // --- EXPERT (Teen/Adult Level 3) ---
        expert: [
            // 1: Economy
            // ID 0: Intro_Info - Omitted
            { id: 1, text: "What was the geopolitical function of the Hwt system?", type: 'radio', options: ["Internal colonization and resource extraction", "Feudal military outposts"], correctAnswer: "Internal colonization and resource extraction", feedback: "The $hwt$ system was key to controlling and extracting resources from newly settled land.", points: 50 },
            { id: 2, text: "How is value calculated without coin?", type: 'radio', options: ["Standardized weights of barley", "Silver rings"], correctAnswer: "Standardized weights of barley", feedback: "Value was measured in units of grain or copper ($deben$), not coinage.", points: 50 },
            // ID 3: Feedback - Omitted
            { id: 4, text: "Where does surplus grain go?", type: 'radio', options: ["Redistributed to the Residence", "Sold abroad"], correctAnswer: "Redistributed to the Residence", feedback: "Surplus was shipped to the royal residence (Memphis) to feed the capital and pyramid builders.", points: 50 },
            // ID 5: Checkpoint - Omitted

            // 2: Administration
            // ID 5.1: Intro_Info - Omitted
            { id: 6, text: "What major administrative split occurred in the 5th Dynasty?", type: 'radio', options: ["Separation of Royal Residence from State Admin", "Separation of Church and State"], correctAnswer: "Separation of Royal Residence from State Admin", feedback: "The $pr nsw$ (Royal Residence) began to function separately from the state administration.", points: 50 },
            { id: 7, text: "What do Exemption Decrees do?", type: 'radio', options: ["Protect temples from taxes/labor", "Increase taxes"], correctAnswer: "Protect temples from taxes/labor", feedback: "These decrees granted tax and labor immunity to certain temples/estates.", points: 50 },
            // ID 8: Feedback - Omitted
            { id: 9, text: "How did exemption decrees weaken the state?", type: 'radio', options: ["They reduced the taxable labor pool", "They increased inflation"], correctAnswer: "They reduced the taxable labor pool", feedback: "By protecting large temple estates, they reduced the resources available to the central government.", points: 50 },
            // ID 10: Checkpoint - Omitted

            // 3: Daily Life
            // ID 10.1: Intro_Info - Omitted
            { id: 11, text: "What does the exclusivity of literacy imply about social mobility?", type: 'radio', options: ["It was restricted to the scribal class", "Everyone could rise to power"], correctAnswer: "It was restricted to the scribal class", feedback: "Literacy was the key barrier, concentrating administrative power within a hereditary class.", points: 50 },
            { id: 12, text: "What happens to the 'Eldest Son'?", type: 'radio', options: ["He inherits the office and endowment", "He joins the army"], correctAnswer: "He inherits the office and endowment", feedback: "The eldest son often inherited the family office and its funerary endowment.", points: 50 },
            // ID 13: Feedback - Omitted
            { id: 14, text: "Did the state police the villages?", type: 'radio', options: ["No, they used local intermediaries", "Yes, totally"], correctAnswer: "No, they used local intermediaries", feedback: "The state mostly managed the provinces via local elite governors (Nomarchs) and village heads.", points: 50 },
            // ID 15: Checkpoint - Omitted

            // 4: Beliefs
            // ID 15.1: Intro_Info - Omitted
            { id: 16, text: "In the legal system, could the dead be sued?", type: 'radio', options: ["Yes, considered legal entities", "No"], correctAnswer: "Yes, considered legal entities", feedback: "The dead were considered 'effective spirits' ($Akh$) and could be petitioned or accused in a legal context.", points: 50 },
            { id: 17, text: "What is a 'Funerary Domain'?", type: 'radio', options: ["Land dedicated to feeding the deceased's cult", "State land"], correctAnswer: "Land dedicated to feeding the deceased's cult", feedback: "A funerary domain was a plot of land or set of assets set aside to eternally fund the deceased's offerings.", points: 50 },
            // ID 18: Feedback - Omitted
            { id: 19, text: "Did the King pay for every tomb?", type: 'radio', options: ["No, private individuals had to self-fund", "Yes, always"], correctAnswer: "No, private individuals had to self-fund", feedback: "Only the highest officials were granted royal funds; others had to finance their own burial.", points: 50 },
            // ID 20: Checkpoint - Omitted

            // 5: The End
            // ID 20.1: Intro_Info - Omitted
            { id: 21, text: "What was the 'perfect storm' that ended the Old Kingdom?", type: 'radio', options: ["Climate crisis + Hereditary provincial power", "Invasion + Plague"], correctAnswer: "Climate crisis + Hereditary provincial power", feedback: "A prolonged low Nile flood combined with decentralized power caused collapse.", points: 50 },
            { id: 22, text: "What happened to the 'Memphite' art style?", type: 'radio', options: ["Replaced by varied local styles", "Disappeared"], correctAnswer: "Replaced by varied local styles", feedback: "As the Nomarchs gained power, regional art styles flourished in the provinces.", points: 50 },
            // ID 23: Feedback - Omitted
            { id: 24, text: "What lesson did the collapse teach?", type: 'radio', options: ["That central power is fragile", "To build bigger"], correctAnswer: "That central power is fragile", feedback: "The ensuing Middle Kingdom saw the centralization of power, learning from the fragility of the Old Kingdom.", points: 50 },
            // ID 25: Reward - Omitted
        ],
    },
};

// --- Feedback Questions for Exit Prompt ---
// This list is only for general exit feedback, not the inline feedback (ID 3, 8, etc.) from the main flow.
const FEEDBACK_QUESTIONS: FeedbackQuestion[] = [
    { id: 1, text: "Did you feel like you learned something new?", type: 'radio', options: ['Yes, definitely', 'A little bit', 'Not really'] },
    { id: 2, text: "How engaging were the questions?", type: 'radio', options: ['Very engaging', 'Moderately engaging', 'A bit boring'] },
    { id: 3, text: "Any suggestions for improving the exhibit?", type: 'textarea' },
];

export { QUESTIONS, FEEDBACK_QUESTIONS, type Question, type FeedbackQuestion, type RoomQuestionSet };