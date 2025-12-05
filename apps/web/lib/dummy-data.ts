// Dummy/fallback data to show when API data is not available
import { Project, Experience, SkillCategory, About, Stat, SocialLink } from './api'

export const dummyProjects: Project[] = [
  {
    id: 1,
    title: "Sample Project",
    description: "A showcase of innovative solutions and creative problem-solving. This project demonstrates technical expertise and attention to detail.",
    image: "/placeholder.svg",
    tags: ["React", "TypeScript", "Next.js"],
    live_url: null,
    github_url: null,
    featured: "true",
    order_index: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 2,
    title: "Web Application",
    description: "Modern web application built with cutting-edge technologies. Features responsive design and seamless user experience.",
    image: "/placeholder.svg",
    tags: ["Vue.js", "Node.js", "PostgreSQL"],
    live_url: null,
    github_url: null,
    featured: "true",
    order_index: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 3,
    title: "Mobile App",
    description: "Cross-platform mobile application with native performance. Built for iOS and Android with a single codebase.",
    image: "/placeholder.svg",
    tags: ["React Native", "Firebase", "TypeScript"],
    live_url: null,
    github_url: null,
    featured: "true",
    order_index: 2,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

export const dummyExperiences: Experience[] = [
  {
    id: 1,
    role: "Software Developer",
    company: "Tech Company",
    period: "2023 - Present",
    start_date: "2023-01",
    end_date: null,
    description: "Developing and maintaining web applications using modern frameworks and best practices.",
    tags: ["JavaScript", "React", "Node.js"],
    order_index: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 2,
    role: "Junior Developer",
    company: "Startup Inc",
    period: "2021 - 2023",
    start_date: "2021-06",
    end_date: "2023-01",
    description: "Worked on frontend development and collaborated with cross-functional teams to deliver high-quality products.",
    tags: ["HTML", "CSS", "JavaScript"],
    order_index: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

export const dummySkillCategories: SkillCategory[] = [
  {
    id: 1,
    name: "Frontend",
    order_index: 0,
    skills: [
      { id: 1, name: "React", category_id: 1, order_index: 0, created_at: null, updated_at: null },
      { id: 2, name: "TypeScript", category_id: 1, order_index: 1, created_at: null, updated_at: null },
      { id: 3, name: "Next.js", category_id: 1, order_index: 2, created_at: null, updated_at: null },
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 2,
    name: "Backend",
    order_index: 1,
    skills: [
      { id: 4, name: "Node.js", category_id: 2, order_index: 0, created_at: null, updated_at: null },
      { id: 5, name: "Python", category_id: 2, order_index: 1, created_at: null, updated_at: null },
      { id: 6, name: "PostgreSQL", category_id: 2, order_index: 2, created_at: null, updated_at: null },
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

export const dummyAbout: About[] = [
  {
    id: 1,
    section: "intro",
    content: "I'm a passionate developer dedicated to creating innovative solutions and delivering exceptional user experiences.",
    order_index: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 2,
    section: "paragraph1",
    content: "With a strong foundation in software development, I enjoy tackling complex challenges and turning ideas into reality through code.",
    order_index: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

export const dummyStats: Stat[] = [
  { id: 1, number: "5+", label: "Projects", order_index: 0, created_at: null, updated_at: null },
  { id: 2, number: "3+", label: "Years Experience", order_index: 1, created_at: null, updated_at: null },
  { id: 3, number: "10+", label: "Technologies", order_index: 2, created_at: null, updated_at: null },
]

export const dummySocialLinks: SocialLink[] = [
  {
    id: 1,
    platform: "github",
    url: "https://github.com",
    icon_name: "Github",
    order_index: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 2,
    platform: "linkedin",
    url: "https://linkedin.com",
    icon_name: "Linkedin",
    order_index: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

