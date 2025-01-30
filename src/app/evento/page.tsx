"use client"

import { Search } from "lucide-react"
import { useEffect, useState, useRef, useCallback } from "react"
import type { Evento } from "@prisma/client"
import { api } from "@/lib/api"
import { Input } from "@/components/ui/input"
import EventCard from "@/components/event-card"

const ITEMS_PER_PAGE = 12

export default function EventsPage() {
  const [events, setEvents] = useState<Evento[]>([])
  const [filteredEvents, setFilteredEvents] = useState<Evento[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(1)

  const observer = useRef<IntersectionObserver | null>(null)
  const lastEventElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoading) return
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1)
        }
      })
      if (node) observer.current.observe(node)
    },
    [isLoading, hasMore],
  )

  useEffect(() => {
    setIsLoading(true)
    api.get("events", {}).then((response) => {
      setEvents(response.data)
      setFilteredEvents(response.data)
      setIsLoading(false)
    })
  }, [])

  useEffect(() => {
    const results = events.filter((event) => event.nome.toLowerCase().includes(searchTerm.toLowerCase()))
    setFilteredEvents(results)
    setPage(1)
    setHasMore(results.length > ITEMS_PER_PAGE)
  }, [searchTerm, events])

  const displayedEvents = filteredEvents.slice(0, page * ITEMS_PER_PAGE)

  useEffect(() => {
    setHasMore(page * ITEMS_PER_PAGE < filteredEvents.length)
  }, [page, filteredEvents])

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-center text-[#2248FF] mb-8">Eventos Disponíveis</h1>

        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            placeholder="Buscar eventos..."
            className="pl-10 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {isLoading && displayedEvents.length === 0 ? (
          <div className="text-center py-10">Carregando eventos...</div>
        ) : displayedEvents.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {displayedEvents.map((event, index) => (
              <div key={event.id} ref={index === displayedEvents.length - 1 ? lastEventElementRef : null}>
                <EventCard _count={{ ingressos: 0 }} {...event} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10">Nenhum evento encontrado.</div>
        )}

        {isLoading && displayedEvents.length > 0 && <div className="text-center py-4">Carregando mais eventos...</div>}
      </div>
    </div>
  )
}

