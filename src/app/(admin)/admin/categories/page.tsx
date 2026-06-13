"use client"

import { useState } from "react"
import { PageHeader } from "@/components/dashboard/PageHeader"
import { Button } from "@/components/ui/button"
import { Search, Plus, Edit, Trash2 } from "lucide-react"

export default function AdminCategoriesPage() {
  const [isAdding, setIsAdding] = useState(false)
  const categories = [
    { id: "1", name: "Corporate", description: "Standard business layouts for traditional companies.", count: 12 },
    { id: "2", name: "Medical", description: "Clean, trustworthy designs for clinics and hospitals.", count: 8 },
    { id: "3", name: "Legal", description: "Formal and highly structured headers for law firms.", count: 5 },
    { id: "4", name: "Minimalist", description: "Modern, whitespace-heavy designs for startups and creatives.", count: 15 },
  ]

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Template Categories" 
        description="Manage the classification system for master templates."
        action={
          <Button onClick={() => setIsAdding(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Category
          </Button>
        }
      />

      {isAdding && (
        <div className="rounded-xl border bg-card p-6 shadow-sm mb-6 max-w-2xl">
          <h3 className="text-lg font-semibold mb-4">Create New Category</h3>
          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-sm font-medium">Category Name</label>
              <input type="text" className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm" placeholder="e.g., Government" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Description</label>
              <textarea rows={2} className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm" placeholder="Brief explanation of this category..."></textarea>
            </div>
            <div className="flex justify-end gap-2 pt-2 border-t">
              <Button variant="outline" size="sm" onClick={() => setIsAdding(false)}>Cancel</Button>
              <Button size="sm">Save Category</Button>
            </div>
          </div>
        </div>
      )}

      <div className="rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden">
        <div className="p-4 border-b flex items-center justify-between bg-muted/20">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search categories..." 
              className="w-full rounded-md border border-input bg-background py-2 pl-9 pr-4 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/50 text-muted-foreground border-b">
              <tr>
                <th className="px-6 py-4 font-medium">Category Name</th>
                <th className="px-6 py-4 font-medium">Description</th>
                <th className="px-6 py-4 font-medium">Templates Count</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {categories.map((cat) => (
                <tr key={cat.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4 font-medium text-foreground">{cat.name}</td>
                  <td className="px-6 py-4 text-muted-foreground truncate max-w-xs">{cat.description}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-800 dark:bg-slate-800 dark:text-slate-300">
                      {cat.count}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-1">
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
