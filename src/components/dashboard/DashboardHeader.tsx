"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, ChevronRight, User, LogOut, Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function DashboardHeader() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  // Basic breadcrumb generation
  const paths = pathname.split('/').filter(Boolean)
  const breadcrumbs = paths.map((path, index) => {
    const href = `/${paths.slice(0, index + 1).join('/')}`
    const label = path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' ')
    return { href, label }
  })

  return (
    <header className="sticky top-0 z-40 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6">
      {/* Mobile Sidebar Toggle */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger render={<Button variant="ghost" size="icon" className="shrink-0" />}>
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <div className="flex h-14 items-center px-6 border-b font-semibold tracking-tight">
              DLHC Workspace
            </div>
            <nav className="p-4 space-y-2">
              {/* Mobile links simplified for MVP header */}
              <Link href="/dashboard" className="block px-3 py-2 text-sm font-medium hover:bg-muted rounded-md">Dashboard Home</Link>
              <Link href="/dashboard/templates" className="block px-3 py-2 text-sm font-medium hover:bg-muted rounded-md">Templates</Link>
              <Link href="/dashboard/designs" className="block px-3 py-2 text-sm font-medium hover:bg-muted rounded-md">My Designs</Link>
              <Link href="/dashboard/company" className="block px-3 py-2 text-sm font-medium hover:bg-muted rounded-md">Company Profile</Link>
              <Link href="/dashboard/downloads" className="block px-3 py-2 text-sm font-medium hover:bg-muted rounded-md">Downloads</Link>
              <Link href="/dashboard/settings" className="block px-3 py-2 text-sm font-medium hover:bg-muted rounded-md">Settings</Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>

      {/* Breadcrumbs */}
      <nav className="hidden md:flex items-center text-sm font-medium text-muted-foreground">
        <Link href="/dashboard" className="hover:text-foreground transition-colors">Workspace</Link>
        {breadcrumbs.length > 1 && breadcrumbs.slice(1).map((crumb) => (
          <div key={crumb.href} className="flex items-center">
            <ChevronRight className="h-4 w-4 mx-1 opacity-50" />
            <span className="text-foreground">{crumb.label}</span>
          </div>
        ))}
      </nav>

      {/* Right Actions */}
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
        
        <div className="h-8 w-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary cursor-pointer">
          <User className="h-4 w-4" />
        </div>
      </div>
    </header>
  )
}
