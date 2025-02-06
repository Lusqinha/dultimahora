"use client"

import { Hero } from "@/components/home/hero"
import EventCard from "@/components/event/event-card"
import type { Evento } from "@prisma/client"
import { useEffect, useState } from "react"
import { api } from "@/lib/api"
import useEmblaCarousel from "embla-carousel-react"
import { Button } from "@/components/ui/button"
import { CalendarHeartIcon, ChevronLeft, ChevronRight } from "lucide-react"
import { AdBanner } from "@/components/home/ad-banner"
import { AboutUs } from "@/components/home/about-us"
import { ContactUs } from "@/components/home/contact-us"

export default function HomePage() {
  const [events, setEvents] = useState<Evento[]>([])
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", loop: true, skipSnaps: false })

  useEffect(() => {
    api.get<Evento[]>("/events").then((response) => {
      setEvents(response.data)
    })
  }, [])

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev()
  const scrollNext = () => emblaApi && emblaApi.scrollNext()

  return (
    <main className="min-h-screen overflow-x-hidden">
      <Hero />
      <section className="w-full bg-white rounded-t-2xl -mt-5">

      <section className="py-16 w-11/12 mx-auto">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#2248FF] text-center mb-8 flex items-center justify-center gap-2"><CalendarHeartIcon />{`Eventos em D'estaque`}</h2>
          <div className="relative">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex">
                {events.slice(0,4).map((event) => (
                  <div
                  key={event.id}
                  className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] md:flex-[0_0_33.33%] lg:flex-[0_0_25%] px-4"
                  >
                    <EventCard
                      _count={{
                        ingressos: 0,
                      }}
                      {...event}
                      />
                  </div>
                ))}
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2"
              onClick={scrollPrev}
              >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2"
              onClick={scrollNext}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
      <AdBanner className="w-11/12 mx-auto mb-10" />
      <AboutUs />
      <ContactUs className="w-11/12 mx-auto my-5"/>
    </section>
    </main>
  )
}

