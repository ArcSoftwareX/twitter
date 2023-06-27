import { getServerSession } from "next-auth"
import { authOptions } from "../../auth/[...nextauth]/route"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    const session = await getServerSession(authOptions)

    if (!session) return new Response('Sign in to tweet', {
        status: 401
    })

    const data = await req.json()

    if (!data?.text) return new Response('Tweet content is not provided', {
        status: 400
    })

    const tweet = await prisma.tweet.create({
        data: {
            text: data.text,
            userId: session.user.id
        }
    })

    return NextResponse.json({ tweet })
}