import cn from "@/utils/cn"
import { VariantProps, cva } from "class-variance-authority"
import { HTMLAttributes, forwardRef } from "react"

export const cardVariants = cva('rounded-2xl', {
    variants: {
        type: {
            default: 'bg-neutral-200/10',
            outline: 'bg-transparent border border-neutral-800',
            error: 'bg-red-500/30 border border-red-500',
        },
        padding: {
            default: 'p-4',
            zero: 'p-0'
        }
    },
    defaultVariants: {
        type: 'default',
        padding: 'default'
    }
})

interface CardProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {}

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card({ type, padding, children, className, ...props }, ref) {
    return <div className={cn(cardVariants({ type, padding, className }), className)} ref={ref} {...props}>{ children }</div>
})