import { type User } from "next-auth";
import Image from "next/image";
import { Icon } from "./ui/Icon";

export default function AccountCard({ user }: { user: User }) {
    return <div className="flex items-center gap-3">
        <div className="rounded-full overflow-hidden bg-neutral-800 h-10 w-10 flex items-center justify-center">
            { user.image ? <Image src={user.image} alt={`${user.name}'s avatar`} height={40} width={40} /> : <Icon>person</Icon> }
        </div>
        <div>
            <div className="font-medium">{ user.name ?? 'User' }</div>
            <p className="text-gray-400 text-sm">{ user.email ?? 'No email' }</p>
        </div>
    </div>
}