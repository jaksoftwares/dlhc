import { Header } from "@/components/shared/Header"
import { Footer } from "@/components/shared/Footer"
import { CookieBanner } from "@/components/public/CookieBanner"

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 flex flex-col">
        {children}
      </main>
      <Footer />
      <CookieBanner />
    </div>
  )
}
