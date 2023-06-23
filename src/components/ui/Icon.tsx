import cn from "@/utils/cn";
import { HTMLAttributes, forwardRef } from "react";

interface IconProps extends HTMLAttributes<HTMLSpanElement> {
    filled?: boolean
}

export const Icon = forwardRef<HTMLSpanElement, IconProps>(function Icon({ filled, children, className, ...props }, ref) {
    return <span className={cn('font-icon select-none', className)} style={{ fontVariationSettings: filled ? `'FILL' ${Number(filled)}` : '' }} {...props} ref={ref}>{ children }</span>
})