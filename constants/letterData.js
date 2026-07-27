export const THEMES = {
  purple: { id: "purple", glow: "bg-purple-600/30", bg: "from-purple-950/40 to-[#0f111a]", border: "focus:border-purple-500/50", button: "from-purple-500 to-indigo-500", text: "from-purple-300 via-indigo-200 to-purple-300", label: "text-purple-300" },
  rose: { id: "rose", glow: "bg-rose-600/30", bg: "from-rose-950/40 to-[#0f111a]", border: "focus:border-rose-500/50", button: "from-rose-500 to-pink-500", text: "from-rose-300 via-pink-200 to-rose-300", label: "text-rose-300" },
  emerald: { id: "emerald", glow: "bg-emerald-600/30", bg: "from-emerald-950/40 to-[#0f111a]", border: "focus:border-emerald-500/50", button: "from-emerald-500 to-teal-500", text: "from-emerald-300 via-teal-200 to-emerald-300", label: "text-emerald-300" },
  amber: { id: "amber", glow: "bg-amber-600/30", bg: "from-amber-950/40 to-[#0f111a]", border: "focus:border-amber-500/50", button: "from-amber-500 to-orange-500", text: "from-amber-300 via-orange-200 to-amber-300", label: "text-amber-300" },
  cyan: { id: "cyan", glow: "bg-cyan-600/30", bg: "from-cyan-950/40 to-[#0f111a]", border: "focus:border-cyan-500/50", button: "from-cyan-500 to-blue-500", text: "from-cyan-300 via-blue-200 to-cyan-300", label: "text-cyan-300" },
  fuchsia: { id: "fuchsia", glow: "bg-fuchsia-600/30", bg: "from-fuchsia-950/40 to-[#0f111a]", border: "focus:border-fuchsia-500/50", button: "from-fuchsia-500 to-pink-600", text: "from-fuchsia-300 via-pink-200 to-fuchsia-300", label: "text-fuchsia-300" },
  red: { id: "red", glow: "bg-red-600/30", bg: "from-red-950/40 to-[#0f111a]", border: "focus:border-red-500/50", button: "from-red-500 to-rose-600", text: "from-red-300 via-rose-200 to-red-300", label: "text-red-300" },
};

export const TEMPLATES = [
  { id: "romantic", icon: "💖", label: "Soulmate", theme: "rose" },
  { id: "bestie", icon: "👯‍♀️", label: "Bestie", theme: "purple" },
  { id: "crush", icon: "🙈", label: "Secret Crush", theme: "fuchsia" },
  { id: "appreciation", icon: "🌟", label: "Appreciation", theme: "amber" },
  { id: "missyou", icon: "🌙", label: "Miss You", theme: "cyan" },
  { id: "apology", icon: "🥺", label: "Apology", theme: "emerald" },
  { id: "birthday", icon: "🎂", label: "Birthday", theme: "fuchsia" },
  { id: "proud", icon: "💪", label: "Proud of You", theme: "emerald" },
  { id: "peptalk", icon: "🔥", label: "Pep Talk", theme: "amber" },
  { id: "funny", icon: "🤡", label: "Roast", theme: "cyan" },
  { id: "farewell", icon: "✈️", label: "Farewell", theme: "purple" },
  { id: "anniversary", icon: "🥂", label: "Anniversary", theme: "red" },
  { id: "forgiveness", icon: "🕊️", label: "Forgive Me", theme: "cyan" },
  { id: "admiration", icon: "👑", label: "Admiration", theme: "amber" },
  { id: "nostalgia", icon: "🎞️", label: "Nostalgia", theme: "purple" },
  { id: "cheerup", icon: "🌻", label: "Cheer Up", theme: "amber" },
  { id: "thankyou", icon: "🙏", label: "Thank You", theme: "emerald" },
  { id: "anonymous", icon: "🎭", label: "Anonymous", theme: "purple" },
  { id: "random", icon: "🎈", label: "Just Because", theme: "rose" },
  { id: "late", icon: "⏰", label: "Late Reply", theme: "cyan" },
];

export const getTemplateText = (type, recipient, sender) => {
  const rName = recipient || "[Name]";
  const sName = sender || "[Your Name]";

  const texts = {
    romantic: `My dearest ${rName},\n\nI wanted to take a moment to put into words just how much you mean to me. In a world that constantly moves so fast, you are my quiet place, my greatest adventure, and my absolute favorite part of every single day.\n\nThank you for choosing me. I promise to cherish you today, tomorrow, and for all the days to come.\n\nForever and always yours,\n\n${sName}`,
    // ... Add all other templates here (omitted for brevity, paste your exact texts object here) ...
    random: `Hey ${rName},\n\nThere is no special occasion and no real reason for this letter. I just saw this and thought of you!\n\nHope you're having an amazing week, drinking enough water, and taking care of yourself. Just wanted to pop in and say hi!\n\nTalk soon,\n\n${sName}`,
  };

  return texts[type] || texts["random"];
};