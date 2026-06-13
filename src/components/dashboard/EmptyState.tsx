import { ReactNode } from "react"
import { FileQuestion } from "lucide-react"

interface EmptyStateProps {
  title: string
  description: string
  icon?: ReactNode
  action?: ReactNode
}

export function EmptyState({ title, description, icon, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed p-12 text-center bg-card shadow-sm">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted/50 mb-4 text-muted-foreground">
        {icon || <FileQuestion className="h-6 w-6" />}
      </div>
      <h3 className="mt-2 text-lg font-semibold text-foreground">{title}</h3>
      <p className="mt-2 mb-6 text-sm text-muted-foreground max-w-sm mx-auto">
        {description}
      </p>
      {action && <div>{action}</div>}
    </div>
  )
}
