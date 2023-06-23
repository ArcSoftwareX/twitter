import { type HTMLAttributes, forwardRef } from "react";
import { cva, type VariantProps } from 'class-variance-authority'
import cn from "@/utils/cn";

const headingVariants = cva('', {
    variants: {
        type: {
            primary: 'font-semibold text-xl text-black',
            secondary: 'font-semibold text-lg text-neutral-200',
            tertiary: 'font-medium text-base text-neutral-400'
        }
    },
    defaultVariants: {
        type: 'secondary'
    }
})

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement>, VariantProps<typeof headingVariants> {}

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(function Heading({ type, children, className, ...props }, ref) {
    return <h1 ref={ref} className={cn(headingVariants({ type, className }))} {...props}>{ children }</h1>
})