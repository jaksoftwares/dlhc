import { LayoutTemplate, Users, FileDown, Blocks } from "lucide-react"

export default function FeaturesPage() {
  return (
    <div className="flex-1 flex flex-col w-full">
      {/* Header */}
      <section className="w-full py-16 md:py-24 bg-slate-50 dark:bg-slate-900 border-b">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl text-center flex flex-col items-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
            Product Capabilities
          </h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
            A comprehensive overview of the tools available to manage your organization's letterheads.
          </p>
        </div>
      </section>

      {/* Feature Sections */}
      <div className="flex flex-col">
        
        {/* Editor */}
        <section className="w-full py-20 border-b">
          <div className="container mx-auto px-4 md:px-8 max-w-6xl flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 space-y-4">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-6">
                <LayoutTemplate className="h-6 w-6" />
              </div>
              <h2 className="text-3xl font-semibold text-foreground">Drag & Drop Editor</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Build strict, compliant letterheads without specialized design software. Our editor is built specifically for corporate stationary.
              </p>
              <ul className="space-y-3 mt-6 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="font-medium text-foreground min-w-[120px]">Canvas:</span> 
                  <span>True-to-print representation (A4 and US Letter sizes).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-medium text-foreground min-w-[120px]">Locking:</span> 
                  <span>Lock specific elements (like logos or footers) to prevent unauthorized changes.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-medium text-foreground min-w-[120px]">Typography:</span> 
                  <span>Upload custom corporate fonts to maintain brand identity.</span>
                </li>
              </ul>
            </div>
            <div className="flex-1 w-full bg-slate-100 dark:bg-slate-800 rounded-xl aspect-[4/3] border shadow-sm flex items-center justify-center overflow-hidden">
              {/* Screenshot Placeholder */}
              <div className="text-center text-slate-400 p-6">
                <LayoutTemplate className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p className="text-sm font-medium uppercase tracking-wider">Editor Interface Screenshot</p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Management */}
        <section className="w-full py-20 border-b bg-slate-50 dark:bg-slate-900/50">
          <div className="container mx-auto px-4 md:px-8 max-w-6xl flex flex-col md:flex-row-reverse items-center gap-12">
            <div className="flex-1 space-y-4">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-6">
                <Users className="h-6 w-6" />
              </div>
              <h2 className="text-3xl font-semibold text-foreground">Team Management</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Control exactly who can view, edit, and publish templates across your organization with granular permission settings.
              </p>
              <ul className="space-y-3 mt-6 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="font-medium text-foreground min-w-[120px]">Admin:</span> 
                  <span>Full control over workspace settings, billing, and team roles.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-medium text-foreground min-w-[120px]">Editor:</span> 
                  <span>Create and modify templates, submit for approval.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-medium text-foreground min-w-[120px]">Viewer:</span> 
                  <span>Access and export approved templates only.</span>
                </li>
              </ul>
            </div>
            <div className="flex-1 w-full bg-white dark:bg-slate-950 rounded-xl aspect-[4/3] border shadow-sm flex items-center justify-center overflow-hidden">
              {/* Screenshot Placeholder */}
              <div className="text-center text-slate-400 p-6">
                <Users className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p className="text-sm font-medium uppercase tracking-wider">Roles Dashboard Screenshot</p>
              </div>
            </div>
          </div>
        </section>

        {/* Exporting */}
        <section className="w-full py-20 border-b">
          <div className="container mx-auto px-4 md:px-8 max-w-6xl flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 space-y-4">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-6">
                <FileDown className="h-6 w-6" />
              </div>
              <h2 className="text-3xl font-semibold text-foreground">Exporting</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Generate production-ready files instantly. We ensure vector quality and accurate color profiles for all exports.
              </p>
              <ul className="space-y-3 mt-6 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="font-medium text-foreground min-w-[120px]">PDF Export:</span> 
                  <span>CMYK color support, bleed margins, and embedded fonts for professional printing.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-medium text-foreground min-w-[120px]">DOCX Export:</span> 
                  <span>Native Microsoft Word format for internal distribution as reusable document templates.</span>
                </li>
              </ul>
            </div>
            <div className="flex-1 w-full bg-slate-100 dark:bg-slate-800 rounded-xl aspect-[4/3] border shadow-sm flex items-center justify-center overflow-hidden">
              {/* Screenshot Placeholder */}
              <div className="text-center text-slate-400 p-6">
                <FileDown className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p className="text-sm font-medium uppercase tracking-wider">Export Settings Screenshot</p>
              </div>
            </div>
          </div>
        </section>

        {/* Integrations */}
        <section className="w-full py-20 bg-slate-50 dark:bg-slate-900/50">
          <div className="container mx-auto px-4 md:px-8 max-w-6xl flex flex-col md:flex-row-reverse items-center gap-12">
            <div className="flex-1 space-y-4">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-6">
                <Blocks className="h-6 w-6" />
              </div>
              <h2 className="text-3xl font-semibold text-foreground">Integrations</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Connect DLHC directly to your existing document workflows to eliminate manual file handling.
              </p>
              <ul className="space-y-3 mt-6 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="font-medium text-foreground min-w-[120px]">Google Drive:</span> 
                  <span>Automatically sync exported templates to designated shared drives.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-medium text-foreground min-w-[120px]">Dropbox:</span> 
                  <span>Push approved files directly to Dropbox folders.</span>
                </li>
              </ul>
            </div>
            <div className="flex-1 w-full bg-white dark:bg-slate-950 rounded-xl aspect-[4/3] border shadow-sm flex items-center justify-center overflow-hidden">
              {/* Screenshot Placeholder */}
              <div className="text-center text-slate-400 p-6">
                <Blocks className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p className="text-sm font-medium uppercase tracking-wider">Integrations Panel Screenshot</p>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}
