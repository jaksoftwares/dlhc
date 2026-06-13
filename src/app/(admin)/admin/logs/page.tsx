import { PageHeader } from "@/components/dashboard/PageHeader"
import { Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AdminLogsPage() {
  const logs = [
    { id: "1", type: "Security", action: "Failed Login Attempt", user: "Unknown", ip: "192.168.1.55", date: "Oct 24, 2026, 14:32:01", severity: "high" },
    { id: "2", type: "Admin Action", action: "Deleted User Account", user: "Admin Jane", target: "user@spam.net", date: "Oct 24, 2026, 11:15:22", severity: "medium" },
    { id: "3", type: "System", action: "Template Published", user: "Admin John", target: "Medical Layout B", date: "Oct 23, 2026, 09:45:10", severity: "low" },
    { id: "4", type: "Billing", action: "Subscription Upgrade (Pro)", user: "Acme Corp", target: "Stripe Sub_123", date: "Oct 22, 2026, 16:20:05", severity: "low" },
    { id: "5", type: "Admin Action", action: "Category Created", user: "Admin Jane", target: "Creative", date: "Oct 20, 2026, 10:05:00", severity: "low" },
  ]

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Activity & Audit Logs" 
        description="Immutable system-wide tracking for security and analytics."
        action={
          <Button variant="outline">Export Logs (CSV)</Button>
        }
      />

      <div className="rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden">
        <div className="p-4 border-b flex flex-col sm:flex-row gap-4 items-center justify-between bg-muted/20">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search by action, user, or IP..." 
              className="w-full rounded-md border border-input bg-background py-2 pl-9 pr-4 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button variant="outline" className="w-full sm:w-auto h-9">
              <Filter className="mr-2 h-4 w-4" />
              Filter by Type
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/50 text-muted-foreground border-b">
              <tr>
                <th className="px-6 py-4 font-medium">Timestamp</th>
                <th className="px-6 py-4 font-medium">Type</th>
                <th className="px-6 py-4 font-medium">Action Event</th>
                <th className="px-6 py-4 font-medium">Actor (User/IP)</th>
                <th className="px-6 py-4 font-medium">Target / Context</th>
              </tr>
            </thead>
            <tbody className="divide-y font-mono text-xs">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-3 text-muted-foreground whitespace-nowrap">{log.date}</td>
                  <td className="px-6 py-3">
                    <span className={`inline-flex items-center rounded-sm px-2 py-0.5 font-medium ${
                      log.severity === 'high' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                      log.severity === 'medium' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' :
                      'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                    }`}>
                      {log.type}
                    </span>
                  </td>
                  <td className="px-6 py-3 font-semibold text-foreground">{log.action}</td>
                  <td className="px-6 py-3 text-muted-foreground">
                    {log.user} {log.ip && <span className="text-slate-400">({log.ip})</span>}
                  </td>
                  <td className="px-6 py-3 text-muted-foreground">{log.target || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
