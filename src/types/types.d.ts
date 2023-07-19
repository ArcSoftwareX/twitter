import { getTweets } from "@/lib/tweets";

export type TweetArray = Awaited<ReturnType<typeof getTweets>>
export type Tweet = TweetArray[number]