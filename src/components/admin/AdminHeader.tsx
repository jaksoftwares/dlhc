"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { ShieldAlert, Sun, Moon, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function AdminHeader() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  return (
    <header className="sticky top-0 z-40 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6">
      <div className="flex-1 flex items-center gap-2 text-sm font-medium text-red-600 dark:text-red-400">
        <ShieldAlert className="h-4 w-4" />
        Admin Privileges Active
      </div>

      <div className="ml-auto flex items-center gap-2">
        {mounted && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="h-8 w-8"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            <span className="sr-only">Toggle theme</span>
          </Button>
        )}
        
        <Link href="/login" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors ml-2">
          <LogOut className="h-4 w-4" />
          <span className="hidden sm:inline">Sign Out</span>
        </Link>
      </div>
    </header>
  )
}
