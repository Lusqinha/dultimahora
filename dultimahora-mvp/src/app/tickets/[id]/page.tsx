"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface TicketDetailsPageProps {
  params: {
    id: string
  }
}

export default function TicketDetailsPage({ params }: TicketDetailsPageProps) {
  // In a real app, fetch ticket details based on params.id
  const ticketDetails = {
    event: "Réveillon Privilège 2025",
    quantity: 1,
    price: 185.00,
    format: "Digital",
    seller: "Jaíne Stolte",
    whatsapp: "5599999999" // This would come from your database
  }

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      `Olá! Vi seu ingresso para ${ticketDetails.event} no D'Ultima Hora e gostaria de mais informações.`
    )
    window.location.href = `https://wa.me/${ticketDetails.whatsapp}?text=${message}`
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-[#3F7EA7] p-4">
        <div className="max-w-2xl mx-auto">
          <Image
            src="/placeholder.svg?height=60&width=200"
            alt="D'Ultima Hora Logo"
            width={200}
            height={60}
            className="mx-auto h-12 w-auto"
          />
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Info Message */}
        <div className="relative mb-12">
          <Image
            src="/placeholder.svg?height=50&width=50"
            alt="Platform Icon"
            width={50}
            height={50}
            className="absolute -top-6 left-4 h-12 w-12"
          />
          <div className="bg-[#FBC004] rounded-2xl p-6 pt-8">
            <p className="text-center text-sm">
              O D'Ultimahora é uma plataforma para unir quem quer vender,
              com quem quer comprar, lembre-se de tomar cuidado ao fazer
              a negociação, escolher lugares públicos, se certificar etc...
            </p>
          </div>
        </div>

        {/* Event Name */}
        <div className="bg-[#3F7EA7] text-white text-center py-3 px-4 mb-8">
          <h1 className="text-xl font-bold">{ticketDetails.event}</h1>
        </div>

        {/* Ticket Details */}
        <div className="space-y-6 mb-8">
          <div>
            <h2 className="text-gray-600">Quantidade:</h2>
            <p className="text-4xl font-bold text-[#3F7EA7]">
              {ticketDetails.quantity} {ticketDetails.quantity === 1 ? 'Entrada' : 'Entradas'}
            </p>
          </div>

          <div>
            <h2 className="text-gray-600">Valor(cada):</h2>
            <p className="text-4xl font-bold text-[#3F7EA7]">
              R$ {ticketDetails.price.toFixed(2)}
            </p>
          </div>

          <div>
            <h2 className="text-gray-600">Formato:</h2>
            <p className="text-4xl font-bold text-[#3F7EA7]">{ticketDetails.format}</p>
          </div>

          <div>
            <h2 className="text-gray-600">Anunciante:</h2>
            <p className="text-4xl font-bold text-[#3F7EA7]">{ticketDetails.seller}</p>
          </div>
        </div>

        {/* Edit Button */}
        <div className="mb-8">
          <Link href={`/tickets/edit/${params.id}`}>
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

