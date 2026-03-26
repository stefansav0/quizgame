"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { translateText } from "@/lib/translate";

// Preset background colors for the amazing UI
const BG_COLORS = [
  "bg-slate-900",
  "bg-indigo-950",
  "bg-purple-950",
  "bg-fuchsia-950",
  "bg-rose-950",
  "bg-orange-950",
  "bg-emerald-950",
  "bg-cyan-950",
];

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

// --- MASSIVE QUESTION BANK GENERATOR ---
const generateQuestionBank = (name = "my", language = "English") => {
  const n = name;

  const banks = {
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
      { question: `If ${n} had a superpower, what would it be? ⚡`, options: ["Flying 🦅", "Invisibility 🫥", "Time Travel ⏳", "Mind Reading 🧠"] },

      // --- HABITS & DAILY LIFE ---
      { question: `If ${n} cooks dinner, what's the most likely outcome? 🍳`, options: ["A 5-star meal 🍽️", "The smoke alarm goes off 🚨", "Ordering takeout instead 📱", "Burnt toast 🍞"] },
      { question: `What is ${n}'s morning routine? 🌅`, options: ["Snoozing 5 times 😴", "Waking up at 6 AM ☕", "Scrolling for an hour 📱", "Rushing out the door 🏃"] },
      { question: `What does ${n}'s bedroom look like right now? 🛏️`, options: ["Immaculate ✨", "The famous 'clothes chair' 🪑", "Like a tornado hit 🌪️", "Cozy but messy 🧸"] },
      { question: `How does ${n} handle chores? 🧹`, options: ["Does them immediately 🧼", "Waits until they have no clean clothes 🧺", "Pays someone else to do it 💸", "Does half and quits 🛋️"] },
      { question: `If ${n} has a free day, what happens? 📅`, options: ["Maximum productivity 📈", "Rots in bed all day 🛏️", "Goes shopping 🛍️", "Cleans everything 🧽"] },
      { question: `What is ${n}'s showering habit? 🚿`, options: ["2-hour hot concerts 🎤", "5-minute military shower ⏱️", "Only at night 🌙", "Skips sometimes 🤫"] },
      { question: `How does ${n} pack for a trip? 🧳`, options: ["A month in advance 🗓️", "The night before 🌙", "Throws everything in a bag randomly 🎒", "Forgets underwear 🤦"] },
      { question: `What happens when ${n} goes to the gym? 🏋️`, options: ["Actually works out hard 💪", "Takes mirror selfies 📸", "Walks on treadmill for 10 mins 🚶", "Pays but never goes 💳"] },
      { question: `How does ${n} handle being sick? 🤒`, options: ["Thinks they are dying 🚑", "Refuses medicine 💊", "Acts completely normal 🤷", "Googles symptoms and panics 💻"] },
      { question: `What is ${n}'s typical sleep position? 💤`, options: ["Fetal position 🦐", "Sprawling like a starfish ⭐", "On their stomach 🛌", "Hugging a pillow tightly 🧸"] },

      // --- FOOD & DRINK ---
      { question: `What is ${n}'s spice tolerance level? 🌶️`, options: ["Cries at black pepper 😭", "Loves it burning hot 🔥", "Medium/Average 🌮", "Thinks mayonnaise is spicy 🧴"] },
      { question: `What would ${n} do for free food? 🍕`, options: ["Absolutely anything 🤝", "Wait in line for hours ⏳", "Beg shamelessly 🥺", "Nothing, they buy their own 💸"] },
      { question: `Midnight snack of choice for ${n}? 🌙`, options: ["Leftovers from dinner 🍝", "Chips/Crisps 🥔", "Sweet treats & chocolate 🍫", "Straight cheese from the fridge 🧀"] },
      { question: `How does ${n} eat their pizza? 🍕`, options: ["Folds it in half 🌮", "Crust first (psychopath) 👽", "With a fork and knife 🍴", "Normally 🍕"] },
      { question: `What is ${n}'s coffee order? ☕`, options: ["Black as their soul 🖤", "90% sugar and milk 🥛", "Iced, even in winter 🧊", "Doesn't drink coffee 🍵"] },
      { question: `If ${n} dropped food on the floor, would they eat it? 🍟`, options: ["5-second rule! ⏱️", "Absolutely not 🤢", "Washes it first 🚰", "Only if no one saw 👀"] },
      { question: `What is ${n}'s toxic food habit? 🍔`, options: ["Not eating all day, then bingeing 🍽️", "Stealing my fries 🍟", "Eating in bed 🛏️", "Chewing ice 🧊"] },
      { question: `How does ${n} act at an all-you-can-eat buffet? 🍲`, options: ["Eats 5 plates of food 🍽️", "Gets full after the salad 🥗", "Sneaks food in a bag 🎒", "Judges everyone else 👀"] },
      { question: `What is ${n}'s stance on pineapple on pizza? 🍍`, options: ["Loves it ❤️", "Hates it 🤢", "Picks it off 🤏", "Will eat it if hungry 🤷"] },
      { question: `What is ${n}'s go-to hangover cure? 🍻`, options: ["Greasy fast food 🍔", "Pounds of water 💧", "Sleeping all day 😴", "Complaining loudly 🗣️"] },

      // --- SOCIAL & TEXTING ---
      { question: `How fast does ${n} reply to texts? 💬`, options: ["Instantly ⚡", "3-5 business days 📅", "Replies in their head 🧠", "Reads and ignores 👀"] },
      { question: `What is ${n}'s role in the group chat? 📱`, options: ["The silent lurker 👻", "Sending 100 TikToks a day 🎬", "Making the plans 📅", "Starting drama 🍵"] },
      { question: `How does ${n} flirt? 😏`, options: ["Awkward staring 👁️", "Roasting/Insulting them 🔥", "Sending memes 🤡", "Actually smooth with it 🥀"] },
      { question: `What would ${n} do if they saw their ex in public? 💔`, options: ["Hide behind a plant 🌳", "Say hi acting unbothered 👋", "Run the other way 🏃", "Stare them down 👁️"] },
      { question: `How does ${n} handle awkward silences? 😶`, options: ["Starts laughing randomly 😂", "Pulls out their phone 📱", "Says something even weirder 👽", "Leaves the room 🚶"] },
      { question: `What is ${n} most likely to overshare? 🗣️`, options: ["Childhood trauma 🩹", "Bathroom habits 🚽", "Relationship drama 💔", "Weird dreams 🌌"] },
      { question: `If ${n} gets a random phone call, what do they do? 📞`, options: ["Stare at it until it stops 👁️", "Answer immediately 🗣️", "Panic and Google the number 💻", "Decline it instantly ❌"] },
      { question: `How does ${n} react to a compliment? ✨`, options: ["'I know' 💅", "Aggressively denies it 🙅", "Gets super awkward 😳", "Compliments them back 🔄"] },
      { question: `What's ${n}'s drunk alter-ego? 🍻`, options: ["The crier 😭", "The fighter 🥊", "The 'I love everyone' 🥰", "The wanderer (disappears) 🚶"] },
      { question: `How does ${n} win an argument? 🗣️`, options: ["Using logic and facts 📊", "Crying 😢", "Bringing up 5-year-old mistakes 🕰️", "Just getting louder 🔊"] },

      // --- INTERNET & PHONE ---
      { question: `What is in ${n}'s recent search history? 🔍`, options: ["Weird medical symptoms 🤒", "Dumb questions they should know 🤡", "Stalking an ex 🕵️", "'How to get rich quick' 💰"] },
      { question: `What would ${n}'s FBI agent think of them? 🕵️‍♂️`, options: ["'They are so boring' 🥱", "'This person is unhinged' 🤪", "'They need therapy' 🛋️", "'I need to arrest them' 🚔"] },
      { question: `If ${n} gets cancelled on the internet, why is it? 🚫`, options: ["An offensive joke 🤡", "Old tweets surfacing 🐦", "Fighting a celebrity 🥊", "A terrible food opinion 🍕"] },
      { question: `How many unread emails does ${n} have? 📧`, options: ["0 (Inbox Zero) ✉️", "1 to 100 📬", "1,000+ 📥", "10,000+ (Psychopath) 💀"] },
      { question: `What is ${n}'s phone battery usually at? 🔋`, options: ["Always 100% ⚡", "Living life on 1% 🔴", "Always on low power mode 🟡", "Randomly dies mid-text 💀"] },
      { question: `What is ${n}'s password probably related to? 🔐`, options: ["A pet's name 🐶", "Their birthday 🎂", "12345678 🤡", "A complex mathematical algorithm 🧮"] },
      { question: `How does ${n} take selfies? 📸`, options: ["High angle only 📐", "Mirror pic with flash 🪞", "Blurry 0.5x lens 👽", "Making a weird face 🤪"] },
      { question: `What kind of TikToks does ${n} send you? 🎬`, options: ["Cute animals 🐕", "Unhinged comedy 🤡", "Recipes they will never make 🍳", "Sad relatable quotes 🌧️"] },
      { question: `If ${n} had a podcast, what's the topic? 🎙️`, options: ["True crime 🔪", "Complaining about their life 🗣️", "Pop culture tea ☕", "Terrible dating advice 💔"] },
      { question: `What's the most embarrassing app on ${n}'s phone? 📱`, options: ["Tinder/Bumble 💘", "A toddler's iPad game 🎮", "A heavy Facetune app 📸", "Wattpad 📖"] },

      // --- MONEY & SHOPPING ---
      { question: `What is ${n} most likely to impulse buy? 💳`, options: ["Clothes they'll never wear 👗", "Iced coffee 🧊☕", "Weird Amazon gadgets 📦", "Concert tickets 🎫"] },
      { question: `How does ${n} manage their money? 💸`, options: ["Saves everything 🏦", "'Money comes back' mindset ✨", "Girl/Boy Math 🧮", "Checks balance through tears 😭"] },
      { question: `If ${n} found a wallet with $1,000, what do they do? 💵`, options: ["Return it untouched 😇", "Keep it all 😈", "Take $100 then return it 🤫", "Panic and leave it there 🏃"] },
      { question: `What is ${n}'s excuse for being broke? 📉`, options: ["'I deserved a treat' 🛍️", "Food delivery apps 🍔", "Paying for 10 subscriptions 📺", "Buying gifts for others 🎁"] },
      { question: `If ${n} was rich, what's the most useless thing they'd buy? 💎`, options: ["A solid gold toilet 🚽", "A private jet for their dog 🐕", "A personal chef 🧑‍🍳", "A private island 🏝️"] },
      { question: `How does ${n} act when shopping? 🛍️`, options: ["Touches everything, buys nothing 🤚", "Spends $200 in 5 minutes 💸", "Complains their feet hurt 😫", "Needs validation for every outfit 🤔"] },
      { question: `What would ${n} do for a million dollars? 💰`, options: ["Literally anything 😈", "Fight a bear 🐻", "Give up the internet for a year 📵", "Shave their head completely 🧑‍🦲"] },
      { question: `How does ${n} react to sales/discounts? 🏷️`, options: ["Buys 10 of them 🛒", "Ignores them completely 🙈", "'It's basically making me money' 🤡", "Suspects it's a scam 🕵️"] },
      { question: `Does ${n} ever return online shopping items? 📦`, options: ["Always, strictly 🔄", "Never, too lazy 🛋️", "Misses the 30-day window every time 📅", "Resells it instead 💸"] },
      { question: `What is ${n} secretly saving up for? 🏦`, options: ["A dream vacation 🌴", "Plastic surgery/tattoos 💉", "To quit their job forever 🚪", "A fancy car 🏎️"] },

      // --- HYPOTHETICAL ABSURDITY ---
      { question: `If ${n} joined a cult, what would it be about? 👽`, options: ["Worshipping a celebrity 🌟", "A 10-step skincare routine 🧴", "Aliens 🛸", "They wouldn't, they'd START the cult 👑"] },
      { question: `If aliens abducted ${n}, what would happen? 🛸`, options: ["Returned immediately for being too annoying 🗣️", "Becomes their new leader 👑", "Begs to stay with them 🌌", "Gets dissected 🔪"] },
      { question: `What would be ${n}'s role in a bank heist? 🏦`, options: ["The mastermind 🧠", "The getaway driver 🚗", "Accidentally sets off the alarm 🚨", "The distraction 🤡"] },
      { question: `If ${n} had to fight an animal, which one could they beat? 🥊`, options: ["A goose 🦢", "A bear (they are delusional) 🐻", "A small child 👶", "Absolutely nothing 🏳️"] },
      { question: `If ${n} was a school teacher, what subject? 🏫`, options: ["P.E. (just plays dodgeball) ⚽", "Art (super chill) 🎨", "Math (pure evil) 📐", "History (yaps all day) 📚"] },
      { question: `If ${n} was in a horror movie, what's their role? 🔪`, options: ["The first victim 💀", "The secret killer 😈", "The lone survivor 🦸", "Trips over nothing while running 🏃"] },
      { question: `What would ${n}'s reality TV show be called? 📺`, options: ["'A Series of Unfortunate Events' 🤡", "'Keeping Up With The Chaos' 🌪️", "'Napping: The Series' 😴", "'The Complainer' 🗣️"] },
      { question: `If ${n} was a flavor, what would they be? 🍦`, options: ["Spicy chili 🌶️", "Plain vanilla 🍨", "Sour lemon 🍋", "Sweet strawberry 🍓"] },
      { question: `If ${n} was stranded in the woods, what's their biggest issue? 🌲`, options: ["No Wi-Fi 📵", "The bugs 🕷️", "Starving 🍔", "Missing their comfy bed 🛏️"] },
      { question: `What would ${n} do if they found out the world ends tomorrow? 🌍`, options: ["Cry endlessly 😭", "Confess their love 💖", "Eat literally everything 🍕", "Go to sleep 😴"] },

      // --- PERSONALITY & VIBE ---
      { question: `What is ${n}'s aesthetic? ✨`, options: ["Y2K/Streetwear 🛹", "Cozy/Comfy 🧸", "All black everything 🖤", "Chaotic/Mismatched 🤡"] },
      { question: `How does ${n} deal with stress? 🌪️`, options: ["Sleeps it off 😴", "Cries 😭", "Cleans aggressively 🧽", "Ignores it until it explodes 💥"] },
      { question: `What is ${n}'s 'Roman Empire' (thinks about constantly)? 🏛️`, options: ["An embarrassing moment from 2014 🤦", "Celebrity drama 🍵", "A movie plot hole 🎬", "Their toxic ex 💔"] },
      { question: `What gives ${n} the most anxiety? 😰`, options: ["Making a phone call 📞", "Checking their bank account 💳", "Being late ⏰", "Social interaction 🧍"] },
      { question: `What is ${n} most likely to complain about? 🗣️`, options: ["The weather 🌧️", "Being tired 🥱", "Being hungry 🌮", "Literally everyone else 😒"] },
      { question: `How does ${n} keep a secret? 🤐`, options: ["Tells everyone 'but don't tell' 🗣️", "Takes it to the grave 🪦", "Accidentally slips up 🤭", "Forgets the secret entirely 🧠"] },
      { question: `What is ${n}'s defining feature? ⭐`, options: ["Their loud laugh 😂", "Their dark sarcasm 🖤", "Their clumsiness 🤦", "Their fashion sense 👗"] },
      { question: `How likely is ${n} to believe a conspiracy theory? 👽`, options: ["100% believes it 🛸", "Skeptical but intrigued 🤔", "Thinks it's dumb 🙄", "Invents their own theories 🧠"] },
      { question: `If ${n} wrote a book, what's the genre? 📖`, options: ["Fantasy romance 🐉", "Autobiography of a mess 🤡", "A chaotic cookbook 🍳", "A how-to guide 🛠️"] },
      { question: `What is ${n}'s spirit vehicle? 🚗`, options: ["A flashy sports car 🏎️", "A rusty minivan 🚐", "A bicycle 🚲", "A private jet ✈️"] },

      // --- DATING & ROMANCE ---
      { question: `Why is ${n} single? 💔`, options: ["Too picky 🧐", "Ignores obvious hints 🙈", "Loves being single ✨", "Talking to toxic people 🚩"] },
      { question: `What is ${n}'s ideal first date? 🍷`, options: ["Fancy dinner 🍽️", "Coffee and a walk ☕", "Netflix and chill 🛋️", "Something adventurous 🎢"] },
      { question: `How does ${n} act when they have a crush? 🥰`, options: ["Stalks all their socials 🕵️", "Gets super awkward 😳", "Ignores them completely 🙈", "Tells them immediately 🗣️"] },
      { question: `What makes ${n} instantly lose interest? 🛑`, options: ["Bad music taste 🎧", "Chewing with mouth open 🍽️", "Being a bad text 📵", "Being mean to staff 😤"] },
      { question: `How does ${n} get over a breakup? ✂️`, options: ["Dyes/cuts their hair 💇", "Goes out every night 🪩", "Cries for a month straight 😭", "The ultimate revenge glow-up ✨"] },
      { question: `What is ${n}'s type? ❤️`, options: ["Golden retriever energy 🐕", "Moody/Mysterious 🧛", "Funny/Sarcastic 🤡", "Toxic 🚩"] },
      { question: `How long until ${n} says 'I love you'? 💌`, options: ["A week 🏃", "A year ⏳", "Never 🧊", "Only when drunk 🍻"] },
      { question: `What would ${n} do if someone proposed in public? 💍`, options: ["Run away 🏃", "Say yes 💖", "Say no awkwardly 😬", "Cry uncontrollably 😭"] },
      { question: `What is ${n}'s opinion on dating apps? 📱`, options: ["Loves the attention 💅", "Deleted it 5 times this week 🗑️", "Met their soulmate there 💘", "Thinks it's tragic 💀"] },
      { question: `How does ${n} respond to a cheesy pickup line? 🧀`, options: ["Blocks them 🚫", "Laughs at it 😂", "Uses a worse one back 🔄", "Falls in love instantly 😍"] },

      // --- FRIENDS & SOCIALIZING ---
      { question: `If ${n} hosts a party, what kind is it? 🎉`, options: ["A wild rager 🪩", "Chill board games 🎲", "Aesthetic dinner party 🍷", "Canceled last minute 🙅"] },
      { question: `Who is ${n} at a party? 🪩`, options: ["DJ controlling the music 🎧", "Sitting with the pet dog 🐕", "Doing shots at the bar 🥃", "Crying in the bathroom 😭"] },
      { question: `How does ${n} act when meeting new people? 🤝`, options: ["Super outgoing 🌟", "Quiet until comfortable 🤐", "Overshares instantly 🗣️", "Judging silently 👀"] },
      { question: `What is ${n}'s worst habit as a friend? 👯`, options: ["Flaking on plans 🏃", "Forgetting to text back 📱", "Giving terrible advice 🤡", "Stealing clothes 👗"] },
      { question: `If ${n} gives advice, is it good? 🧠`, options: ["Yes, very logical 📊", "No, it's terrible 🗑️", "'Just dump them' 🚩", "'Follow your heart' ✨"] },
      { question: `What is ${n} doing in the passenger seat? 🚗`, options: ["DJing the aux cord 🎵", "Sleeping 😴", "Back-seat driving 🛑", "Giving wrong directions 🗺️"] },
      { question: `How does ${n} react when someone takes their photo? 📸`, options: ["Poses perfectly ✨", "Covers their face 🙈", "Does a basic peace sign ✌️", "Complains about the angle 📐"] },
      { question: `What is ${n}'s role in an escape room? 🔐`, options: ["Solves the puzzles 🧠", "Panics 😱", "Looks for clues in the wrong place 🕵️", "Breaks a prop 💥"] },
      { question: `If ${n} borrows something, when do you get it back? 👕`, options: ["The next day 📅", "A month later ⏳", "Never (it's theirs now) 😈", "Returned broken 🩹"] },
      { question: `How does ${n} handle a friend crying? 😢`, options: ["Cries with them 😭", "Gives logical solutions 📊", "Hugs them tightly 🤗", "Awkwardly pats their back 😬"] },

      // --- MISC FUN ---
      { question: `What is ${n}'s favorite weather? 🌤️`, options: ["Sunny and hot ☀️", "Rainy and cozy 🌧️", "Snowy ❄️", "Thunderstorm 🌩️"] },
      { question: `What would ${n} name their first child? 👶`, options: ["Something super unique ✨", "A classic name 📖", "An object 🪨", "A celebrity's name 🌟"] },
      { question: `If ${n} was an emoji, which one? 📱`, options: ["🤡", "💅", "💀", "😈"] },
      { question: `What does ${n} do when they are alone in their room? 🚪`, options: ["Talk to themselves 🗣️", "Sing loudly 🎤", "Stare at the ceiling 👁️", "Film TikToks 📱"] },
      { question: `What is ${n}'s worst childhood habit they still have? 🍼`, options: ["Biting nails 💅", "Picky eating 🥦", "Whining 😩", "Sleeping with a plushie 🧸"] },
      { question: `How does ${n} react to a jump scare? 👻`, options: ["Screams loudly 😱", "Punches the person 🥊", "Doesn't flinch 🗿", "Drops their phone 📱"] },
      { question: `What is ${n}'s favorite way to waste time? ⏳`, options: ["Staring blankly 👁️", "Scrolling endlessly 📱", "Online window shopping 🛒", "Reorganizing their room 🧹"] },
      { question: `If ${n} was a musical instrument, what would they be? 🎺`, options: ["A loud drum 🥁", "A sad violin 🎻", "A chaotic kazoo 🥳", "A classic piano 🎹"] },
      { question: `What would ${n} do if they won an Oscar? 🏆`, options: ["Trip on the stairs 🏃", "Forget their speech 😶", "Cry uncontrollably 😭", "Flex on their haters 💪"] },
      { question: `What is ${n}'s life motto? 📜`, options: ["'It is what it is' 🤷", "'I'll do it tomorrow' 😴", "'Treat yourself' 🛍️", "'Chaos reigns' 🌪️"] }
    ],
   
  };

  return banks[language] || banks["English"];
};

