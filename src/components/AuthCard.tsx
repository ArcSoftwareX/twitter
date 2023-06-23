import AuthProviderButton from "./AuthProviderButton";
import { Card } from "./ui/Card";
import { Heading } from "./ui/Heading";
import { Parahraph } from "./ui/Paragraph";
import { getProviders } from 'next-auth/react'

export default async function AuthCard() {
    const providers = await getProviders()

    if (!providers) return <Card type='error' className="mt-8">
        <Parahraph>Whoops! Failed to load providers</Parahraph>
    </Card>


    return <Card type='outline' className="mt-8">
        <Heading className="mb-1">New to Twitter?</Heading>
        <Parahraph type='tertiary' className="mb-4">Sign up now to get your own personalized timeline!</Parahraph>
        { Object.entries(providers).map(([key, provider]) => <AuthProviderButton provider={provider} key={key} />) }
        <Parahraph type='invisible'>By signing up, you agree to the Terms of Service and Privacy Policy, including Cookie Use.</Parahraph>
    </Card>
}