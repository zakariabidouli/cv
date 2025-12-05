'use client'

import { useEffect, useState, useCallback } from 'react'
import { api, Project, Experience, SkillCategory, About, Stat, SocialLink, Contact, Resume } from './api'
import { dummyProjects, dummyExperiences, dummySkillCategories, dummyAbout, dummyStats, dummySocialLinks } from './dummy-data'

// Custom hook for fetching projects
export function useProjects() {
  const [projects, setProjects] = useState<Project[]>(dummyProjects)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    try {
      setLoading(true)
      const data = await api.getProjects()
      setProjects(data.length > 0 ? data : dummyProjects)
      setError(null)
    } catch (err) {
      console.error('Error fetching projects:', err)
      // Use dummy data on error
      setProjects(dummyProjects)
      setError(null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    async function fetchInitial() {
      try {
        setLoading(true)
        const data = await api.getProjects()
        setProjects(data.length > 0 ? data : dummyProjects)
        setError(null)
      } catch (err) {
        console.error('Error fetching projects:', err)
        // Use dummy data on error
        setProjects(dummyProjects)
        setError(null)
      } finally {
        setLoading(false)
      }
    }

    fetchInitial()
  }, [])

  return { projects, loading, error, refresh, setProjects }
}

// Custom hook for fetching experiences
export function useExperiences() {
  const [experiences, setExperiences] = useState<Experience[]>(dummyExperiences)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    try {
      setLoading(true)
      const data = await api.getExperiences()
      setExperiences(data.length > 0 ? data : dummyExperiences)
      setError(null)
    } catch (err) {
      console.error('Error fetching experiences:', err)
      // Use dummy data on error
      setExperiences(dummyExperiences)
      setError(null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    async function fetchInitial() {
      try {
        setLoading(true)
        const data = await api.getExperiences()
        setExperiences(data.length > 0 ? data : dummyExperiences)
        setError(null)
      } catch (err) {
        console.error('Error fetching experiences:', err)
        // Use dummy data on error
        setExperiences(dummyExperiences)
        setError(null)
      } finally {
        setLoading(false)
      }
    }

    fetchInitial()
  }, [])

  return { experiences, loading, error, refresh, setExperiences }
}

// Custom hook for fetching skills
export function useSkills() {
  const [categories, setCategories] = useState<SkillCategory[]>(dummySkillCategories)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchSkills() {
      try {
        setLoading(true)
        const data = await api.getSkillCategories()
        setCategories(data.length > 0 ? data : dummySkillCategories)
        setError(null)
      } catch (err) {
        console.error('Error fetching skills:', err)
        // Use dummy data on error
        setCategories(dummySkillCategories)
        setError(null)
      } finally {
        setLoading(false)
      }
    }

    fetchSkills()
  }, [])

  const refresh = useCallback(async () => {
    try {
      setLoading(true)
      const data = await api.getSkillCategories()
      setCategories(data.length > 0 ? data : dummySkillCategories)
      setError(null)
    } catch (err) {
      console.error('Error fetching skills:', err)
      // Use dummy data on error
      setCategories(dummySkillCategories)
      setError(null)
    } finally {
      setLoading(false)
    }
  }, [])

  return { categories, loading, error, refresh, setCategories }
}

// Custom hook for fetching about content
export function useAbout() {
  const [about, setAbout] = useState<About[]>(dummyAbout)
  const [stats, setStats] = useState<Stat[]>(dummyStats)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    try {
      setLoading(true)
      const [aboutData, statsData] = await Promise.all([
        api.getAboutContent(),
        api.getStats(),
      ])
      setAbout(aboutData.length > 0 ? aboutData : dummyAbout)
      setStats(statsData.length > 0 ? statsData : dummyStats)
      setError(null)
    } catch (err) {
      console.error('Error fetching about:', err)
      // Use dummy data on error
      setAbout(dummyAbout)
      setStats(dummyStats)
      setError(null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  return { about, stats, loading, error, refresh }
}

// Custom hook for fetching social links
export function useSocialLinks() {
  const [links, setLinks] = useState<SocialLink[]>(dummySocialLinks)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchLinks() {
      try {
        setLoading(true)
        const data = await api.getSocialLinks()
        setLinks(data.length > 0 ? data : dummySocialLinks)
        setError(null)
      } catch (err) {
        console.error('Error fetching social links:', err)
        // Use dummy data on error
        setLinks(dummySocialLinks)
        setError(null)
      } finally {
        setLoading(false)
      }
    }

    fetchLinks()
  }, [])

  return { links, loading, error }
}

// Custom hook for fetching contacts
export function useContacts() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    try {
      setLoading(true)
      const data = await api.getContacts()
      setContacts(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch contacts')
      console.error('Error fetching contacts:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  return { contacts, loading, error, refresh, setContacts }
}

// Custom hook for fetching resume
export function useResume() {
  const [resume, setResume] = useState<Resume | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    try {
      setLoading(true)
      const data = await api.getLatestResume()
      setResume(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch resume')
      console.error('Error fetching resume:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  return { resume, loading, error, refresh, setResume }
}

