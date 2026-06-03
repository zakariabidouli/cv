import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Projects } from "@/components/projects"
import { Experience } from "@/components/experience"
import { Skills } from "@/components/skills"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { BackgroundDecor } from "@/components/background-decor"
import { getProjects, getExperiences, getAbout, getSkills, getSocialData } from "@/lib/content"

export default function Home() {
  const projects = getProjects()
  const experiences = getExperiences()
  const { paragraphs, stats } = getAbout()
  const skillCategories = getSkills()
  const { links: socialLinks, resume_url } = getSocialData()

  return (
    <main id="main-content" className="min-h-screen bg-background text-foreground relative">
      <BackgroundDecor />
      <Navigation />
      <Hero resumeUrl={resume_url} socialLinks={socialLinks} />
      <About paragraphs={paragraphs} stats={stats} />
      <Experience experiences={experiences} />
      <Projects projects={projects} />
      <Skills categories={skillCategories} />
      <Contact />
      <Footer />
    </main>
  )
}
