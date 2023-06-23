import NextAuth from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useServerSession`
   */
  interface Session {
    user: {
      id: string
    }
  }
}

export {}