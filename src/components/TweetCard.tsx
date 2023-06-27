import { Tweet, User } from "@prisma/client";
import { Card } from "./ui/Card";
import Avatar from "./ui/Avatar";
import Link from "next/link";
import { timeSince } from "@/lib/timeUtils";

export default function TweetCard({ tweet }: { tweet: Tweet & { user: User } }) {
    return <Card className="flex gap-3 shadow-xl shadow-neutral-800/10" type='outline'>
        <Avatar src={tweet.user.image} alt={`${tweet.user.name}'s avatar`} />
        <div>
            <div className="flex items-center gap-2">
                <Link href={`/user/${tweet.user.id}`} className="font-semibold hover:underline text-[15px]">{ tweet.user.name }</Link>
                <span className="flex items-center gap-2 text-neutral-600 text-[15px] font-medium">
                    <div className="rounded-full h-1 w-1 bg-neutral-600" />
                    <p>{ timeSince(tweet.createdAt.valueOf()) }</p>
                </span>
            </div>
            <p className="text-[15px] mt-1">{ tweet.text }</p>
        </div>
    </Card>
}