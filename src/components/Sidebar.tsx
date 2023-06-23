import Link from "next/link";
import { TwitterLogo } from "./ui/Icons";
import SidebarNavLink, { sidebarNavLinkStyles } from "./ui/SidebarNavLink";
import { Icon } from "./ui/Icon";
import { Button } from "./ui/Button";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AccountCard from "./AccountCard";
import TweetButton from "./TweetButton";

const navItems: { name: string, icon: string, path: string }[] = [
    { name: "Home", icon: 'home', path: '/' },
    { name: "Explore", icon: 'tag', path: '/explore' },
    { name: "Notifications", icon: 'notifications', path: '/notifications' },
    { name: "Messages", icon: 'mail', path: '/messages' },
    { name: "Bookmarks", icon: 'bookmark', path: '/bookmarks' },
    { name: "Top Articles", icon: 'local_fire_department', path: '/top' },
    { name: "Profile", icon: 'person', path: '/profile' }
]

export default async function Sidebar() {
    const session = await getServerSession(authOptions)
    
    return <div className="max-w-xs w-full h-screen p-8 flex flex-col">
        <Link href='/'>
            <TwitterLogo className="text-2xl mb-6" />
        </Link>
        <nav>
            { navItems.map(it => <SidebarNavLink icon={it.icon} name={it.name} path={it.path} key={it.path}/>) }
            <button className={sidebarNavLinkStyles}>
                <Icon className="text-3xl font-light">more_horiz</Icon>
                More
            </button>
            { session?.user ? <TweetButton user={session.user} /> : null }
        </nav>
        <span className="flex-1"/>
        { session?.user ? <AccountCard user={session.user} /> : null }
    </div>
}