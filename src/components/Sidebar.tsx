import Link from "next/link";
import { TwitterLogo } from "./ui/Icons";
import SidebarNavLink from "./ui/SidebarNavLink";
import { Icon } from "./ui/Icon";
import { buttonVariants } from "./ui/Button";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AccountCard from "./AccountCard";
import TweetButton from "./TweetButton";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import cn from "@/utils/cn";

const navItems: { name: string, icon: string, path: string, loggedOut?: boolean }[] = [
    { name: "Home", icon: 'home', path: '/' },
    { name: "Explore", icon: 'explore', path: '/explore', loggedOut: true },
    { name: "Notifications", icon: 'notifications', path: '/notifications' },
    { name: "Messages", icon: 'mail', path: '/messages' },
    { name: "Bookmarks", icon: 'bookmark', path: '/bookmarks' },
    { name: "Top Articles", icon: 'local_fire_department', path: '/top' },
    { name: "Profile", icon: 'person', path: '/profile' }
]

export default async function Sidebar() {
    const session = await getServerSession(authOptions)
    const url = headers().get('x-url')

    if (!session?.user && url !== 'http://localhost:3000/explore' && url !== 'http://localhost:3000/settings') redirect('/explore')
    
    return <div className="max-w-[100px] max-xl:items-center xl:max-w-xs w-full h-screen p-4 flex flex-col">
        <Link className='min-h-[56px] w-14 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors' href='/'>
            <TwitterLogo className="text-2xl" />
        </Link>
        <nav className="flex flex-col max-xl:items-center">
            { navItems.map(it => session?.user || it.loggedOut ? <SidebarNavLink icon={it.icon} name={it.name} path={it.path} key={it.path}/> : null) }
            <button className={cn(buttonVariants({ type: 'ghost', className: 'w-fit font-medium xl:pr-5 max-xl:w-14 max-xl:h-14 max-xl:justify-center' }))}>
                <Icon className="text-3xl font-light">more_horiz</Icon>
                <p className="hidden xl:block">More</p>
            </button>
            { session?.user ? <TweetButton user={session.user} /> : null }
        </nav>
        <span className="flex-1"/>
        { session?.user ? <AccountCard user={session.user} /> : null }
    </div>
}