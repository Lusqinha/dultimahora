"use client"

import Image from "next/image"
import { useParams } from "next/navigation"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { api } from "@/lib/api"
import { useState, useEffect } from "react"
import { type Ingresso } from "@prisma/client"
import Link from "next/link"

interface TicketDetailsType extends Ingresso { 
  evento: {
    nome: string
  }

}


export default function TicketDetailsPage() {

  const params = useParams()

  const [ticketDetails, setTicketDetails] = useState<TicketDetailsType>()

  useEffect(() => { 

    const fetchTicket = async () => {
      try {
        const response = await api.get(`tickets/${params.id}`)
        setTicketDetails(response.data)
      } catch (err) {
        console.error(err)
      }
    }

    fetchTicket()

  }, [])

  if (!ticketDetails) {
    return (
      <main className="min-h-screen">
        <div className="max-w-2xl mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold text-center text-[#3F7EA7] mb-8">
            Carregando...
          </h1>
        </div>
      </main>
    )
  }



  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      `Olá! Vi seu ingresso para ${ticketDetails.evento.nome} no D'Ultima Hora e gostaria de mais informações.`
    )
    window.location.href = `https://wa.me/${ticketDetails.contato_whatsapp}?text=${message}`
  }

  return (
    <main className="min-h-screen">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Info Message */}
        <div className="relative my-8">
          <Image
            src="/img/d-alerta.png"
            alt="Platform Icon"
            width={111}
            height={92}
            className="absolute -top-16 left-1/2 transform -translate-x-1/2"
          />
          <div className="bg-[#FBC004] rounded-2xl p-6 pt-8">
            <p className="text-justify text-white font-bold [text-align-last:center]">
              O D'Ultimahora é uma plataforma para unir quem quer vender,
              com quem quer comprar, lembre-se de tomar cuidado ao fazer
              a negociação, escolher lugares públicos, se certificar etc...
            </p>
          </div>
        </div>

        {/* Event Name */}
        <div className="bg-[#3F7EA7] text-white text-center py-3 px-4 mb-8">
          <h1 className="text-xl font-bold">{ticketDetails.evento.nome}</h1>
        </div>

        {/* Ticket Details */}
        <div className="space-y-6 mb-8">
          <div>
            <h2 className="text-gray-600">Quantidade:</h2>
            <p className="text-4xl font-bold text-[#3F7EA7]">
              {ticketDetails.qtd_ingressos} {ticketDetails.qtd_ingressos=== 1 ? 'Entrada' : 'Entradas'}
            </p>
          </div>

          <div>
            <h2 className="text-gray-600">Valor(cada):</h2>
            <p className="text-4xl font-bold text-[#3F7EA7]">
              R$ {ticketDetails.valor_un.toFixed(2)}
            </p>
          </div>

          <div>
            <h2 className="text-gray-600">Formato:</h2>
            <p className="text-4xl font-bold text-[#3F7EA7]">{ticketDetails.formato_ingresso}</p>
          </div>

          <div>
            <h2 className="text-gray-600">Anunciante:</h2>
            <p className="text-4xl font-bold text-[#3F7EA7]">{ticketDetails.nome_completo}</p>
          </div>
        </div>

        {/* Edit Button */}
        <div className="mb-8">
          <Link href={`/ingresso/editar`}>
            <Button 
              variant="outline" 
              className="w-full border-[#3F7EA7] text-[#3F7EA7] hover:bg-[#3F7EA7] hover:text-white"
            >
              Editar Anúncio (Requer Senha)
            </Button>
          </Link>
        </div>

        {/* WhatsApp Button */}
        <div className="space-y-2">
          <Button 
            onClick={handleWhatsAppClick}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-6 text-lg"
          >
            Chamar no WhatsApp
          </Button>
          <p className="text-center text-sm text-gray-500">
            Ao clicar será redirecionado para o chat do anunciante no WhatsApp
          </p>
        </div>

        {/* Publi Section */}
        <div className="mt-12">
          <h3 className="text-[#3F7EA7] font-medium mb-4">Publi de Santa</h3>
          <div className="bg-[#3F7EA7]/10 h-32 rounded-lg" />
        </div>
      </div>
    </main>
  )
}

