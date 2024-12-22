import Image from "next/image"
import { TicketList, type Ticket } from "@/components/ticket-list"

// This would come from your database
const MOCK_TICKETS: Ticket[] = [
  {
    id: "1",
    seller: "Giovanna Schuck",
    quantity: 3,
    price: 65.00,
    format: "Digital",
    type: "Arena"
  },
  {
    id: "2",
    seller: "João Silva",
    quantity: 2,
    price: 70.00,
    format: "Físico",
    type: "Camarote"
  }
]

interface EventPageProps {
  params: {
    id: string
  }
}

export default function EventPage({ params }: EventPageProps) {
  // In a real app, you would fetch event details based on params.id
  const eventName = "Reveillon Privilege 2025"

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#3F7EA7] mb-2">{eventName}</h1>
          <p className="text-muted-foreground">
            Ingressos disponíveis para venda
          </p>
        </div>

        <TicketList tickets={MOCK_TICKETS} />
      </div>
    </main>
  )
}

