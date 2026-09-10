import { create } from "zustand";
import { get as getItem, set as setItem } from "local-storage";
import { lang, Language } from "@/lang";

type LanguageState = {
  currentLanguage: Language;
  setLanguage: (language: Language) => void;
  t: typeof lang.fa;
};

export const languageStorageKey = "language";

const useLanguageStore = create<LanguageState>()((set) => ({
  currentLanguage: (getItem(languageStorageKey) as Language) || "fa",
  setLanguage: (language: Language) => {
    try {
      setItem(languageStorageKey, language);
    } catch {
      // ignore in SSR
    }
    set(() => ({
      currentLanguage: language,
      t: lang[language] || lang.fa,
    }));
  },
  t: lang[(getItem(languageStorageKey) as Language) || "fa"] || lang.fa,
}));

export function syncLanguage(locale: Language) {
  if (useLanguageStore.getState().currentLanguage !== locale) {
    useLanguageStore.setState({
      currentLanguage: locale,
      t: lang[locale] || lang.fa,
    });
  }
}

export default useLanguageStore;
