import cn from "@/utils/cn";
import { HTMLAttributes, forwardRef } from "react";

export interface TextAreaProps extends HTMLAttributes<HTMLTextAreaElement> {}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(function TextArea({ className, ...props }, ref) {
    return <textarea ref={ref} className={cn('px-3 py-2 rounded-xl placeholder:text-neutral-500 bg-neutral-400/10 focus-within:bg-black/10 focus-within:border-blue-500 border-transparent border ring-blue-500/20 focus-within:ring-4 transition-all outline-none', className)} {...props} />
})