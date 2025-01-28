/* eslint-disable @next/next/no-img-element */
import { type Evento as PrismaEvento } from "@prisma/client"

interface Evento extends PrismaEvento {
  _count: {
    ingressos: number;
  };
}
import Link from "next/link"

import { smallDateString } from "@/lib/utils"
import Image from "next/image"

import { Card, CardContent } from "@/components/ui/card"
import { CalendarDaysIcon } from "lucide-react"


export default function EventCard({ id, nome, date, banner_path, _count }: Evento) {
  return (
    <Link href={`/evento/${id}`}>
      <Card className={`overflow-hidden bg-white hover:shadow-lg transition-shadow mx-auto min-h-max`}>
        <CardContent className="p-0">
          <div className="relative">
            <img 
              src={banner_path || 'banners/dultimahora-evento-placeholder.png'} 
              alt={nome}
              className="w-full h-[200px] object-cover bg-black/40"
            />
            <div className=" text-xl text-white flex items-center absolute top-0 right-0 bg-[#FFC006] rounded-bl-xl px-3 py-1">
              <CalendarDaysIcon className="mr-2" size={24} />
              <h3>{ smallDateString(date) }</h3>
            </div>
            {_count.ingressos > 3 && (
              <div className="absolute top-0 left-0 bg-[#FFC006] text-white text-lg font-bold px-2 py-1 rounded-br-xl">
                <p>🔥Em Alta!</p>
              </div>
            )}
          </div>
          <div className="p-4 flex text-white items-center justify-between">
            <h2 className="text-lg font-bold text-[#2248FF]">{nome.toLocaleUpperCase()}</h2>
            <p className="bg-[#FFC006] flex items-center font-extrabold text-1xl ml-2 py-1 px-3 gap-1 rounded-full" >
              <span>{_count.ingressos}</span>
              <Image src="/img/ticket-event-card.svg" alt="Ingressos" width={30} height={30} />
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

