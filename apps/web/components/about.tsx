import { Reveal } from "@/components/reveal"
import { SectionDivider } from "@/components/section-divider"
import type { Stat } from "@/lib/content"

type Props = {
  paragraphs: string[]
  stats:      Stat[]
}

export function About({ paragraphs, stats }: Props) {
  return (
    <section
      id="about"
      className="py-20 lg:py-28 px-6 sm:px-8 lg:px-12"
      aria-labelledby="about-heading"
    >
      <div className="max-w-5xl mx-auto">

        <Reveal direction="none">
          <SectionDivider number="01" title="About" />
        </Reveal>

        <div className="grid lg:grid-cols-[3fr_2fr] gap-12 lg:gap-20 items-start">

          {/* Left — paragraphs */}
          <div>
            {paragraphs[0] && (
              <Reveal>
                <p
                  id="about-heading"
                  className="text-xl lg:text-2xl font-thin leading-relaxed text-foreground mb-8"
                >
                  {paragraphs[0]}
                </p>
              </Reveal>
            )}
            <div className="space-y-4">
              {paragraphs.slice(1).map((text, idx) => (
                <Reveal key={idx} delay={idx * 60}>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {text}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Right — stats without cards */}
          {stats.length > 0 && (
            <div className="space-y-8 lg:pt-2">
              {stats.map((stat, idx) => (
                <Reveal key={idx} delay={idx * 50} direction="right">
                  <div>
                    <p className="text-5xl sm:text-6xl font-black text-foreground tracking-tight">
                      {stat.number}
                    </p>
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/70 mt-1.5">
                      {stat.label}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
