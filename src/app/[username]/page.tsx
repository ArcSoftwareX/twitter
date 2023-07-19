import { Avatar } from "@/components/ui/Avatar";
import { User, getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { viewUser } from "../api/users/[username]/route";
import { buttonVariants } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import Link from "next/link";
import cn from "@/utils/cn";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { Tab } from "@/components/ui/Tabs"
import { LogoutButton } from "@/components/LogoutButton";

// const tabs: Tab[] = [
//     { name: 'Tweets', activeUrl: '/' },
//     { name: 'Retweets', activeUrl: '/' },
// ]

export default async function User({ params }: { params: { username: string } }) {
    const session = await getServerSession(authOptions)
    const user = await viewUser(params.username)

    if (!user) redirect('/')

    return <main className="w-full">
        <div className="flex items-center gap-4 px-3 h-[60px]">
            <Link href='/' type='ghost' className={cn(buttonVariants({ type: 'ghost', className: "h-[40px] w-[40px] text-2xl text-blue-500 flex items-center justify-center" }))}>
                <Icon>arrow_back</Icon>
            </Link>
            <div>
                <h2 className="font-bold text-lg">{ user.name }</h2>
                <p className="text-sm text-gray-400">{ user._count.Tweets } Tweets</p>
            </div>
        </div>
        <div className="w-full bg-neutral-800 h-40 px-6 mb-14 relative">
            <Avatar size={100} alt="Your avatar" className="translate-y-[110px] border-4 border-neutral-950" src={user.image} />
            { session?.user.id === user.id ? <div className="flex items-stretch gap-2 absolute -bottom-16 right-4 z-10">
                <Link href='/edit' className={cn(buttonVariants({ type: 'secondary', size: 'sm' }))}>Edit Profile</Link>
                <LogoutButton />
            </div> : null }
        </div>
        <div className="px-4 relative">
            <h1 className="font-bold text-lg">{ user.name }</h1>
            <p className="text-sm text-gray-400 mb-4">@{ params.username }</p>
            { user.bio ? <div className="text-[15px]">{ user.bio }</div> : <div className="text-sm font-semibold text-neutral-500">No bio provided</div> }
            <div className="flex items-center gap-2 my-6">
                <div className="flex items-center justify-center gap-2 text-gray-400">
                    <Icon className="text-xl">calendar_month</Icon>
                    <p className="text-sm font-medium">Joined on { user.createdAt.toDateString() }</p>
                </div>
            </div>
            <div className="flex items-center gap-10 flex-wrap">
                <p className="text-sm text-gray-400"><span className="text-white font-bold mr-1">{ user._count.following }</span> Following</p>
                <p className="text-sm text-gray-400"><span className="text-white font-bold mr-1">{ user._count.followers }</span> Followers</p>
            </div>
            {/* <Tabs tabs={tabs} /> */}
        </div>
    </main>
}