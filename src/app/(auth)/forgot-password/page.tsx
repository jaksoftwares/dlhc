import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function ForgotPasswordPage() {
  return (
    <>
      <div className="mb-6">
        <Link href="/login" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to login
        </Link>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Forgot your password?</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Enter your email address and we will send you a link to reset your password.
        </p>
      </div>

      <div className="space-y-4">
        {/* Form Placeholder */}
        <form className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-foreground">Email</label>
            <input 
              type="email" 
              placeholder="name@company.com" 
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          
          <Button type="button" className="w-full">Send Reset Link</Button>
        </form>
      </div>
    </>
  )
}
