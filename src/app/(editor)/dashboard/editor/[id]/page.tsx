"use client"

import Link from "next/link"
import { Button, buttonVariants } from "@/components/ui/button"
import { 
  ChevronLeft, Download, Save, Type, Palette, Layout, 
  Maximize, MoreHorizontal, EyeOff, FileText, CheckCircle2, ChevronDown, Loader2, AlertCircle
} from "lucide-react"
import { useReactToPrint } from "react-to-print"
import { useState, useEffect, use, useRef } from "react"
import { useEditorStore } from "@/store/editorStore"
import { LetterheadRenderer, DocumentHeader, DocumentFooter } from "@/components/editor/LetterheadRenderer"
import { FontFamily } from "@/types/template"

export default function EditorPage({ params }: { params: Promise<{ id: string }> }) {
  const { 
    activeTemplate, setTemplate, updateTypography, updateColors, updateVisibility,
    zoomLevel, setZoomLevel, saveStatus, setSaveStatus, designName, isExporting, setIsExporting, documentContent, companyProfile
  } = useEditorStore()
  
  const resolvedParams = use(params)
  const printRef = useRef<HTMLDivElement>(null)
  
  // ==========================================
  // SAVE SYSTEM (Auto & Manual)
  // ==========================================
  const handleSave = async () => {
    setSaveStatus('saving')
    try {
      // In a full implementation, we would await supabase.from('designs').upsert(...)
      await new Promise(resolve => setTimeout(resolve, 800)) // Mock network request
      setSaveStatus('saved')
    } catch (e) {
      setSaveStatus('error')
    }
  }

  // Auto-save debouncer
  useEffect(() => {
    if (saveStatus === 'saving') return;
    setSaveStatus('unsaved')
    
    const timeoutId = setTimeout(() => {
      handleSave()
    }, 2000) // 2 seconds of inactivity

    return () => clearTimeout(timeoutId)
  }, [activeTemplate, documentContent])

  // ==========================================
  // PDF EXPORT (Native Browser Print Dialog)
  // ==========================================
  const handleExportPDF = useReactToPrint({
    contentRef: printRef,
    documentTitle: designName.replace(/[^a-z0-9]/gi, '_').toLowerCase(),
    onBeforePrint: () => {
      return new Promise<void>((resolve) => {
        setIsExporting(true)
        setTimeout(resolve, 100)
      })
    },
    onAfterPrint: () => {
      setIsExporting(false)
    }
  })

  // ==========================================
  // DOCX EXPORT (Native .docx with Headers)
  // ==========================================
  const handleExportDOCX = async () => {
    setIsExporting(true)
    
    try {
      // 1. Get the dynamic HTML of the Header and Footer
      const headerHtml = document.getElementById("docx-header-wrapper")?.innerHTML || ""
      const footerHtml = document.getElementById("docx-footer-wrapper")?.innerHTML || ""
      
      // 2. Get the body HTML from the rich text editor (we don't want the visual canvas wrapper)
      const bodyHtml = documentContent || "<p></p>"
      
      // 3. Dynamically import wp-html-to-docx to avoid SSR issues
      const { htmlToDocx } = await import("wp-html-to-docx")
      
      // 4. Generate the DOCX file buffer
      const docxBuffer = await htmlToDocx(bodyHtml, {
        header: headerHtml,
        footer: footerHtml,
        page: {
          margin: {
            top: parseInt(activeTemplate.margins.page), // Fallback approximation
            bottom: parseInt(activeTemplate.margins.page),
            left: parseInt(activeTemplate.margins.page),
            right: parseInt(activeTemplate.margins.page),
            unit: 'mm'
          }
        },
        defaultFont: activeTemplate.typography.fontFamily.replace(/['"]/g, ''), // Strip quotes e.g. "Inter"
      })
      
      // 5. Download the true .docx file
      const blob = new Blob([docxBuffer as any], {
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      })
      
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${designName.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.docx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
    } catch (error) {
      console.error("DOCX Export failed:", error)
      alert("Failed to generate DOCX. Please try again.")
    } finally {
      setIsExporting(false)
    }
  }

  // ==========================================
  // ZOOM SYSTEM
  // ==========================================
  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 10, 200))
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 10, 50))
  const handleFitPage = () => setZoomLevel(100) // Reset to 100%


  return (
    <div className="flex flex-col h-full w-full">
      {/* Top Action Bar */}
      <header className="h-14 shrink-0 border-b bg-background flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className={buttonVariants({ variant: "ghost", size: "icon", className: "h-8 w-8 -ml-2" })}>
            <ChevronLeft className="h-4 w-4" />
          </Link>
          <div className="flex items-center gap-2">
            <input 
              type="text" 
              defaultValue={designName} 
              className="font-medium text-sm bg-transparent border-transparent hover:border-input focus:border-input rounded px-2 py-1 h-8 w-64 transition-colors focus-visible:outline-none"
            />
            
            {/* Save Status Indicator */}
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded-md min-w-[80px] justify-center">
              {saveStatus === 'saved' && <><CheckCircle2 className="h-3 w-3 text-green-500" /> Saved</>}
              {saveStatus === 'saving' && <><Loader2 className="h-3 w-3 text-blue-500 animate-spin" /> Saving...</>}
              {saveStatus === 'unsaved' && <><span className="h-2 w-2 rounded-full bg-amber-500"></span> Unsaved</>}
              {saveStatus === 'error' && <><AlertCircle className="h-3 w-3 text-red-500" /> Failed</>}
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-8 hidden sm:flex" onClick={handleSave} disabled={saveStatus === 'saving'}>
            <Save className="mr-2 h-3.5 w-3.5" />
            Save Draft
          </Button>
          <div className="h-4 w-px bg-border mx-1 hidden sm:block"></div>
          <Button variant="secondary" size="sm" className="h-8 text-blue-600 dark:text-blue-400 disabled:opacity-50" onClick={handleExportDOCX} disabled={isExporting}>
            <FileText className="mr-2 h-3.5 w-3.5" />
            DOCX
          </Button>
          <Button size="sm" className="h-8 bg-red-600 hover:bg-red-700 text-white" onClick={handleExportPDF} disabled={isExporting}>
            {isExporting ? <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" /> : <Download className="mr-2 h-3.5 w-3.5" />}
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
            <div className="rounded-md border bg-background overflow-hidden">
              <div className="flex items-center justify-between w-full p-3 text-sm font-medium bg-muted/30 border-b">
                <div className="flex items-center gap-2">
                  <Type className="h-4 w-4 text-muted-foreground" />
                  Typography
                </div>
              </div>
              <div className="p-3 bg-muted/10 space-y-3">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-foreground">Font Family</label>
                  <select 
                    value={activeTemplate.typography.fontFamily}
                    onChange={(e) => updateTypography({ fontFamily: e.target.value as FontFamily })}
                    className="flex h-8 w-full rounded-md border border-input bg-transparent px-3 py-1 text-xs shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  >
                    <option value="Inter">Inter (Modern Sans)</option>
                    <option value="Roboto">Roboto (Clean Sans)</option>
                    <option value="Open Sans">Open Sans (Friendly Sans)</option>
                    <option value="Merriweather">Merriweather (Formal Serif)</option>
                    <option value="Lora">Lora (Elegant Serif)</option>
                    <option value="Playfair Display">Playfair Display (Display Serif)</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-foreground">Body Size</label>
                    <select 
                      value={activeTemplate.typography.bodySize}
                      onChange={(e) => updateTypography({ bodySize: e.target.value })}
                      className="flex h-8 w-full rounded-md border border-input bg-transparent px-3 py-1 text-xs shadow-sm focus-visible:outline-none"
                    >
                      <option value="12pt">Large (12pt)</option>
                      <option value="11pt">Standard (11pt)</option>
                      <option value="10pt">Compact (10pt)</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-foreground">Heading Size</label>
                    <select 
                      value={activeTemplate.typography.headingSize}
                      onChange={(e) => updateTypography({ headingSize: e.target.value })}
                      className="flex h-8 w-full rounded-md border border-input bg-transparent px-3 py-1 text-xs shadow-sm focus-visible:outline-none"
                    >
                      <option value="28pt">28pt</option>
                      <option value="24pt">24pt</option>
                      <option value="20pt">20pt</option>
                      <option value="18pt">18pt</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Accordion Item: Colors */}
            <div className="rounded-md border bg-background mt-2 overflow-hidden">
              <div className="flex items-center justify-between w-full p-3 text-sm font-medium bg-muted/30 border-b">
                <div className="flex items-center gap-2">
                  <Palette className="h-4 w-4 text-muted-foreground" />
                  Colors
                </div>
              </div>
              <div className="p-3 bg-muted/10 space-y-3">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-foreground">Primary Accent Color</label>
                  <div className="flex gap-2">
                    <input 
                      type="color" 
                      value={activeTemplate.colors.primary}
                      onChange={(e) => updateColors({ primary: e.target.value })}
                      className="h-8 w-8 rounded cursor-pointer border p-0.5" 
                    />
                    <input 
                      type="text" 
                      value={activeTemplate.colors.primary}
                      onChange={(e) => updateColors({ primary: e.target.value })}
                      className="flex h-8 w-full rounded-md border border-input bg-transparent px-3 py-1 text-xs shadow-sm" 
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-foreground">Secondary/Text Color</label>
                  <div className="flex gap-2">
                    <input 
                      type="color" 
                      value={activeTemplate.colors.text}
                      onChange={(e) => updateColors({ text: e.target.value })}
                      className="h-8 w-8 rounded cursor-pointer border p-0.5" 
                    />
                    <input 
                      type="text" 
                      value={activeTemplate.colors.text}
                      onChange={(e) => updateColors({ text: e.target.value })}
                      className="flex h-8 w-full rounded-md border border-input bg-transparent px-3 py-1 text-xs shadow-sm" 
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Accordion Item: Visibility Controls */}
            <div className="rounded-md border bg-background mt-2 overflow-hidden">
              <div className="flex items-center justify-between w-full p-3 text-sm font-medium bg-muted/30 border-b">
                <div className="flex items-center gap-2">
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                  Visibility Toggles
                </div>
              </div>
              <div className="p-3 bg-muted/10 space-y-2">
                {[
                  { key: 'showLogo', label: 'Company Logo' },
                  { key: 'showCompanyName', label: 'Company Name' },
                  { key: 'showAddress', label: 'Address Block' },
                  { key: 'showPhone', label: 'Phone Number' },
                  { key: 'showEmail', label: 'Email Address' },
                  { key: 'showWebsite', label: 'Website URL' },
                  { key: 'showRegistration', label: 'Registration Number' },
                  { key: 'showTaxPin', label: 'Tax PIN' }
                ].map((item) => (
                  <label key={item.key} className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={activeTemplate.visibility[item.key as keyof typeof activeTemplate.visibility]}
                      onChange={(e) => updateVisibility({ [item.key]: e.target.checked })}
                      className="rounded border-gray-300 text-primary focus:ring-primary" 
                    />
                    <span className="text-xs text-foreground">{item.label}</span>
                  </label>
                ))}
              </div>
            </div>

          </div>
        </aside>

        {/* Center Canvas Area */}
        <main className="flex-1 bg-slate-200 dark:bg-slate-900 overflow-auto flex items-center justify-center p-8 relative">
          
          {/* Zoom Controls */}
          <div className="fixed bottom-6 right-6 flex items-center gap-1 bg-background border rounded-md shadow-sm p-1 z-50">
            <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={handleZoomOut}>-</Button>
            <span className="text-xs font-medium w-12 text-center">{zoomLevel}%</span>
            <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={handleZoomIn}>+</Button>
            <div className="w-px h-4 bg-border mx-1"></div>
            <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={handleFitPage} title="Fit to 100%">
              <Maximize className="h-3.5 w-3.5" />
            </Button>
          </div>

          {/* Scalable Wrapper */}
          <div 
            style={{
              transform: `scale(${zoomLevel / 100})`,
              transformOrigin: "top center",
              transition: "transform 0.15s ease-out"
            }}
            className="flex items-start justify-center min-h-[297mm]"
          >
            {/* The Actual Rendered Document - Isolated for PDF Capture */}
            <div ref={printRef}>
              <LetterheadRenderer />
            </div>
          </div>

        </main>
      </div>

      {/* HIDDEN DOCX EXPORT ELEMENTS */}
      {/* These elements are rendered purely so their HTML can be extracted for native Word headers/footers */}
      <div id="docx-header-wrapper" style={{ display: "none" }}>
        <DocumentHeader activeTemplate={activeTemplate} companyProfile={companyProfile} isDocxExport={true} />
      </div>
      <div id="docx-footer-wrapper" style={{ display: "none" }}>
        <DocumentFooter activeTemplate={activeTemplate} companyProfile={companyProfile} isDocxExport={true} />
      </div>

    </div>
  )
}
