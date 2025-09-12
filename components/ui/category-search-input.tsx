"use client"

import { Search, X } from "lucide-react"
import { forwardRef, type FormEvent } from "react"

interface CategorySearchInputProps {
  value: string
  onChange: (value: string) => void
  onSubmit: (e: FormEvent<HTMLFormElement>) => void
  onClear: () => void
  isSearching: boolean
}

const CategorySearchInput = forwardRef<HTMLInputElement, CategorySearchInputProps>(
  ({ value, onChange, onSubmit, onClear, isSearching }, ref) => {
    return (
      <form onSubmit={onSubmit} className="relative mb-8">
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <input
          ref={ref}
          id="search"
          name="q"
          className="peer block w-full rounded-md border border-neutral-200 py-3 pl-10 pr-10 text-base outline-2 placeholder:text-neutral-500 focus:border-accent focus:ring-1 focus:ring-accent disabled:opacity-50"
          placeholder="Search within this category..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={isSearching}
          autoFocus
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
          {value.length > 0 && (
            <button
              type="button"
              onClick={onClear}
              className="p-1 text-neutral-500 hover:text-black"
              aria-label="Clear search"
            >
              <X className="h-5 w-5" />
            </button>
          )}
          {value.length === 0 && <Search className="h-5 w-5 text-neutral-500 peer-focus:text-black" />}
        </div>
      </form>
    )
  },
)

CategorySearchInput.displayName = "CategorySearchInput"

export default CategorySearchInput
