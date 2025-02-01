"use client"

import type { Evento as PrismaEvento, Ingresso } from "@prisma/client"
import { formatDateString } from "@/lib/utils"
import { CalendarDaysIcon, TicketIcon } from "lucide-react"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { BackArrow } from "@/components/layout/back-arrow"
import Image from "next/image"
import type React from "react"
import { AdBanner } from "@/components/home/ad-banner"

import { TicketList } from "@/components/ticket/ticket-list"
import { api } from "@/lib/api"

interface Evento extends PrismaEvento {
  ingressos: Ingresso[]
}

export default function EventPage() {
  const params = useParams()
  const [event, setEvent] = useState<Evento | null>(null)
  const event_id = params.id

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await api.get<Evento>(`events/${event_id}`)
        setEvent(response.data)
      } catch (err) {
        console.error(err)
      }
    }

    fetchEvent()
  }, [event_id])

  const banner = event?.banner_path || "/banners/dultimahora-evento-placeholder.png"

  return (
    <div className="min-h-screen bg-white lg:w-2/3 mx-auto">
      <BackArrow />
      {event && (
        <>
          <div className="relative w-full h-64 sm:h-80 md:h-96">
            <Image src={banner || "/placeholder.svg"} alt={event.nome} layout="fill" objectFit="cover" priority />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-start p-4 sm:p-6 flex-col justify-end">
              <h1 className="text-2xl text-center sm:text-3xl md:text-4xl font-bold text-white">{event.nome}</h1>
              <h1 className="text-lg text-center sm:text-xl md:text-2xl font-bold text-white flex gap-2"><CalendarDaysIcon/>{formatDateString(event.date)}</h1>
            </div>
          </div>

          <div className="px-4 py-6 space-y-6">
            <AdBanner />

            <div>
              <h2 className="text-2xl font-bold text-[#2248FF] mb-4 flex text-center justify-center items-center">
                <TicketIcon className="mr-2" />
                Ingressos Disponíveis
              </h2>
              <TicketList tickets={event.ingressos} />
            </div>
          </div>
        </>
      )}
    </div>
  )
}

