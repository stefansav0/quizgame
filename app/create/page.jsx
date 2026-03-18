"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Preset background colors for the amazing UI
const BG_COLORS = [
  "bg-slate-800",
  "bg-blue-900",
  "bg-purple-900",
  "bg-pink-900",
  "bg-emerald-900",
  "bg-orange-900",
  "bg-rose-900",
  "bg-indigo-900",
];

// --- DYNAMIC COUNTRY & LANGUAGE DATA ---
const COUNTRY_LANGUAGE_MAP = {
  "India": ["English", "Hindi", "Bengali", "Tamil", "Telugu", "Marathi"],
  "United States": ["English", "Spanish"],
  "United Kingdom": ["English"],
  "Canada": ["English", "French"],
  "Australia": ["English"],
  "Spain": ["Spanish", "Catalan"],
  "Mexico": ["Spanish"],
  "France": ["French"],
  "Brazil": ["Portuguese"],
  "Portugal": ["Portuguese"],
  "Germany": ["German"],
  "Japan": ["Japanese"],
};

// --- MULTI-LANGUAGE AUTO-FILL QUESTIONS ---
const generateDefaultQuestions = (name = "my", language = "English") => {
  const n = name;

  const questionsByLanguage = {
    English: [
      { question: `What is ${n}'s favorite food? 🤤`, options: ["Pizza 🍕", "Burger 🍔", "Sushi 🍣", "Tacos 🌮"] },
      { question: `What is ${n}'s ideal weekend? 🛋️`, options: ["Sleeping in 😴", "Partying 🥳", "Reading a book 📖", "Traveling ✈️"] },
      { question: `What is ${n}'s favorite season? 🌍`, options: ["Summer ☀️", "Winter ❄️", "Spring 🌸", "Autumn 🍂"] },
      { question: `If ${n} could have any pet, what would it be? 🐾`, options: ["Dog 🐶", "Cat 🐱", "Bird 🐦", "Reptile 🦎"] },
      { question: `What is ${n}'s favorite movie genre? 🎬`, options: ["Action 💥", "Comedy 😂", "Horror 👻", "Romance ❤️"] },
      { question: `Is ${n} a morning person or a night owl? ⏰`, options: ["Early bird 🌅", "Night owl 🦉", "Afternoon nap 😴", "Always tired 🧟"] },
      { question: `What is ${n}'s dream vacation? 🌴`, options: ["Beach 🏖️", "Mountains ⛰️", "City 🏙️", "Forest 🌲"] },
      { question: `What is ${n}'s go-to drink? 🥤`, options: ["Coffee ☕", "Tea 🍵", "Juice 🧃", "Soda 🥤"] },
      { question: `How long was ${n}'s longest relationship? 💔`, options: ["A week 😅", "A month 🙃", "A year 📅", "Two years+ 💍"] },
      { question: `If ${n} had a superpower, what would it be? ⚡`, options: ["Flying 🦅", "Invisibility 🫥", "Time Travel ⏳", "Mind Reading 🧠"] }
    ],
    Hindi: [
      { question: `${n} का पसंदीदा खाना क्या है? 🤤`, options: ["पिज़्ज़ा 🍕", "बर्गर 🍔", "सुशी 🍣", "टैकोस 🌮"] },
      { question: `${n} का आदर्श वीकेंड क्या है? 🛋️`, options: ["देर तक सोना 😴", "पार्टी करना 🥳", "किताब पढ़ना 📖", "यात्रा करना ✈️"] },
      { question: `${n} का पसंदीदा मौसम कौन सा है? 🌍`, options: ["गर्मी ☀️", "सर्दी ❄️", "वसंत 🌸", "पतझड़ 🍂"] },
      { question: `अगर ${n} कोई जानवर पाल सके, तो वह क्या होगा? 🐾`, options: ["कुत्ता 🐶", "बिल्ली 🐱", "पक्षी 🐦", "रेंगने वाला जानवर 🦎"] },
      { question: `${n} की पसंदीदा फिल्म शैली कौन सी है? 🎬`, options: ["एक्शन 💥", "कॉमेडी 😂", "डरावनी 👻", "रोमांस ❤️"] },
      { question: `क्या ${n} सुबह जल्दी उठते हैं या रात में जागते हैं? ⏰`, options: ["सुबह जल्दी 🌅", "रात में जागने वाला 🦉", "दोपहर की नींद 😴", "हमेशा थका हुआ 🧟"] },
      { question: `${n} की सपनों की छुट्टियां कौन सी हैं? 🌴`, options: ["समुद्र तट 🏖️", "पहाड़ ⛰️", "शहर 🏙️", "जंगल 🌲"] },
      { question: `${n} का पसंदीदा पेय क्या है? 🥤`, options: ["कॉफ़ी ☕", "चाय 🍵", "जूस 🧃", "सोडा 🥤"] },
      { question: `${n} का सबसे लंबा रिश्ता कितने समय चला? 💔`, options: ["एक सप्ताह 😅", "एक महीना 🙃", "एक साल 📅", "दो साल+ 💍"] },
      { question: `अगर ${n} के पास कोई महाशक्ति होती, तो क्या होती? ⚡`, options: ["उड़ना 🦅", "अदृश्य होना 🫥", "समय यात्रा ⏳", "मन पढ़ना 🧠"] }
    ],
    Bengali: [
      { question: `${n} এর প্রিয় খাবার কী? 🤤`, options: ["পিৎজা 🍕", "বার্গার 🍔", "সুশি 🍣", "টাকো 🌮"] },
      { question: `${n} এর স্বপ্নের ছুটির দিন কেমন? 🛋️`, options: ["দেরি করে ঘুমানো 😴", "পার্টি করা 🥳", "বই পড়া 📖", "ভ্রমণ ✈️"] },
      { question: `${n} এর প্রিয় ঋতু কোনটি? 🌍`, options: ["গ্রীষ্ম ☀️", "শীত ❄️", "বসন্ত 🌸", "শরৎ 🍂"] },
      { question: `যদি ${n} কোনো পোষা প্রাণী রাখতে পারে, তবে সেটি কী হবে? 🐾`, options: ["কুকুর 🐶", "বিড়াল 🐱", "পাখি 🐦", "সরীসৃপ 🦎"] },
      { question: `${n} এর প্রিয় সিনেমার ধরণ কী? 🎬`, options: ["অ্যাকশন 💥", "কমেডি 😂", "ভৌতিক 👻", "রোমান্স ❤️"] },
      { question: `${n} কি সকালে উঠতে পছন্দ করে নাকি রাতে জাগতে? ⏰`, options: ["সকালে 🌅", "রাতে 🦉", "দুপুরে ঘুম 😴", "সবসময় ক্লান্ত 🧟"] },
      { question: `${n} এর স্বপ্নের অবকাশ যাপন কোথায়? 🌴`, options: ["সমুদ্র সৈকত 🏖️", "পাহাড় ⛰️", "শহর 🏙️", "জঙ্গল 🌲"] },
      { question: `${n} এর প্রিয় পানীয় কী? 🥤`, options: ["কফি ☕", "চা 🍵", "জুস 🧃", "সোডা 🥤"] },
      { question: `${n} এর দীর্ঘতম সম্পর্ক কতদিনের ছিল? 💔`, options: ["এক সপ্তাহ 😅", "এক মাস 🙃", "এক বছর 📅", "দুই বছর+ 💍"] },
      { question: `যদি ${n} এর কাছে কোনো সুপারপাওয়ার থাকে, তবে তা কী হবে? ⚡`, options: ["উড়তে পারা 🦅", "অদৃশ্য হওয়া 🫥", "সময় ভ্রমণ ⏳", "মন পড়া 🧠"] }
    ],
    Tamil: [
      { question: `${n} இன் பிடித்த உணவு என்ன? 🤤`, options: ["பீட்சா 🍕", "பர்கர் 🍔", "சுஷி 🍣", "டாக்கோஸ் 🌮"] },
      { question: `${n} இன் சிறந்த வார இறுதி எப்படி இருக்கும்? 🛋️`, options: ["தூங்குவது 😴", "பார்ட்டி 🥳", "புத்தகம் வாசிப்பது 📖", "பயணம் ✈️"] },
      { question: `${n} இன் பிடித்த பருவம் எது? 🌍`, options: ["கோடை ☀️", "குளிர்காலம் ❄️", "வசந்தகாலம் 🌸", "இலையுதிர்காலம் 🍂"] },
      { question: `${n} ஒரு செல்லப்பிராணியை வளர்க்க விரும்பினால், அது என்னவாக இருக்கும்? 🐾`, options: ["நாய் 🐶", "பூனை 🐱", "பறவை 🐦", "ஊர்வன 🦎"] },
      { question: `${n} இன் பிடித்த திரைப்பட வகை என்ன? 🎬`, options: ["ஆக்ஷன் 💥", "காமெடி 😂", "பேய்ப்படம் 👻", "காதல் ❤️"] },
      { question: `${n} காலையில் சீக்கிரம் எழுபவரா அல்லது இரவில் விழித்திருப்பவரா? ⏰`, options: ["காலை 🌅", "இரவு 🦉", "மதிய தூக்கம் 😴", "எப்போதும் சோர்வு 🧟"] },
      { question: `${n} இன் கனவு சுற்றுலா எங்கே? 🌴`, options: ["கடற்கரை 🏖️", "மலைகள் ⛰️", "நகரம் 🏙️", "காடு 🌲"] },
      { question: `${n} இன் வழக்கமான பானம் என்ன? 🥤`, options: ["காபி ☕", "டீ 🍵", "ஜூஸ் 🧃", "சோடா 🥤"] },
      { question: `${n} இன் மிக நீண்ட உறவு எவ்வளவு காலம் நீடித்தது? 💔`, options: ["ஒரு வாரம் 😅", "ஒரு மாதம் 🙃", "ஒரு வருடம் 📅", "இரண்டு வருடங்கள்+ 💍"] },
      { question: `${n} க்கு ஒரு சூப்பர் பவர் கிடைத்தால், அது என்னவாக இருக்கும்? ⚡`, options: ["பறப்பது 🦅", "கண்ணுக்கு தெரியாமல் போவது 🫥", "கால பயணம் ⏳", "மனதை படிப்பது 🧠"] }
    ],
    Telugu: [
      { question: `${n} కి ఇష్టమైన ఆహారం ఏమిటి? 🤤`, options: ["పిజ్జా 🍕", "బర్గర్ 🍔", "సుషీ 🍣", "టాకోస్ 🌮"] },
      { question: `${n} కి ఇష్టమైన వారాంతం ఎలా ఉంటుంది? 🛋️`, options: ["నిద్రపోవడం 😴", "పార్టీ 🥳", "పుస్తకం చదవడం 📖", "ప్రయాణం ✈️"] },
      { question: `${n} కి ఇష్టమైన రుతువు ఏది? 🌍`, options: ["వేసవి ☀️", "చలికాలం ❄️", "వసంతకాలం 🌸", "శరదృతువు 🍂"] },
      { question: `${n} ఒక పెంపుడు జంతువును పెంచుకోవాలనుకుంటే, అది ఏమవుతుంది? 🐾`, options: ["కుక్క 🐶", "పిల్లి 🐱", "పక్షి 🐦", "సరీసృపాలు 🦎"] },
      { question: `${n} కి ఇష్టమైన సినిమా జానర్ ఏది? 🎬`, options: ["యాక్షన్ 💥", "కామెడీ 😂", "హారర్ 👻", "రొమాన్స్ ❤️"] },
      { question: `${n} ఉదయం త్వరగా లేచే రకమా లేదా రాత్రి మేల్కొనే రకమా? ⏰`, options: ["ఉదయం 🌅", "రాత్రి 🦉", "మధ్యాహ్నం నిద్ర 😴", "ఎప్పుడూ అలసట 🧟"] },
      { question: `${n} డ్రీమ్ వెకేషన్ ఏది? 🌴`, options: ["బీచ్ 🏖️", "పర్వతాలు ⛰️", "నగరం 🏙️", "అడవి 🌲"] },
      { question: `${n} కి ఇష్టమైన పానీయం ఏమిటి? 🥤`, options: ["కాఫీ ☕", "టీ 🍵", "జ్యూస్ 🧃", "సోడా 🥤"] },
      { question: `${n} అత్యంత సుదీర్ఘ సంబంధం ఎంతకాలం కొనసాగింది? 💔`, options: ["ఒక వారం 😅", "ఒక నెల 🙃", "ఒక సంవత్సరం 📅", "రెండు సంవత్సరాలు+ 💍"] },
      { question: `${n} కి సూపర్ పవర్ ఉంటే, అది ఏమవుతుంది? ⚡`, options: ["ఎగరడం 🦅", "అదృశ్యం కావడం 🫥", "టైమ్ ట్రావెల్ ⏳", "మనసు చదవడం 🧠"] }
    ],
    Spanish: [
      { question: `¿Cuál es la comida favorita de ${n}? 🤤`, options: ["Pizza 🍕", "Hamburguesa 🍔", "Sushi 🍣", "Tacos 🌮"] },
      { question: `¿Cuál es el fin de semana ideal de ${n}? 🛋️`, options: ["Dormir hasta tarde 😴", "Ir de fiesta 🥳", "Leer un libro 📖", "Viajar ✈️"] },
      { question: `¿Cuál es la estación favorita de ${n}? 🌍`, options: ["Verano ☀️", "Invierno ❄️", "Primavera 🌸", "Otoño 🍂"] },
      { question: `Si ${n} pudiera tener cualquier mascota, ¿cuál sería? 🐾`, options: ["Perro 🐶", "Gato 🐱", "Pájaro 🐦", "Reptil 🦎"] },
      { question: `¿Cuál es el género de cine favorito de ${n}? 🎬`, options: ["Acción 💥", "Comedia 😂", "Terror 👻", "Romance ❤️"] },
      { question: `¿${n} es madrugador o un búho nocturno? ⏰`, options: ["Madrugador 🌅", "Búho nocturno 🦉", "Siesta 😴", "Siempre cansado 🧟"] },
      { question: `¿Cuáles son las vacaciones de ensueño de ${n}? 🌴`, options: ["Playa 🏖️", "Montañas ⛰️", "Ciudad 🏙️", "Bosque 🌲"] },
      { question: `¿Cuál es la bebida habitual de ${n}? 🥤`, options: ["Café ☕", "Té 🍵", "Jugo 🧃", "Refresco 🥤"] },
      { question: `¿Cuánto duró la relación más larga de ${n}? 💔`, options: ["Una semana 😅", "Un mes 🙃", "Un año 📅", "Dos años o más 💍"] },
      { question: `Si ${n} tuviera un superpoder, ¿cuál sería? ⚡`, options: ["Volar 🦅", "Invisibilidad 🫥", "Viaje en el tiempo ⏳", "Leer la mente 🧠"] }
    ],
    French: [
      { question: `Quelle est la nourriture préférée de ${n}? 🤤`, options: ["Pizza 🍕", "Burger 🍔", "Sushi 🍣", "Tacos 🌮"] },
      { question: `Quel est le week-end idéal de ${n}? 🛋️`, options: ["Faire la grasse matinée 😴", "Faire la fête 🥳", "Lire un livre 📖", "Voyager ✈️"] },
      { question: `Quelle est la saison préférée de ${n}? 🌍`, options: ["Été ☀️", "Hiver ❄️", "Printemps 🌸", "Automne 🍂"] },
      { question: `Si ${n} pouvait avoir un animal, lequel serait-ce? 🐾`, options: ["Chien 🐶", "Chat 🐱", "Oiseau 🐦", "Reptile 🦎"] },
      { question: `Quel est le genre de film préféré de ${n}? 🎬`, options: ["Action 💥", "Comédie 😂", "Horreur 👻", "Romance ❤️"] },
      { question: `${n} est-il plutôt matinal ou couche-tard? ⏰`, options: ["Lève-tôt 🌅", "Couche-tard 🦉", "Sieste 😴", "Toujours fatigué 🧟"] },
      { question: `Quelles sont les vacances de rêve de ${n}? 🌴`, options: ["Plage 🏖️", "Montagnes ⛰️", "Ville 🏙️", "Forêt 🌲"] },
      { question: `Quelle est la boisson habituelle de ${n}? 🥤`, options: ["Café ☕", "Thé 🍵", "Jus 🧃", "Soda 🥤"] },
      { question: `Combien de temps a duré la plus longue relation de ${n}? 💔`, options: ["Une semaine 😅", "Un mois 🙃", "Un an 📅", "Deux ans et + 💍"] },
      { question: `Si ${n} avait un super pouvoir, lequel serait-ce? ⚡`, options: ["Voler 🦅", "Invisibilité 🫥", "Voyage dans le temps ⏳", "Lire les pensées 🧠"] }
    ],
    Portuguese: [
      { question: `Qual é a comida favorita de ${n}? 🤤`, options: ["Pizza 🍕", "Hambúrguer 🍔", "Sushi 🍣", "Tacos 🌮"] },
      { question: `Qual é o fim de semana ideal de ${n}? 🛋️`, options: ["Dormir até tarde 😴", "Festejar 🥳", "Ler um livro 📖", "Viajar ✈️"] },
      { question: `Qual é a estação do ano favorita de ${n}? 🌍`, options: ["Verão ☀️", "Inverno ❄️", "Primavera 🌸", "Outono 🍂"] },
      { question: `Se ${n} pudesse ter qualquer animal de estimação, qual seria? 🐾`, options: ["Cachorro 🐶", "Gato 🐱", "Pássaro 🐦", "Réptil 🦎"] },
      { question: `Qual é o gênero de filme favorito de ${n}? 🎬`, options: ["Ação 💥", "Comédia 😂", "Terror 👻", "Romance ❤️"] },
      { question: `${n} é uma pessoa matutina ou noturna? ⏰`, options: ["Madrugador 🌅", "Noturno 🦉", "Soneca 😴", "Sempre cansado 🧟"] },
      { question: `Quais são as férias dos sonhos de ${n}? 🌴`, options: ["Praia 🏖️", "Montanhas ⛰️", "Cidade 🏙️", "Floresta 🌲"] },
      { question: `Qual é a bebida favorita de ${n}? 🥤`, options: ["Café ☕", "Chá 🍵", "Suco 🧃", "Refrigerante 🥤"] },
      { question: `Quanto tempo durou o relacionamento mais longo de ${n}? 💔`, options: ["Uma semana 😅", "Um mês 🙃", "Um ano 📅", "Dois anos+ 💍"] },
      { question: `Se ${n} tivesse um superpoder, qual seria? ⚡`, options: ["Voar 🦅", "Invisibilidade 🫥", "Viagem no tempo ⏳", "Ler mentes 🧠"] }
    ]
  };

  // Fallback to English if the translation isn't explicitly defined yet (e.g., German, Japanese, Marathi)
  const selectedQuestions = questionsByLanguage[language] || questionsByLanguage["English"];

  return selectedQuestions.map((q, index) => ({
    id: index + 1,
    question: q.question,
    options: q.options,
    correctAnswer: 0,
    bgColor: BG_COLORS[index % BG_COLORS.length],
  }));
};

