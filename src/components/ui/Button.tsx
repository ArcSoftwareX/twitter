import cn from '@/utils/cn'
import { cva, type VariantProps } from 'class-variance-authority'
import { type HTMLAttributes, forwardRef } from 'react'

export const buttonVariants = cva('outline-none rounded-full transition-all flex items-center justify-center gap-3', {
    variants: {
        type: {
            primary: 'bg-blue-500 hover:bg-blue-600 font-medium',
            secondary: 'bg-neutral-900 hover:bg-neutral-800 font-medium',
            tertiary: 'bg-transparent text-blue-500 hover:text-blue-600',
            ghost: 'bg-transparent hover:bg-neutral-800'
        },
        size: {
            xs: 'py-1.5 px-2 text-sm',
            sm: 'py-2.5 px-y text-sm',
            md: 'py-2 px-4 text-base',
            lg: 'py-2.5 px-3.5 text-base'
        }
    },
    defaultVariants: {
        type: 'primary',
        size: 'md'
    }
})

interface ButtonProps extends HTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button({ className, children, type, size, ...props }, ref) {
    return <button className={cn(buttonVariants({ type, size, className }))} ref={ref} {...props}>{ children }</button>
})