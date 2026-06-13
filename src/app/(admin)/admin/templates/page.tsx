"use client"

import { useState } from "react"
import { PageHeader } from "@/components/dashboard/PageHeader"
import { DataCard } from "@/components/dashboard/DataCard"
import { Button } from "@/components/ui/button"
import { Plus, Search, Edit, Eye, Upload, Code2, Trash2 } from "lucide-react"

export default function AdminTemplatesPage() {
  const [isAdding, setIsAdding] = useState(false)

  const masterTemplates = [
    { id: "1", name: "Standard Corporate", category: "Corporate", status: "Published", tier: "Free", lastUpdated: "Oct 20, 2026" },
    { id: "2", name: "Medical Letterhead A", category: "Medical", status: "Published", tier: "Premium", lastUpdated: "Oct 18, 2026" },
    { id: "3", name: "Legal Counsel Header", category: "Legal", status: "Draft", tier: "Premium", lastUpdated: "2 hours ago" },
  ]

  if (isAdding) {
    return (
      <div className="space-y-6 max-w-4xl">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" onClick={() => setIsAdding(false)}>Back to List</Button>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Create Master Template</h1>
        </div>

        <DataCard title="Template Details" description="Configure the public metadata for this template.">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-medium">Template Name</label>
                <input type="text" className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm" placeholder="e.g., Executive Modern" />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium">Category</label>
                <select className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm">
                  <option>Corporate</option>
                  <option>Medical</option>
                  <option>Legal</option>
                  <option>Minimalist</option>
                </select>
              </div>
            </div>
            
            <div className="space-y-1">
              <label className="text-sm font-medium">Description</label>
              <textarea rows={3} className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm"></textarea>
            </div>

            <div className="grid grid-cols-2 gap-4 border-t pt-4">
              <div className="space-y-1">
                <label className="text-sm font-medium">Access Tier</label>
                <select className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm">
                  <option value="free">Free (All Users)</option>
                  <option value="premium">Premium (Pro/Enterprise)</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium">Status</label>
                <select className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm">
                  <option value="draft">Draft (Hidden)</option>
                  <option value="published">Published (Live)</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </div>
          </div>
        </DataCard>

        <DataCard title="Thumbnail & Media" description="Upload preview images stored on Cloudinary.">
          <div className="flex gap-6">
            <div className="w-48 space-y-2">
              <label className="text-sm font-medium">Thumbnail</label>
              <div className="aspect-[1/1.4] w-full border-2 border-dashed border-input rounded-md flex flex-col items-center justify-center bg-muted/30 text-muted-foreground hover:bg-muted/50 cursor-pointer transition-colors">
                <Upload className="h-6 w-6 mb-2" />
                <span className="text-xs font-medium">Upload Image</span>
              </div>
            </div>
            <div className="flex-1 space-y-2">
              <label className="text-sm font-medium">Preview Image URL (Optional)</label>
              <input type="url" className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm" placeholder="https://res.cloudinary.com/..." />
            </div>
          </div>
        </DataCard>

        <DataCard 
          title="JSON Template Schema" 
          description="The structural definition interpreted by the React Editor engine."
          action={<Button variant="outline" size="sm"><Code2 className="mr-2 h-4 w-4" /> Validate Schema</Button>}
        >
          <div className="space-y-2">
            <div className="bg-slate-950 rounded-md border shadow-inner p-4 font-mono text-xs text-green-400 overflow-x-auto h-64">
              {`{
  "version": "1.0",
  "layout": {
    "type": "A4",
    "header": {
      "elements": [
        { "type": "logo", "position": "top-left" },
        { "type": "company_name", "position": "top-right" }
      ]
    },
    "body": {
      "margins": "1in"
    }
  }
}`}
            </div>
            <p className="text-xs text-muted-foreground">Paste valid JSON conforming to the DLHC Template spec.</p>
          </div>
        </DataCard>

        <div className="flex justify-end gap-4">
          <Button variant="outline" onClick={() => setIsAdding(false)}>Cancel</Button>
          <Button>Save Template</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Master Templates" 
        description="Configure and publish the system templates available to all users."
        action={
          <Button onClick={() => setIsAdding(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Create Template
          </Button>
        }
      />

      <div className="rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden">
        <div className="p-4 border-b flex items-center justify-between bg-muted/20">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search templates..." 
              className="w-full rounded-md border border-input bg-background py-2 pl-9 pr-4 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/50 text-muted-foreground border-b">
              <tr>
                <th className="px-6 py-4 font-medium">Template Name</th>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium">Tier</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Last Updated</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {masterTemplates.map((template) => (
                <tr key={template.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4 font-medium text-foreground">{template.name}</td>
                  <td className="px-6 py-4 text-muted-foreground">{template.category}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                      template.tier === 'Premium' ? 'bg-purple-100 text-purple-700 ring-purple-700/10 dark:bg-purple-900/30 dark:text-purple-400 dark:ring-purple-400/20' : 'bg-slate-100 text-slate-700 ring-slate-700/10 dark:bg-slate-800 dark:text-slate-400 dark:ring-slate-400/20'
                    }`}>
                      {template.tier}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                      template.status === 'Published' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                    }`}>
                      {template.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">{template.lastUpdated}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground" title="Preview">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground" title="Edit">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30" title="Delete">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
