import Link from "next/link"
import Image from "next/image"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full bg-[#0F172A] text-slate-300 py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          
          {/* Brand Col */}
          <div className="md:col-span-1 flex flex-col gap-4">
            <Link href="/" className="inline-block relative h-12 w-40">
              <Image 
                src="/logos/logo-full-white.svg" 
                alt="DLHC Logo" 
                fill
                className="object-contain object-left"
              />
            </Link>
            <p className="text-sm text-slate-400 mt-4 leading-relaxed">
              Create, manage, and export professional corporate letterheads seamlessly. Ensure brand consistency across your entire organization.
            </p>
          </div>

          {/* Links Col 1 */}
          <div className="flex flex-col gap-3">
            <h4 className="font-semibold text-white">Product</h4>
            <Link href="#features" className="text-sm hover:text-white transition-colors">Features</Link>
            <Link href="#templates" className="text-sm hover:text-white transition-colors">Templates</Link>
            <Link href="#pricing" className="text-sm hover:text-white transition-colors">Pricing</Link>
          </div>

          {/* Links Col 2 */}
          <div className="flex flex-col gap-3">
            <h4 className="font-semibold text-white">Company</h4>
            <Link href="/about" className="text-sm hover:text-white transition-colors">About Us</Link>
            <Link href="/contact" className="text-sm hover:text-white transition-colors">Contact</Link>
            <Link href="/privacy" className="text-sm hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-sm hover:text-white transition-colors">Terms of Service</Link>
          </div>

          {/* Contact Col */}
          <div className="flex flex-col gap-4">
            <h4 className="font-semibold text-white tracking-wide">Connect</h4>
            <a href="mailto:support@dovepeak.com" className="text-sm hover:text-white transition-colors">
              support@dovepeak.com
            </a>
            <div className="flex gap-4 mt-2">
              <Link href="#" className="text-sm hover:text-white transition-colors">Twitter / X</Link>
              <Link href="#" className="text-sm hover:text-white transition-colors">LinkedIn</Link>
            </div>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-500">
            &copy; {currentYear} Dovepeak Letter Head Creator. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
