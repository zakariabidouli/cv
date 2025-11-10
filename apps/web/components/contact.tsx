"use client"

import type React from "react"

import { useState, useMemo } from "react"
import { Mail, MessageSquare, Send, Trash } from "lucide-react"
import { api } from "@/lib/api"
import { useContacts } from "@/lib/hooks"

export function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const isAdmin = useMemo(() => process.env.NEXT_PUBLIC_ADMIN === "true", [])
  const { contacts, refresh: refreshContacts } = useContacts()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      await api.createContact({
        name: formData.name,
        email: formData.email,
        message: formData.message,
      })
      setSubmitted(true)
      setFormData({ name: "", email: "", message: "" })
      await refreshContacts() // Refresh messages list
      setTimeout(() => {
        setSubmitted(false)
      }, 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send message. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Get In Touch</h2>
          <div className="w-12 h-1 bg-gradient-to-r from-accent to-primary mx-auto"></div>
          <p className="text-muted-foreground mt-4 text-lg">Have a project in mind? Let's collaborate!</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="p-6 bg-card border border-border rounded-lg">
            <Mail className="w-8 h-8 text-accent mb-3" />
            <h3 className="font-bold mb-2">Email</h3>
            <a href="mailto:hello@zakaria.dev" className="text-muted-foreground hover:text-accent transition-colors">
              bidouliwork@gmail.com
            </a>
          </div>
          <div className="p-6 bg-card border border-border rounded-lg">
            <MessageSquare className="w-8 h-8 text-accent mb-3" />
            <h3 className="font-bold mb-2">Direct Message</h3>
            <p className="text-muted-foreground">Connect with me on LinkedIn</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-all"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-all"
              required
            />
          </div>
          <textarea
            placeholder="Your Message"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            rows={5}
            className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-all resize-none"
            required
          ></textarea>
          {error && (
            <div className="p-3 bg-destructive/10 border border-destructive rounded-lg text-destructive text-sm">
              {error}
            </div>
          )}
          <button
            type="submit"
            disabled={loading || submitted}
            className="w-full px-6 py-3 bg-accent text-accent-foreground rounded-lg font-medium hover:shadow-lg hover:shadow-accent/50 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitted ? "Message Sent!" : loading ? "Sending..." : "Send Message"}
            {!submitted && !loading && <Send className="w-4 h-4" />}
          </button>
        </form>

        {/* Admin Messages Table */}
        {isAdmin && (
          <div className="mt-16">
            <h3 className="text-2xl font-bold mb-6 text-center">Messages {contacts && `(${contacts.length})`}</h3>
            {contacts && contacts.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse bg-card border border-border rounded-lg">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="px-4 py-3 text-left text-sm font-semibold">Name</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">Email</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">Message</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">Date</th>
                      <th className="px-4 py-3 text-center text-sm font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contacts.map((contact) => (
                      <tr key={contact.id} className="border-b border-border hover:bg-secondary/50 transition-colors">
                        <td className="px-4 py-3 text-sm font-medium">{contact.name}</td>
                        <td className="px-4 py-3 text-sm">
                          <a href={`mailto:${contact.email}`} className="text-accent hover:underline">
                            {contact.email}
                          </a>
                        </td>
                        <td className="px-4 py-3 text-sm text-muted-foreground max-w-md">
                          <div className="truncate" title={contact.message}>
                            {contact.message}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <span
                            className={`px-2 py-1 rounded text-xs ${
                              contact.status === "new"
                                ? "bg-blue-500/20 text-blue-400"
                                : contact.status === "read"
                                ? "bg-green-500/20 text-green-400"
                                : "bg-gray-500/20 text-gray-400"
                            }`}
                          >
                            {contact.status || "new"}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-muted-foreground">
                          {contact.created_at
                            ? new Date(contact.created_at).toLocaleDateString()
                            : "N/A"}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <button
                            onClick={async () => {
                              if (!confirm("Delete this message?")) return
                              try {
                                await api.deleteContact(contact.id)
                                await refreshContacts()
                              } catch (err) {
                                console.error("Failed to delete contact:", err)
                              }
                            }}
                            title="Delete Message"
                            className="p-2 border border-border rounded hover:bg-secondary transition-colors"
                          >
                            <Trash className="w-4 h-4 text-destructive" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center text-muted-foreground py-8 bg-card border border-border rounded-lg">
                No messages yet.
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
