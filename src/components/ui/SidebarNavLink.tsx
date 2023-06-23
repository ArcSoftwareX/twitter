import { Icon } from "./Icon";
import { NavLink } from "./NavLink";

export const sidebarNavLinkStyles = "flex items-center gap-3 text-lg font-medium mb-4 group transition-all data-[active=true]:font-semibold"

export default function SidebarNavLink({ name, icon, path }: { name: string, icon: string, path: string }) {
    return <NavLink activeClass='text-blue-400' className={sidebarNavLinkStyles} href={path}>
        <Icon className="text-3xl font-light icon-dynamic-fill group-data-[active=true]:font-semibold">{ icon }</Icon>
        { name }
    </NavLink>
}