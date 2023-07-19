import { Card } from "./ui/Card";
import { Avatar } from "./ui/Avatar";
import Link from "next/link";
import { timeSince } from "@/lib/timeUtils";
import { User } from "./TweetsList";
import { Icon } from "./ui/Icon";
import { type Tweet } from "@/types/types";

export default function TweetCard({ tweet }: { tweet: Tweet & { user: User } }) {
    return <Card className="flex gap-3 shadow-xl shadow-neutral-800/10" type='outline'>
        <Avatar src={tweet.user.image} alt={`${tweet.user.name}'s avatar`} />
        <div>
            <div className="flex items-center gap-2">
                <Link href={`/${tweet.user.username}`} className="font-semibold hover:underline text-[15px]">{ tweet.user.name }</Link>
                <span className="flex items-center gap-2 text-neutral-600 text-[15px] font-medium">
                    <div className="rounded-full h-1 w-1 bg-neutral-600" />
                    <p>{ timeSince(new Date(tweet.createdAt).valueOf()) }</p>
                </span>
            </div>
            <p className="text-[15px] mt-1">{ tweet.text }</p>
            <div className="flex items-center gap-8 -mb-2 mt-2">
            <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 transition-colors">
                    <Icon className="text-xl">chat_bubble</Icon>
                    { tweet._count.replies }
                </button>
                <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-pink-600 transition-colors">
                    <Icon className="text-xl">favorite</Icon>
                    { tweet._count.likedBy }
                </button>
            </div>
        </div>
    </Card>
}