import { TicketCard } from "@/components/ticket-card"
import { Ingresso } from "@prisma/client"

interface TicketListProps {
  tickets: Ingresso[]
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

