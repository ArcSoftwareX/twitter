import { Button } from "./ui/Button"
import { Modal } from "./ui/Modal"
import { Icon } from "./ui/Icon"
import { Dropdown } from "./ui/Dropdown"
import { Parahraph } from "./ui/Paragraph"
import { Avatar } from "./ui/Avatar"
import { type User } from "next-auth"
import { useEffect, useRef } from "react"

export default function TweetModal({ close, user, tweet, updateText, text }: { close: () => void, user: User, tweet: () => void, updateText: (to: string) => void, text: string }) {
    const inputRef = useRef<HTMLTextAreaElement>(null)

    const autoresize = (element: HTMLElement) => {
        element.style.height = 'auto'
        element.style.height = element.scrollHeight + 'px'
    }

    useEffect(() => {
        if (!inputRef.current) return

        autoresize(inputRef.current)
    }, [])

    useEffect(() => {
        if (!inputRef.current) return

        autoresize(inputRef.current)
    }, [text])
    
    return <Modal close={close}>
        <div className="w-full absolute top-0 inset-x-0 p-1.5 flex justify-between">
            <button onClick={close} className="w-9 h-9 rounded-full hover:bg-white/10 text-lg flex items-center justify-center transition-colors">
                <Icon className="font-light text-xl">close</Icon>
            </button>
        </div>
        <div className="flex gap-3 pt-12">
            <Avatar src={user.image} alt={`${user.name}'s avatar`} />
            <div className="w-full">
                <Dropdown options={[{ name: 'Everyone', icon: 'public' }, { name: 'Twitter Circle', icon: 'person_add' }]} className="mb-4" onOptionChange={console.log} />
                <textarea value={text} onChange={e => updateText(e.target.value)} ref={inputRef} placeholder="What's happening?" className="w-full bg-transparent outline-none resize-none max-h-[64vh] scrollbar-pretty" />
            </div>
        </div>
        <hr className="my-3 h-[1px] w-full bg-gray-800 border-0" />
        <div className="flex items-center justify-between ml-[60px]">
            <Parahraph type='invisible'>This is not done yet</Parahraph>
            <Button onClick={tweet}>Tweet</Button>
        </div>
    </Modal>
}