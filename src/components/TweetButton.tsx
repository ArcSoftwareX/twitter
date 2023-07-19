'use client'

import { Button } from "./ui/Button"
import { User } from "next-auth"
import { useRef, useState } from "react"
import { Icon } from "./ui/Icon"
import toast from 'react-hot-toast'
import TweetModal from "./TweetModal"
import { useMutation, useQueryClient } from "@tanstack/react-query"

const createTweet = async (tweetText: string) => {
    const text = tweetText.trim()

    if (!text.length) throw new Error("Tweet should not be empty")

    if (text.length > 280) throw new Error(`Tweet is too long (${text.length} chars)`)

    await fetch('/api/tweets/new', {
        method: 'POST',
        body: JSON.stringify({
            text
        })
    })

    return true
}

export default function TweetButton({ user }: { user: User }) {
    const [modalOpened, setModalOpened] = useState(false)
    const [tweetText, setTweetText] = useState('')

    const currentLoaderId = useRef<string | null>()

    const queryClient = useQueryClient()

    const tweetMutation = useMutation({
        mutationFn: () => createTweet(tweetText),
        onMutate: () => {
            currentLoaderId.current = toast.loading('Creating tweet...')
        },
        onSuccess: () => {
            toast.dismiss(currentLoaderId.current ?? '')
            toast.success('Created tweet')
            currentLoaderId.current = null
            queryClient.invalidateQueries(['tweets'])
            setModalOpened(false)
        },
        onError: (e: Error) => {
            toast.dismiss(currentLoaderId.current ?? '')
            toast.error(e.message)
            currentLoaderId.current = null
        }
    })

    const tweetHandler = () => {
        tweetMutation.mutateAsync()
    }

    return <>
        <Button onClick={() => setModalOpened(true)} className="w-full mt-4 xl:mt-8 max-xl:w-14 max-xl:h-14 max-xl:justify-center">
            <p className="hidden xl:block">Tweet</p>
            <Icon className="block xl:hidden scale-150">stylus_note</Icon>
        </Button>

        { modalOpened ? <TweetModal text={tweetText} updateText={(text: string) => setTweetText(text)} user={user} close={() => setModalOpened(false)} tweet={tweetHandler} /> : null }
    </>
}