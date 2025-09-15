"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { localeToLabel, routing } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";
import { useLocale } from "next-intl";
import { cn } from "@/lib/utils";

export default function LocaleSwitcher() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentLocale = useLocale();
  const fullUrl = `${pathname}?${searchParams.toString()}`;

  return (
    <nav className="justify-self-center flex items-center gap-6">
      {routing.locales.map((locale) => {
        const isActive = locale === currentLocale;
        return (
          <Link
            href={fullUrl}
            replace
            locale={locale}
            key={locale}
            className={cn(
              "text-xs font-medium text-neutral-600 uppercase tracking-wide cursor-default",
              isActive && "text-bold",
            )}
          >
            {localeToLabel.get(locale)}
          </Link>
        );
      })}
    </nav>
  );
}
