import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["en-US", "es", "zh"],

  localePrefix: "as-needed",
  // Used when no locale matches
  defaultLocale: "en-US",
});

export const localeToLabel = new Map<
  (typeof routing)["locales"][number],
  string
>([
  ["en-US", "English"],
  ["es", "Español"],
  ["zh", "中文"],
]);
