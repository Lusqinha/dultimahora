"use client"

import type { Evento as PrismaEvento, Ingresso } from "@prisma/client"
import { formatDateString } from "@/lib/utils"
import { Mic2Icon, CalendarDaysIcon, MapPinIcon, TicketIcon, ChevronDownIcon, DollarSignIcon } from "lucide-react"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import Image from "next/image"
import type React from "react"

import { TicketList } from "@/components/ticket-list"
import { api } from "@/lib/api"

interface Evento extends PrismaEvento {
  ingressos: Ingresso[]
}

export default function EventPage() {
  const params = useParams()
  const [event, setEvent] = useState<Evento | null>(null)
  const [showDetails, setShowDetails] = useState(false)
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
      {event && (
        <>
          <div className="relative w-full h-64 sm:h-80 md:h-96">
            <Image src={banner || "/placeholder.svg"} alt={event.nome} layout="fill" objectFit="cover" priority />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end justify-start p-4 sm:p-6">
              <h1 className="text-2xl text-center sm:text-3xl md:text-4xl font-bold text-white">{event.nome}</h1>
            </div>
          </div>

          <div className="px-4 py-6 space-y-6">
            <div className="flex flex-col space-y-4">
              <EventInfoCard icon={CalendarDaysIcon} title="Data" content={formatDateString(event.date)} />
            </div>

            <div className="bg-gray-100 rounded-lg p-4">
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="flex justify-between items-center w-full text-left"
              >
                <h2 className="text-xl font-bold text-[#2248FF]">Sobre o Evento</h2>
                <ChevronDownIcon
                  className={`text-[#2248FF] transition-transform ${showDetails ? "transform rotate-180" : ""}`}
                />
              </button>
              {showDetails && (
                <p className="mt-4 text-gray-700">
                  {event.evento_weblink?.toString() || "Informações sobre o evento em breve."}
                </p>
              )}
            </div>

            <AdBanner />

            <div>
              <h2 className="text-xl font-bold text-[#2248FF] mb-4 flex items-center">
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

function EventInfoCard({ icon: Icon, title, content }: { icon: React.ElementType; title: string; content: string }) {
  return (
    <div className="flex items-center bg-[#ffc106] rounded-lg p-4 shadow-md">
      <Icon className="text-[#2248FF] w-9 h-9 mr-3" />
      <div>
        <h3 className="text-sm font-semibold text-[#2248FF]">{title}</h3>
        <p className="text-white text-lg">{content}</p>
      </div>
    </div>
  )
}

function AdBanner() {
  // Aqui você pode adicionar lógica para verificar se há um banner específico para exibir
  const hasCustomBanner = false // Substitua isso pela sua lógica real

  if (hasCustomBanner) {
    return (
      <div className="bg-gray-200 rounded-lg p-4 text-center">
        <p className="text-gray-500">Banner de anúncio personalizado</p>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-r from-[#2248FF] to-[#FFC006] rounded-lg p-6 text-center shadow-lg">
      <DollarSignIcon className="w-12 h-12 mx-auto mb-4 text-white" />
      <h3 className="text-xl font-bold text-white mb-2">Espaço Publicitário Disponível</h3>
      <p className="text-white mb-4">Alcance seu público-alvo neste evento!</p>
      <button className="bg-white text-[#2248FF] font-bold py-2 px-4 rounded hover:bg-opacity-90 transition duration-300">
        Comprar Espaço
      </button>
    </div>
  )
}

