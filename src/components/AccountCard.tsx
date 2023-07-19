import { type User } from "next-auth";
import { Avatar } from "./ui/Avatar";
import { buttonVariants } from "./ui/Button";
import Link from "next/link";
import cn from "@/utils/cn";

export default function AccountCard({ user }: { user: User & { username: string } }) {
    return <Link href={`/${user.username}`} className={cn(buttonVariants({ className: "flex items-center gap-3 px-2", type: 'ghost' }))}>
        <Avatar src={user.image} alt={`${user.name}'s avatar`} />
        <div className="hidden xl:block text-left">
            <div className="font-medium">{ user.name ?? 'User' }</div>
            <p className="text-gray-400 text-sm">{ user.username ?? 'No email' }</p>
        </div>
    </Link>
}