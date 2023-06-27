import { type User } from "next-auth";
import Avatar from "./ui/Avatar";
import { Button } from "./ui/Button";

export default function AccountCard({ user }: { user: User }) {
    return <Button type='ghost' className="flex items-center gap-3 px-2">
        <Avatar src={user.image} alt={`${user.name}'s avatar`} />
        <div className="hidden xl:block text-left">
            <div className="font-medium">{ user.name ?? 'User' }</div>
            <p className="text-gray-400 text-sm">{ user.email ?? 'No email' }</p>
        </div>
    </Button>
}