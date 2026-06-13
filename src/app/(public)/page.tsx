import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { LayoutTemplate, Users, FileDown } from "lucide-react"
import { PricingCard } from "@/components/public/PricingCard"

export default function LandingPage() {
  return (
    <div className="flex-1 flex flex-col">
      {/* Hero Section */}
      <section className="w-full py-16 md:py-24 bg-slate-50 dark:bg-slate-900 border-b">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl text-center flex flex-col items-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white max-w-3xl">
            Standardize Company Letterheads
          </h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
            Create, manage, and export approved corporate letterheads across your organization. Maintain brand consistency from a centralized workspace.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link href="/register" className={buttonVariants({ size: "lg", className: "text-base" })}>
              Get Started
            </Link>
            <Link href="/templates" className={buttonVariants({ variant: "outline", size: "lg", className: "text-base" })}>
              Browse Templates
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="w-full py-16 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Core Capabilities</h2>
            <p className="mt-2 text-slate-600 dark:text-slate-400">Everything required to manage corporate identity.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-xl border bg-card">
              <div className="w-10 h-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-4">
                <LayoutTemplate className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-medium mb-2 text-foreground">Drag & Drop Editor</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Build compliant letterheads using an intuitive canvas. Enforce margins, fonts, and logo placements.
              </p>
            </div>
            <div className="p-6 rounded-xl border bg-card">
              <div className="w-10 h-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-4">
                <Users className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-medium mb-2 text-foreground">Role-Based Team Management</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Assign Admin, Editor, and Viewer roles. Ensure only approved personnel can modify official templates.
              </p>
            </div>
            <div className="p-6 rounded-xl border bg-card">
              <div className="w-10 h-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-4">
                <FileDown className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-medium mb-2 text-foreground">PDF & DOCX Export</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Export completed designs to high-quality, print-ready formats suitable for official correspondence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Preview Section */}
      <section id="pricing" className="w-full py-16 bg-slate-50 dark:bg-slate-900 border-t">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <div className="mb-12 text-center flex flex-col items-center">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Transparent Pricing</h2>
            <p className="mt-2 text-slate-600 dark:text-slate-400">Plans designed for organizations of all sizes.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <PricingCard 
              name="Starter"
              price="Free"
              description="For individuals and small teams."
              features={["Up to 3 templates", "Basic PDF export", "1 user"]}
              ctaText="Start Free"
              ctaHref="/register"
            />
            <PricingCard 
              name="Professional"
              price="$29"
              description="For growing organizations."
              features={["Unlimited templates", "High-res PDF & DOCX export", "Up to 10 users", "Custom fonts"]}
              ctaText="Start Trial"
              ctaHref="/register"
              isPopular
            />
            <PricingCard 
              name="Enterprise"
              price="Custom"
              description="For large scale deployments."
              features={["Unlimited users", "SSO integration", "Dedicated support", "Custom workflows"]}
              ctaText="Contact Sales"
              ctaHref="/contact"
            />
          </div>
          <div className="mt-8 text-center">
            <Link href="/pricing" className="text-sm font-medium text-primary hover:underline">
              View full pricing details &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="w-full py-16 bg-white dark:bg-slate-950 border-t">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
            Ready to standardize your communications?
          </h2>
          <div className="mt-6">
            <Link href="/register" className={buttonVariants({ size: "lg" })}>
              Create Your Workspace
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
