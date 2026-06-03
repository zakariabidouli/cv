import { Reveal } from "@/components/reveal"
import { SectionDivider } from "@/components/section-divider"
import type { Experience as ExperienceType } from "@/lib/content"

type Props = { experiences: ExperienceType[] }

export function Experience({ experiences }: Props) {
  return (
    <section
      id="experience"
      className="py-20 lg:py-28 px-6 sm:px-8 lg:px-12"
      aria-labelledby="experience-heading"
    >
      <div className="max-w-5xl mx-auto">

        <Reveal direction="none">
          <SectionDivider number="02" title="Experience" />
        </Reveal>

        <h2 id="experience-heading" className="sr-only">Experience</h2>

        <div>
          {experiences.map((exp, idx) => (
            <Reveal key={idx} delay={idx * 50}>
              <article className="py-7 border-b border-border/40 last:border-b-0">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-3">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
                    <h3 className="font-semibold text-sm text-foreground">{exp.role}</h3>
                    <span className="text-sm text-accent">{exp.company}</span>
                  </div>
                  <span className="font-mono text-[10px] tracking-[0.1em] text-muted-foreground/70 whitespace-nowrap">
                    {exp.period}
                  </span>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {exp.description}
                </p>

                {exp.tags.length > 0 && (
                  <div className="flex flex-wrap gap-x-3 gap-y-1">
                    {exp.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="font-mono text-[10px] text-muted-foreground/60 uppercase tracking-wide"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
