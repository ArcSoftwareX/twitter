import Image from "next/image";
import { Icon } from "./Icon";

export default function Avatar({ src, alt }: { src: string | null | undefined, alt: string }) {
  return <div className="min-w-[40px] min-h-[40px] max-w-[40px] max-h-[40px] rounded-full overflow-hidden bg-white/10 flex items-center justify-center">
    { src ? <Image src={src} alt={alt} height={40} width={40} /> : <Icon className="text-2xl font-light text-gray-400">person</Icon> }
  </div>
}
