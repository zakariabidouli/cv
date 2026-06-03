"use client"

import { useState } from "react"
import { CheckCircle2 } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { SectionDivider } from "@/components/section-divider"

export function Contact() {
  const [form,       setForm]       = useState({ name: "", email: "", message: "" })
  const [submitted,  setSubmitted]  = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = `Portfolio contact from ${form.name}`
    const body    = `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
    window.location.href = `mailto:bidouli.zak@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setSubmitted(true)
    setForm({ name: "", email: "", message: "" })
    setTimeout(() => setSubmitted(false), 4000)
  }

  return (
    <section
      id="contact"
      className="py-20 lg:py-28 px-6 sm:px-8 lg:px-12"
      aria-labelledby="contact-heading"
    >
      <div className="max-w-5xl mx-auto">

        <Reveal direction="none">
          <SectionDivider number="05" title="Contact" />
        </Reveal>

        <div className="max-w-xl">

          {/* Header */}
          <Reveal>
            <h2
              id="contact-heading"
              className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight mb-3"
            >
              Get In Touch
            </h2>
            <p className="text-sm text-muted-foreground mb-10">
              Have a project or opportunity in mind? I would love to hear about it.
            </p>
          </Reveal>

          {/* Direct links */}
          <Reveal delay={60}>
            <div className="space-y-5 mb-12">
              <a
                href="mailto:bidouli.zak@gmail.com"
                className="flex items-center gap-6 text-sm text-muted-foreground hover:text-accent transition-colors duration-200 group"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground/50 w-16">Email</span>
                <span className="group-hover:underline underline-offset-4">bidouli.zak@gmail.com ↗</span>
              </a>
              <a
                href="https://linkedin.com/in/zakariabidouli"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-6 text-sm text-muted-foreground hover:text-accent transition-colors duration-200 group"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground/50 w-16">LinkedIn</span>
                <span className="group-hover:underline underline-offset-4">linkedin.com/in/zakariabidouli ↗</span>
              </a>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={100}>
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    className="w-full bg-transparent border-b border-border focus:border-accent outline-none py-2 text-sm text-foreground placeholder:text-muted-foreground/40 transition-colors duration-200"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                    className="w-full bg-transparent border-b border-border focus:border-accent outline-none py-2 text-sm text-foreground placeholder:text-muted-foreground/40 transition-colors duration-200"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60">
                  Message
                </label>
                <textarea
                  id="message"
                  placeholder="Tell me about your project…"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={4}
                  required
                  className="w-full bg-transparent border-b border-border focus:border-accent outline-none py-2 text-sm text-foreground placeholder:text-muted-foreground/40 transition-colors duration-200 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitted}
                className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground hover:text-accent py-3 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitted ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
                    Opening email client
                  </>
                ) : (
                  "Send Message ↗"
                )}
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
