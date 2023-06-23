'use client'

import { type User } from "next-auth"
import { Icon } from "./ui/Icon"
import Image from "next/image"
import { createPortal } from "react-dom"

export default function TwitModal({ close, user }: { close: () => void, user: User }) {
    return createPortal(
        <div className="overlay">
            <div className="modal-container">
                <button onClick={close} className="absolute top-1.5 left-1.5 w-9 h-9 rounded-full hover:bg-white/10 text-lg flex items-center justify-center transition-colors">
                    <Icon>close</Icon>
                </button>
                <div className="flex gap-3">
                    <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center">
                        { user.image ? <Image src={user.image} alt={`${user.name}'s avatar`} height={40} width={40} /> : <Icon>person</Icon> }
                    </div>
                </div>
            </div>
        </div>,
        document.body
    )
}