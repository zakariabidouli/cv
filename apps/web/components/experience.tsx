"use client"

import { useExperiences } from "@/lib/hooks"
import { api } from "@/lib/api"
import { Plus, Trash } from "lucide-react"
import { useMemo, useState } from "react"

export function Experience() {
  const { experiences, loading, error, refresh } = useExperiences()
  const isAdmin = useMemo(() => process.env.NEXT_PUBLIC_ADMIN === "true", [])
  const [showForm, setShowForm] = useState(false)
  const [creating, setCreating] = useState(false)
  const [form, setForm] = useState({
    role: "",
    company: "",
    period: "",
    start_date: "",
    end_date: "",
    description: "",
    tags: "",
  })

  if (loading) {
    return (
      <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Experience</h2>
            <div className="w-12 h-1 bg-gradient-to-r from-accent to-primary mx-auto"></div>
          </div>
          <div className="text-center text-muted-foreground">Loading experience...</div>
        </div>
      </section>
    )
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    try {
      setCreating(true)
      await api.createExperience({
        role: form.role,
        company: form.company,
        period: form.period,
        start_date: form.start_date || undefined,
        end_date: form.end_date || undefined,
        description: form.description,
        tags: form.tags ? form.tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
        order_index: experiences?.length || 0,
      })
      setShowForm(false)
      setForm({ role: "", company: "", period: "", start_date: "", end_date: "", description: "", tags: "" })
      await refresh()
    } catch (err) {
      console.error("Failed to create experience:", err)
    } finally {
      setCreating(false)
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this experience?")) return
    try {
      await api.deleteExperience(id)
      await refresh()
    } catch (err) {
      console.error("Failed to delete experience:", err)
    }
  }

  if (error) {
    return (
      <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Experience</h2>
            <div className="w-12 h-1 bg-gradient-to-r from-accent to-primary mx-auto"></div>
          </div>
          <div className="text-center text-destructive">Error: {error}</div>
        </div>
      </section>
    )
  }

  if (!experiences || experiences.length === 0) {
    return (
      <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div className="text-center mx-auto">
              <h2 className="text-4xl font-bold mb-4">Experience</h2>
              <div className="w-12 h-1 bg-gradient-to-r from-accent to-primary mx-auto"></div>
            </div>
            {isAdmin && (
              <button
                onClick={() => setShowForm((v) => !v)}
                title="Add Experience"
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
                  placeholder="Role"
                  className="px-3 py-2 bg-input border border-border rounded"
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                />
                <input
                  required
                  placeholder="Company"
                  className="px-3 py-2 bg-input border border-border rounded"
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                />
              </div>
              <div className="grid md:grid-cols-3 gap-3">
                <input
                  required
                  placeholder="Period (e.g., 2023 - Present)"
                  className="px-3 py-2 bg-input border border-border rounded"
                  value={form.period}
                  onChange={(e) => setForm({ ...form, period: e.target.value })}
                />
                <input
                  placeholder="Start Date (YYYY-MM)"
                  className="px-3 py-2 bg-input border border-border rounded"
                  value={form.start_date}
                  onChange={(e) => setForm({ ...form, start_date: e.target.value })}
                />
                <input
                  placeholder="End Date (YYYY-MM)"
                  className="px-3 py-2 bg-input border border-border rounded"
                  value={form.end_date}
                  onChange={(e) => setForm({ ...form, end_date: e.target.value })}
                />
              </div>
              <textarea
                required
                placeholder="Description"
                className="px-3 py-2 bg-input border border-border rounded"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
              <input
                placeholder="Tags (comma-separated)"
                className="px-3 py-2 bg-input border border-border rounded"
                value={form.tags}
                onChange={(e) => setForm({ ...form, tags: e.target.value })}
              />
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
                  {creating ? "Creating..." : "Create Experience"}
                </button>
              </div>
            </form>
          )}
          <div className="text-center text-muted-foreground">No experience entries found.</div>
        </div>
      </section>
    )
  }

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div className="text-center mx-auto">
            <h2 className="text-4xl font-bold mb-4">Experience</h2>
            <div className="w-12 h-1 bg-gradient-to-r from-accent to-primary mx-auto"></div>
          </div>
          {isAdmin && (
            <button
              onClick={() => setShowForm((v) => !v)}
              title="Add Experience"
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
                placeholder="Role"
                className="px-3 py-2 bg-input border border-border rounded"
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
              />
              <input
                required
                placeholder="Company"
                className="px-3 py-2 bg-input border border-border rounded"
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
              />
            </div>
            <div className="grid md:grid-cols-3 gap-3">
              <input
                required
                placeholder="Period (e.g., 2023 - Present)"
                className="px-3 py-2 bg-input border border-border rounded"
                value={form.period}
                onChange={(e) => setForm({ ...form, period: e.target.value })}
              />
              <input
                placeholder="Start Date (YYYY-MM)"
                className="px-3 py-2 bg-input border border-border rounded"
                value={form.start_date}
                onChange={(e) => setForm({ ...form, start_date: e.target.value })}
              />
              <input
                placeholder="End Date (YYYY-MM)"
                className="px-3 py-2 bg-input border border-border rounded"
                value={form.end_date}
                onChange={(e) => setForm({ ...form, end_date: e.target.value })}
              />
            </div>
            <textarea
              required
              placeholder="Description"
              className="px-3 py-2 bg-input border border-border rounded"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
            <input
              placeholder="Tags (comma-separated)"
              className="px-3 py-2 bg-input border border-border rounded"
              value={form.tags}
              onChange={(e) => setForm({ ...form, tags: e.target.value })}
            />
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
                {creating ? "Creating..." : "Create Experience"}
              </button>
            </div>
          </form>
        )}

        <div className="space-y-8">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="p-8 bg-card border border-border rounded-lg hover:border-accent transition-all duration-300 hover:shadow-lg hover:shadow-accent/10"
            >
              {isAdmin && (
                <div className="flex justify-end mb-2">
                  <button
                    onClick={() => handleDelete(exp.id)}
                    title="Delete Experience"
                    className="p-2 border border-border rounded hover:bg-secondary transition-colors"
                  >
                    <Trash className="w-4 h-4 text-destructive" />
                  </button>
                </div>
              )}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                <div>
                  <h3 className="text-xl font-bold text-foreground">{exp.role}</h3>
                  <p className="text-accent font-medium">{exp.company}</p>
                </div>
                <span className="text-muted-foreground mt-2 md:mt-0">{exp.period}</span>
              </div>
              <p className="text-muted-foreground mb-4 leading-relaxed">{exp.description}</p>
              {exp.tags && exp.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {exp.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-secondary text-accent text-sm rounded-full border border-accent/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
