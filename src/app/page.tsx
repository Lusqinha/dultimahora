"use client"

import  { Hero } from "@/components/content/hero"
import EventCard from "@/components/event-card"
import { type Evento } from "@prisma/client"
import { useEffect, useState } from "react"
import { api } from "@/lib/api"


export default function HomePage() {

  const [events, setEvents] = useState<Evento[]>([])
  useEffect(() => {
    api.get<Evento[]>('/events').then((response) => {
      setEvents(response.data)
    })
  }, [])


  return (
    <main className="min-h-screen">

      <Hero />

      <section className="bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-[#2248FF] text-center mb-12">
            Eventos que estão bombando!
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* mostra apenas os 6 primeiros */}
            {events.slice(0,6).map((event) => (
              <EventCard _count={{
                ingressos: 0
              }} key={event.id} {...event} />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
