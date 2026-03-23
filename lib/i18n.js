import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// 🌐 Languages supported
export const supportedLanguages = [
  "en", "hi", "bn", "ta", "te", "mr",
  "es", "fr", "pt", "de", "ja"
];

// 🧠 Basic translations (you can expand later)
const resources = {
  en: { translation: {} },
  hi: { translation: {} },
  bn: { translation: {} },
  ta: { translation: {} },
  te: { translation: {} },
  mr: { translation: {} },
  es: { translation: {} },
  fr: { translation: {} },
  pt: { translation: {} },
  de: { translation: {} },
  ja: { translation: {} },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;