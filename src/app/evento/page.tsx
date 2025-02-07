"use client"

import { Search } from "lucide-react"
import { useEffect, useState, useRef, useCallback } from "react"
import type { Evento } from "@prisma/client"
import { api } from "@/lib/api"
import { Input } from "@/components/ui/input"
import EventCard from "@/components/event/event-card"
import Image from "next/image"
import { KeywordNotificationModal } from "@/components/keyword-notification-modal"

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
    <div className="min-h-screen px-4 pb-8 md:pt-10">
      <div className="flex md:hidden justify-center p-5 mb-8 border-b">
        <Image
          src={"/img/isologo-laranja.svg"}
          alt="Logo do evento"
          width={90}
          height={90}
        />
      </div>
      <div className="max-w-4xl md:mt-10 mx-auto">
        <div className="relative mb-8 mx-2">
          <Search strokeWidth={3} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#2248FF] h-6 w-6" />
          <Input
            placeholder="Buscar eventos disponíveis"
            className="pl-12 py-6 w-full text-sm sm:text-base border-2 border-[#ffc006] focus:border-[#ffc006]/50 rounded-lg hover:border-[#ffc006] outline-none focus:ring-2 focus:shadow-lg shadow-md bg-gray-100"
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

        {/* New section for keyword notifications */}
        <div className="mt-12 text-center">
          <p className="text-lg text-gray-700 mb-4">
            <span>
              Não encontrou o evento que procura?
            </span>
            <br />
            <span className="text-gray-500 text-xs">
              Receba um aviso no <u>WhatsApp</u> se ele aparecer por aqui
            </span>
          </p>
          <KeywordNotificationModal />
        </div>
      </div>
    </div>
  )
}

