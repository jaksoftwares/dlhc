import { PageHeader } from "@/components/dashboard/PageHeader"
import { Button } from "@/components/ui/button"
import { Download, FileText, File } from "lucide-react"

export default function DownloadsPage() {
  const downloads = [
    { id: "1", name: "Q3 Board Report", format: "PDF", date: "Oct 24, 2026, 10:30 AM", size: "2.4 MB" },
    { id: "2", name: "Client Proposal - Acme", format: "DOCX", date: "Oct 23, 2026, 4:15 PM", size: "1.1 MB" },
    { id: "3", name: "Internal Memo", format: "PDF", date: "Oct 20, 2026, 9:00 AM", size: "1.8 MB" },
    { id: "4", name: "Offer Letter Template", format: "DOCX", date: "Oct 15, 2026, 2:45 PM", size: "850 KB" },
  ]

  return (
    <div className="space-y-6 max-w-5xl">
      <PageHeader 
        title="Export History" 
        description="A log of all letterheads generated and downloaded by your organization."
      />

      <div className="rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/50 text-muted-foreground border-b">
              <tr>
                <th className="px-6 py-4 font-medium">Document Name</th>
                <th className="px-6 py-4 font-medium">Format</th>
                <th className="px-6 py-4 font-medium">Date Exported</th>
                <th className="px-6 py-4 font-medium">Size</th>
                <th className="px-6 py-4 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {downloads.map((item) => (
                <tr key={item.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {item.format === 'PDF' ? <FileText className="h-4 w-4 text-red-500" /> : <File className="h-4 w-4 text-blue-500" />}
                      <span className="font-medium text-foreground">{item.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center rounded-md bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground ring-1 ring-inset ring-secondary-foreground/10">
                      {item.format}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">{item.date}</td>
                  <td className="px-6 py-4 text-muted-foreground">{item.size}</td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="outline" size="sm" className="h-8">
                      <Download className="mr-2 h-3.5 w-3.5" />
                      Download
                    </Button>
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
