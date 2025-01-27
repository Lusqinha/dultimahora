"use client"

import  { Hero } from "@/components/content/hero"
import EventCard from "@/components/event-card"
import { type Evento } from "@prisma/client"
import { useEffect, useState } from "react"
import { api } from "@/lib/api"


export default function HomePage() {

  const [events, setEvents] = useState<Evento[]>([])
  useEffect(() => {
    api.get('events', {}).then((response) => {
      setEvents(response.data)
    })}, [])


  return (
    <main className="min-h-screen">

      <Hero />

      <section className="bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-[#3F7EA7] text-center mb-12">
            Eventos Disponíveis
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
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
