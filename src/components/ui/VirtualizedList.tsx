import { throttle } from "@/lib/throttle"
import { useCallback, useEffect, useState } from "react"

export const VirtualizedList = ({ rowHeight, count, wrapper }: { rowHeight: number, count: number, wrapper: HTMLElement }) => {
    const listHeight = rowHeight * count
    const [currentScroll, setCurrentScroll] = useState(wrapper.scrollTop)

    const setScrollPosition = throttle((pos: number) => {
        setCurrentScroll(pos)
        console.log('set pos to: ' + pos);
    }, 50)

    const handleScroll = useCallback(() => {
        setScrollPosition(wrapper.scrollTop)
        console.log('handle scroll with:', wrapper.scrollTop);
    }, [setScrollPosition, wrapper.scrollTop])

    useEffect(() => {
        wrapper.addEventListener('scroll', handleScroll)

        console.log('ASSIGN EV LISTENER TO WRAPPER');

        return () => {
            wrapper.removeEventListener('scroll', handleScroll)
        }
    }, [handleScroll, wrapper])

    return <div style={{ height: listHeight }}>
        this is a list
    </div>
}