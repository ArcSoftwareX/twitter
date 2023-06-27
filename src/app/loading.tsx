import { ActivityIndicator } from "@/components/ui/ActivityIndicator";

export default function Loading() {
    return <div className="h-screen w-screen flex items-center justify-center">
        <ActivityIndicator className="text-2xl" />
        <p>Loading Twitter</p>
    </div>
}