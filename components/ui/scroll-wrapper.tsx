"use client";

import { useState, useEffect } from "react";

interface ScrollWrapperProps {
  children: React.ReactNode;
}

export function ScrollWrapper({ children }: ScrollWrapperProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 150);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return isScrolled ? children : null;
}