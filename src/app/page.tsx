import TweetsList from "@/components/TweetsList"
import { getTweets } from "@/lib/tweets"

export default async function Home() {
  const tweets = await getTweets()

  return (
    <main className="w-full h-screen">
      <TweetsList tweets={tweets} />
    </main>
  )
}