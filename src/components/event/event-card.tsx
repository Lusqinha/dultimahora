/* eslint-disable @next/next/no-img-element */
import { type Evento as PrismaEvento } from "@prisma/client"

interface Evento extends PrismaEvento {
  _count?: {
    ingressos: number
  }
}
import Link from "next/link"

import { smallDateString } from "@/lib/utils"
import Image from "next/image"

import { Card, CardContent } from "@/components/ui/card"
import { CalendarDaysIcon } from "lucide-react"


export default function EventCard({ id, nome, date, banner_path, _count }: Evento) {

  const ingressos = _count?.ingressos || 0

  const ticket_count_bg = ingressos > 0 ? 'bg-[#FFC006]' : 'bg-gray-300'

  return (
    <Link href={`/evento/${id}`}>
      <Card className={`overflow-hidden bg-white hover:shadow-lg transition-shadow mx-auto min-h-full flex flex-col justify-between cursor-pointer`}>
        <CardContent className="p-0"> 
          <div className="relative">
            <img 
              src={banner_path || 'banners/dultimahora-evento-placeholder.png'} 
              alt={nome}
              className="w-full h-[200px] object-cover bg-black/40"
            />
            <div className={` text-white flex items-center absolute top-0 right-0 ${ticket_count_bg} rounded-bl-xl px-3 py-2`}>
              <p className={`${ticket_count_bg} flex items-center font-extrabold gap-1 rounded-full` }>
                <span>{ingressos}</span>
                <Image src="/img/ticket-event-card.svg" alt="Ingressos" width={15} height={15} />
              </p>  
            </div>
            {ingressos > 3 && (
              <div className="absolute top-0 left-0 bg-[#FFC006] text-white font-bold px-2 py-1 rounded-br-xl">
                <p>🔥Em Alta!</p>
              </div>
            )}
          </div>
          <div className="px-4 my-4 flex flex-col text-white items-start justify-between">
            <h2 className=" lg:text-sm font-bold text-[#0030B3]">{nome.toLocaleUpperCase()}</h2>
            <div className="text-sm flex items-center text-[#2248FF]/85">
              <CalendarDaysIcon className="mr-1" size={15} />
              <h3>{smallDateString(date)}</h3>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

