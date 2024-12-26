"use client";

import { Evento as PrismaEvento, Ingresso } from "@prisma/client";
import { Mic2Icon, CalendarDaysIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { TicketList } from "@/components/ticket-list";
import { api } from "@/lib/api";

interface Evento extends PrismaEvento {
  ingressos: Ingresso[];
}


export default function EventPage() {

  const params = useParams();

  const [event, setEvent] = useState<Evento | null>(null);

  const event_id = params.id;

  console.log(event_id)

  useEffect(() => {
    const fetchEvent = async () => {
      try { 
        const response = await api.get<Evento>(`events/${event_id}`);
        setEvent(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchEvent();
  }, [event_id, params]);

  const banner = event?.banner_path || '/img/bg-hero.jpg';

  return (
    <main className="min-h-screen">
      <div className="max-w-4xl mx-auto md:px-4">
        <div className="mb-8 ">
          {event && (
            <div>

              <div style={{ '--image-url': `url(${banner})` } as React.CSSProperties} className='bg-[image:var(--image-url)] w-full bg-center bg-no-repeat bg-cover h-full py-28 md:py-44 shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] border-4 border-[#3F7EA7]'>

              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 my-2">
                <h2 className="text-2xl text-center mx-14 mb-2 p-2 rounded-full flex justify-center bg-[#224b67] shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] items-center gap-2 font-extrabold text-[#FBC004]">
                  <Mic2Icon className="text-[#3F7EA7]" />{event.nome}
                </h2>
                <h2 className="text-2xl text-center mx-14 mb-2 p-2 rounded-full flex justify-center bg-[#224b67] shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] items-center gap-2 font-extrabold text-[#FBC004]">
                  <CalendarDaysIcon className="text-[#3F7EA7]" />{new Date(event.date).toLocaleDateString("pt-BR")}
                </h2>
              </div>
           
          
            </div>
          )
          }
          <p className="text-center text-2xl font-extrabold text-[#224b67]">
            Ingressos disponíveis:
          </p>
        </div>
        {event && <TicketList tickets={event.ingressos} />}
      </div>
    </main>
  );
}
