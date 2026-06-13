"use client"

import { useState } from "react"
import { PageHeader } from "@/components/dashboard/PageHeader"
import { DataCard } from "@/components/dashboard/DataCard"
import { Button } from "@/components/ui/button"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile")

  const tabs = [
    { id: "profile", label: "Profile" },
    { id: "security", label: "Security" },
    { id: "subscription", label: "Subscription" },
    { id: "preferences", label: "Preferences" },
  ]

  return (
    <div className="space-y-8 max-w-4xl">
      <PageHeader 
        title="Account Settings" 
        description="Manage your personal information, security, and subscription details."
      />

      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Navigation */}
        <aside className="w-full md:w-56 shrink-0">
          <nav className="flex flex-col space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`text-left px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === tab.id 
                    ? "bg-primary/10 text-primary" 
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <div className="flex-1 space-y-6">
          
          {/* Profile Tab */}
          {activeTab === "profile" && (
            <DataCard title="Personal Profile" description="Your personal information used across the platform.">
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">Avatar</label>
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold text-xl">
                      JD
                    </div>
                    <Button variant="outline" size="sm">Change Avatar</Button>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <label className="text-sm font-medium text-foreground">Full Name</label>
                  <input type="text" defaultValue="John Doe" className="flex h-9 w-full max-w-md rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" />
                </div>
                
                <div className="space-y-1">
                  <label className="text-sm font-medium text-foreground">Email Address</label>
                  <input type="email" defaultValue="john@acme.com" disabled className="flex h-9 w-full max-w-md rounded-md border border-input bg-muted px-3 py-1 text-sm shadow-sm opacity-70 cursor-not-allowed" />
                  <p className="text-xs text-muted-foreground mt-1">Email cannot be changed directly. Contact support.</p>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-foreground">Phone Number</label>
                  <input type="tel" defaultValue="+1 (555) 123-4567" className="flex h-9 w-full max-w-md rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" />
                </div>

                <Button>Save Changes</Button>
              </div>
            </DataCard>
          )}

          {/* Security Tab */}
          {activeTab === "security" && (
            <DataCard title="Security" description="Manage your password and security preferences.">
              <div className="space-y-6">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-foreground">Current Password</label>
                  <input type="password" placeholder="••••••••" className="flex h-9 w-full max-w-md rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-foreground">New Password</label>
                  <input type="password" placeholder="••••••••" className="flex h-9 w-full max-w-md rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-foreground">Confirm New Password</label>
                  <input type="password" placeholder="••••••••" className="flex h-9 w-full max-w-md rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" />
                </div>
                <Button>Update Password</Button>
              </div>
            </DataCard>
          )}

          {/* Subscription Tab */}
          {activeTab === "subscription" && (
            <DataCard title="Subscription Plan" description="Your current billing and usage details.">
              <div className="space-y-6">
                <div className="rounded-lg border bg-secondary/20 p-4 flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-foreground">Professional Plan</h4>
                    <p className="text-sm text-muted-foreground">$29 / month</p>
                  </div>
                  <Button variant="outline" size="sm">Manage Billing</Button>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-3">Usage This Month</h4>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Team Members</span>
                        <span className="font-medium">4 / 10</span>
                      </div>
                      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary w-[40%]"></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Exports (PDF/DOCX)</span>
                        <span className="font-medium">48 / Unlimited</span>
                      </div>
                      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 w-[15%]"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </DataCard>
          )}

          {/* Preferences Tab */}
          {activeTab === "preferences" && (
            <DataCard title="Application Preferences" description="Customize your workspace experience.">
              <div className="space-y-6">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-foreground">Language</label>
                  <select className="flex h-9 w-full max-w-md rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                    <option value="en">English (US)</option>
                    <option value="en-gb">English (UK)</option>
                    <option value="fr">French</option>
                    <option value="es">Spanish</option>
                  </select>
                </div>
                
                <div className="space-y-3">
                  <label className="text-sm font-medium text-foreground">Interface Theme</label>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="theme" value="light" className="text-primary focus:ring-primary" />
                      <span className="text-sm">Light</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="theme" value="dark" className="text-primary focus:ring-primary" defaultChecked />
                      <span className="text-sm">Dark</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="theme" value="system" className="text-primary focus:ring-primary" />
                      <span className="text-sm">System Default</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded border-gray-300 text-primary focus:ring-primary" />
                    <span className="text-sm text-foreground">Email me about product updates and features</span>
                  </label>
                </div>

                <Button>Save Preferences</Button>
              </div>
            </DataCard>
          )}

        </div>
      </div>
    </div>
  )
}
