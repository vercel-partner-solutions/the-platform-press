"use client";

import Form from "next/form";
import { Search, X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";

interface CategorySearchFormProps {
  categorySlug: string;
  locale: string;
}

export default function CategorySearchForm({
  categorySlug,
  locale,
}: CategorySearchFormProps) {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("q");
  const actionUrl = `/${locale}/category/${categorySlug}`;
  const inputRef = useRef<HTMLInputElement>(null);

  const [inputValue, setInputValue] = useState(searchQuery || "");

  // Sync with URL changes
  useEffect(() => {
    setInputValue(searchQuery || "");
  }, [searchQuery]);

  return (
    <Form action={actionUrl} replace={true} className="relative mb-8">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        ref={inputRef}
        id="search"
        name="q"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="peer block w-full rounded-md border border-neutral-200 py-3 pl-10 pr-10 text-base placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
        placeholder="Search within this category"
        autoFocus
      />
      <div className="absolute left-3 top-1/2 -translate-y-1/2">
        <Search className="h-5 w-5 text-neutral-500 peer-focus:text-black" />
      </div>
      {inputValue && (
        <div className="absolute flex right-3 top-1/2 -translate-y-1/2">
          <button
            type="button"
            onClick={() => {
              setInputValue("");
              inputRef.current?.focus();
            }}
            className="p-1 text-neutral-500 hover:text-black"
            aria-label="Clear search"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      )}
    </Form>
  );
}
