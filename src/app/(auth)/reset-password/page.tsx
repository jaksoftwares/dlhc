import { Button } from "@/components/ui/button"

export default function ResetPasswordPage() {
  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Reset Password</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Enter your new password below.
        </p>
      </div>

      <div className="space-y-4">
        {/* Form Placeholder */}
        <form className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-foreground">New Password</label>
            <input 
              type="password" 
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-foreground">Confirm New Password</label>
            <input 
              type="password" 
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          
          <Button type="button" className="w-full">Update Password</Button>
        </form>
      </div>
    </>
  )
}
