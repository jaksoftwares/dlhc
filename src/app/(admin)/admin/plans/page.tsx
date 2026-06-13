"use client"

import { PageHeader } from "@/components/dashboard/PageHeader"
import { Button } from "@/components/ui/button"
import { CheckCircle2, XCircle, Edit } from "lucide-react"

export default function AdminPlansPage() {
  const plans = [
    { 
      id: "free", 
      name: "Free Tier", 
      price: "$0", 
      billing: "Forever",
      limits: {
        templates: 3,
        designs: 5,
        downloads: 10,
        docx: false,
        team: false
      }
    },
    { 
      id: "pro", 
      name: "Professional", 
      price: "$29", 
      billing: "per month",
      limits: {
        templates: "Unlimited",
        designs: "Unlimited",
        downloads: "Unlimited",
        docx: true,
        team: false
      }
    },
    { 
      id: "enterprise", 
      name: "Enterprise", 
      price: "$99", 
      billing: "per month",
      limits: {
        templates: "Unlimited + Custom",
        designs: "Unlimited",
        downloads: "Unlimited",
        docx: true,
        team: true
      }
    }
  ]

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Subscription Plans" 
        description="Configure pricing and feature limits for system tiers."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div key={plan.id} className="flex flex-col rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden">
            <div className="p-6 border-b bg-muted/10">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold">{plan.name}</h3>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold">{plan.price}</span>
                    <span className="text-sm text-muted-foreground">/{plan.billing}</span>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="h-8">
                  <Edit className="mr-2 h-3.5 w-3.5" />
                  Edit Plan
                </Button>
              </div>
            </div>
            <div className="p-6 flex-1 bg-background">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">Plan Limits & Features</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Max Templates</span>
                  <span className="font-medium">{plan.limits.templates}</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Saved Designs</span>
                  <span className="font-medium">{plan.limits.designs}</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Downloads / mo</span>
                  <span className="font-medium">{plan.limits.downloads}</span>
                </li>
                <li className="flex items-center justify-between border-t pt-3 mt-3">
                  <span className="text-muted-foreground">DOCX Export</span>
                  {plan.limits.docx ? <CheckCircle2 className="h-4 w-4 text-green-500" /> : <XCircle className="h-4 w-4 text-muted-foreground/50" />}
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Team Collaboration</span>
                  {plan.limits.team ? <CheckCircle2 className="h-4 w-4 text-green-500" /> : <XCircle className="h-4 w-4 text-muted-foreground/50" />}
                </li>
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
