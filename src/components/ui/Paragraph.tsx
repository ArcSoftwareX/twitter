import cn from "@/utils/cn";
import { VariantProps, cva } from "class-variance-authority";
import { HTMLAttributes, forwardRef } from "react";

export const paragraphVariants = cva('', {
    variants: {
        type: {
            default: 'text-base font-medium text-white',
            secondary: 'text-base text-gray-200',
            tertiary: 'text-sm font-medium text-gray-500',
            invisible: 'text-xs font-semibold text-gray-600'
        }
    },
    defaultVariants: {
        type: 'default'
    }
})

interface ParahraphProps extends HTMLAttributes<HTMLParagraphElement>, VariantProps<typeof paragraphVariants> {}

export const Parahraph = forwardRef<HTMLParagraphElement, ParahraphProps>(function Paragraph({ children, type, className, ...props }, ref) {
    return <p className={cn(paragraphVariants({ type, className }))} ref={ref} {...props}>{ children }</p>
})