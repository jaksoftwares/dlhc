import { PageHeader } from "@/components/dashboard/PageHeader"
import { DataCard } from "@/components/dashboard/DataCard"
import { Button } from "@/components/ui/button"

export default function CompanyProfilePage() {
  return (
    <div className="space-y-8 max-w-4xl">
      <PageHeader 
        title="Company Profile" 
        description="Manage the default branding and contact information applied to your templates."
        action={
          <Button>Save Changes</Button>
        }
      />

      {/* Branding Section */}
      <DataCard title="Branding" description="Your company logo and core brand colors.">
        <div className="space-y-6">
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">Company Logo</label>
            <div className="flex items-center gap-4">
              <div className="h-20 w-20 rounded-md border border-dashed border-input flex items-center justify-center bg-muted/30">
                <span className="text-xs text-muted-foreground">No Logo</span>
              </div>
              <Button variant="outline" size="sm">Upload New Logo</Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Recommended size: 400x400px. PNG or SVG.</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground block mb-1">Primary Color</label>
              <div className="flex items-center gap-2">
                <input type="color" defaultValue="#0F172A" className="h-8 w-8 rounded border p-0 cursor-pointer" />
                <input type="text" defaultValue="#0F172A" className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring font-mono uppercase" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground block mb-1">Secondary Color</label>
              <div className="flex items-center gap-2">
                <input type="color" defaultValue="#3B82F6" className="h-8 w-8 rounded border p-0 cursor-pointer" />
                <input type="text" defaultValue="#3B82F6" className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring font-mono uppercase" />
              </div>
            </div>
          </div>
        </div>
      </DataCard>

      {/* Company Info Section */}
      <DataCard title="Company Information" description="Official details used on letterhead headers and footers.">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1 sm:col-span-2">
            <label className="text-sm font-medium text-foreground">Company Name</label>
            <input type="text" className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" placeholder="Acme Corporation" />
          </div>
          <div className="space-y-1 sm:col-span-2">
            <label className="text-sm font-medium text-foreground">Tagline / Slogan</label>
            <input type="text" className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" placeholder="Innovating the future." />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-foreground">Registration Number</label>
            <input type="text" className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-foreground">Tax PIN / VAT</label>
            <input type="text" className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" />
          </div>
        </div>
      </DataCard>

      {/* Contact & Address Section */}
      <DataCard title="Contact & Address" description="Public contact details for correspondence.">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1">
            <label className="text-sm font-medium text-foreground">Official Email</label>
            <input type="email" className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" placeholder="contact@company.com" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-foreground">Phone Number</label>
            <input type="tel" className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" placeholder="+1 (555) 000-0000" />
          </div>
          <div className="space-y-1 sm:col-span-2">
            <label className="text-sm font-medium text-foreground">Website</label>
            <input type="url" className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" placeholder="https://www.company.com" />
          </div>
          
          <div className="space-y-1 sm:col-span-2 mt-4">
            <label className="text-sm font-medium text-foreground">Address Line 1</label>
            <input type="text" className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" />
          </div>
          <div className="space-y-1 sm:col-span-2">
            <label className="text-sm font-medium text-foreground">Address Line 2 (Optional)</label>
            <input type="text" className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-foreground">City</label>
            <input type="text" className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-foreground">State / Province</label>
            <input type="text" className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-foreground">Postal Code</label>
            <input type="text" className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-foreground">Country</label>
            <input type="text" className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" />
          </div>
        </div>
      </DataCard>
      
      <div className="flex justify-end pt-4">
        <Button size="lg">Save Company Profile</Button>
      </div>
    </div>
  )
}
