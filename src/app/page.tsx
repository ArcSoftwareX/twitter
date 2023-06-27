import TweetsList from "@/components/TweetsList"
import { getTweets } from "./api/tweets/route"

export default async function Home() {
  const tweets = await fetchTweets()

  return (
    <main className="w-full h-screen">
      <TweetsList tweets={tweets} />
    </main>
  )
}

const fetchTweets = async (page = 0) => {
  return await getTweets(page)
}