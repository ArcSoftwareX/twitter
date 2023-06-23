import cn from "@/utils/cn";
import { HTMLAttributes, forwardRef } from "react";
import { Icon } from "./Icon";
import { VariantProps, cva } from "class-variance-authority";

export const inputVariants = cva('rounded-full placeholder:text-neutral-500 bg-neutral-400/10 focus-within:bg-black/10 focus-within:border-blue-500 border-transparent border ring-blue-500/20 focus-within:ring-4 transition-all flex flex-row-reverse items-center', {
    variants: {
        size: {
            sm: 'px-3 py-2 text-sm gap-3',
            md: 'px-4 py-2 text-base gap-3',
            lg: 'px-4 py-3 text-base gap-4'
        }
    },
    defaultVariants: {
        size: 'md'
    }
})

interface InputProps extends HTMLAttributes<HTMLInputElement>, VariantProps<typeof inputVariants> {
    icon?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input({ icon, size, className, ...props }, ref) {
    if (!icon) return <input ref={ref} {...props} className={cn(inputVariants({ size, className }))} /> // 'bg-neutral-400/10 focus:bg-white/10 rounded-full px-3 py-2 text-sm transition-colors placeholder:text-neutral-500'

    return <div className={cn(inputVariants({ size, className }))}> { /*"bg-neutral-400/10 focus-within:bg-black/10 focus-within:border-blue-500 border-transparent border ring-blue-500/20 focus-within:ring-4 rounded-full flex items-center flex-row-reverse gap-3 px-4 py-3 text-base transition-all" */ }
        <input className={cn('bg-transparent placeholder:text-neutral-500 peer', className)} {...props} ref={ref} />
        <Icon className="scale-150 text-neutral-500 peer-focus:text-neutral-400 transition-colors">{ icon }</Icon>
    </div>
})