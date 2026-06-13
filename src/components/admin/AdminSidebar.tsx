"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ShieldAlert, Users, LayoutTemplate, Tags, CreditCard, Activity, ArrowLeft } from "lucide-react"

const navItems = [
  { href: "/admin", label: "Platform Overview", icon: Activity },
  { href: "/admin/users", label: "User Management", icon: Users },
  { href: "/admin/templates", label: "Master Templates", icon: LayoutTemplate },
  { href: "/admin/categories", label: "Categories", icon: Tags },
  { href: "/admin/plans", label: "Subscription Plans", icon: CreditCard },
  { href: "/admin/logs", label: "System Logs", icon: ShieldAlert },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden md:flex w-64 flex-col bg-slate-900 text-slate-100 min-h-screen sticky top-0 h-screen overflow-y-auto border-r border-slate-800">
      {/* Visual indicator that this is a privileged area */}
      <div className="h-1 w-full bg-gradient-to-r from-red-500 to-purple-600"></div>
      
      <div className="flex h-14 items-center px-6 border-b border-slate-800 font-semibold tracking-tight text-white gap-2">
        <ShieldAlert className="h-5 w-5 text-red-400" />
        Super Admin
      </div>
      
      <div className="flex-1 py-6 px-3 space-y-1">
        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`) && item.href !== '/admin'
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isActive 
                    ? "bg-slate-800 text-white" 
                    : "text-slate-400 hover:bg-slate-800/50 hover:text-white"
                }`}
              >
                <item.icon className={`h-4 w-4 ${isActive ? "text-red-400" : "text-slate-500"}`} />
                {item.label}
              </Link>
            )
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-slate-800">
        <Link 
          href="/dashboard"
          className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Exit Admin Panel
        </Link>
      </div>
    </aside>
  )
}
