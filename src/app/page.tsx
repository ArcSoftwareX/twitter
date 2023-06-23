import { Card } from "@/components/ui/Card";

export default function Home() {
  return (
    <main className="w-full h-screen p-8 overflow-y-scroll scrollbar-pretty">
      <div className="w-full">
        <Card type='outline'>
          Some test tweet?
        </Card>
      </div>
    </main>
  )
}
