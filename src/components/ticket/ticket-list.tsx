import { TicketCard } from "@/components/ticket/ticket-card"
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
    <div className="grid flex-wrap grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-3">
      {tickets.map((ticket) => (
        <TicketCard key={ticket.id} {...ticket} />
      ))}
    </div>
  )
}

