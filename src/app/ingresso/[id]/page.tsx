"use client"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { api } from "@/lib/api"
import { useState, useEffect } from "react"
import type { Ingresso } from "@prisma/client"
import { AlertTriangle, Ticket, DollarSign, User, MessageCircle } from "lucide-react"

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
  }, [params.id])

  if (!ticketDetails) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-2xl font-bold text-[#2248FF]">Carregando...</div>
      </main>
    )
  }

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      `Olá! Vi seu ingresso para ${ticketDetails.evento.nome} no D'Ultima Hora e gostaria de mais informações.`,
    )
    window.location.href = `https://wa.me/${ticketDetails.contato_whatsapp}?text=${message}`
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Ad Banner */}
        <div className="bg-[#FFC006] rounded-lg p-6 text-center shadow-lg">
          <h3 className="text-xl font-bold text-white mb-2">Espaço Publicitário</h3>
          <p className="text-white mb-4">Alcance seu público-alvo neste evento!</p>
          <Button className="bg-white text-[#FFC006] hover:bg-gray-100">Anuncie Aqui</Button>
        </div>

        {/* Event Name */}
        <div className="bg-[#2248FF] text-white text-center py-4 px-6 rounded-lg">
          <h1 className="text-2xl font-bold">{ticketDetails.evento.nome}</h1>
        </div>

        {/* Ticket Details */}
        <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
          <div className="flex items-center space-x-4">
            <Ticket className="text-[#2248FF] w-8 h-8" />
            <div>
              <h2 className="text-gray-600">Quantidade:</h2>
              <p className="text-2xl font-bold text-[#2248FF]">
                {ticketDetails.qtd_ingressos} {ticketDetails.qtd_ingressos === 1 ? "Entrada" : "Entradas"}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <DollarSign className="text-[#2248FF] w-8 h-8" />
            <div>
              <h2 className="text-gray-600">Valor (cada):</h2>
              <p className="text-2xl font-bold text-[#2248FF]">R$ {ticketDetails.valor_un.toFixed(2)}</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Ticket className="text-[#2248FF] w-8 h-8" />
            <div>
              <h2 className="text-gray-600">Formato:</h2>
              <p className="text-2xl font-bold text-[#2248FF]">{ticketDetails.formato_ingresso}</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <User className="text-[#2248FF] w-8 h-8" />
            <div>
              <h2 className="text-gray-600">Anunciante:</h2>
              <p className="text-2xl font-bold text-[#2248FF]">{ticketDetails.nome_completo}</p>
            </div>
          </div>
        </div>

        {/* Info Message */}
        <div className="bg-[#FFC006] rounded-lg p-6 relative">
          <AlertTriangle className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-[#FFC006] w-14 h-14 p-1 bg-white rounded-full " />
          <p className="text-center text-white font-bold mt-4">
            {`O D'Ultimahora é uma plataforma para unir quem quer vender,
            com quem quer comprar. Lembre-se de tomar cuidado ao fazer
            a negociação, escolher lugares públicos, se certificar etc...`}
          </p>
        </div>

        {/* WhatsApp Button */}
        <div className="space-y-2">
          <Button
            onClick={handleWhatsAppClick}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-6 text-lg flex items-center justify-center"
          >
            <MessageCircle className="mr-2" />
            Chamar no WhatsApp
          </Button>
          <p className="text-center text-sm text-gray-500">
            Ao clicar, você será redirecionado para o chat do anunciante no WhatsApp
          </p>
        </div>
      </div>
    </main>
  )
}

