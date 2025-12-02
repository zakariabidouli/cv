"use client"

import { ThemeProvider } from "./theme-provider"
import { AdminProvider } from "@/contexts/AdminContext"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AdminProvider>
        {children}
      </AdminProvider>
    </ThemeProvider>
  )
}

