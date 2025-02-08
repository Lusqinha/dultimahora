/* eslint-disable  @typescript-eslint/no-explicit-any */

import { Search, Plus } from "lucide-react"
import { FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import type { Evento } from "@prisma/client"

interface EventSearchProps {
    searchEvents: (query: string) => void
    searchResults: Evento[]
    selectedEvent: Evento | null
    setSelectedEvent: (event: Evento | null) => void
    setIsCreatingEvent: (isCreating: boolean) => void
    setCurrentStep: (step: number) => void
    form: any // Replace 'any' with the actual form type
}

export function EventSearch({
    searchEvents,
    searchResults,
    selectedEvent,
    setSelectedEvent,
    setIsCreatingEvent,
    setCurrentStep,
    form,
}: EventSearchProps) {
    return (
        <div className="space-y-2">
            <div>
                <h2 className="text-xl font-semibold mb-4">Informações do evento</h2>
                <FormField
                    control={form.control}
                    name="eventSearch"
                    render={({ field }) => (
                        <FormItem className="space-y-4">
                            <FormControl>
                                <div className="relative">
                                    <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                                    <Input
                                        {...field}
                                        placeholder="Busque pelo nome do evento"
                                        className="pl-10"
                                        onChange={(e) => {
                                            field.onChange(e)
                                            searchEvents(e.target.value)
                                        }}
                                    />
                                </div>
                            </FormControl>
                            {searchResults.length > 0 && (
                                <div className="mt-2 rounded-lg border bg-card text-card-foreground shadow-sm">
                                    <div className="p-2 max-h-[212px]">
                                        <p className="px-2 py-1.5 text-sm text-muted-foreground">Resultados:</p>
                                        <div className="space-y-1 max-h-[164px] overflow-y-auto overflow-x-hidden">
                                            {searchResults.map((event) => (
                                                <div
                                                    key={event.id}
                                                    className="flex items-center gap-3 rounded-md px-2 py-1.5 hover:bg-accent cursor-pointer"
                                                    onClick={() => {
                                                        form.setValue("selectedEvent", event.id.toString())
                                                        setSelectedEvent(event)
                                                    }}
                                                >
                                                    <input
                                                        type="radio"
                                                        className="h-4 w-4 rounded-full border-primary text-primary"
                                                        checked={selectedEvent?.id === event.id}
                                                        onChange={() => { }}
                                                    />
                                                    <div className="flex items-center gap-3">
                                                        <div className="h-10 w-10 overflow-hidden rounded-md">
                                                            <img
                                                                src={event.banner_path || "/placeholder.svg?height=40&width=40"}
                                                                alt={event.nome}
                                                                className="h-full w-full object-cover"
                                                            />
                                                        </div>
                                                        <span className="text-sm font-medium">{event.nome}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                            {field.value && searchResults.length === 0 && (
                                <div className="mt-4 text-center">
                                    <p className="text-sm text-muted-foreground mb-4">Nenhum evento encontrado com esse nome.</p>
                                </div>
                            )}
                            <FormMessage />
                            <div className="mt-4 text-center">
                                <p className="text-sm text-muted-foreground">Se não encontrou seu evento, basta criá-lo <br />e anunciar seu ingresso!</p>
                                <Button
                                    type="button"
                                    onClick={() => {
                                        setIsCreatingEvent(true)
                                        setCurrentStep(1)
                                    }}
                                    variant="outline"
                                    className="gap-2 text-[#2248FF] hover:text-[#0030B3]"
                                >
                                    <Plus className="h-4 w-4" />
                                    Criar novo evento
                                </Button>
                            </div>
                        </FormItem>
                    )}
                />
            </div>
        </div>
    )
}

