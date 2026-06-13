import Link from "next/link"
import Image from "next/image"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <Link href="/" className="inline-block relative h-10 w-32">
            <Image 
              src="/logos/logo-full-primary.svg" 
              alt="DLHC Logo" 
              fill
              className="object-contain dark:hidden"
            />
            <Image 
              src="/logos/logo-full-white.svg" 
              alt="DLHC Logo" 
              fill
              className="object-contain hidden dark:block"
            />
          </Link>
        </div>
        <div className="bg-card py-8 px-4 shadow-sm border sm:rounded-xl sm:px-10">
          {children}
        </div>
      </div>
    </div>
  )
}
