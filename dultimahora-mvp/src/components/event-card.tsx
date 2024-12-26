/* eslint-disable @next/next/no-img-element */
import { type Evento } from "@prisma/client"
import Link from "next/link"

import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"



export default function EventCard({ id, nome, banner_path }: Evento) {
  return (
    <Link href={`/evento/${id}`}>
      <Card className="overflow-hidden bg-white border-[#FBC004] border hover:shadow-lg transition-shadow">
        <CardContent className="p-0">
          <div className="relative">
            <img 
              src={banner_path || 'img/dultimahora-evento-placeholder.png'} 
              alt={nome}
              className="w-full h-[200px] object-cover bg-black/40"
            />
            <div className="absolute top-0 left-0 bg-[#FBC004] px-3 py-1">
              <h3 className="text-black font-medium">{ nome }</h3>
            </div>
          </div>
          <div className="p-4 flex items-center justify-between">
            <span className="text-[#3F7EA7] text-sm font-medium">
              { true ? 'Ingressos Disponíveis' : 'Esgotado'}
            </span>
            <Switch 
              checked={true}
              className="data-[state=checked]:bg-[#3F7EA7]"
            />
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

