import Link from "next/link"
import { PageHeader } from "@/components/dashboard/PageHeader"
import { DataCard } from "@/components/dashboard/DataCard"
import { Button, buttonVariants } from "@/components/ui/button"
import { Plus, LayoutTemplate, Building2, FileText, Download } from "lucide-react"

export default function DashboardHome() {
  // Mock data for MVP
  const recentDesigns = [
    { id: "1", name: "Q3 Board Report", template: "Executive Minimal", lastEdited: "2 hours ago" },
    { id: "2", name: "Client Proposal - Acme", template: "Corporate Standard", lastEdited: "Yesterday" },
    { id: "3", name: "Internal Memo", template: "Modern Professional", lastEdited: "3 days ago" },
  ]

  return (
    <div className="space-y-8">
      <PageHeader 
        title="Workspace Overview" 
        description="Manage your organization's letterheads and templates."
        action={
          <Link href="/dashboard/templates" className={buttonVariants()}>
            <Plus className="mr-2 h-4 w-4" />
            New Letterhead
          </Link>
        }
      />

      {/* Quick Actions & Activity Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Quick Actions (Combined into one card or prominent buttons) */}
        <DataCard className="col-span-1 md:col-span-2 bg-primary/5 border-primary/10">
          <h3 className="font-semibold mb-4 text-foreground">Quick Actions</h3>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/dashboard/templates" className={buttonVariants({ variant: "default", className: "flex-1" })}>
              <LayoutTemplate className="mr-2 h-4 w-4" />
              Browse Templates
            </Link>
            <Link href="/dashboard/company" className={buttonVariants({ variant: "outline", className: "flex-1 bg-background" })}>
              <Building2 className="mr-2 h-4 w-4" />
              Company Profile
            </Link>
          </div>
        </DataCard>

        {/* Metrics */}
        <DataCard className="flex flex-col justify-center">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <FileText className="h-4 w-4" />
            <span className="text-sm font-medium">Total Designs</span>
          </div>
          <div className="text-3xl font-bold text-foreground">12</div>
        </DataCard>

        <DataCard className="flex flex-col justify-center">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <Download className="h-4 w-4" />
            <span className="text-sm font-medium">Exports (This Month)</span>
          </div>
          <div className="text-3xl font-bold text-foreground">48</div>
        </DataCard>
      </div>

      {/* Recent Designs */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Recent Designs</h2>
          <Link href="/dashboard/designs" className={buttonVariants({ variant: "link", className: "text-muted-foreground hover:text-foreground" })}>View all</Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentDesigns.map((design) => (
            <DataCard key={design.id} className="group hover:border-primary/50 transition-colors cursor-pointer flex flex-col">
              <div className="aspect-[1/1.2] w-full bg-muted/30 border-b flex items-center justify-center mb-4 rounded-t-lg -mt-6 -mx-6 w-[calc(100%+3rem)]">
                {/* Thumbnail placeholder */}
                <FileText className="h-10 w-10 text-muted-foreground/30" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-foreground truncate">{design.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">{design.template}</p>
                <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                  <span>Edited {design.lastEdited}</span>
                  <Link href={`/dashboard/editor/${design.id}`} className="font-medium text-primary hover:underline">
                    Edit
                  </Link>
                </div>
              </div>
            </DataCard>
          ))}
        </div>
      </div>
    </div>
  )
}
