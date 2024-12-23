"use client"

import { ActionButton } from "@/components/action-button"
import { WaveDivider } from "@/components/wave-divider"
import EventCard from "@/components/event-card"
import { type Evento } from "@prisma/client"
import { Search, Ticket } from 'lucide-react'
import { useEffect, useState } from "react"
import { api } from "@/lib/api"
import Link from "next/link"

export default function HomePage() {

  const [events, setEvents] = useState<Evento[]>([])
  useEffect(() => {
    api.get('events', {}).then((response) => {
      setEvents(response.data)
    })}, [])


  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen bg-[url('/img/bg-hero.jpg')] bg-no-repeat bg-center bg-cover">

        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 pb-32">

          <h1 className="mb-12 text-lg md:text-xl font-bold text-white text-center drop-shadow-2xl shadow-green-600">
            Pra resolver o teu rolê em
            <br />
            <span className="text-[#FBC004] text-5xl font-extrabold">Santa Maria</span>
          </h1>

          <div className="flex flex-col md:flex-row gap-4 md:gap-8">
            <Link href="/events">
              <ActionButton className="w-full md:w-auto text-white font-extrabold"
                icon={<Search className="w-6 h-6" />}
              >
                Encontrar ingressos
              </ActionButton>
            </Link>
            <Link href="/resale">
              <ActionButton className="w-full md:w-auto text-white font-extrabold"
                icon={<Ticket className="w-6 h-6" />}
              >
                Revender meu ingresso
              </ActionButton>
            </Link>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <WaveDivider />
        </div>
      </section>

      {/* Events Section */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-[#3F7EA7] text-center mb-12">
            Eventos Disponíveis
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <EventCard key={event.id} {...event} />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

