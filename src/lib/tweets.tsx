import { prisma } from "./prisma"

export const getTweets = async (page = 0, popularFirst = false) => await prisma.tweet.findMany({
    orderBy: [
        { createdAt: 'desc' },
        popularFirst ? { likedBy: { _count: 'asc' } } : {}
    ],
    include: {
        user: {
            select: {
                image: true,
                id: true,
                username: true,
                name: true
            }
        },
        _count: {
            select: {
                likedBy: true,
                replies: true
            }
        }
    },
    take: 20,
    skip: page * 20
})