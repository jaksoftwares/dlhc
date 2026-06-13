import { PageHeader } from "@/components/dashboard/PageHeader"
import { Button } from "@/components/ui/button"
import { LayoutGrid, List as ListIcon, MoreHorizontal, FileText, Download } from "lucide-react"

export default function MyDesignsPage() {
  const designs = [
    { id: "1", name: "Q3 Board Report", template: "Executive Minimal", status: "Draft", lastEdited: "2 hours ago" },
    { id: "2", name: "Client Proposal - Acme", template: "Corporate Standard", status: "Final", lastEdited: "Yesterday" },
    { id: "3", name: "Internal Memo", template: "Modern Professional", status: "Draft", lastEdited: "3 days ago" },
  ]

  return (
    <div className="space-y-6">
      <PageHeader 
        title="My Designs" 
        description="Manage your saved letterhead drafts and finalized designs."
      />

      {/* Toolbar */}
      <div className="flex items-center justify-between border-b pb-4">
        <div className="text-sm text-muted-foreground">
          Showing {designs.length} designs
        </div>
        <div className="flex items-center gap-2 bg-muted/50 p-1 rounded-md border">
          <Button variant="ghost" size="sm" className="h-7 px-2 bg-background shadow-sm"><LayoutGrid className="h-4 w-4" /></Button>
          <Button variant="ghost" size="sm" className="h-7 px-2 text-muted-foreground"><ListIcon className="h-4 w-4" /></Button>
        </div>
      </div>

      {/* Grid View */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {designs.map((design) => (
          <div key={design.id} className="group relative flex flex-col rounded-xl border bg-card transition-all hover:border-primary/50 hover:shadow-sm">
            <div className="relative aspect-[1/1.2] w-full bg-muted/30 border-b flex items-center justify-center rounded-t-xl overflow-hidden">
              <FileText className="h-12 w-12 text-muted-foreground/30" />
              <div className="absolute top-2 right-2 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                <Button size="icon" variant="secondary" className="h-8 w-8 shadow-sm">
                  <Download className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="secondary" className="h-8 w-8 shadow-sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="flex flex-col p-4">
              <div className="flex items-start justify-between mb-1">
                <h3 className="font-medium text-foreground truncate pr-2">{design.name}</h3>
              </div>
              <p className="text-xs text-muted-foreground mb-3">{design.template}</p>
              <div className="flex items-center justify-between mt-auto">
                <span className={`text-[10px] uppercase font-semibold tracking-wider px-2 py-0.5 rounded-full ${
                  design.status === 'Final' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                }`}>
                  {design.status}
                </span>
                <span className="text-xs text-muted-foreground">{design.lastEdited}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
