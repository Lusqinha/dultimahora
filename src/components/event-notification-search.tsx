"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from 'lucide-react'
import { api } from "@/lib/api"
import type { Evento } from "@prisma/client"
import Image from "next/image"

interface EventSelectionModalProps {
    isOpen: boolean
    onClose: () => void
    onEventSelect: (event: Evento) => void
}

export function EventSelectionModal({ isOpen, onClose, onEventSelect }: EventSelectionModalProps) {
    const [searchTerm, setSearchTerm] = useState("")
    const [searchResults, setSearchResults] = useState<Evento[]>([])
    const [selectedEvent, setSelectedEvent] = useState<Evento | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [events, setEvents] = useState<Evento[]>([])
    
    const getEvents = async (query: string) => {
        setIsLoading(true)
        try {
            const response = await api.get<Evento[]>(`events/`)
            setEvents(response.data)
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getEvents(searchTerm)
    }, [searchTerm])

    const searchEvents = (query: string) => {
        const results = events.filter((event) => event.nome.toLowerCase().includes(query.toLowerCase()))
        setSearchResults(results)
    }

    const handleSearch = (value: string) => {
        setSearchTerm(value)
        if (value.length >= 1) {
            searchEvents(value)
        }
    }

    const handleEventSelect = () => {
        if (selectedEvent) {
            onEventSelect(selectedEvent)
            onClose()
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Selecione um evento</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                            placeholder="Busque pelo nome do evento"
                            value={searchTerm}
                            onChange={(e) => handleSearch(e.target.value)}
                            className="pl-10"
                        />
                    </div>

                    {isLoading ? (
                        <div className="text-center py-4">Buscando eventos...</div>
                    ) : searchResults.length > 0 ? (
                        <div className="max-h-[300px] overflow-y-auto space-y-2">
                            {searchResults.map((event) => (
                                <div
                                    key={event.id}
                                    className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors ${selectedEvent?.id === event.id ? "bg-[#2248FF]/10" : "hover:bg-gray-100"
                                        }`}
                                    onClick={() => setSelectedEvent(event)}
                                >
                                    <input
                                        type="radio"
                                        checked={selectedEvent?.id === event.id}
                                        onChange={() => setSelectedEvent(event)}
                                        className="h-4 w-4"
                                    />
                                    <div className="h-12 w-12 relative rounded-md overflow-hidden">
                                        <Image
                                            src={event.banner_path || "/placeholder.svg?height=48&width=48"}
                                            alt={event.nome}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <span className="flex-1 text-sm font-medium">{event.nome}</span>
                                </div>
                            ))}
                        </div>
                    ) : searchTerm.length >= 3 ? (
                        <div className="text-center py-4 text-gray-500">
                            Nenhum evento encontrado com esse nome.
                        </div>
                    ) : null}

                    <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={onClose}>
                            Cancelar
                        </Button>
                        <Button
                            onClick={handleEventSelect}
                            disabled={!selectedEvent}
                            className="bg-[#2248FF] text-white hover:bg-[#2248FF]/90"
                        >
                            Continuar
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
