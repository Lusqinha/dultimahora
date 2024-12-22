import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"

interface EventCardProps {
  id: string
  title: string
  imageUrl: string
  hasTickets?: boolean
}

export default function EventCard({ id, title, imageUrl, hasTickets = true }: EventCardProps) {
  return (
    <Link href={`/events/${id}`}>
      <Card className="overflow-hidden bg-white border-[#FBC004] border hover:shadow-lg transition-shadow">
        <CardContent className="p-0">
          <div className="relative">
            <img 
              src={imageUrl} 
              alt={title}
              className="w-full h-[200px] object-contain bg-black/40"
            />
            <div className="absolute top-0 left-0 bg-[#FBC004] px-3 py-1">
              <h3 className="text-black font-medium">{title}</h3>
            </div>
          </div>
          <div className="p-4 flex items-center justify-between">
            <span className="text-[#3F7EA7] text-sm font-medium">
              {hasTickets ? 'Ingressos Disponíveis' : 'Esgotado'}
            </span>
            <Switch 
              checked={hasTickets}
              className="data-[state=checked]:bg-[#3F7EA7]"
            />
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

