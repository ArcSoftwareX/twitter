import { prisma } from "@/lib/prisma"
import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth, { Session, User } from "next-auth"
import type { User as DbUser } from '@prisma/client'
import { type Adapter } from "next-auth/adapters"
import GoogleProvider from 'next-auth/providers/google'

export const authOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!
    })
  ],
  callbacks: {
    session({ session, user }: { session: Session, user: User }) {
      const dbUser = user as DbUser
      session.user.id = dbUser.id
      session.user.username = dbUser.username
      session.user.createdAt = dbUser.createdAt
      session.user.bio = dbUser.bio ?? undefined
      return session
    }
  },
  pages: {
    signIn: '/auth/signin',
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }