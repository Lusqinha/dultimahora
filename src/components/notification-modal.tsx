"use client"

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { api } from "@/lib/api"
import { toast } from "sonner"
import { BellIcon } from 'lucide-react'

interface NotificationModalProps {
    eventoId: number
    eventName: string
}

export function NotificationModal({ eventoId, eventName }: NotificationModalProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [fullName, setFullName] = useState('')
    const [whatsapp, setWhatsapp] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            await api.post('/watchlist/event', {
                eventoId,
                nome_completo: fullName,
                contato_whatsapp: whatsapp
            })
            toast.success("Você será notificado sobre este evento!")
            setIsOpen(false)
        } catch (error) {
            console.error(error)
            toast.error("Ocorreu um erro ao registrar sua notificação.")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <>
            <Button onClick={() => setIsOpen(true)} className="bg-[#FFC006] text-white hover:bg-[#FFC006]/90 rounded-full w-8 h-8">
                <BellIcon width={50} height={50} />
            </Button>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Receba notificações sobre {eventName}</DialogTitle>
                        <DialogDescription>
                            Preencha seus dados para receber atualizações sobre este evento.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Label htmlFor="fullName">Nome Completo</Label>
                            <Input
                                id="fullName"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="whatsapp">WhatsApp</Label>
                            <Input
                                id="whatsapp"
                                type="tel"
                                value={whatsapp}
                                onChange={(e) => setWhatsapp(e.target.value)}
                                required
                            />
                        </div>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Enviando...' : 'Enviar'}
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    )
}
