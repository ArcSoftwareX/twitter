'use client'

import { Button } from "./ui/Button"
import TweetModal from "./TweetModal"
import { useState } from "react"
import { User } from "next-auth"

export default function TweetButton({ user }: { user: User }) {
    const [tweetModalOpened, setTweetModalOpened] = useState(false)
    
    return <>
        <Button onClick={() => setTweetModalOpened(true)} className="w-full mt-8">Tweet</Button>

        { tweetModalOpened ? <TweetModal user={user} close={() => setTweetModalOpened(false)} /> : null }
    </>
}