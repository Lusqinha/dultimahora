"use client";

import { Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import { type Evento } from '@prisma/client'
import { api } from '@/lib/api'
import { Input } from "@/components/ui/input"
import EventCard from "@/components/event-card"


export default function EventsPage() {

  const [events, setEvents] = useState<Evento[]>([])
  useEffect(() => {
    api.get('events', {}).then((response) => {
      setEvents(response.data)
    })
  }, [])
  

  return (
    <main className="min-h-screen">
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
          {events.map((event) => (
            <EventCard _count={{
              ingressos: 0
            }} key={event.id} {...event} />
          ))}
        </div>
      </div>
    </main>
  )
}

