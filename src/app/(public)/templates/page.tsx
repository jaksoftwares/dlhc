import { TemplateCard } from "@/components/public/TemplateCard"
import { Search } from "lucide-react"

export default function TemplatesGallery() {
  // Mock data for the static page implementation
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
    <div className="flex-1 flex flex-col w-full">
      {/* Header */}
      <section className="w-full py-12 md:py-16 bg-slate-50 dark:bg-slate-900 border-b">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Template Library</h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400 max-w-2xl">
            Browse our collection of professional letterhead templates. Customize any template with your organization's branding.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="w-full py-8">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl flex flex-col md:flex-row gap-8">
          
          {/* Sidebar / Filters */}
          <aside className="w-full md:w-64 shrink-0">
            <div className="sticky top-24">
              <div className="relative mb-6">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <input 
                  type="text" 
                  placeholder="Search templates..." 
                  className="w-full rounded-md border border-input bg-background py-2 pl-9 pr-4 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                />
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="mb-3 text-sm font-medium">Categories</h3>
                  <div className="flex flex-col gap-2">
                    {categories.map((cat) => (
                      <button 
                        key={cat}
                        className={`text-left text-sm px-2 py-1.5 rounded-md transition-colors ${cat === 'All' ? 'bg-secondary font-medium text-foreground' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Grid */}
          <div className="flex-1">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Showing {templates.length} templates</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {templates.map((template) => (
                <TemplateCard 
                  key={template.id}
                  id={template.id}
                  name={template.name}
                  category={template.category}
                  thumbnailUrl={template.thumbnailUrl}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
