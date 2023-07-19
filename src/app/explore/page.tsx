import TweetsList from "@/components/TweetsList";
import { getTweets } from "@/lib/tweets";

export default async function Explore() {
    const tweets = await getTweets(0, true)

    return <main className="h-screen w-full">
        <TweetsList tweets={tweets} />
    </main>
}