import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronRight } from 'lucide-react'

interface TicketCardProps {
  id: string
  seller: string
  quantity: number
  price: number
  format: "Digital" | "Físico"
  type: string
}

export function TicketCard({ id, seller, quantity, price, format, type }: TicketCardProps) {
  return (
    <Link href={`/tickets/${id}`}>
      <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                {seller} ofereceu:
              </p>
              <div className="flex items-center gap-2">
                <span className="font-semibold">
                  {quantity} {quantity > 1 ? 'Entradas' : 'Entrada'}
                </span>
                <span>-</span>
                <span className="font-semibold">
                  R$ {price.toFixed(2)}
                </span>
              </div>
              <div className="flex gap-4 text-sm text-muted-foreground">
                <div>
                  Form: <span className="text-foreground">{format}</span>
                </div>
                <div>
                  Tipo: <span className="text-foreground">{type}</span>
                </div>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-[#FBC004]" />
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

