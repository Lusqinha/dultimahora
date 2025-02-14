"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { api } from "@/lib/api"
import { toast } from "sonner"
import { BellRingIcon } from "lucide-react"
import type React from "react"

interface NotificationModalProps {
    eventoId: number
    eventName: string
    btnType?: "full" | "small"
    isOpen?: boolean
    onClose?: () => void
}

export function NotificationModal({
    eventoId,
    eventName,
    btnType,
    isOpen: controlledIsOpen,
    onClose,
}: NotificationModalProps) {
    const [internalIsOpen, setInternalIsOpen] = useState(false)
    const isOpen = controlledIsOpen ?? internalIsOpen
    const handleClose = onClose ?? (() => setInternalIsOpen(false))
    const [fullName, setFullName] = useState("")
    const [whatsapp, setWhatsapp] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)

    const formatPhoneNumber = (value: string) => {
        const numbers = value.replace(/\D/g, "")
        if (numbers.length <= 2) return numbers
        if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`
        if (numbers.length <= 11) return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`
        return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 3)} ${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`
    }

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formattedNumber = formatPhoneNumber(e.target.value)
        setWhatsapp(formattedNumber)
    }

    const validateForm = () => {
        if (!fullName.trim()) {
            toast.error("Por favor, insira seu nome completo.")
            return false
        }
        if (whatsapp.replace(/\D/g, "").length !== 11) {
            toast.error("Por favor, insira um número de WhatsApp válido.")
            return false
        }
        return true
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!validateForm()) return

        setIsSubmitting(true)

        const formattedPhone = `+55${whatsapp.replace(/\D/g, "")}`

        try {
            await api.post("/watchlist/event", {
                eventoId,
                nome_completo: fullName,
                contato_whatsapp: formattedPhone,
            })
            toast.success("Você será notificado sobre este evento!")
            handleClose()
            setFullName("")
            setWhatsapp("")
        } catch (error) {
            console.error(error)
            toast.error("Ocorreu um erro ao registrar sua notificação.")
        } finally {
            setIsSubmitting(false)
        }
    }

    const btn_full = (
        <Button onClick={() => setInternalIsOpen(true)} className="bg-[#FFC006] text-white hover:bg-[#FFC006]/90">
            <BellRingIcon className="w-6 h-6" />
            Notifique-me
        </Button>
    )
    const btn_small = (
        <Button
            onClick={() => setInternalIsOpen(true)}
            className="bg-[#FFC006] text-white hover:bg-[#FFC006]/90 rounded-full w-8 h-8"
        >
            <BellRingIcon width={50} height={50} />
        </Button>
    )

    return (
        <>
            {btnType === "full" ? btn_full : btn_small}
            <Dialog open={isOpen} onOpenChange={handleClose}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Receba notificações sobre {eventName}</DialogTitle>
                        <DialogDescription>Preencha seus dados para receber atualizações sobre este evento.</DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Label htmlFor="fullName">Nome Completo</Label>
                            <Input
                                id="fullName"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                required
                                aria-required="true"
                            />
                        </div>
                        <div>
                            <Label htmlFor="whatsapp">WhatsApp</Label>
                            <Input
                                id="whatsapp"
                                type="tel"
                                value={whatsapp}
                                onChange={handlePhoneChange}
                                placeholder="(00) 0 0000-0000"
                                required
                                aria-required="true"
                            />
                        </div>
                        <Button type="submit" disabled={isSubmitting} className=" bg-[#FFC006] text-white hover:bg-[#FFC006]/50">
                            {isSubmitting ? "Enviando..." : "Enviar"}
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    )
}

