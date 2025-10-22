"use client";

import { useEffect, useState } from "react";

export default function YearDisplay() {
  const [year, setYear] = useState<number>();

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return <>{year}</>;
}