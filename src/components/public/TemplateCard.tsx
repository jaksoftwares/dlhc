import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

interface TemplateCardProps {
  id: string
  name: string
  category: string
  thumbnailUrl: string
  actionHref?: string
}

export function TemplateCard({ id, name, category, thumbnailUrl, actionHref }: TemplateCardProps) {
  const href = actionHref || `/login?redirect=/templates/${id}`
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border bg-card transition-all hover:shadow-md">
      {/* Thumbnail Container */}
      <div className="relative aspect-[1/1.4] w-full bg-muted/50 border-b">
        {/* Placeholder if no real thumbnail */}
        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/20">
          <span className="text-4xl">📄</span>
        </div>
        {thumbnailUrl && (
          <Image
            src={thumbnailUrl}
            alt={`${name} preview`}
            fill
            className="object-cover object-top opacity-0 transition-opacity duration-300"
            onLoad={(e) => (e.currentTarget.style.opacity = "1")}
          />
        )}
        
        {/* Hover Overlay Actions */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/5 opacity-0 backdrop-blur-[1px] transition-all group-hover:opacity-100">
          <div className="flex gap-2 opacity-0 translate-y-2 transition-all group-hover:opacity-100 group-hover:translate-y-0">
            <Button size="sm" variant="secondary" className="h-8 gap-1.5 shadow-sm">
              Preview <ExternalLink className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Meta */}
      <div className="flex flex-col p-4">
        <div className="mb-1 flex items-center justify-between">
          <h3 className="font-medium text-foreground truncate" title={name}>{name}</h3>
        </div>
        <p className="text-xs text-muted-foreground">{category}</p>
        <Link href={href} className="mt-4">
          <Button variant="outline" className="w-full h-8 text-xs">Use Template</Button>
        </Link>
      </div>
    </div>
  )
}
