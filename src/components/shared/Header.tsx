"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { useTheme } from "next-themes"
import { Menu, X } from "lucide-react"

import { Button, buttonVariants } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

export function Header() {
  const { theme, systemTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  // Avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true)
  }, [])

  const currentTheme = theme === "system" ? systemTheme : theme
  const logoSrc = 
    mounted && currentTheme === "dark" 
      ? "/logos/logo-full-white.svg" 
      : "/logos/logo-full-primary.svg"

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Features", href: "#features" },
    { name: "Templates", href: "#templates" },
    { name: "Pricing", href: "#pricing" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <div className="relative h-12 w-40">
            <Image 
              src={logoSrc}
              alt="DLHC Logo" 
              fill
              className="object-contain object-left"
              priority
            />
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/login" className={buttonVariants({ variant: "ghost" })}>
            Sign In
          </Link>
          <Link href="/register" className={buttonVariants({ className: "bg-primary text-primary-foreground hover:bg-primary/90" })}>
            Get Started
          </Link>
        </div>

        {/* Mobile Nav */}
        <Sheet>
          <SheetTrigger render={<Button variant="ghost" size="icon" className="md:hidden" />}>
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle Menu</span>
          </SheetTrigger>
          <SheetContent side="right" className="flex flex-col gap-6 pt-10">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href}
                  className="text-lg font-medium text-foreground transition-colors hover:text-primary"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
            <div className="flex flex-col gap-4 mt-auto">
              <Link href="/login" className={buttonVariants({ variant: "outline", className: "w-full" })}>
                Sign In
              </Link>
              <Link href="/register" className={buttonVariants({ className: "w-full bg-primary text-primary-foreground hover:bg-primary/90" })}>
                Get Started
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
