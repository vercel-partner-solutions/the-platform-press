"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { i18n, Locale } from "@/i18n.config";
import Link from "next/link";

export function LocaleSwitcher() {
  const pathname = usePathname();
  const redirectedPathname = (locale: Locale) => {
    if (!pathname) return "/";
    const segments = pathname.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  return (
    <nav className="justify-self-center flex items-center gap-6">
      {i18n.locales.map((locale) => {
        const isActive = locale === locale;
        return (
          <Link
            href={redirectedPathname(locale)}
            replace
            locale={locale}
            key={locale}
            className={cn(
              "text-xs font-medium text-neutral-600 hober:font-bold hover:text-neutral-900 uppercase tracking-wide cursor-pointer",
              isActive && "text-bold",
            )}
          >
              {locale}
          </Link>
        );
      })}
    </nav>
  );
}
