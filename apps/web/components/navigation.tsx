"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import ThemeToggle from "@/components/ThemeToggle"

const NAV_ITEMS = [
  { label: "About",      href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects",   href: "#projects" },
  { label: "Skills",     href: "#skills" },
  { label: "Contact",    href: "#contact" },
]

export function Navigation() {
  const [isOpen,        setIsOpen]        = useState(false)
  const [activeSection, setActiveSection] = useState("")

  useEffect(() => {
    const onScroll = () => {
      const sections = NAV_ITEMS.map((i) => i.href.slice(1))
      const offset   = window.scrollY + 80

      const firstEl = document.getElementById(sections[0])
      if (firstEl && offset < firstEl.offsetTop) { setActiveSection(""); return }

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el && offset >= el.offsetTop - 80) {
          setActiveSection(sections[i])
          return
        }
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setIsOpen(false) }
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])

  return (
    <header
      className="fixed top-0 inset-x-0 z-50 border-b border-border/40 bg-background/90 backdrop-blur-sm"
      role="banner"
    >
      <nav
        className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 h-12 flex items-center justify-between"
        aria-label="Main navigation"
      >
        {/* Monogram */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault()
            window.scrollTo({ top: 0, behavior: "smooth" })
            setActiveSection("")
          }}
          className="font-mono text-xs tracking-[0.2em] uppercase text-foreground hover:text-accent transition-colors duration-200"
          aria-label="Zakaria Bidouli — home"
        >
          ZB
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-7">
          {NAV_ITEMS.map(({ label, href }) => {
            const id       = href.slice(1)
            const isActive = activeSection === id
            return (
              <a
                key={label}
                href={href}
                className={cn(
                  "font-mono text-[11px] uppercase tracking-[0.18em] transition-colors duration-200",
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {label}
              </a>
            )
          })}
          <div className="pl-4 border-l border-border/60">
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile controls */}
        <div className="md:hidden flex items-center gap-4">
          <ThemeToggle />
          <button
            onClick={() => setIsOpen((v) => !v)}
            className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground transition-colors"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? "Close" : "Menu"}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <div
          id="mobile-menu"
          className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur-sm"
        >
          <div className="max-w-5xl mx-auto px-6 py-5 flex flex-col gap-5">
            {NAV_ITEMS.map(({ label, href }) => {
              const id       = href.slice(1)
              const isActive = activeSection === id
              return (
                <a
                  key={label}
                  href={href}
                  className={cn(
                    "font-mono text-[11px] uppercase tracking-[0.2em] transition-colors duration-200",
                    isActive ? "text-foreground" : "text-muted-foreground"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {label}
                </a>
              )
            })}
          </div>
        </div>
      )}
    </header>
  )
}
