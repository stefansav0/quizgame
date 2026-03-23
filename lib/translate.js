const cache = {};

export async function translateText(text, targetLang) {
  if (!text || targetLang === "English") return text;

  const langMap = {
    Hindi: "hi",
    Bengali: "bn",
    Tamil: "ta",
    Telugu: "te",
    Marathi: "mr",
    Spanish: "es",
    French: "fr",
    Portuguese: "pt",
    German: "de",
    Japanese: "ja",
  };

  const langCode = langMap[targetLang] || "en";

  const key = `${text}_${langCode}`;
  if (cache[key]) return cache[key];

  try {
    const res = await fetch(
      `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${langCode}&dt=t&q=${encodeURIComponent(text)}`
    );

    const data = await res.json();
    const translated = data[0].map(item => item[0]).join("");

    cache[key] = translated;
    return translated;
  } catch (err) {
    console.error("Translate error:", err);
    return text;
  }
}