"use client"

import { useAbout } from "@/lib/hooks"

export function About() {
  const { about, stats, loading, error } = useAbout()

  if (loading) {
    return (
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">About Me</h2>
            <div className="w-12 h-1 bg-gradient-to-r from-accent to-primary mx-auto"></div>
          </div>
          <div className="text-center text-muted-foreground">Loading about content...</div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">About Me</h2>
            <div className="w-12 h-1 bg-gradient-to-r from-accent to-primary mx-auto"></div>
          </div>
          <div className="text-center text-destructive">Error: {error}</div>
        </div>
      </section>
    )
  }

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">About Me</h2>
          <div className="w-12 h-1 bg-gradient-to-r from-accent to-primary mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            {about && about.length > 0 ? (
              about.map((section) => (
                <p key={section.id} className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  {section.content}
                </p>
              ))
            ) : (
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                I'm a passionate software engineer with a strong foundation in both frontend and backend technologies.
              </p>
            )}
          </div>

          {stats && stats.length > 0 && (
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.id}
                  className="p-6 bg-card border border-border rounded-lg text-center hover:border-accent transition-colors duration-200"
                >
                  <div className="text-3xl font-bold text-accent mb-2">{stat.number}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
