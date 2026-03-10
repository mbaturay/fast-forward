import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-gray-900 text-white shadow",
        secondary:
          "border-transparent bg-gray-100 text-gray-900",
        outline: "text-gray-950",
        levelA:
          "border-transparent bg-indigo-500 text-white shadow-sm",
        levelB:
          "border-transparent bg-emerald-500 text-white shadow-sm",
        levelC:
          "border-transparent bg-amber-500 text-white shadow-sm",
        indigo:
          "border-transparent bg-indigo-100 text-indigo-800",
        emerald:
          "border-transparent bg-emerald-100 text-emerald-800",
        amber:
          "border-transparent bg-amber-100 text-amber-800",
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
