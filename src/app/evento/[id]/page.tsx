"use client"

import type { Evento as PrismaEvento, Ingresso } from "@prisma/client"
import { formatDateString } from "@/lib/utils"
import { CalendarDaysIcon, TicketsIcon } from "lucide-react"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { BackArrow } from "@/components/layout/back-arrow"
import Image from "next/image"
import { AdBanner } from "@/components/home/ad-banner"
import { NotificationModal } from "@/components/notification-modal"

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
  let jsonLd = null
  if (event) {
    // JSON-LD structured data
      jsonLd = {
      "@context": "https://schema.org",
      "@type": "Event",
      name: event.nome,
      startDate: event.date,
      image: banner,
      description: `Encontre ingressos para ${event.nome} no D'Ultima Hora.`,
      offers: {
        "@type": "AggregateOffer",
        availability: "https://schema.org/InStock",
        priceCurrency: "BRL",
        offerCount: event.ingressos.length,
      },
      organizer: {
        "@type": "Organization",
        name: "D'Ultima Hora",
        url: "https://dultimahora.fluxstudio.com.br/",
      },
    }
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="min-h-screen bg-white lg:w-2/3 mx-auto">
        <BackArrow />
        {event && (
          <>
            <div className="relative w-full h-64 sm:h-80 md:h-96">
              <Image src={banner || "img/dultimahora-evento-placeholder.png"} alt={event.nome} layout="fill" objectFit="cover" priority />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-start p-4 sm:p-6 flex-col justify-end">
                <h1 className="text-2xl md:text-center sm:text-3xl md:text-4xl font-bold text-white mr-10">{event.nome}</h1>
                <h1 className="text-lg text-center sm:text-xl md:text-2xl font-bold text-white flex gap-2">
                  <CalendarDaysIcon />
                  {formatDateString(event.date)}
                </h1>
              </div>
              <div className="absolute bottom-7 right-8 scale-125">
                <NotificationModal eventoId={event.id} eventName={event.nome} />
              </div>
            </div>
            
            <div className="px-4 py-6 space-y-6">

              <AdBanner />

              <div>
                <h2 className="text-2xl font-bold text-[#2248FF] mb-4 flex text-center justify-center items-center">
                  <TicketsIcon className="mr-2" />
                  Ingressos anunciados
                </h2>
                <TicketList tickets={event.ingressos} />
              </div>
            </div>
            <div className="my-12 w-3/4 mx-auto text-center">
              <p className="text-xl text-gray-700 mb-4">
                <span>
                  Quer ficar de olho aqui?👀

                </span>
                <br />
                <span className="text-gray-500 text-xs">
                  Receba um aviso no <u>WhatsApp</u> sempre que<br /> anunciarem neste evento!
                </span>
              </p>
              <NotificationModal eventoId={event.id} eventName={event.nome} btnType="full" />
            </div>
          </>
        )}
      </div>
    </>
  )
}

