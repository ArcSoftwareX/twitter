import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Icon } from "@/components/ui/Icon"
import cn from "@/utils/cn"
import { buttonVariants } from "@/components/ui/Button"
import { EditUserPage } from "@/components/EditUserPage"
import { User } from "@prisma/client"

export default async function EditProfile() {
    const session = await getServerSession(authOptions)

    if (!session) redirect('/')

    const user = session.user as User

    return <main className="w-full">
        <div className="flex items-center gap-4 px-3 h-[60px]">
            <Link href='/' type='ghost' className={cn(buttonVariants({ type: 'ghost', className: "h-[40px] w-[40px] text-2xl text-blue-500 flex items-center justify-center" }))}>
                <Icon>arrow_back</Icon>
            </Link>
            <h1 className="font-bold">Edit Profile</h1>
        </div>
        <EditUserPage user={user} />
    </main>
}