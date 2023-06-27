import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from 'next-auth/next'
import { Button } from "./ui/Button";
import { Card } from "./ui/Card";
import { Heading } from "./ui/Heading";
import { Input } from "./ui/Input";
import AuthCard from "./AuthCard";

export default async function RightSidebar() {
    const session = await getServerSession(authOptions)

    return <div className="xl:max-w-md max-w-[40%] w-full h-full p-8">
        <Input placeholder="Search Twitter" className="w-full" icon="search" />
        { session ?
        <Card className="mt-10">
            <Heading className="mb-2">Who to follow</Heading>
            <Button type='tertiary' size='sm' className="p-0">Show more</Button>
        </Card> :
        <AuthCard /> }
    </div>
}