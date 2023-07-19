'use client'

import { Avatar } from "@/components/ui/Avatar"
import { Input } from "@/components/ui/Input"
import { TextArea } from "@/components/ui/TextArea"
import { type User } from '@prisma/client'
import { Button } from "./ui/Button"
import { useMutation } from "@tanstack/react-query"
import { useRef } from "react"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"

export function EditUserPage({ user }: { user: User }) {
    const { replace } = useRouter()

    const nameRef = useRef<HTMLInputElement>(null)
    const usernameRef = useRef<HTMLInputElement>(null)
    const bioRef = useRef<HTMLTextAreaElement>(null)

    const currentLoaderId = useRef<string | null>(null)

    const createMutation = useMutation({
        mutationFn: () => saveUserData(user.username, nameRef.current?.value, usernameRef.current?.value, bioRef.current?.value),
        onSuccess() {
            toast.dismiss(currentLoaderId.current ?? '')
            currentLoaderId.current = null
            toast.success('Changes saved successfully')
            replace(`/${usernameRef.current?.value ?? ''}`)
        },
        onError(e: Error) {
            toast.dismiss(currentLoaderId.current ?? '')
            currentLoaderId.current = null
            toast.error(e.message)
        },
        onMutate() {
            currentLoaderId.current = toast.loading('Saving...')
        }
    })


    return <>
        <div className="w-full bg-neutral-800 h-40 px-6 mb-14 relative">
            <Avatar size={100} alt="Your avatar" className="translate-y-[110px] border-4 border-neutral-950" src={user.image} />
            <Button onClick={() => createMutation.mutateAsync()} type='primary' size='sm' className='absolute -bottom-16 right-4 z-10'>Save data</Button>
        </div>
        <div className="px-4 relative">
            <Input ref={nameRef} className="font-bold text-lg w-80 mb-2" placeholder="Name" defaultValue={user.name ?? ''} />
            <Input ref={usernameRef} className="w-80" size='sm' icon="alternate_email" placeholder="Username" defaultValue={user.username} />
            <TextArea ref={bioRef} className="resize-none w-80 h-40 mt-4" placeholder="Bio" defaultValue={user.bio ?? ''} />
        </div>
    </>
}

const saveUserData = async (forUser: string, name: string | undefined, username: string | undefined, bio: string | undefined) => {
    if (!name || name.length === 0) throw new Error('Name cannot be empty')
    if (!username || username.length === 0) throw new Error('Username cannot be empty')

    const res = await fetch(`/api/users/${forUser}`, {
        method: 'POST',
        body: JSON.stringify({ name, username, bio: bio && bio.length ? bio : null })
    })

    return await res.json()
}