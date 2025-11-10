"use client"

import { useSkills } from "@/lib/hooks"
import { api } from "@/lib/api"
import { Plus, Trash } from "lucide-react"
import { useMemo, useState } from "react"

export function Skills() {
  const { categories, loading, error, refresh } = useSkills()
  const isAdmin = useMemo(() => process.env.NEXT_PUBLIC_ADMIN === "true", [])
  const [showCategoryForm, setShowCategoryForm] = useState(false)
  const [newCategory, setNewCategory] = useState("")
  const [newSkill, setNewSkill] = useState<{ [key: number]: string }>({})

  if (loading) {
    return (
      <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Skills & Expertise</h2>
            <div className="w-12 h-1 bg-gradient-to-r from-accent to-primary mx-auto"></div>
          </div>
          <div className="text-center text-muted-foreground">Loading skills...</div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Skills & Expertise</h2>
            <div className="w-12 h-1 bg-gradient-to-r from-accent to-primary mx-auto"></div>
          </div>
          <div className="text-center text-destructive">Error: {error}</div>
        </div>
      </section>
    )
  }

  async function handleCreateCategory(e: React.FormEvent) {
    e.preventDefault()
    if (!newCategory.trim()) return
    try {
      await api.createSkillCategory({ name: newCategory.trim(), order_index: categories?.length || 0 })
      setNewCategory("")
      setShowCategoryForm(false)
      await refresh()
    } catch (err) {
      console.error("Failed to create category:", err)
    }
  }

  if (!categories || categories.length === 0) {
    return (
      <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div className="text-center mx-auto">
              <h2 className="text-4xl font-bold mb-4">Skills & Expertise</h2>
              <div className="w-12 h-1 bg-gradient-to-r from-accent to-primary mx-auto"></div>
            </div>
            {isAdmin && (
              <button
                onClick={() => setShowCategoryForm((v) => !v)}
                title="Add Category"
                className="ml-4 p-2 border border-border rounded hover:bg-secondary transition-colors"
              >
                <Plus className="w-5 h-5 text-accent" />
              </button>
            )}
          </div>
          {isAdmin && showCategoryForm && (
            <form onSubmit={handleCreateCategory} className="mb-10 grid gap-3 p-4 border border-border rounded bg-card max-w-xl mx-auto">
              <input
                placeholder="New category name"
                className="px-3 py-2 bg-input border border-border rounded"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
              />
              <div className="flex gap-2 justify-end">
                <button type="button" onClick={() => setShowCategoryForm(false)} className="px-4 py-2 border border-border rounded hover:bg-secondary">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-accent text-accent-foreground rounded">
                  Create Category
                </button>
              </div>
            </form>
          )}
          <div className="text-center text-muted-foreground">No skills found.</div>
        </div>
      </section>
    )
  }

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div className="text-center mx-auto">
            <h2 className="text-4xl font-bold mb-4">Skills & Expertise</h2>
            <div className="w-12 h-1 bg-gradient-to-r from-accent to-primary mx-auto"></div>
          </div>
          {isAdmin && (
            <button
              onClick={() => setShowCategoryForm((v) => !v)}
              title="Add Category"
              className="ml-4 p-2 border border-border rounded hover:bg-secondary transition-colors"
            >
              <Plus className="w-5 h-5 text-accent" />
            </button>
          )}
        </div>

        {isAdmin && showCategoryForm && (
          <form
            onSubmit={handleCreateCategory}
            className="mb-10 grid gap-3 p-4 border border-border rounded bg-card max-w-xl mx-auto"
          >
            <input
              placeholder="New category name"
              className="px-3 py-2 bg-input border border-border rounded"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />
            <div className="flex gap-2 justify-end">
              <button type="button" onClick={() => setShowCategoryForm(false)} className="px-4 py-2 border border-border rounded hover:bg-secondary">
                Cancel
              </button>
              <button type="submit" className="px-4 py-2 bg-accent text-accent-foreground rounded">
                Create Category
              </button>
            </div>
          </form>
        )}

        <div className="grid md:grid-cols-2 gap-8">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="p-6 bg-card border border-border rounded-lg hover:border-accent transition-colors duration-200"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-foreground">{cat.name}</h3>
                {isAdmin && (
                  <button
                    onClick={async () => {
                      if (!confirm("Delete this category and all its skills?")) return
                      try {
                        await api.deleteSkillCategory(cat.id)
                        await refresh()
                      } catch (err) {
                        console.error("Failed to delete category:", err)
                      }
                    }}
                    title="Delete Category"
                    className="p-2 border border-border rounded hover:bg-secondary transition-colors"
                  >
                    <Trash className="w-4 h-4 text-destructive" />
                  </button>
                )}
              </div>
              {cat.skills && cat.skills.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill.id}
                      className="px-4 py-2 bg-secondary text-accent rounded-lg text-sm border border-accent/20 hover:bg-secondary/80 transition-colors duration-200"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              )}

              {isAdmin && (
                <form
                  onSubmit={async (e) => {
                    e.preventDefault()
                    const name = (newSkill[cat.id] || "").trim()
                    if (!name) return
                    try {
                      await api.createSkill({ name, category_id: cat.id, order_index: (cat.skills?.length || 0) })
                      setNewSkill({ ...newSkill, [cat.id]: "" })
                      await refresh()
                    } catch (err) {
                      console.error("Failed to add skill:", err)
                    }
                  }}
                  className="mt-4 flex gap-2"
                >
                  <input
                    placeholder="Add skill"
                    className="flex-1 px-3 py-2 bg-input border border-border rounded"
                    value={newSkill[cat.id] || ""}
                    onChange={(e) => setNewSkill({ ...newSkill, [cat.id]: e.target.value })}
                  />
                  <button type="submit" className="px-3 py-2 bg-accent text-accent-foreground rounded">
                    Add
                  </button>
                </form>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
