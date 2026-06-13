import { ReactNode } from "react"

interface DataCardProps {
  title?: string
  description?: string
  children: ReactNode
  className?: string
  action?: ReactNode
}

export function DataCard({ title, description, children, className = "", action }: DataCardProps) {
  return (
    <div className={`rounded-xl border bg-card text-card-foreground shadow-sm ${className}`}>
      {(title || action) && (
        <div className="flex flex-row items-center justify-between border-b p-6">
          <div className="flex flex-col space-y-1.5">
            {title && <h3 className="font-semibold leading-none tracking-tight">{title}</h3>}
            {description && <p className="text-sm text-muted-foreground">{description}</p>}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      <div className="p-6">
        {children}
      </div>
    </div>
  )
}
