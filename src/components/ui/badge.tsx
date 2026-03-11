import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-foreground text-background shadow-sm",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground",
        outline: "text-foreground border-border",
        levelA:
          "border-transparent bg-level-a text-white shadow-sm",
        levelB:
          "border-transparent bg-level-b text-white shadow-sm",
        levelC:
          "border-transparent bg-level-c text-white shadow-sm",
        indigo:
          "border-transparent bg-level-a-light text-level-a-dark",
        emerald:
          "border-transparent bg-level-b-light text-level-b-dark",
        amber:
          "border-transparent bg-level-c-light text-level-c-dark",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
