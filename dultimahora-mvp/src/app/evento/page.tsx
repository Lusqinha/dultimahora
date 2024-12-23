import Image from "next/image"
import { Search } from 'lucide-react'
import { Input } from "@/components/ui/input"
import EventCard from "@/components/event-card"


export default function EventsPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-center text-[#3F7EA7] mb-8">
          Eventos Disponíveis
        </h1>

        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
          <Input 
            placeholder="Buscar eventos..."
            className="pl-10"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {MOCK_EVENTS.map((event) => (
            <EventCard key={event.id} {...event} />
          ))}
        </div>
      </div>
    </main>
  )
}

