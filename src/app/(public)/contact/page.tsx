import { Button } from "@/components/ui/button"
import { Mail, MapPin, Phone } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="flex-1 flex flex-col w-full">
      {/* Header */}
      <section className="w-full py-16 md:py-24 bg-slate-50 dark:bg-slate-900 border-b">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl text-center flex flex-col items-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
            Contact Sales & Support
          </h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
            We're here to help. Reach out to our team for enterprise inquiries, technical support, or general questions.
          </p>
        </div>
      </section>

      <section className="w-full py-16">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl flex flex-col md:flex-row gap-12">
          
          {/* Contact Info */}
          <div className="flex-1 space-y-8">
            <div>
              <h2 className="text-2xl font-semibold text-foreground">Get in Touch</h2>
              <p className="mt-2 text-muted-foreground">
                Our support team is available Monday through Friday, 9am to 6pm EST.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="mt-1 bg-primary/10 p-3 rounded-lg text-primary">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">Email Support</h3>
                  <p className="text-sm text-muted-foreground">support@dovepeak.com</p>
                  <p className="text-sm text-muted-foreground">sales@dovepeak.com</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="mt-1 bg-primary/10 p-3 rounded-lg text-primary">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">Phone</h3>
                  <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="mt-1 bg-primary/10 p-3 rounded-lg text-primary">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">Office</h3>
                  <p className="text-sm text-muted-foreground">
                    100 Tech Hub Blvd, Suite 400<br />
                    San Francisco, CA 94105<br />
                    United States
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="flex-1 bg-card rounded-xl border shadow-sm p-6 md:p-8">
            <h3 className="text-xl font-semibold mb-6">Send us a message</h3>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-foreground">First Name</label>
                  <input type="text" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-foreground">Last Name</label>
                  <input type="text" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
                </div>
              </div>
              
              <div className="space-y-1">
                <label className="text-sm font-medium text-foreground">Work Email</label>
                <input type="email" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-foreground">Subject</label>
                <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                  <option>Sales Inquiry</option>
                  <option>Technical Support</option>
                  <option>Billing Question</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-foreground">Message</label>
                <textarea rows={4} className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"></textarea>
              </div>

              <Button type="button" className="w-full">Submit Request</Button>
            </form>
          </div>

        </div>
      </section>
    </div>
  )
}