export default function CreateQuiz() {
  // --- STATE ---
  const [isLoading, setIsLoading] = useState(true); // Prevents flash on load
  const [step, setStep] = useState(0); 
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdQuizId, setCreatedQuizId] = useState(null);
  const [copiedLink, setCopiedLink] = useState("");

  const [userInfo, setUserInfo] = useState({ country: "", language: "", name: "" });
  
  const availableLanguages = userInfo.country ? COUNTRY_LANGUAGE_MAP[userInfo.country] : [];

  // Quiz Data States
  const [questions, setQuestions] = useState([]);
  const [questionBank, setQuestionBank] = useState([]);
  const [showBankModal, setShowBankModal] = useState(false);

  // --- LOCAL STORAGE CHECK ON MOUNT ---
  useEffect(() => {
    // Check if user already made a quiz in this browser using localStorage
    const existingQuizId = localStorage.getItem('spicy_quiz_id');
    
    if (existingQuizId) {
      setCreatedQuizId(existingQuizId);
      setStep(11); // Skip straight to the dashboard/results screen
    }
    
    // Done checking, safe to show UI
    setIsLoading(false);
  }, []);


  // --- HANDLERS ---
  const handleCountryChange = (e) => {
    setUserInfo({ ...userInfo, country: e.target.value, language: "" });
  };

  const handleLanguageChange = (e) => {
    setUserInfo({ ...userInfo, language: e.target.value });
  };

  const handleNameChange = (e) => {
    setUserInfo({ ...userInfo, name: e.target.value });
  };

  const handleStartQuizSetup = async () => {
    try {
      const baseBank = generateQuestionBank(userInfo.name);

      // 🔥 Translate all questions
      const translatedBank = await Promise.all(
        baseBank.map(async (q) => {
          const translatedQuestion = await translateText(q.question, userInfo.language);

          const translatedOptions = await Promise.all(
            q.options.map(opt => translateText(opt, userInfo.language))
          );

          return {
            question: translatedQuestion,
            options: translatedOptions,
          };
        })
      );

      // Shuffle + pick 10
      const shuffledBank = [...translatedBank].sort(() => 0.5 - Math.random());

      const selected10 = shuffledBank.slice(0, 10).map((q, index) => ({
        id: index + 1,
        question: q.question,
        options: q.options,
        correctAnswer: 0,
        bgColor: BG_COLORS[index % BG_COLORS.length],
      }));

      // Set the states inside the try block to ensure data is ready
      setQuestionBank(translatedBank);
      setQuestions(selected10);
      setStep(1);

    } catch (error) {
      console.error("Error generating quiz:", error);
    }
  };

  // Replace current question with one from the bank
  const swapQuestion = (bankQuestion) => {
    const newQuestions = [...questions];
    newQuestions[step - 1] = {
      ...newQuestions[step - 1], // keep id and bgColor
      question: bankQuestion.question,
      options: bankQuestion.options,
      correctAnswer: 0
    };
    setQuestions(newQuestions);
    setShowBankModal(false);
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
      location: userInfo.country,
      language: userInfo.language,
      quizTitle: `The Ultimate ${userInfo.name} Test 👀`,
      questions: questions,
    };

    try {
      const res = await fetch("/api/quiz/create", {
        method: "POST",
        body: JSON.stringify(quizPayload),
      });
      const data = await res.json();
      
      setCreatedQuizId(data.quizId);

      // 🔥 Save the quiz ID to local storage so they are recognized later
      localStorage.setItem('spicy_quiz_id', data.quizId);
      
      setStep(11); 
    } catch (error) {
      console.error("Failed to create quiz", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- DELETE QUIZ HANDLER ---
  const handleDeleteQuiz = async () => {
    if(!confirm("Are you sure you want to delete this quiz and start over?")) return;
    
    // Optional: If you have a backend delete route, you can call it here:
    // await fetch(`/api/quiz/${createdQuizId}`, { method: "DELETE" });

    // 1. Remove from local storage
    localStorage.removeItem('spicy_quiz_id');
    
    // 2. Reset states back to default
    setCreatedQuizId(null);
    setUserInfo({ country: "", language: "", name: "" });
    setStep(0);
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

  const modalVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 300, damping: 25 } },
    exit: { opacity: 0, y: 20, scale: 0.95, transition: { duration: 0.2 } }
  };

  const baseUrl = typeof window !== "undefined" ? window.location.origin : "";

  // Prevent UI flashing while checking local storage
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0c10] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0c10] flex items-center justify-center p-4 font-sans text-white overflow-hidden py-10 selection:bg-emerald-500/30">
      <div className="w-full max-w-xl relative">
        <AnimatePresence mode="wait">
          
          {/* ========================================= */}
          {/* STEP 0: INITIAL SETUP */}
          {/* ========================================= */}
          {step === 0 && (
            <motion.div
              key="step-0"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="bg-[#13151f]/90 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-12 shadow-[0_0_50px_rgba(16,185,129,0.1)] border border-emerald-500/20 relative overflow-hidden"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-40 bg-emerald-500/20 blur-[100px] pointer-events-none" />

              <div className="text-center mb-10 relative z-10">
                <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4 bg-gradient-to-r from-emerald-300 to-teal-200 bg-clip-text text-transparent">
                  Create Your Quiz
                </h1>
                <p className="text-slate-400 font-medium text-lg">
                  Let's see which of your friends <br className="hidden sm:block" /> actually pays attention to you. 😜
                </p>
              </div>

              <div className="space-y-6 relative z-10">
                <div className="space-y-2 group">
                  <label className="text-xs font-bold text-emerald-400 uppercase tracking-widest ml-2">Your Name / Nickname</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="E.g. Alex..."
                    value={userInfo.name}
                    onChange={handleNameChange}
                    className="w-full bg-black/40 border border-white/10 text-white px-5 py-4 rounded-2xl outline-none focus:border-emerald-500/50 focus:bg-black/60 transition-all text-lg placeholder:text-slate-600 shadow-inner group-hover:border-white/20"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2 group">
                    <label className="text-xs font-bold text-emerald-400 uppercase tracking-widest ml-2">Country</label>
                    <select
                      value={userInfo.country}
                      onChange={handleCountryChange}
                      className="w-full bg-black/40 border border-white/10 text-white px-5 py-4 rounded-2xl outline-none focus:border-emerald-500/50 transition-all appearance-none cursor-pointer group-hover:border-white/20"
                    >
                      <option value="" disabled>Select...</option>
                      {Object.keys(COUNTRY_LANGUAGE_MAP).sort().map(country => (
                        <option key={country} value={country}>{country}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2 group">
                    <label className="text-xs font-bold text-emerald-400 uppercase tracking-widest ml-2">Language</label>
                    <select
                      value={userInfo.language}
                      onChange={handleLanguageChange}
                      disabled={!userInfo.country}
                      className="w-full bg-black/40 border border-white/10 text-white px-5 py-4 rounded-2xl outline-none focus:border-emerald-500/50 transition-all appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed group-hover:border-white/20"
                    >
                      <option value="" disabled>{userInfo.country ? "Select..." : "Pick country first"}</option>
                      {availableLanguages.map(lang => (
                        <option key={lang} value={lang}>{lang}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="mt-12 relative z-10">
                <button
                  onClick={handleStartQuizSetup}
                  disabled={!userInfo.name || !userInfo.country || !userInfo.language}
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-400 text-emerald-950 font-black text-xl py-5 px-6 rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:pointer-events-none shadow-[0_10px_30px_rgba(16,185,129,0.4)] flex justify-center items-center gap-2"
                >
                  Generate Spicy Questions 🔥
                </button>
              </div>
            </motion.div>
          )}

          {/* ========================================= */}
          {/* STEPS 1-10: QUESTIONS */}
          {/* ========================================= */}
          {step > 0 && step <= 10 && (
            <motion.div
              key={`step-${step}`}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className={`${questions[step - 1].bgColor} rounded-[2.5rem] p-6 md:p-10 shadow-2xl transition-colors duration-700 border border-white/10 backdrop-blur-xl relative overflow-hidden`}
            >
              {/* Glowing Top Progress Bar */}
              <div className="absolute top-0 left-0 h-1.5 bg-white/20 w-full">
                <motion.div 
                  initial={{ width: `${((step - 1) / 10) * 100}%` }}
                  animate={{ width: `${(step / 10) * 100}%` }}
                  className="h-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)]" 
                />
              </div>

              <div className="flex justify-between items-center mb-8 mt-2">
                <button onClick={handlePrev} className="w-12 h-12 flex items-center justify-center bg-black/20 hover:bg-black/40 rounded-full transition-colors text-white/70 text-xl font-bold">
                  ←
                </button>
                <div className="bg-black/20 px-4 py-1.5 rounded-full text-sm font-bold tracking-widest uppercase text-white/80 border border-white/5">
                  Question {step} / 10
                </div>
              </div>

              <div className="space-y-6 relative z-10">
                <div className="flex justify-center mb-4">
                  <button 
                    onClick={() => setShowBankModal(true)}
                    className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold py-2 px-5 rounded-full text-sm flex items-center gap-2 transition-all shadow-lg backdrop-blur-sm"
                  >
                    🎲 Pick a different question
                  </button>
                </div>

                {/* Question Text Area */}
                <div className="relative group">
                  <div className="absolute -inset-1 bg-white/20 rounded-3xl blur opacity-0 group-focus-within:opacity-100 transition duration-500"></div>
                  <textarea
                    rows={3}
                    value={questions[step - 1].question}
                    onChange={(e) => updateQuestion(step - 1, "question", e.target.value)}
                    className="relative w-full bg-black/20 border border-white/10 text-white placeholder-white/30 px-6 py-5 text-2xl md:text-3xl font-black outline-none focus:border-white/50 focus:bg-black/40 transition-all rounded-3xl resize-none shadow-inner text-center leading-tight"
                  />
                </div>

                <p className="text-center text-xs font-bold uppercase tracking-widest text-white/50 mb-2 mt-4">Tap the circle to mark the correct answer</p>

                {/* Option Inputs */}
                <div className="space-y-3">
                  {questions[step - 1].options.map((opt, optIndex) => {
                    const isCorrect = questions[step - 1].correctAnswer === optIndex;
                    return (
                      <div 
                        key={optIndex} 
                        className={`flex items-center gap-3 relative p-2 rounded-2xl transition-all duration-300 ${
                          isCorrect 
                            ? "bg-white/20 border-white/50 shadow-lg scale-[1.02]" 
                            : "bg-black/20 border-transparent hover:bg-black/30"
                        } border`}
                      >
                        <button
                          onClick={() => updateQuestion(step - 1, "correctAnswer", optIndex)}
                          className={`w-12 h-12 ml-1 rounded-xl flex-shrink-0 flex items-center justify-center transition-all duration-300 ${
                            isCorrect 
                              ? "bg-emerald-400 text-emerald-950 shadow-[0_0_20px_rgba(52,211,153,0.6)]" 
                              : "bg-white/10 text-transparent hover:bg-white/20"
                          }`}
                        >
                          <span className="text-xl font-black">✔</span>
                        </button>
                        <input
                          type="text"
                          value={opt}
                          onChange={(e) => updateOption(step - 1, optIndex, e.target.value)}
                          className={`w-full bg-transparent text-white px-4 py-3 outline-none font-bold text-lg placeholder-white/30 transition-all ${
                            isCorrect ? "opacity-100" : "opacity-80 focus:opacity-100"
                          }`}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-10 flex justify-end">
                {step < 10 ? (
                  <button onClick={handleNext} className="bg-white text-slate-900 font-black text-lg py-4 px-8 rounded-2xl hover:bg-slate-200 hover:scale-[1.02] transition-all shadow-xl flex items-center gap-2">
                    Next Question →
                  </button>
                ) : (
                  <button
                    onClick={handleSaveAndShare}
                    disabled={isSubmitting}
                    className="bg-emerald-400 text-emerald-950 font-black text-lg py-4 px-8 rounded-2xl hover:bg-emerald-300 hover:scale-[1.02] transition-all shadow-[0_0_30px_rgba(52,211,153,0.5)] disabled:opacity-50 disabled:scale-100 flex items-center gap-2"
                  >
                    {isSubmitting ? "Creating Magic..." : "Finish & Share 🚀"}
                  </button>
                )}
              </div>
            </motion.div>
          )}

          {/* ========================================= */}
          {/* STEP 11: SUCCESS & LINKS SCREEN */}
          {/* ========================================= */}
          {step === 11 && (
            <motion.div
              key="step-11"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="bg-[#13151f]/90 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-12 shadow-[0_0_50px_rgba(16,185,129,0.1)] border border-emerald-500/30 text-center relative overflow-hidden flex flex-col items-center"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200%] h-60 bg-emerald-500/10 blur-[100px] pointer-events-none" />
              
              <div className="text-7xl mb-6 relative z-10 animate-bounce">🔥</div>
              <h2 className="text-4xl font-black mb-3 text-white relative z-10">Your Quiz is LIVE!</h2>
              <p className="text-slate-400 font-medium text-lg mb-10 relative z-10">Time to expose which of your friends <br className="hidden sm:block" /> actually knows you.</p>

              <div className="space-y-6 relative z-10 text-left w-full">
                <div className="bg-black/40 p-6 rounded-3xl border border-white/10 shadow-inner">
                  <p className="text-sm font-bold text-emerald-400 mb-3 uppercase tracking-wide flex items-center gap-2">
                    <span>1. Send to friends</span>
                    <span className="bg-emerald-500/20 px-2 py-0.5 rounded-md text-xs text-emerald-300">Public Link</span>
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input 
                      readOnly 
                      value={`${baseUrl}/quiz/${createdQuizId}`} 
                      className="w-full bg-white/5 border border-white/10 text-white px-5 py-4 rounded-xl outline-none text-sm font-mono text-ellipsis focus:border-emerald-500/50 transition-colors"
                    />
                    <button 
                      onClick={() => copyToClipboard(`${baseUrl}/quiz/${createdQuizId}`, 'share')}
                      className="bg-emerald-500 text-emerald-950 px-6 py-4 rounded-xl font-black hover:bg-emerald-400 transition-colors whitespace-nowrap active:scale-95 shadow-lg"
                    >
                      {copiedLink === 'share' ? 'Copied! ✔' : 'Copy Link'}
                    </button>
                  </div>
                </div>

                <div className="bg-emerald-900/20 p-6 rounded-3xl border border-emerald-500/30 shadow-inner">
                  <p className="text-sm font-bold text-amber-400 mb-2 uppercase tracking-wide flex items-center gap-2">
                    <span>2. Your Dashboard Link</span>
                    <span className="bg-amber-500/20 px-2 py-0.5 rounded-md text-xs text-amber-300">Secret</span>
                  </p>
                  <p className="text-xs font-medium text-slate-400 mb-4">Save this link! This is where you go to check the live leaderboard.</p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input 
                      readOnly 
                      value={`${baseUrl}/quiz/${createdQuizId}/results`} 
                      className="w-full bg-black/40 border border-emerald-500/30 text-emerald-100 px-5 py-4 rounded-xl outline-none text-sm font-mono text-ellipsis focus:border-amber-500/50 transition-colors"
                    />
                    <button 
                      onClick={() => copyToClipboard(`${baseUrl}/quiz/${createdQuizId}/results`, 'results')}
                      className="bg-amber-500 text-amber-950 px-6 py-4 rounded-xl font-black hover:bg-amber-400 transition-colors whitespace-nowrap active:scale-95 shadow-lg"
                    >
                      {copiedLink === 'results' ? 'Copied! ✔' : 'Copy Link'}
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-10 mb-6 relative z-10">
                <button
                  onClick={() => window.location.href = `/quiz/${createdQuizId}/results`}
                  className="inline-flex items-center gap-2 text-slate-300 hover:text-white font-bold transition-colors group text-lg"
                >
                  Go to my Dashboard now 
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </button>
              </div>

              {/* NEW: DELETE QUIZ BUTTON */}
              <div className="mt-6 pt-6 border-t border-white/10 w-full relative z-10">
                <button
                  onClick={handleDeleteQuiz}
                  className="text-xs font-bold text-rose-400/70 hover:text-rose-400 transition-colors uppercase tracking-widest flex items-center justify-center gap-2 mx-auto"
                >
                  <span className="text-lg">🗑️</span> Delete current quiz & start over
                </button>
              </div>

            </motion.div>
          )}

        </AnimatePresence>

        {/* ========================================= */}
        {/* THE QUESTION BANK MODAL */}
        {/* ========================================= */}
        <AnimatePresence>
          {showBankModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            >
              <motion.div
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="bg-[#1a1c29] border border-white/10 rounded-[2rem] w-full max-w-xl max-h-[80vh] flex flex-col shadow-2xl overflow-hidden"
              >
                {/* Modal Header */}
                <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black/20">
                  <h3 className="text-xl font-black text-white">Question Bank 📚</h3>
                  <button 
                    onClick={() => setShowBankModal(false)}
                    className="w-10 h-10 bg-white/5 hover:bg-rose-500/20 text-white hover:text-rose-400 rounded-full flex items-center justify-center transition-colors"
                  >
                    ✕
                  </button>
                </div>

                {/* Scrollable Question List */}
                <div className="p-4 overflow-y-auto custom-scrollbar flex-1 space-y-3">
                  {questionBank.map((bankQ, idx) => (
                    <button
                      key={idx}
                      onClick={() => swapQuestion(bankQ)}
                      className="w-full text-left p-5 bg-white/5 hover:bg-emerald-500/20 border border-white/5 hover:border-emerald-500/50 rounded-2xl transition-all group"
                    >
                      <p className="font-bold text-white mb-2 group-hover:text-emerald-300">{bankQ.question}</p>
                      <div className="flex flex-wrap gap-2">
                        {bankQ.options.map((opt, i) => (
                          <span key={i} className="text-xs bg-black/40 px-2 py-1 rounded text-slate-400">
                            {opt}
                          </span>
                        ))}
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}