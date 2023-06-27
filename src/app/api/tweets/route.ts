import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]/route"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export const GET = async (req: Request) => {
    const session = await getServerSession(authOptions)

    if (!session) return new Response('Sign in to get tweets', {
        status: 401
    })

    const { searchParams } = new URL(req.url)
    const page = +(searchParams.get('page') ?? 0)

    const maxPages = Math.floor((await prisma.tweet.count()) / 20)

    if (page > maxPages) return NextResponse.json({ error: 'Page is out of bounds' })

    const tweets = await getTweets(page)
    
    return NextResponse.json({ tweets })
}

export const getTweets = async (page = 0) => {
    return await prisma.tweet.findMany({
        orderBy: {
          createdAt: 'desc'
        },
        include: {
          user: true
        },
        take: 20,
        skip: page * 20
    })
}