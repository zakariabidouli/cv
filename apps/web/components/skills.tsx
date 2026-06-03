import { Reveal } from "@/components/reveal"
import { SectionDivider } from "@/components/section-divider"
import type { SkillCategory } from "@/lib/content"

type Props = { categories: SkillCategory[] }

export function Skills({ categories }: Props) {
  return (
    <section
      id="skills"
      className="py-20 lg:py-28 px-6 sm:px-8 lg:px-12"
      aria-labelledby="skills-heading"
    >
      <div className="max-w-5xl mx-auto">

        <Reveal direction="none">
          <SectionDivider number="04" title="Skills" />
        </Reveal>

        <h2 id="skills-heading" className="sr-only">Skills and Technologies</h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-10">
          {categories.map((cat, idx) => (
            <Reveal key={idx} delay={idx * 40} className="min-w-0 overflow-hidden">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/60 mb-3">
                  {cat.name}
                </p>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  {cat.skills.map((skill, i) => (
                    <span key={i}>
                      {skill}
                      {i < cat.skills.length - 1 && (
                        <span className="text-muted-foreground/30 mx-1">·</span>
                      )}
                    </span>
                  ))}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
