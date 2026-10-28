import { create, useStore } from "zustand";
import { lang, Language } from "@/lang";
import {
  LOCALE_COOKIE,
  defaultLocale,
  getLocaleConfig,
  isLocale,
  localeCookie,
} from "@/lib/i18n/config";
import { useRequestLocale } from "@/lib/i18n/requestLocale";

type LanguageState = {
  currentLanguage: Language;
  setLanguage: (language: Language) => void;
  t: typeof lang.fa;
};

/**
 * The locale preference lives in exactly one place: the `language` cookie. It is
 * the only store readable by both the server (`getServerLocale`) and the
 * browser, so it is what keeps SSR output and hydration in agreement.
 *
 * This Zustand store is a CLIENT MIRROR of that cookie, never a second source of
 * truth: it reads the cookie on init and writes it on change, and it is seeded
 * by `Providers`/`syncLanguage` with the locale the route was rendered in.
 */
function readCookieLocale(): Language {
  if (typeof document === "undefined") return defaultLocale;
  const match = document.cookie.match(
    new RegExp(`(?:^|;\\s*)${LOCALE_COOKIE}=([^;]+)`),
  );
  return isLocale(match?.[1]) ? match[1] : defaultLocale;
}

/** Persist the preference so the server, middleware and later visits agree. */
function writeLocale(language: Language) {
  if (typeof document === "undefined") return;
  document.cookie = localeCookie(language);
}

/**
 * Flip `<html lang/dir>` together with the text. The server-rendered attributes
 * only change on the next refresh, so without this an English page could show
 * English copy inside an RTL document for a moment (mirrored, misaligned text).
 */
function mirrorDocumentLocale(language: Language) {
  if (typeof document === "undefined") return;
  const cfg = getLocaleConfig(language);
  document.documentElement.lang = cfg.hreflang;
  document.documentElement.dir = cfg.dir;
}

const initialLocale = readCookieLocale();

const languageStore = create<LanguageState>()((set) => ({
  currentLanguage: initialLocale,
  setLanguage: (language: Language) => {
    writeLocale(language);
    mirrorDocumentLocale(language);
    set(() => ({
      currentLanguage: language,
      t: lang[language] || lang[defaultLocale],
    }));
  },
  t: lang[initialLocale] || lang[defaultLocale],
}));

/**
 * Locale-aware store hook (same shape as before: `t`, `currentLanguage`,
 * `setLanguage`).
 *
 * In the browser it returns the live store, so toggling the language re-renders
 * immediately. On the server the store cannot know the request's locale, so the
 * locale comes from `Providers`/`RequestLocaleProvider` instead; that keeps the
 * SSR text, `<html dir>` and the client's first render in the same language
 * instead of falling back to the default locale and flipping on hydration.
 */
export default function useLanguageStore(): LanguageState {
  const state = useStore(languageStore);
  const requestLocale = useRequestLocale();
  const language =
    typeof document === "undefined"
      ? (requestLocale ?? state.currentLanguage)
      : state.currentLanguage;

  if (language === state.currentLanguage) return state;
  return {
    ...state,
    currentLanguage: language,
    t: lang[language] || lang[defaultLocale],
  };
}

export function syncLanguage(locale: Language) {
  if (languageStore.getState().currentLanguage !== locale) {
    languageStore.setState({
      currentLanguage: locale,
      t: lang[locale] || lang[defaultLocale],
    });
  }
}
