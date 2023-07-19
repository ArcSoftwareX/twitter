import NextAuth from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `getServerSession`
   */
  interface Session {
    user: {
      id: string,
      username: string,
      bio?: string,
      createdAt: Date
    }
  }
}

// export {}