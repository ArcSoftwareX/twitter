import { NextResponse } from 'next/server';
import { prisma } from "@/lib/prisma"

export const GET = async (req: Request) => {
    const { searchParams } = new URL(req.url)
    const rawCount = searchParams.get('count')
    const usersCount = rawCount ?? 3

    if (Number.isNaN(usersCount)) return NextResponse.error()

    const users = await prisma.user.findMany({
        orderBy: {
            followers: {
                _count: 'desc'
            }
        },
        take: +usersCount
    })

    return NextResponse.json({ users })
}