import { PageHeader } from "@/components/dashboard/PageHeader"
import { DataCard } from "@/components/dashboard/DataCard"
import { Users, FileText, CreditCard, LayoutTemplate } from "lucide-react"

export default function AdminOverviewPage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Platform Overview" 
        description="High-level metrics and health monitoring for the DLHC platform."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <DataCard className="flex flex-col justify-center">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">Total Users</span>
            <Users className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="text-3xl font-bold text-foreground">1,248</div>
          <p className="text-xs text-green-500 mt-1">+12% from last month</p>
        </DataCard>

        <DataCard className="flex flex-col justify-center">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">Active Subscriptions</span>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="text-3xl font-bold text-foreground">423</div>
          <p className="text-xs text-green-500 mt-1">+5% from last month</p>
        </DataCard>

        <DataCard className="flex flex-col justify-center">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">Master Templates</span>
            <LayoutTemplate className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="text-3xl font-bold text-foreground">45</div>
          <p className="text-xs text-muted-foreground mt-1">3 Drafts pending</p>
        </DataCard>

        <DataCard className="flex flex-col justify-center">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">PDFs Exported</span>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="text-3xl font-bold text-foreground">12.5k</div>
          <p className="text-xs text-muted-foreground mt-1">All time</p>
        </DataCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DataCard title="Recent Signups" description="The latest users to join the platform.">
          <div className="space-y-4">
            {[1,2,3,4].map((i) => (
              <div key={i} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-medium">
                    U{i}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">User {i}</p>
                    <p className="text-xs text-muted-foreground">user{i}@company.com</p>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">2 hours ago</div>
              </div>
            ))}
          </div>
        </DataCard>

        <DataCard title="Recent Activity" description="System audit log preview.">
          <div className="space-y-4">
            <div className="flex gap-3 items-start">
              <div className="mt-0.5"><div className="h-2 w-2 rounded-full bg-blue-500"></div></div>
              <div>
                <p className="text-sm text-foreground">Admin "Jane" published template <span className="font-medium">Medical Letterhead B</span></p>
                <p className="text-xs text-muted-foreground">10 minutes ago</p>
              </div>
            </div>
            <div className="flex gap-3 items-start">
              <div className="mt-0.5"><div className="h-2 w-2 rounded-full bg-green-500"></div></div>
              <div>
                <p className="text-sm text-foreground">User "Acme Corp" upgraded to <span className="font-medium">Enterprise Plan</span></p>
                <p className="text-xs text-muted-foreground">1 hour ago</p>
              </div>
            </div>
            <div className="flex gap-3 items-start">
              <div className="mt-0.5"><div className="h-2 w-2 rounded-full bg-red-500"></div></div>
              <div>
                <p className="text-sm text-foreground">Failed login attempt from IP 192.168.1.1 (Admin Account)</p>
                <p className="text-xs text-muted-foreground">3 hours ago</p>
              </div>
            </div>
          </div>
        </DataCard>
      </div>
    </div>
  )
}
