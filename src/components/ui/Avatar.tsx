import Image from "next/image";
import { Icon } from "./Icon";
import { HTMLAttributes, forwardRef } from "react";
import cn from "@/utils/cn";

interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  src: string | null | undefined,
  alt: string,
  size?: number
}

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(function Avatar({ src, style, size, alt, className, ...props }, ref) {
  return <div {...props} ref={ref} style={{ ...style, minHeight: size ?? 40, minWidth: size ?? 40, maxHeight: size ?? 40, maxWidth: size ?? 40 }} className={cn("rounded-full overflow-hidden bg-white/10 flex items-center justify-center", className)}>
    { src ? <Image src={src} alt={alt} height={size ?? 40} width={size ?? 40} /> : <Icon className="text-2xl font-light text-gray-400">person</Icon> }
  </div>
})
