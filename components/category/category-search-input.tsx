"use client";

import { Search, X } from "lucide-react";
import { type FormEvent, useEffect, useRef } from "react";

interface CategorySearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onClear: () => void;
  isPending: boolean;
}

export default function CategorySearchInput({
  value,
  onChange,
  onSubmit,
  onClear,
  isPending,
}: CategorySearchInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const wasPending = useRef(false);

  // Auto-focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Re-focus input after search completes
  useEffect(() => {
    if (wasPending.current && !isPending) {
      inputRef.current?.focus();
    }
    wasPending.current = isPending;
  }, [isPending]);

  return (
    <form onSubmit={onSubmit} className="relative mb-8">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        ref={inputRef}
        id="search"
        name="q"
        className="peer block w-full rounded-md border border-neutral-200 py-3 pl-10 pr-10 text-base placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
        placeholder="Search within this category"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <div className="absolute left-3 top-1/2 -translate-y-1/2">
        <Search className="h-5 w-5 text-neutral-500 peer-focus:text-black" />
      </div>
      {value.length > 0 && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <button
            type="button"
            onClick={onClear}
            className="p-1 text-neutral-500 hover:text-black"
            aria-label="Clear search"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      )}
    </form>
  );
}
