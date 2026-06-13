"use client"

import Link from "next/link"
import { Button, buttonVariants } from "@/components/ui/button"
import { 
  ChevronLeft, Download, Save, Type, Palette, Layout, 
  Maximize, MoreHorizontal, EyeOff, FileText, CheckCircle2, ChevronDown 
} from "lucide-react"
import { useState } from "react"

export default function EditorPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("typography")
  
  return (
    <div className="flex flex-col h-full w-full">
      {/* Top Action Bar */}
      <header className="h-14 shrink-0 border-b bg-background flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/designs" className={buttonVariants({ variant: "ghost", size: "icon", className: "h-8 w-8 -ml-2" })}>
            <ChevronLeft className="h-4 w-4" />
          </Link>
          <div className="flex items-center gap-2">
            <input 
              type="text" 
              defaultValue="Q3 Board Report" 
              className="font-medium text-sm bg-transparent border-transparent hover:border-input focus:border-input rounded px-2 py-1 h-8 w-48 transition-colors focus-visible:outline-none"
            />
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded-md">
              <CheckCircle2 className="h-3 w-3 text-green-500" />
              Saved
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-8 hidden sm:flex">
            <Save className="mr-2 h-3.5 w-3.5" />
            Save Draft
          </Button>
          <div className="h-4 w-px bg-border mx-1 hidden sm:block"></div>
          <Button variant="secondary" size="sm" className="h-8 text-blue-600 dark:text-blue-400">
            <FileText className="mr-2 h-3.5 w-3.5" />
            DOCX
          </Button>
          <Button size="sm" className="h-8 bg-red-600 hover:bg-red-700 text-white">
            <Download className="mr-2 h-3.5 w-3.5" />
            Export PDF
          </Button>
        </div>
      </header>

      {/* Main Workspace */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* Left Properties Panel */}
        <aside className="w-72 shrink-0 border-r bg-card flex flex-col h-full overflow-y-auto">
          <div className="p-4 border-b">
            <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider">Properties</h2>
          </div>
          
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {/* Accordion Item: Typography */}
            <div className="rounded-md border bg-background">
              <button className="flex items-center justify-between w-full p-3 text-sm font-medium hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-2">
                  <Type className="h-4 w-4 text-muted-foreground" />
                  Typography
                </div>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </button>
              <div className="p-3 border-t bg-muted/10 space-y-3">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-foreground">Font Family</label>
                  <select className="flex h-8 w-full rounded-md border border-input bg-transparent px-3 py-1 text-xs shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                    <option>Inter (Modern)</option>
                    <option>Merriweather (Serif)</option>
                    <option>Roboto (Clean)</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-foreground">Heading Size</label>
                    <select className="flex h-8 w-full rounded-md border border-input bg-transparent px-3 py-1 text-xs shadow-sm focus-visible:outline-none">
                      <option>Large</option>
                      <option>Medium</option>
                      <option>Small</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-foreground">Body Size</label>
                    <select className="flex h-8 w-full rounded-md border border-input bg-transparent px-3 py-1 text-xs shadow-sm focus-visible:outline-none">
                      <option>11pt</option>
                      <option>10pt</option>
                      <option>12pt</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Accordion Item: Colors */}
            <div className="rounded-md border bg-background">
              <button className="flex items-center justify-between w-full p-3 text-sm font-medium hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-2">
                  <Palette className="h-4 w-4 text-muted-foreground" />
                  Colors
                </div>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>

            {/* Accordion Item: Layout */}
            <div className="rounded-md border bg-background">
              <button className="flex items-center justify-between w-full p-3 text-sm font-medium hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-2">
                  <Layout className="h-4 w-4 text-muted-foreground" />
                  Layout & Margins
                </div>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>

            {/* Accordion Item: Visibility Controls */}
            <div className="rounded-md border bg-background">
              <button className="flex items-center justify-between w-full p-3 text-sm font-medium hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-2">
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                  Visibility Elements
                </div>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>

          </div>
        </aside>

        {/* Center Canvas Area */}
        <main className="flex-1 bg-muted/30 overflow-auto flex items-center justify-center p-8 relative">
          {/* Zoom Controls */}
          <div className="absolute bottom-6 right-6 flex items-center gap-1 bg-background border rounded-md shadow-sm p-1">
            <Button variant="ghost" size="sm" className="h-7 w-7 p-0">-</Button>
            <span className="text-xs font-medium w-12 text-center">100%</span>
            <Button variant="ghost" size="sm" className="h-7 w-7 p-0">+</Button>
            <div className="w-px h-4 bg-border mx-1"></div>
            <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
              <Maximize className="h-3.5 w-3.5" />
            </Button>
          </div>

          {/* The A4 Canvas Document */}
          <div 
            className="bg-white shadow-xl flex flex-col"
            style={{
              width: "210mm",
              height: "297mm", // A4 format
              minHeight: "297mm",
              maxHeight: "297mm"
            }}
          >
            {/* Header (Letterhead Top) */}
            <div className="h-32 border-b-4 border-blue-600 flex items-center justify-between px-12 pt-8">
              <div className="h-16 w-48 bg-slate-100 flex items-center justify-center border border-dashed border-slate-300 text-slate-400 text-sm">
                [Company Logo]
              </div>
              <div className="text-right">
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">ACME CORP</h1>
                <p className="text-sm text-slate-500 mt-1">Innovating the future.</p>
              </div>
            </div>

            {/* Body (Letter Content Placeholder) */}
            <div className="flex-1 px-16 py-12 flex flex-col gap-4 text-slate-800 text-[11pt] font-serif leading-relaxed">
              <p className="mb-8">{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
              <p className="font-bold">To Whom It May Concern,</p>
              <div className="space-y-4 text-justify">
                <p className="bg-slate-100/50 rounded p-1 border border-dashed border-slate-200 text-slate-400 text-center italic">
                  [Document Body Area - Text typed here will wrap to multiple pages if needed]
                </p>
                <div className="h-4 bg-slate-100 rounded w-full"></div>
                <div className="h-4 bg-slate-100 rounded w-full"></div>
                <div className="h-4 bg-slate-100 rounded w-11/12"></div>
                <div className="h-4 bg-slate-100 rounded w-full"></div>
                <div className="h-4 bg-slate-100 rounded w-4/5"></div>
              </div>
              <div className="mt-16">
                <p>Sincerely,</p>
                <div className="h-12 w-32 mt-2 mb-2 bg-slate-100 border border-dashed border-slate-300 flex items-center justify-center text-slate-400 text-xs italic">
                  [Signature]
                </div>
                <p className="font-bold">Jane Doe</p>
                <p className="text-sm text-slate-500">Chief Executive Officer</p>
              </div>
            </div>

            {/* Footer (Letterhead Bottom) */}
            <div className="h-24 border-t border-slate-200 flex items-center justify-between px-12 text-[9pt] text-slate-500">
              <div>
                <p>100 Tech Hub Blvd, Suite 400</p>
                <p>San Francisco, CA 94105</p>
              </div>
              <div className="text-right">
                <p>contact@acmecorp.com</p>
                <p>+1 (555) 123-4567</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
