import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"

export default function LandingPage() {
  return (
    <div className="flex-1 flex flex-col">
      {/* Hero Section Placeholder */}
      <section className="w-full py-24 lg:py-32 bg-slate-50 dark:bg-slate-900 border-b">
        <div className="container mx-auto px-4 md:px-8 text-center flex flex-col items-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 dark:text-white max-w-4xl">
            Create Professional Letterheads in <span className="text-primary">Minutes</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl">
            The ultimate tool for organizations to design, manage, and export pristine corporate letterheads. Ensure brand consistency across your entire team.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link href="/register" className={buttonVariants({ size: "lg", className: "text-base" })}>
              Start for Free
            </Link>
            <Link href="#templates" className={buttonVariants({ variant: "outline", size: "lg", className: "text-base" })}>
              View Templates
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Section Placeholder */}
      <section id="features" className="w-full py-20 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Why Choose DLHC?</h2>
            <p className="mt-4 text-slate-600 dark:text-slate-400">Everything you need to manage corporate identity.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature Cards would go here */}
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-4">
                ✨
              </div>
              <h3 className="text-xl font-semibold mb-2">Drag & Drop Editor</h3>
              <p className="text-slate-600 dark:text-slate-400">Build pixel-perfect letterheads without any design experience.</p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-4">
                🏢
              </div>
              <h3 className="text-xl font-semibold mb-2">Team Management</h3>
              <p className="text-slate-600 dark:text-slate-400">Invite your team and share access to approved corporate templates.</p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-4">
                📄
              </div>
              <h3 className="text-xl font-semibold mb-2">PDF & DOCX Export</h3>
              <p className="text-slate-600 dark:text-slate-400">Export your completed designs to high-quality print-ready formats.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
