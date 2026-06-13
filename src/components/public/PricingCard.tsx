import Link from "next/link"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PricingCardProps {
  name: string
  price: string
  description: string
  features: string[]
  isPopular?: boolean
  ctaText: string
  ctaHref: string
}

export function PricingCard({
  name,
  price,
  description,
  features,
  isPopular,
  ctaText,
  ctaHref,
}: PricingCardProps) {
  return (
    <div className={`relative flex flex-col rounded-2xl border bg-card p-6 shadow-sm ${isPopular ? "border-primary ring-1 ring-primary" : "border-border"}`}>
      {isPopular && (
        <div className="absolute -top-3 left-0 right-0 mx-auto w-fit rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
          Most Popular
        </div>
      )}
      <div className="mb-5">
        <h3 className="text-lg font-semibold text-foreground">{name}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="mb-6 flex items-baseline text-3xl font-bold text-foreground">
        {price}
        {price !== "Custom" && <span className="ml-1 text-sm font-medium text-muted-foreground">/mo</span>}
      </div>
      <ul className="mb-6 flex flex-col gap-3 flex-1 text-sm text-muted-foreground">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3">
            <Check className="h-4 w-4 shrink-0 text-primary mt-0.5" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <Link href={ctaHref} className="w-full mt-auto">
        <Button variant={isPopular ? "default" : "outline"} className="w-full">
          {ctaText}
        </Button>
      </Link>
    </div>
  )
}
