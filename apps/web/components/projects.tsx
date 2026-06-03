"use client"

import { useState } from "react"
import Image from "next/image"
import { Reveal } from "@/components/reveal"
import { SectionDivider } from "@/components/section-divider"
import type { Project } from "@/lib/content"

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [imgError, setImgError] = useState(false)
  const imgSrc = imgError || !project.image ? "/pic.png" : project.image

  return (
    <Reveal delay={index * 70}>
      <article className="group">
        {/* Image */}
        <div className="relative aspect-video overflow-hidden mb-4 bg-secondary">
          <Image
            src={imgSrc}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            sizes="(max-width: 640px) 100vw, 50vw"
            onError={() => setImgError(true)}
          />
          {/* Hover overlay with links */}
          {(project.github_url || project.live_url) && (
            <div className="absolute inset-0 bg-background/85 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-6">
              {project.github_url && (
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[11px] uppercase tracking-[0.2em] text-foreground hover:text-accent transition-colors"
                  aria-label={`View source code of ${project.title}`}
                >
                  GitHub ↗
                </a>
              )}
              {project.live_url && (
                <a
                  href={project.live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[11px] uppercase tracking-[0.2em] text-foreground hover:text-accent transition-colors"
                  aria-label={`View live demo of ${project.title}`}
                >
                  Live ↗
                </a>
              )}
            </div>
          )}
        </div>

        {/* Meta */}
        <p className="font-mono text-[10px] text-muted-foreground/50 mb-1">
          {String(index + 1).padStart(2, "0")}
        </p>
        <h3 className="text-sm font-semibold text-foreground leading-snug mb-1.5">
          {project.title}
        </h3>
        <p className="text-xs text-muted-foreground leading-relaxed mb-2.5">
          {project.description}
        </p>
        {project.tags.length > 0 && (
          <div className="flex flex-wrap gap-x-2 gap-y-0.5">
            {project.tags.map((tag, i) => (
              <span key={i} className="font-mono text-[10px] text-muted-foreground/50">
                {tag}
              </span>
            ))}
          </div>
        )}
      </article>
    </Reveal>
  )
}

type Props = { projects: Project[] }

export function Projects({ projects }: Props) {
  return (
    <section
      id="projects"
      className="py-20 lg:py-28 px-6 sm:px-8 lg:px-12"
      aria-labelledby="projects-heading"
    >
      <div className="max-w-5xl mx-auto">

        <Reveal direction="none">
          <SectionDivider number="03" title="Projects" />
        </Reveal>

        <h2 id="projects-heading" className="sr-only">Projects</h2>

        <div className="grid sm:grid-cols-2 gap-x-8 gap-y-12">
          {projects.map((project, idx) => (
            <ProjectCard key={idx} project={project} index={idx} />
          ))}
        </div>
      </div>
    </section>
  )
}
