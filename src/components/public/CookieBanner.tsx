"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"

export function CookieBanner() {
  const [isVisible, setIsVisible] = React.useState(false)

  React.useEffect(() => {
    // Check if the user has already accepted cookies
    const cookieConsent = localStorage.getItem("cookieConsent")
    if (!cookieConsent) {
      setIsVisible(true)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "true")
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background p-4 md:p-6 shadow-lg">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="text-sm text-muted-foreground text-center md:text-left">
          We use cookies to improve your experience, analyze site traffic, and support our operations. 
          By continuing to use our site, you agree to our <a href="/privacy-policy" className="underline hover:text-foreground">Privacy Policy</a>.
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setIsVisible(false)}>
            Manage Preferences
          </Button>
          <Button size="sm" onClick={handleAccept}>
            Accept
          </Button>
        </div>
      </div>
    </div>
  )
}
