import "server-only";

type Locale = "en" | "es" | "zh" | string;

type Dictionary = {
  Layout: {
    subscribe: string;
    login: string;
  };
  Homepage: {
    title: string;
    description: string;
  };
};

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import("@/dictionaries/en.json").then((module) => module.default),
  es: () => import("@/dictionaries/es.json").then((module) => module.default),
  zh: () => import("@/dictionaries/zh.json").then((module) => module.default),
};

export const getDictionary = async (locale: string): Promise<Dictionary> =>
  dictionaries[locale]();
