'use client'

import type { Tweet, User } from "@prisma/client";
import dynamic from "next/dynamic";
import { useRef, type UIEvent, memo } from "react";
import { Skeleton } from "./ui/Skeleton";
import { useInfiniteQuery } from "@tanstack/react-query";

const TweetCard = dynamic(() => import('./TweetCard'), {
    ssr: false,
    loading: () => <Skeleton className="h-20 w-full" />
})

const TweetsList = ({ tweets }: { tweets: (Tweet & { user: User })[] }) => {
    const topRef = useRef<HTMLDivElement>(null)
    const bottomRef = useRef<HTMLDivElement>(null)

    const { data, isFetchingNextPage, hasNextPage, fetchNextPage } = useInfiniteQuery<(Tweet & { user: User })[]>(['tweets'], getTweets, {
        getNextPageParam: (_, pages) => {
            if (typeof pages[pages.length - 1] !== 'undefined' && Array.isArray(pages[pages.length - 1])) return pages.length
            return undefined
        },
        initialData: () => {
            return {
                pages: [tweets],
                pageParams: []
            }
        },
    })

    const handleWindowScroll = (e: UIEvent) => {
        if (!topRef.current || !bottomRef.current) return

        const top = e.currentTarget.scrollTop
        const bottom = e.currentTarget.scrollHeight - e.currentTarget.scrollTop - e.currentTarget.clientHeight

        if (top > 20) topRef.current.style.opacity = '100'
        else topRef.current.style.opacity = '0'

        if (bottom > 20) bottomRef.current.style.opacity = '100'
        else bottomRef.current.style.opacity = '0'
    }

    return <div onScroll={handleWindowScroll} className="w-full min-h-full max-h-screen overflow-y-scroll scrollbar-hidden py-8 pr-1">
        <div className="relative h-full w-full flex flex-col gap-3">
            <div ref={topRef} className="absolute -top-8 inset-x-0 bg-gradient-to-b from-neutral-950/70 to-transparent h-48 opacity-0 transition-opacity duration-500 pointer-events-none" />
            { data?.pages.map(page => {
                if (page) return page.map(tweet => <TweetCard key={tweet.id} tweet={tweet} />)
                return null
            }) }
            { hasNextPage ? <div onClick={() => fetchNextPage()}>click to fetch more</div> : 'no next page :(' }
            { isFetchingNextPage ? 'fetching next page' : 'not fetching' }
            <div ref={bottomRef} className="absolute -bottom-8 inset-x-0 bg-gradient-to-t from-neutral-950/70 to-transparent h-48 opacity-0 transition-opacity duration-500 pointer-events-none" />
        </div>
    </div>
}

export default memo(TweetsList)

const getTweets = async ({ pageParam = 0 }) => {
    const resp = await fetch(`/api/tweets?page=${pageParam}`)
    return (await resp.json()).tweets
}