import { PageHeader } from "@/components/dashboard/PageHeader"
import { TemplateCard } from "@/components/public/TemplateCard"
import { Search } from "lucide-react"

export default function TemplatesPage() {
  const templates = [
    { id: "1", name: "Standard Corporate", category: "Corporate", thumbnailUrl: "" },
    { id: "2", name: "Medical Letterhead A", category: "Medical", thumbnailUrl: "" },
    { id: "3", name: "Legal Counsel Header", category: "Legal", thumbnailUrl: "" },
    { id: "4", name: "Minimalist Studio", category: "Minimalist", thumbnailUrl: "" },
    { id: "5", name: "Creative Agency", category: "Creative", thumbnailUrl: "" },
    { id: "6", name: "Tech Startup", category: "Corporate", thumbnailUrl: "" },
  ]

  const categories = ["All", "Corporate", "Medical", "Legal", "Minimalist", "Creative"]

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Template Library" 
        description="Select a template to start designing your organization's letterhead."
      />

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar / Filters */}
        <aside className="w-full md:w-56 shrink-0 space-y-6">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-full rounded-md border border-input bg-background py-2 pl-9 pr-4 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            />
          </div>
          
          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Categories</h3>
            <div className="flex flex-col gap-1">
              {categories.map((cat) => (
                <button 
                  key={cat}
                  className={`text-left text-sm px-3 py-2 rounded-md transition-colors ${cat === 'All' ? 'bg-secondary font-medium text-foreground' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {templates.map((template) => (
              <TemplateCard 
                key={template.id}
                id={template.id}
                name={template.name}
                category={template.category}
                thumbnailUrl={template.thumbnailUrl}
                actionHref={`/dashboard/editor/${template.id}?source=template`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
