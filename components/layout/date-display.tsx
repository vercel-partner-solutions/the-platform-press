"use client";

import { useEffect, useState } from "react";

export function DateDisplay({ locale }: { locale: string }) {
  const [formattedDate, setFormattedDate] = useState<string>("");

  useEffect(() => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    };

    const date = new Date().toLocaleDateString(locale, options);
    setFormattedDate(date);
  }, [locale]);

  return <span className="min-w-32">{formattedDate}</span>;
}
