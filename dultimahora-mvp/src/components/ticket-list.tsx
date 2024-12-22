import { TicketCard } from "@/components/ticket-card"

export interface Ticket {
  id: string
  seller: string
  quantity: number
  price: number
  format: "Digital" | "Físico"
  type: string
}

interface TicketListProps {
  tickets: Ticket[]
}

export function TicketList({ tickets }: TicketListProps) {
  if (tickets.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        Nenhum ingresso disponível no momento.
      </div>
    )
  }

  return (
    <div className="grid gap-4">
      {tickets.map((ticket) => (
        <TicketCard key={ticket.id} {...ticket} />
      ))}
    </div>
  )
}

