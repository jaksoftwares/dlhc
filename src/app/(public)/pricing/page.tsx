import { PricingCard } from "@/components/public/PricingCard"
import { Check } from "lucide-react"

export default function PricingPage() {
  return (
    <div className="flex-1 flex flex-col w-full">
      {/* Header */}
      <section className="w-full py-16 md:py-24 bg-slate-50 dark:bg-slate-900 border-b text-center">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl flex flex-col items-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
            Transparent Pricing for Organizations
          </h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
            Choose the plan that fits your organization's size and compliance requirements.
          </p>
        </div>
      </section>

      {/* Pricing Cards Grid */}
      <section className="w-full py-16">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            <PricingCard 
              name="Starter"
              price="Free"
              description="For individuals and small teams evaluating the platform."
              features={[
                "Up to 3 templates", 
                "Standard PDF export", 
                "1 User",
                "Community support"
              ]}
              ctaText="Start for Free"
              ctaHref="/register"
            />
            <PricingCard 
              name="Professional"
              price="$29"
              description="For growing organizations requiring brand consistency."
              features={[
                "Unlimited templates", 
                "High-res PDF & DOCX export", 
                "Up to 10 users", 
                "Custom fonts upload",
                "Email support"
              ]}
              ctaText="Start 14-Day Trial"
              ctaHref="/register"
              isPopular
            />
            <PricingCard 
              name="Enterprise"
              price="Custom"
              description="For large scale deployments and advanced security."
              features={[
                "Unlimited users", 
                "SSO integration (SAML/OIDC)", 
                "Dedicated account manager", 
                "Custom approval workflows",
                "Audit logs"
              ]}
              ctaText="Contact Sales"
              ctaHref="/contact"
            />
          </div>
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="w-full py-16 bg-slate-50 dark:bg-slate-900 border-t">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <h2 className="text-2xl font-semibold text-center mb-10">Compare Plan Features</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b">
                  <th className="py-4 px-4 font-semibold text-foreground">Feature</th>
                  <th className="py-4 px-4 font-semibold text-center text-foreground w-32">Starter</th>
                  <th className="py-4 px-4 font-semibold text-center text-foreground w-32">Professional</th>
                  <th className="py-4 px-4 font-semibold text-center text-foreground w-32">Enterprise</th>
                </tr>
              </thead>
              <tbody className="divide-y text-muted-foreground">
                <tr>
                  <td className="py-4 px-4 font-medium text-foreground">Templates</td>
                  <td className="py-4 px-4 text-center">3</td>
                  <td className="py-4 px-4 text-center">Unlimited</td>
                  <td className="py-4 px-4 text-center">Unlimited</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-medium text-foreground">Users</td>
                  <td className="py-4 px-4 text-center">1</td>
                  <td className="py-4 px-4 text-center">10</td>
                  <td className="py-4 px-4 text-center">Unlimited</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-medium text-foreground">Exports</td>
                  <td className="py-4 px-4 text-center">PDF Only</td>
                  <td className="py-4 px-4 text-center">PDF & DOCX</td>
                  <td className="py-4 px-4 text-center">PDF & DOCX</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-medium text-foreground">Custom Fonts</td>
                  <td className="py-4 px-4 text-center text-muted-foreground/30">-</td>
                  <td className="py-4 px-4 flex justify-center"><Check className="h-4 w-4 text-primary" /></td>
                  <td className="py-4 px-4 flex justify-center"><Check className="h-4 w-4 text-primary" /></td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-medium text-foreground">Single Sign-On (SSO)</td>
                  <td className="py-4 px-4 text-center text-muted-foreground/30">-</td>
                  <td className="py-4 px-4 text-center text-muted-foreground/30">-</td>
                  <td className="py-4 px-4 flex justify-center"><Check className="h-4 w-4 text-primary" /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="w-full py-16 border-t">
        <div className="container mx-auto px-4 md:px-8 max-w-3xl">
          <h2 className="text-2xl font-semibold text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-medium text-foreground">Can I change my plan later?</h3>
              <p className="mt-2 text-sm text-muted-foreground">Yes, you can upgrade or downgrade your plan at any time from your billing dashboard. Changes take effect at the start of the next billing cycle.</p>
            </div>
            <div>
              <h3 className="font-medium text-foreground">What payment methods do you accept?</h3>
              <p className="mt-2 text-sm text-muted-foreground">We accept all major credit cards. For Enterprise plans, we also support invoicing and ACH transfers.</p>
            </div>
            <div>
              <h3 className="font-medium text-foreground">Is there a discount for annual billing?</h3>
              <p className="mt-2 text-sm text-muted-foreground">Yes, we offer a 20% discount on all plans when billed annually instead of monthly.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
