"use client"

import { useState } from "react"
import { EventSelectionModal } from "@/components/event-notification-search"
import { NotificationModal } from "@/components/notification-modal"
import { Button } from "@/components/ui/button"
import { BellRing } from "lucide-react"
import type { Evento } from "@prisma/client"

export function EventNotificationFlow() {
    const [showEventSelection, setShowEventSelection] = useState(false)
    const [showNotificationForm, setShowNotificationForm] = useState(false)
    const [selectedEvent, setSelectedEvent] = useState<Evento | null>(null)

    const handleEventSelect = (event: Evento) => {
        setSelectedEvent(event)
        setShowEventSelection(false)
        setShowNotificationForm(true)
    }

    return (
        <>
            <Button onClick={() => setShowEventSelection(true)} className="bg-[#FFC006] text-white hover:bg-[#FFC006]/90">
                <BellRing className="w-6 h-6 mr-2" />
                Notifique-me
            </Button>

            <EventSelectionModal
                isOpen={showEventSelection}
                onClose={() => setShowEventSelection(false)}
                onEventSelect={handleEventSelect}
            />

            {selectedEvent && (
                <NotificationModal
                    eventoId={selectedEvent.id}
                    eventName={selectedEvent.nome}
                    isOpen={showNotificationForm}
                    onClose={() => {
                        setShowNotificationForm(false)
                        setSelectedEvent(null)
                    }}
                />
            )}
        </>
    )
}

