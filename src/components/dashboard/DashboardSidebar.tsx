"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Building2, LayoutTemplate, FileText, Download, Settings } from "lucide-react"

const navItems = [
  {
    title: "Overview",
    items: [
      { href: "/dashboard", label: "Dashboard Home", icon: LayoutDashboard },
    ]
  },
  {
    title: "Workspace",
    items: [
      { href: "/dashboard/templates", label: "Templates", icon: LayoutTemplate },
      { href: "/dashboard/designs", label: "My Designs", icon: FileText },
    ]
  },
  {
    title: "Configuration",
    items: [
      { href: "/dashboard/company", label: "Company Profile", icon: Building2 },
    ]
  },
  {
    title: "History",
    items: [
      { href: "/dashboard/downloads", label: "Downloads", icon: Download },
    ]
  },
  {
    title: "Account",
    items: [
      { href: "/dashboard/settings", label: "Settings", icon: Settings },
    ]
  }
]

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden md:flex w-64 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground min-h-screen sticky top-0 h-screen overflow-y-auto">
      <div className="flex h-14 items-center px-6 border-b border-sidebar-border font-semibold tracking-tight">
        DLHC Workspace
      </div>
      <div className="flex-1 py-4 px-3 space-y-6">
        {navItems.map((section) => (
          <div key={section.title}>
            <h4 className="mb-2 px-3 text-xs font-medium uppercase tracking-wider text-muted-foreground/70">
              {section.title}
            </h4>
            <nav className="space-y-1">
              {section.items.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`) && item.href !== '/dashboard'
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                      isActive 
                        ? "bg-sidebar-accent text-sidebar-accent-foreground" 
                        : "text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                    }`}
                  >
                    <item.icon className={`h-4 w-4 ${isActive ? "text-sidebar-primary" : "text-muted-foreground"}`} />
                    {item.label}
                  </Link>
                )
              })}
            </nav>
          </div>
        ))}
      </div>
    </aside>
  )
}
