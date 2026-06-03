import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const contentDir = path.join(process.cwd(), 'content')

export type Project = {
  title: string
  description: string
  image: string | null
  tags: string[]
  github_url: string | null
  live_url: string | null
  order: number
}

export type Experience = {
  role: string
  company: string
  period: string
  tags: string[]
  description: string
  order: number
}

export type SkillCategory = {
  name: string
  skills: string[]
}

export type Stat = {
  number: string
  label: string
}

export type SocialLink = {
  platform: string
  url: string
  icon_name: string
}

export function getProjects(): Project[] {
  const dir = path.join(contentDir, 'projects')
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.mdx'))
  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), 'utf-8')
      const { data, content } = matter(raw)
      return {
        title: data.title ?? '',
        description: content.trim(),
        image: data.image ?? null,
        tags: data.tags ?? [],
        github_url: data.github_url ?? null,
        live_url: data.live_url ?? null,
        order: data.order ?? 0,
      } satisfies Project
    })
    .sort((a, b) => a.order - b.order)
}

export function getExperiences(): Experience[] {
  const dir = path.join(contentDir, 'experience')
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.mdx'))
  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), 'utf-8')
      const { data, content } = matter(raw)
      return {
        role: data.role ?? '',
        company: data.company ?? '',
        period: data.period ?? '',
        tags: data.tags ?? [],
        description: content.trim(),
        order: data.order ?? 0,
      } satisfies Experience
    })
    .sort((a, b) => a.order - b.order)
}

export function getAbout(): { paragraphs: string[]; stats: Stat[] } {
  const raw = fs.readFileSync(path.join(contentDir, 'about.mdx'), 'utf-8')
  const { data, content } = matter(raw)
  const paragraphs = content
    .trim()
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean)
  return {
    paragraphs,
    stats: (data.stats ?? []) as Stat[],
  }
}

export function getSkills(): SkillCategory[] {
  const raw = fs.readFileSync(path.join(contentDir, 'skills.mdx'), 'utf-8')
  const { data } = matter(raw)
  return (data.categories ?? []) as SkillCategory[]
}

export function getSocialData(): { links: SocialLink[]; resume_url: string | null } {
  const raw = fs.readFileSync(path.join(contentDir, 'social.mdx'), 'utf-8')
  const { data } = matter(raw)
  return {
    links: (data.links ?? []) as SocialLink[],
    resume_url: data.resume_url ?? null,
  }
}
