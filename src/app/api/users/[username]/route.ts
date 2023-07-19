import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { authOptions } from "../../auth/[...nextauth]/route"

export const GET = async (_: Request, { params }: { params: { username: string } }) => {
    const username = params.username

    if (!username || !username.length) return new Response(null, {
        status: 400
    })

    const user = await viewUser(username)

    return NextResponse.json({ user })
}

interface PostUserData {
    name: string,
    username: string,
    bio: string | null
}

export const POST = async (req: Request, { params }: { params: { username: string } }) => {
    const username = params.username

    if (!username || !username.length) return new Response(null, {
        status: 400
    })

    const session = await getServerSession(authOptions)

    if (!session || session.user.username !== username) return new Response(null, { status: 403 })

    const data = await req.json()

    if (!isValidPostData(data)) return new Response(null, { status: 400 })

    const user = await prisma.user.update({
        where: {
            username
        },
        data: {
            bio: data.bio,
            name: data.name,
            username: data.username
        }
    })

    return NextResponse.json({ user })
}

const isValidPostData = (data: any): data is PostUserData => {
    return typeof data.name === 'string' && data.name.length > 0 && typeof data.username === 'string' && data.username.length > 0 && (typeof data.bio === 'string' || data.bio === null)
}

export const viewUser = async (username: string) => {
    return await prisma.user.findFirst({
        where: {
            username
        },
        select: {
            id: true,
            image: true,
            name: true,
            bio: true,
            createdAt: true,
            _count: {
                select: {
                    Tweets: true,
                    followers: true,
                    following: true
                }
            }
        }
    })
}