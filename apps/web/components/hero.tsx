"use client"

import { Github, Linkedin, Mail } from "lucide-react"
import type { SocialLink } from "@/lib/content"

const ICON_MAP: Record<string, React.ElementType> = {
  github:   Github,
  linkedin: Linkedin,
  email:    Mail,
  mail:     Mail,
}

type Props = {
  resumeUrl:   string | null
  socialLinks: SocialLink[]
}

export function Hero({ resumeUrl, socialLinks }: Props) {
  return (
    <section
      id="hero"
      className="relative px-6 sm:px-8 lg:px-12"
      aria-labelledby="hero-headline"
    >
      <div className="max-w-5xl mx-auto min-h-[calc(100svh-3rem)] flex flex-col justify-between pt-16 pb-12">

        {/* ── Zone 1: Top row ── */}
        <div
          className="flex items-center justify-between"
          style={{ animation: "hero-fade 0.7s ease-out both", animationDelay: "0ms" }}
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            Software Engineer
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-dot-pulse flex-shrink-0" />
            OCP Group · Mining Division
          </span>
        </div>

        {/* ── Zone 2: Name ── */}
        <div
          className="-mt-4"
          style={{ animation: "hero-fade 0.7s ease-out both", animationDelay: "150ms" }}
        >
          <h1
            id="hero-headline"
            className="font-black text-foreground leading-[0.88] tracking-[-0.04em] uppercase select-none"
            style={{ fontSize: "clamp(4.5rem, 14vw, 11.5rem)" }}
          >
            Zakaria
            <br />
            Bidouli
          </h1>
        </div>

        {/* ── Zone 3: Bottom row ── */}
        <div
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8"
          style={{ animation: "hero-fade 0.7s ease-out both", animationDelay: "300ms" }}
        >
          {/* Tagline in Instrument Serif italic */}
          <p className="font-display italic text-muted-foreground text-lg sm:text-xl lg:text-2xl leading-snug max-w-md">
            I engineer distributed systems and real-time platforms.
          </p>

          {/* Social links + optional CV */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {resumeUrl && (
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground border border-border/60 hover:border-border px-3 py-1.5 transition-colors duration-200"
              >
                CV ↗
              </a>
            )}
            {socialLinks.map((link, idx) => {
              const Icon = ICON_MAP[link.platform.toLowerCase()] ?? Github
              return (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.platform}
                  className="w-8 h-8 flex items-center justify-center border border-border/60 hover:border-accent/60 text-muted-foreground hover:text-accent transition-all duration-200"
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              )
            })}
          </div>
        </div>

        {/* ── Scroll hint ── */}
        <a
          href="#about"
          className="absolute bottom-10 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground/40 hover:text-muted-foreground/70 transition-colors duration-200"
          aria-label="Scroll to About"
          style={{ animation: "hero-fade 0.7s ease-out both", animationDelay: "450ms" }}
        >
          ↓
        </a>
      </div>
    </section>
  )
}
