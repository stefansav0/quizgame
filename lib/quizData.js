export const BG_COLORS = [
  "bg-slate-900", "bg-indigo-950", "bg-purple-950", "bg-fuchsia-950",
  "bg-rose-950", "bg-orange-950", "bg-emerald-950", "bg-cyan-950",
];

export const COUNTRY_LANGUAGE_MAP = {
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
  "Singapore": ["Chinese (Mandarin)", "Chinese (Cantonese)"],
};

export const generateQuestionBank = (name = "my", language = "English") => {
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