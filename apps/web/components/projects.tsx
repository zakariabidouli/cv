"use client"

import { ExternalLink, Github, Plus, Trash } from "lucide-react"
import { useProjects } from "@/lib/hooks"
import { api } from "@/lib/api"
import { useMemo, useState } from "react"

export function Projects() {
  const { projects, loading, error, refresh } = useProjects()
  const isAdmin = useMemo(() => process.env.NEXT_PUBLIC_ADMIN === "true", [])
  const [showForm, setShowForm] = useState(false)
  const [creating, setCreating] = useState(false)
  const [form, setForm] = useState({
    title: "",
    description: "",
    image: "",
    live_url: "",
    github_url: "",
    tags: "",
  })

  if (loading) {
    return (
      <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Featured Projects</h2>
            <div className="w-12 h-1 bg-gradient-to-r from-accent to-primary mx-auto"></div>
          </div>
          <div className="text-center text-muted-foreground">Loading projects...</div>
        </div>
      </section>
    )
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    try {
      setCreating(true)
      await api.createProject({
        title: form.title,
        description: form.description,
        image: form.image || undefined,
        live_url: form.live_url || undefined,
        github_url: form.github_url || undefined,
        tags: form.tags ? form.tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
        featured: "true",
        order_index: projects.length,
      })
      setShowForm(false)
      setForm({ title: "", description: "", image: "", live_url: "", github_url: "", tags: "" })
      await refresh()
    } catch (err) {
      console.error("Failed to create project:", err)
    } finally {
      setCreating(false)
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this project?")) return
    try {
      await api.deleteProject(id)
      await refresh()
    } catch (err) {
      console.error("Failed to delete project:", err)
    }
  }

  if (error) {
    return (
      <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Featured Projects</h2>
            <div className="w-12 h-1 bg-gradient-to-r from-accent to-primary mx-auto"></div>
          </div>
          <div className="text-center text-destructive">Error: {error}</div>
        </div>
      </section>
    )
  }

  if (!projects || projects.length === 0) {
    return (
      <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div className="text-center mx-auto">
              <h2 className="text-4xl font-bold mb-4">Featured Projects</h2>
              <div className="w-12 h-1 bg-gradient-to-r from-accent to-primary mx-auto"></div>
            </div>
            {isAdmin && (
              <button
                onClick={() => setShowForm((v) => !v)}
                title="Add Project"
                className="ml-4 p-2 border border-border rounded hover:bg-secondary transition-colors"
              >
                <Plus className="w-5 h-5 text-accent" />
              </button>
            )}
          </div>
          {isAdmin && showForm && (
            <form onSubmit={handleCreate} className="mb-10 grid gap-3 p-4 border border-border rounded bg-card">
              <div className="grid md:grid-cols-2 gap-3">
                <input
                  required
                  placeholder="Title"
                  className="px-3 py-2 bg-input border border-border rounded"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
                <input
                  placeholder="Image URL"
                  className="px-3 py-2 bg-input border border-border rounded"
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                />
              </div>
              <textarea
                required
                placeholder="Description"
                className="px-3 py-2 bg-input border border-border rounded"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
              <div className="grid md:grid-cols-3 gap-3">
                <input
                  placeholder="Live URL"
                  className="px-3 py-2 bg-input border border-border rounded"
                  value={form.live_url}
                  onChange={(e) => setForm({ ...form, live_url: e.target.value })}
                />
                <input
                  placeholder="GitHub URL"
                  className="px-3 py-2 bg-input border border-border rounded"
                  value={form.github_url}
                  onChange={(e) => setForm({ ...form, github_url: e.target.value })}
                />
                <input
                  placeholder="Tags (comma-separated)"
                  className="px-3 py-2 bg-input border border-border rounded"
                  value={form.tags}
                  onChange={(e) => setForm({ ...form, tags: e.target.value })}
                />
              </div>
              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 border border-border rounded hover:bg-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={creating}
                  className="px-4 py-2 bg-accent text-accent-foreground rounded disabled:opacity-50"
                >
                  {creating ? "Creating..." : "Create Project"}
                </button>
              </div>
            </form>
          )}
          <div className="text-center text-muted-foreground">No projects found.</div>
        </div>
      </section>
    )
  }

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div className="text-center mx-auto">
            <h2 className="text-4xl font-bold mb-4">Featured Projects</h2>
            <div className="w-12 h-1 bg-gradient-to-r from-accent to-primary mx-auto"></div>
          </div>
          {isAdmin && (
            <button
              onClick={() => setShowForm((v) => !v)}
              title="Add Project"
              className="ml-4 p-2 border border-border rounded hover:bg-secondary transition-colors"
            >
              <Plus className="w-5 h-5 text-accent" />
            </button>
          )}
        </div>

        {isAdmin && showForm && (
          <form onSubmit={handleCreate} className="mb-10 grid gap-3 p-4 border border-border rounded bg-card">
            <div className="grid md:grid-cols-2 gap-3">
              <input
                required
                placeholder="Title"
                className="px-3 py-2 bg-input border border-border rounded"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
              <input
                placeholder="Image URL"
                className="px-3 py-2 bg-input border border-border rounded"
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
              />
            </div>
            <textarea
              required
              placeholder="Description"
              className="px-3 py-2 bg-input border border-border rounded"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
            <div className="grid md:grid-cols-3 gap-3">
              <input
                placeholder="Live URL"
                className="px-3 py-2 bg-input border border-border rounded"
                value={form.live_url}
                onChange={(e) => setForm({ ...form, live_url: e.target.value })}
              />
              <input
                placeholder="GitHub URL"
                className="px-3 py-2 bg-input border border-border rounded"
                value={form.github_url}
                onChange={(e) => setForm({ ...form, github_url: e.target.value })}
              />
              <input
                placeholder="Tags (comma-separated)"
                className="px-3 py-2 bg-input border border-border rounded"
                value={form.tags}
                onChange={(e) => setForm({ ...form, tags: e.target.value })}
              />
            </div>
            <div className="flex gap-2 justify-end">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 border border-border rounded hover:bg-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={creating}
                className="px-4 py-2 bg-accent text-accent-foreground rounded disabled:opacity-50"
              >
                {creating ? "Creating..." : "Create Project"}
              </button>
            </div>
          </form>
        )}

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group bg-card border border-border rounded-lg overflow-hidden hover:border-accent transition-all duration-300 hover:shadow-lg hover:shadow-accent/10"
            >
              {isAdmin && (
                <div className="flex justify-end p-2">
                  <button
                    onClick={() => handleDelete(project.id)}
                    title="Delete Project"
                    className="p-2 border border-border rounded hover:bg-secondary transition-colors"
                  >
                    <Trash className="w-4 h-4 text-destructive" />
                  </button>
                </div>
              )}
              {project.image && (
                <div className="relative h-48 overflow-hidden bg-secondary">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}

              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-2">{project.title}</h3>
                <p className="text-muted-foreground mb-4 leading-relaxed text-sm">{project.description}</p>

                {project.tags && project.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-secondary text-accent text-xs rounded-full border border-accent/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex gap-3">
                  {project.live_url && (
                    <a
                      href={project.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 px-4 py-2 bg-accent text-accent-foreground rounded font-medium hover:shadow-lg hover:shadow-accent/50 transition-all duration-200 flex items-center justify-center gap-2 text-sm"
                    >
                      <ExternalLink className="w-4 h-4" />
                      View Live
                    </a>
                  )}
                  {project.github_url && (
                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 px-4 py-2 border border-border text-foreground rounded font-medium hover:bg-secondary transition-colors duration-200 flex items-center justify-center gap-2 text-sm"
                    >
                      <Github className="w-4 h-4" />
                      Code
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