export default function CreateQuiz() {
  // --- STATE ---
  const [step, setStep] = useState(0); 
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdQuizId, setCreatedQuizId] = useState(null);
  const [copiedLink, setCopiedLink] = useState("");

  const [userInfo, setUserInfo] = useState({ country: "", language: "", name: "" });
  
  // Available languages dropdown updates based on selected country
  const availableLanguages = userInfo.country ? COUNTRY_LANGUAGE_MAP[userInfo.country] : [];

  const [questions, setQuestions] = useState(generateDefaultQuestions("my", "English"));

  // --- HANDLERS ---
  const handleCountryChange = (e) => {
    // When country changes, clear the previously selected language
    setUserInfo({ ...userInfo, country: e.target.value, language: "" });
  };

  const handleLanguageChange = (e) => {
    setUserInfo({ ...userInfo, language: e.target.value });
  };

  const handleNameChange = (e) => {
    setUserInfo({ ...userInfo, name: e.target.value });
  };

  const handleStartQuizSetup = () => {
    // Inject the user's name AND their selected language perfectly!
    setQuestions(generateDefaultQuestions(userInfo.name, userInfo.language));
    setStep(1);
  };

  const updateQuestion = (index, field, value) => {
    const newQuestions = [...questions];
    newQuestions[index][field] = value;
    setQuestions(newQuestions);
  };

  const updateOption = (qIndex, optIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options[optIndex] = value;
    setQuestions(newQuestions);
  };

  const handleNext = () => setStep((prev) => Math.min(prev + 1, 10));
  const handlePrev = () => setStep((prev) => Math.max(prev - 1, 0));

  const handleSaveAndShare = async () => {
    setIsSubmitting(true);
    const quizPayload = {
      creatorName: userInfo.name,
      location: userInfo.country, // Saving country as location to DB
      language: userInfo.language,
      quizTitle: `How well do you know ${userInfo.name}?`,
      questions: questions,
    };

    try {
      const res = await fetch("/api/quiz/create", {
        method: "POST",
        body: JSON.stringify(quizPayload),
      });
      const data = await res.json();
      
      setCreatedQuizId(data.quizId);
      setStep(11); 
    } catch (error) {
      console.error("Failed to create quiz", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopiedLink(type);
    setTimeout(() => setCopiedLink(""), 2000);
  };

  // --- ANIMATIONS ---
  const slideVariants = {
    enter: { x: 50, opacity: 0, scale: 0.95 },
    center: { zIndex: 1, x: 0, opacity: 1, scale: 1 },
    exit: { zIndex: 0, x: -50, opacity: 0, scale: 0.95 },
  };

  const baseUrl = typeof window !== "undefined" ? window.location.origin : "";

  return (
    <div className="min-h-screen bg-[#0f111a] flex items-center justify-center p-4 font-sans text-white overflow-hidden py-10 selection:bg-emerald-500/30">
      <div className="w-full max-w-lg relative">
        <AnimatePresence mode="wait">
          
          {/* STEP 0: INITIAL SETUP */}
          {step === 0 && (
            <motion.div
              key="step-0"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="bg-[#1a1c29] rounded-[2rem] p-8 md:p-10 shadow-2xl border border-white/5 relative overflow-hidden"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-40 bg-emerald-500/20 blur-[100px] pointer-events-none" />

              <div className="text-center mb-10 relative z-10">
                <h1 className="text-4xl font-black tracking-tight mb-3 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                  Create Your Quiz
                </h1>
                <div className="inline-flex items-center justify-center gap-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full text-sm font-medium text-slate-300">
                  <span>100% Free</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                </div>
              </div>

              <div className="space-y-6 relative z-10">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-400 ml-2">What is your name?</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="E.g. Alex..."
                    value={userInfo.name}
                    onChange={handleNameChange}
                    className="w-full bg-black/40 border border-white/10 text-white px-5 py-4 rounded-2xl outline-none focus:border-emerald-500/50 focus:bg-black/60 transition-all text-lg placeholder:text-slate-600"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Dynamic Country Dropdown */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-400 ml-2">Country</label>
                    <select
                      value={userInfo.country}
                      onChange={handleCountryChange}
                      className="w-full bg-black/40 border border-white/10 text-white px-4 py-4 rounded-2xl outline-none focus:border-emerald-500/50 transition-all appearance-none cursor-pointer"
                    >
                      <option value="" disabled>Select...</option>
                      {Object.keys(COUNTRY_LANGUAGE_MAP).sort().map(country => (
                        <option key={country} value={country}>{country}</option>
                      ))}
                    </select>
                  </div>

                  {/* Dynamic Language Dropdown (Depends on Country) */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-400 ml-2">Language</label>
                    <select
                      value={userInfo.language}
                      onChange={handleLanguageChange}
                      disabled={!userInfo.country}
                      className="w-full bg-black/40 border border-white/10 text-white px-4 py-4 rounded-2xl outline-none focus:border-emerald-500/50 transition-all appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <option value="" disabled>{userInfo.country ? "Select..." : "Pick country first"}</option>
                      {availableLanguages.map(lang => (
                        <option key={lang} value={lang}>{lang}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <button
                  onClick={handleStartQuizSetup}
                  disabled={!userInfo.name || !userInfo.country || !userInfo.language}
                  className="w-full bg-emerald-500 text-emerald-950 font-black text-lg py-4 px-6 rounded-2xl hover:bg-emerald-400 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:pointer-events-none shadow-[0_0_30px_rgba(16,185,129,0.3)]"
                >
                  Generate Questions ✨
                </button>
              </div>
            </motion.div>
          )}

          {/* STEPS 1-10: QUESTIONS */}
          {step > 0 && step <= 10 && (
            <motion.div
              key={`step-${step}`}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className={`${questions[step - 1].bgColor} rounded-[2rem] p-6 md:p-8 shadow-2xl transition-colors duration-700 border border-white/10 backdrop-blur-xl`}
            >
              <div className="flex justify-between items-center mb-6">
                <button onClick={handlePrev} className="w-10 h-10 flex items-center justify-center bg-black/20 hover:bg-black/40 rounded-full transition-colors text-white/70">
                  ←
                </button>
                <div className="flex gap-1">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div key={i} className={`h-1.5 rounded-full transition-all ${i < step ? "w-4 bg-white" : "w-1.5 bg-white/20"}`} />
                  ))}
                </div>
              </div>

              <div className="mb-6 flex justify-center gap-2 p-2 bg-black/20 rounded-2xl backdrop-blur-sm">
                {BG_COLORS.map((color) => (
                  <button
                    key={color}
                    onClick={() => updateQuestion(step - 1, "bgColor", color)}
                    className={`w-8 h-8 rounded-full ${color} border-2 ${
                      questions[step - 1].bgColor === color ? "border-white scale-110 shadow-[0_0_15px_rgba(255,255,255,0.4)]" : "border-transparent opacity-50 hover:opacity-100"
                    } transition-all`}
                  />
                ))}
              </div>

              <div className="space-y-5">
                <textarea
                  rows={2}
                  value={questions[step - 1].question}
                  onChange={(e) => updateQuestion(step - 1, "question", e.target.value)}
                  className="w-full bg-black/20 border border-white/10 text-white placeholder-white/30 px-5 py-4 text-xl font-bold outline-none focus:border-white/50 focus:bg-black/30 transition-all rounded-2xl resize-none shadow-inner"
                />

                <div className="space-y-3">
                  {questions[step - 1].options.map((opt, optIndex) => {
                    const isCorrect = questions[step - 1].correctAnswer === optIndex;
                    return (
                      <div key={optIndex} className={`flex items-center gap-3 relative p-1 rounded-2xl transition-colors ${isCorrect ? "bg-emerald-500/20 border border-emerald-500/50" : "bg-black/20 border border-transparent"}`}>
                        <button
                          onClick={() => updateQuestion(step - 1, "correctAnswer", optIndex)}
                          className={`w-10 h-10 ml-2 rounded-xl flex-shrink-0 flex items-center justify-center transition-all ${
                            isCorrect ? "bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.5)] scale-110" : "bg-white/5 text-transparent hover:bg-white/10"
                          }`}
                        >
                          ✔
                        </button>
                        <input
                          type="text"
                          value={opt}
                          onChange={(e) => updateOption(step - 1, optIndex, e.target.value)}
                          className="w-full bg-transparent text-white px-3 py-3 outline-none font-medium placeholder-white/30"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex justify-end">
                {step < 10 ? (
                  <button onClick={handleNext} className="bg-white text-slate-900 font-black py-4 px-8 rounded-2xl hover:bg-slate-200 hover:scale-[1.02] transition-all shadow-xl">
                    Next Question →
                  </button>
                ) : (
                  <button
                    onClick={handleSaveAndShare}
                    disabled={isSubmitting}
                    className="bg-emerald-500 text-emerald-950 font-black py-4 px-8 rounded-2xl hover:bg-emerald-400 hover:scale-[1.02] transition-all shadow-[0_0_30px_rgba(16,185,129,0.4)] disabled:opacity-50 disabled:scale-100 flex items-center gap-2"
                  >
                    {isSubmitting ? "Creating Magic..." : "Finish & Share 🚀"}
                  </button>
                )}
              </div>
            </motion.div>
          )}

          {/* STEP 11: SUCCESS & LINKS SCREEN */}
          {step === 11 && (
            <motion.div
              key="step-11"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="bg-[#1a1c29] rounded-[2rem] p-8 md:p-10 shadow-2xl border border-emerald-500/30 text-center relative overflow-hidden"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200%] h-60 bg-emerald-500/10 blur-[100px] pointer-events-none" />
              
              <div className="text-6xl mb-4 relative z-10 animate-bounce">🎉</div>
              <h2 className="text-3xl font-black mb-2 text-white relative z-10">Quiz Created!</h2>
              <p className="text-slate-400 mb-8 relative z-10">Your custom quiz is live and ready for your friends.</p>

              <div className="space-y-6 relative z-10 text-left">
                <div className="bg-black/40 p-5 rounded-2xl border border-white/10">
                  <p className="text-sm font-bold text-emerald-400 mb-2 uppercase tracking-wide flex items-center gap-2">
                    <span>1. Send to friends</span>
                    <span className="bg-emerald-500/20 px-2 py-0.5 rounded text-xs text-emerald-300">Public</span>
                  </p>
                  <div className="flex gap-2">
                    <input 
                      readOnly 
                      value={`${baseUrl}/quiz/${createdQuizId}`} 
                      className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 rounded-xl outline-none text-sm font-mono text-ellipsis"
                    />
                    <button 
                      onClick={() => copyToClipboard(`${baseUrl}/quiz/${createdQuizId}`, 'share')}
                      className="bg-emerald-500 text-emerald-950 px-4 rounded-xl font-bold hover:bg-emerald-400 transition-colors whitespace-nowrap"
                    >
                      {copiedLink === 'share' ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                </div>

                <div className="bg-emerald-900/20 p-5 rounded-2xl border border-emerald-500/30">
                  <p className="text-sm font-bold text-amber-400 mb-2 uppercase tracking-wide flex items-center gap-2">
                    <span>2. Your Dashboard Link</span>
                    <span className="bg-amber-500/20 px-2 py-0.5 rounded text-xs text-amber-300">Secret</span>
                  </p>
                  <p className="text-xs text-slate-400 mb-3">Save this link. This is where you go to see everyone's scores!</p>
                  <div className="flex gap-2">
                    <input 
                      readOnly 
                      value={`${baseUrl}/quiz/${createdQuizId}/results`} 
                      className="w-full bg-black/40 border border-emerald-500/30 text-emerald-100 px-4 py-3 rounded-xl outline-none text-sm font-mono text-ellipsis"
                    />
                    <button 
                      onClick={() => copyToClipboard(`${baseUrl}/quiz/${createdQuizId}/results`, 'results')}
                      className="bg-amber-500 text-amber-950 px-4 rounded-xl font-bold hover:bg-amber-400 transition-colors whitespace-nowrap"
                    >
                      {copiedLink === 'results' ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-8 relative z-10">
                <button
                  onClick={() => window.location.href = `/quiz/${createdQuizId}/results`}
                  className="text-slate-400 hover:text-white underline font-medium transition-colors"
                >
                  Go to my Dashboard now →
                </button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}