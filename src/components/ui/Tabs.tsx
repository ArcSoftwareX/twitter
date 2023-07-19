'use client'

import { usePathname } from "next/navigation"

export interface Tab {
    name: string,
    activeUrl?: string
}

export interface TabsProps {
    tabs: Tab[],
    onTabChange?: (idx: number) => void
}

export const Tabs = ({ tabs, onTabChange }: TabsProps) => {
    const pathname = usePathname()

    return <div>
        { tabs.map((tab, idx) => <button onClick={() => onTabChange ? onTabChange(idx) : null} key={idx}>{ tab.name }{ pathname === tab.activeUrl ? ' active' : null }</button>) }
    </div>
}