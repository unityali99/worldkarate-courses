import { fa } from "./fa";
import { en } from "./en";

export const lang = {
  fa,
  en,
};

export type Language = keyof typeof lang;
export type LanguageKeys = typeof lang.fa;
