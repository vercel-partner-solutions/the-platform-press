"use client"

import Link from "next/link"
import { Search, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import "@/lib/cms"

interface HeaderProps {
  categories: string[]
}

function StockTicker({ isCompact = false }: { isCompact?: boolean }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  const stocks = [
    { name: "S&P 500", value: "+0.21%", color: "text-green-600" },
    { name: "Nasdaq", value: "+0.45%", color: "text-green-600" },
    { name: "Dow", value: "-0.12%", color: "text-red-600" },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false)
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % stocks.length)
        setIsVisible(true)
      }, 300)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const current = stocks[currentIndex]

  return (
    <div
      className={`transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0"} ${isCompact ? "text-xs" : "text-sm"} font-medium text-neutral-700`}
    >
      {current.name} <span className={current.color}>{current.value}</span>
    </div>
  )
}

function HeaderClient({ categories }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 150)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus()
      }, 0)
    }
  }, [isSearchOpen])

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen)
  }

  const handleSearchClose = () => {
    setIsSearchOpen(false)
  }

  const handleSearchSubmit = (searchTerm: string) => {
    if (searchTerm.trim()) {
      router.push(`/category/all?search=${encodeURIComponent(searchTerm.trim())}`)
      setIsSearchOpen(false)
    }
  }

  const handleLiveClick = () => {
    router.push("/category/latest")
  }

  return (
    <>
      <div className="bg-white border-b border-neutral-200">
        {/* Top utility bar - hidden on mobile */}
        <div className="border-b border-neutral-100 hidden md:block">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-3 items-center h-12">
              <div className="justify-self-start relative">
                {!isSearchOpen ? (
                  <button
                    onClick={handleSearchToggle}
                    className="p-2 text-neutral-600 hover:text-black transition-colors"
                    aria-label="Search"
                  >
                    <Search size={16} />
                  </button>
                ) : (
                  <div className="flex items-center gap-2 transition-all duration-300 ease-in-out">
                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder="Search articles..."
                      className="w-64 px-3 py-1.5 text-sm border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      onKeyDown={(e) => {
                        if (e.key === "Escape") {
                          handleSearchClose()
                        }
                        if (e.key === "Enter") {
                          handleSearchSubmit(e.currentTarget.value)
                        }
                      }}
                    />
                    <button
                      onClick={handleSearchClose}
                      className="p-1 text-neutral-600 hover:text-black transition-colors"
                      aria-label="Close search"
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}
              </div>

              <nav className="justify-self-center flex items-center gap-6">
                <span className="text-xs font-medium text-neutral-600 uppercase tracking-wide cursor-default">
                  English
                </span>
                <span className="text-xs font-medium text-neutral-600 uppercase tracking-wide cursor-default">
                  Español
                </span>
                <span className="text-xs font-medium text-neutral-800 tracking-wide cursor-default whitespace-nowrap">
                  中文
                </span>
              </nav>

              <div className="justify-self-end flex items-center gap-3">
                <Button
                  variant="default"
                  size="sm"
                  className="text-xs font-medium bg-blue-600 hover:bg-blue-700 text-white px-4 py-2"
                >
                  SUBSCRIBE FOR $1/WEEK
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs font-medium border-neutral-300 text-neutral-700 hover:bg-neutral-50 px-4 py-2 bg-transparent"
                >
                  LOG IN
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main header section - responsive layout */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 items-center h-16 md:h-20">
            {/* Mobile: Search and Menu */}
            <div className="flex items-center gap-2 md:hidden">
              {!isSearchOpen ? (
                <button
                  onClick={handleSearchToggle}
                  className="p-2 text-neutral-600 hover:text-black transition-colors"
                  aria-label="Search"
                >
                  <Search size={18} />
                </button>
              ) : (
                <div className="flex items-center gap-1">
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search..."
                    className="w-32 px-2 py-1 text-sm border border-neutral-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    onKeyDown={(e) => {
                      if (e.key === "Escape") {
                        handleSearchClose()
                      }
                      if (e.key === "Enter") {
                        handleSearchSubmit(e.currentTarget.value)
                      }
                    }}
                  />
                  <button
                    onClick={handleSearchClose}
                    className="p-1 text-neutral-600 hover:text-black transition-colors"
                    aria-label="Close search"
                  >
                    <X size={16} />
                  </button>
                </div>
              )}
              <button
                className="p-2 text-neutral-600 hover:text-black transition-colors"
                aria-label="Menu"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <Menu size={18} />
              </button>
            </div>

            {/* Desktop: Date and Today's Paper */}
            <div className="hidden md:flex flex-col justify-self-start">
              <div className="flex items-center gap-4 text-sm text-neutral-600 mb-1">
                <span>Tuesday, September 9, 2025</span>
                <div className="flex items-center gap-1">
                  <span>☁️</span>
                  <span>77°F</span>
                </div>
              </div>
              <span className="text-sm font-medium text-neutral-700">Today's Paper</span>
            </div>

            {/* Logo - responsive sizing */}
            <Link
              href="/"
              className="font-heading text-lg md:text-4xl font-bold tracking-tight text-black transition-colors hover:text-neutral-700 justify-self-center text-center leading-tight whitespace-nowrap"
            >
              The Platform Press
            </Link>

            {/* Mobile: CTAs */}
            <div className="flex items-center gap-2 md:hidden justify-self-end">
              <Button
                variant="default"
                size="sm"
                className="text-xs font-medium bg-blue-600 hover:bg-blue-700 text-white px-2 py-1"
              >
                Subscribe
              </Button>
            </div>

            {/* Desktop: Stock ticker */}
            <div className="hidden md:block text-right justify-self-end">
              <div className="w-32 text-right">
                <StockTicker />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile navigation menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-neutral-200">
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col gap-3">
                <Link href="/" className="text-sm font-medium text-black py-2">
                  Home
                </Link>
                {categories.map((category) => (
                  <Link
                    key={category}
                    href={`/category/${category.toLowerCase()}`}
                    className="text-sm font-medium text-black py-2"
                  >
                    {category}
                  </Link>
                ))}
                <Link href="/category/opinion" className="text-sm font-medium text-black py-2">
                  Opinion
                </Link>
                <span
                  onClick={handleLiveClick}
                  className="text-sm font-medium py-2 cursor-pointer hover:underline"
                  style={{
                    color: "#dc2626",
                    backgroundColor: "transparent",
                    border: "none",
                    outline: "none",
                    boxShadow: "none",
                  }}
                >
                  Live
                </span>
                <div className="pt-3 border-t border-neutral-200 mt-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-sm font-medium border-neutral-300 text-neutral-700 hover:bg-neutral-50 mb-2 bg-transparent"
                  >
                    LOG IN
                  </Button>
                </div>
              </nav>
            </div>
          </div>
        )}
      </div>

      {/* Sticky navigation - desktop only */}
      <header
        className={`bg-white sticky top-0 z-50 border-b border-neutral-200 transition-all duration-300 ease-in-out hidden md:block ${
          isScrolled ? "shadow-md" : ""
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <div
              className={`transition-all duration-300 ease-in-out ${isScrolled ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}
            >
              <Link
                href="/"
                className="font-heading text-lg font-bold tracking-tight text-black transition-colors hover:text-neutral-700 whitespace-nowrap"
              >
                The Platform Press
              </Link>
            </div>

            <nav className="flex items-center gap-6 overflow-x-auto">
              {categories.map((category) => (
                <Link
                  key={category}
                  href={`/category/${category.toLowerCase()}`}
                  className="text-sm font-medium text-black hover:underline whitespace-nowrap"
                >
                  {category}
                </Link>
              ))}
              <Link
                href="/category/opinion"
                className="text-sm font-medium text-black hover:underline whitespace-nowrap"
              >
                Opinion
              </Link>
              <span
                onClick={handleLiveClick}
                className="text-sm font-medium hover:underline whitespace-nowrap cursor-pointer"
                style={{
                  color: "#dc2626",
                  backgroundColor: "transparent",
                  border: "none",
                  outline: "none",
                  boxShadow: "none",
                }}
              >
                Live
              </span>
            </nav>

            <div
              className={`transition-all duration-300 ease-in-out ${isScrolled ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"}`}
            >
              <div className="flex items-center gap-2">
                <Button
                  variant="default"
                  size="sm"
                  className="text-xs font-medium bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5"
                >
                  SUBSCRIBE
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs font-medium border-neutral-300 text-neutral-700 hover:bg-neutral-50 px-3 py-1.5 bg-transparent"
                >
                  LOG IN
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

export default async function Header() {
  const { getCategories } = await import("@/lib/cms")
  const categories = await getCategories()

  return <HeaderClient categories={categories} />
}
