import { create } from "zustand";
import { get as getItem, set as setItem } from "local-storage";
import { lang, Language } from "@/lang";

type LanguageState = {
  currentLanguage: Language;
  setLanguage: (language: Language) => void;
  t: typeof lang.fa;
};

export const languageStorageKey = "language";

const useLanguageStore = create<LanguageState>()((set, get) => ({
  currentLanguage: (getItem(languageStorageKey) as Language) || "fa",
  setLanguage: (language: Language) => {
    setItem(languageStorageKey, language);
    set(() => ({
      currentLanguage: language,
      t: lang[language],
    }));
  },
  t: lang[(getItem(languageStorageKey) as Language) || "fa"],
}));

export default useLanguageStore;
