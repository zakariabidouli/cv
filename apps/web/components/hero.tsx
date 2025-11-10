"use client"

import { ArrowRight, Github, Linkedin, Mail } from "lucide-react"
import { useSocialLinks } from "@/lib/hooks"

// Icon mapping
const iconMap: Record<string, typeof Github> = {
  github: Github,
  linkedin: Linkedin,
  email: Mail,
  mail: Mail,
}

export function Hero() {
  const { links } = useSocialLinks()
  return (
    <section className="min-h-screen flex items-center justify-center pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center">
        <div className="mb-8 inline-block">
          <div className="px-4 py-2 bg-secondary rounded-full border border-border">
            <p className="text-sm text-accent font-medium">Welcome to my portfolio</p>
          </div>
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
          Software Engineer &{" "}
          <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
            Creative Developer
          </span>
        </h1>

        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
          I craft elegant, performant digital experiences. Specializing in full-stack development with a passion for
          clean code, intuitive interfaces, and scalable architecture.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button className="group px-8 py-3 bg-accent text-accent-foreground rounded-lg font-medium hover:shadow-lg hover:shadow-accent/50 transition-all duration-300 flex items-center justify-center gap-2">
            View My Work
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="px-8 py-3 border border-border text-foreground rounded-lg font-medium hover:bg-secondary transition-colors duration-200">
            Download CV
          </button>
        </div>

        {/* Social Links */}
        {links && links.length > 0 && (
          <div className="flex justify-center gap-6">
            {links.map((link) => {
              const Icon = iconMap[link.platform.toLowerCase()] || Github
              return (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-secondary rounded-full text-muted-foreground hover:text-accent hover:bg-secondary/80 transition-all duration-200 group"
                  aria-label={link.platform}
                >
                  <Icon className="w-5 h-5" />
                </a>
              )
            })}
          </div>
        )}

        {/* Scroll Indicator */}
        <div className="mt-16 flex justify-center animate-bounce">
          <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-accent rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
