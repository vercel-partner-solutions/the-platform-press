"use client";

const dateOptions = {
    weekday: "long" as const,
    year: "numeric" as const,
    month: "long" as const,
    day: "numeric" as const,
  };

export const renderDate = async (locale: string) => {
    const dateTime = new Date();
    const safeIntlDate = dateTime.toLocaleDateString(locale, dateOptions);
    return safeIntlDate;
  };