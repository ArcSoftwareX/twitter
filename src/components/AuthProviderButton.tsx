'use client'

import { type ClientSafeProvider, signIn } from "next-auth/react";
import { Button } from "./ui/Button";
import { GithubLogo, GoogleLogo } from "./ui/Icons";

export default function AuthProviderButton({ provider }: { provider: ClientSafeProvider }) {
    return <Button key={provider.id} onClick={() => signIn(provider.id)} className="w-full mb-4" size='sm' type='secondary'>
        <ProviderLogo provider={provider.id} />
        Sign up with { provider.name }
    </Button>
}

const ProviderLogo = ({ provider }: { provider: string }) => {
    switch (provider) {
        case 'google': return <GoogleLogo className="text-lg" />
        case 'github': return <GithubLogo className="text-lg" />
        default: return null
    }
}