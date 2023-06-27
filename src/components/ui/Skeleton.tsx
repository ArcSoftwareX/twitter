import cn from "@/utils/cn";
import { HTMLAttributes, forwardRef } from "react";
import styles from './styles/Skeletion.module.css'

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {}

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(function Skeleton({ className, ...props }, ref) {
    return <div className={cn(styles.skeleton, 'rounded-xl', className)} ref={ref} {...props} />
})