"use client";

import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";

interface Article {
  id: number;
  title: string;
  url: string;
  category: string;
  excerpt: string;
}

export function SearchBox() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Article[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const searchArticles = useCallback(
    async (searchQuery: string): Promise<Article[]> => {
      const response = await fetch(
        `/api/search?q=${encodeURIComponent(searchQuery)}`
      );
      const data = await response.json();
      return data.articles || [];
    },
    []
  );

  // Handle search when query changes
  useEffect(() => {
    const performSearch = async () => {
      if (query.length >= 2) {
        try {
          const searchResults = await searchArticles(query);
          setResults(searchResults);
          setIsOpen(true);
          setSelectedIndex(-1);
        } catch (error) {
          console.error("Search failed:", error);
          setResults([]);
        }
      } else {
        setResults([]);
        setIsOpen(false);
        setSelectedIndex(-1);
      }
    };

    const debounceTimer = setTimeout(performSearch, 150);
    return () => clearTimeout(debounceTimer);
  }, [query, searchArticles]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || results.length === 0) {
      if (e.key === "Enter" && query.length >= 2) {
        e.preventDefault();
        router.push(`/category/all?q=${encodeURIComponent(query)}`);
        return;
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0));
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1));
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0 && results[selectedIndex]) {
          handleArticleSelect(results[selectedIndex]);
        } else {
          router.push(`/category/all?q=${encodeURIComponent(query)}`);
        }
        break;
      case "Escape":
        setIsOpen(false);
        setSelectedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  const handleArticleSelect = (article: Article) => {
    setIsOpen(false);
    setSelectedIndex(-1);
    router.push(article.url);
  };

  const handleClear = () => {
    setQuery("");
    setResults([]);
    setIsOpen(false);
    setSelectedIndex(-1);
    inputRef.current?.focus();
  };

  // Handle input focus to show results if available
  const handleInputFocus = () => {
    if (query.length >= 2 && results.length > 0) {
      setIsOpen(true);
    }
  };

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="justify-self-start">
      <div className="relative w-64">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={handleInputFocus}
            placeholder="Search"
            className={`w-full rounded-md border border-input bg-background pl-10 py-2 ${
              query.length > 0 ? "pr-10" : "pr-4"
            } text-sm placeholder:text-muted-foreground transition-colors duration-200`}
          />
          {query.length > 0 && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 text-muted-foreground hover:text-foreground transition-colors duration-150 rounded-sm"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        {isOpen && results.length > 0 && (
          <div
            ref={dropdownRef}
            className="absolute top-full left-0 right-0 z-[60] mt-[5px] w-[600px] bg-popover border border-border rounded-md shadow-lg max-h-80 overflow-y-auto"
          >
            <div className="p-2">
              {results.map((article, index) => (
                <button
                  type="button"
                  key={article.id}
                  onClick={() => handleArticleSelect(article)}
                  className={`w-full text-left px-4 py-3 text-sm rounded-sm hover:bg-gray-200 transition-colors duration-150 ${
                    selectedIndex === index ? "bg-gray-200" : ""
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <div className="font-medium text-foreground line-clamp-1">
                        {article.title}
                      </div>
                      <span className="text-xs bg-accent text-accent-foreground px-2 py-0.5 rounded-full shrink-0">
                        {article.category}
                      </span>
                    </div>
                    <div className="text-xs line-clamp-2 leading-relaxed">
                      {article.excerpt}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
