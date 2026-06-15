"use client"
import { PageHeader } from "@/components/dashboard/PageHeader"
import { Search } from "lucide-react"
import { masterTemplates } from "@/lib/data/templates"
import { useEditorStore } from "@/store/editorStore"
import { useRouter } from "next/navigation"
import { PureLetterheadRenderer } from "@/components/editor/LetterheadRenderer"

export default function TemplatesPage() {
  const { setTemplate, companyProfile } = useEditorStore()
  const router = useRouter()

  const categories = ["All Templates", "Corporate", "Legal", "Technology", "Consulting", "Engineering"]

  const handleUseTemplate = (templateId: string) => {
    setTemplate(templateId)
    // In a real app we'd create a draft ID in the DB, then route to it.
    // For MVP, we route to a generic 'new' editor page that reads from the store.
    router.push(`/dashboard/editor/new`)
  }

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Template Library" 
        description="Choose a professional, industry-grade template to start your letterhead design."
      />

      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Filters Sidebar */}
        <aside className="w-full md:w-64 shrink-0 space-y-6">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search templates..."
              className="w-full rounded-md border border-input bg-background py-2 pl-9 pr-4 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            />
          </div>
          
          <div>
            <h3 className="mb-3 text-sm font-semibold text-foreground">Categories</h3>
            <div className="space-y-1">
              {categories.map((category, i) => (
                <button
                  key={category}
                  className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-sm transition-colors ${
                    i === 0 
                      ? "bg-primary/10 font-medium text-primary" 
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  {category}
                  <span className="text-xs opacity-60">
                    {i === 0 ? masterTemplates.length : masterTemplates.filter(t => t.category === category).length}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Template Grid */}
        <main className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {masterTemplates.map((template) => (
              <div key={template.id} className="group relative rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden flex flex-col">
                <div className="aspect-[1/1.414] w-full bg-slate-100 flex items-start justify-center border-b overflow-hidden relative">
                  
                  {/* Real Live Preview Scaled Down */}
                  <div className="absolute top-0 left-0 w-full h-full flex items-start justify-center pt-[5%]">
                    <div 
                      style={{ 
                        transform: 'scale(0.32)', 
                        transformOrigin: 'top center',
                        pointerEvents: 'none'
                      }}
                    >
                      <PureLetterheadRenderer 
                        activeTemplate={template} 
                        companyProfile={companyProfile} 
                        isEditor={false} 
                      />
                    </div>
                  </div>
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10">
                    <button 
                      onClick={() => handleUseTemplate(template.id)}
                      className="bg-white text-black px-4 py-2 rounded-md font-medium text-sm hover:bg-slate-100 transition-colors shadow-lg"
                    >
                      Use Template
                    </button>
                  </div>
                </div>
                <div className="p-4 flex flex-col flex-1 bg-white dark:bg-slate-950 z-20">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-primary">{template.category}</span>
                  </div>
                  <h3 className="font-semibold text-sm text-foreground line-clamp-1">{template.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{template.description}</p>
                </div>
              </div>
            ))}
          </div>
        </main>

      </div>
    </div>
  )
}
