"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { AdminLogin } from "@/components/admin-login"
import { useAdmin } from "@/contexts/AdminContext"

export default function AdminPage() {
  const { isAdmin } = useAdmin()
  const router = useRouter()

  useEffect(() => {
    if (isAdmin) {
      router.replace("/")
    }
  }, [isAdmin, router])

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md p-8 rounded-2xl border border-border bg-card shadow-xl space-y-4 text-center">
        <h1 className="text-2xl sm:text-3xl font-bold">Admin Login</h1>
        <p className="text-sm text-muted-foreground">
          Sign in as admin to edit your portfolio content.
        </p>
        <div className="flex justify-center mt-4">
          <AdminLogin />
        </div>
      </div>
    </main>
  )
}


