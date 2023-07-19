import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from 'next-auth/next'
import { Button } from "./ui/Button";
import { Card } from "./ui/Card";
import { Heading } from "./ui/Heading";
import { Input } from "./ui/Input";
import AuthCard from "./AuthCard";
import { User } from "@prisma/client";
import Link from "next/link";
import { Avatar } from "./ui/Avatar";

export default async function RightSidebar() {
    const session = await getServerSession(authOptions)
    const popularUsers: User[] = await getMostPopular()

    return <div className="xl:max-w-md max-w-[40%] w-full h-full p-8">
        <Input placeholder="Search Twitter" className="w-full" icon="search" />
        { session ?
        <Card padding='zero' className="mt-10 overflow-hidden">
            <Heading className="px-4 py-3">Who to follow</Heading>
            { popularUsers.map(user => <Link href={`/${user.username}`} key={user.id} className="py-2.5 px-4 flex items-center hover:bg-gray-400/10 transition-colors">
                <Avatar src={user.image} alt={`${user.name}'s avatar`} className="mr-2.5" />
                <div>
                    <div className="font-semibold text-[15px]">{ user.name }</div>
                    <p className="text-[15px] text-gray-400 w-[70%] whitespace-nowrap overflow-ellipsis overflow-hidden">@{ user.username }</p>
                </div>
                <span className="flex-1" />
                <Button type='secondary' size='sm'>Follow</Button>
            </Link>) }
            <Button type='tertiary' size='sm' className="w-full py-3.5 px-4 justify-start rounded-none">Show more</Button>
        </Card> :
        <AuthCard /> }
    </div>
}

const getMostPopular = async (count = 3) => {
    const resp = await fetch(`http://localhost:3000/api/users/popular?count=${count}`)
    const res = await resp.json()
    return res.users
}