import { ActivityIndicator } from "@/components/ui/ActivityIndicator";

export default function Loading() {
    return <div className="h-screen w-screen flex items-center justify-center gap-3">
        <ActivityIndicator className="text-4xl text-blue-500" />
        <p className="text-neutral-500 font-semibold text-sm">Loading Twitter</p>
    </div>
}