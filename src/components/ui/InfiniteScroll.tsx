import { useRef, type ReactNode, useEffect } from "react";

export const InfiniteScroll = ({ onBottom, children }: { onBottom: () => void, children: ReactNode }) => {
    const bottomRef = useRef<HTMLSpanElement>(null)

    useEffect(() => {
        if (!bottomRef.current) return

        const el = bottomRef.current

        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) onBottom()
        }, {
            threshold: 0,
            root: bottomRef.current.parentElement?.parentElement
        })

        observer.observe(el)

        return () => {
            observer.unobserve(el)
        }
    }, [onBottom])

    return <>
        { children }
        <span ref={bottomRef} />
    </>
}