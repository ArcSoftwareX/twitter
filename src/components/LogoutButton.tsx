'use client'

import { signOut } from "next-auth/react"
import { Button } from "./ui/Button"
import { Icon } from "./ui/Icon"

export const LogoutButton = () => {
    return <Button onClick={() => signOut()} type='destructive' className="h-10 w-10 flex items-center justify-center">
        <Icon>logout</Icon>
    </Button>
}