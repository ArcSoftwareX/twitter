'use client'

import cn from "@/utils/cn";
import Link from "next/link";
import { usePathname } from 'next/navigation'
import { type HTMLAttributes, forwardRef } from "react";

interface NavLinkProps extends HTMLAttributes<HTMLAnchorElement> {
    href: string,
    activeClass?: string
}

export const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(function NavLink({ children, href, className, activeClass, ...props }, ref) {
    const active = usePathname() === href
    return <Link href={href} ref={ref} data-active={active} className={cn(active ? activeClass : '', className)} {...props}>{ children }</Link>
})