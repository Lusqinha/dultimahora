"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BellDotIcon, Trash2 } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { Evento } from "@prisma/client"
import { api } from "@/lib/api"

type Notification = {
    id: number
    keyword?: string
    eventoId?: number
    evento?: Evento
}

export function UserNotificationsModal() {
    const [phoneNumber, setPhoneNumber] = useState("")
    const [notifications, setNotifications] = useState<Notification[]>([])
    const [isLoading, setIsLoading] = useState(false)

    const fetchNotifications = async () => {
        setIsLoading(true)
        try {
            const response = await api.get(`/watchlist/${phoneNumber}`)
            setNotifications(response.data)
        } catch (error) {
            console.error("Error fetching notifications:", error)
        } finally {
            setIsLoading(false)
        }
    }

    const deleteNotification = async (id: number) => {
        try {
            await api.delete(`/watchlist/${id}`)
            setNotifications(notifications.filter((n) => n.id !== id))
        } catch (error) {
            console.error("Error deleting notification:", error)
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2 bg-[#FFC006] text-white hover:bg-[#FFC006]/70 hover:text-white"
                > <BellDotIcon/> visualizar</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-[#FFC006]" >Minhas Notificações</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="flex items-center gap-4">
                        <Input
                            id="phone"
                            placeholder="Seu número de WhatsApp"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                        <Button onClick={fetchNotifications} disabled={isLoading}
                            className="flex items-center gap-2 bg-[#FFC006] text-white hover:bg-[#FFC006]/70 hover:text-white"
                        >
                            {isLoading ? "Carregando..." : "Listar"}
                        </Button>
                    </div>
                    {notifications.length > 0 ? (
                        <ScrollArea className="h-[300px] w-full rounded-md border p-4">
                            <ul className="space-y-2">
                                {notifications.map((notification) => (
                                    
                                    <li key={notification.id} className="flex items-center justify-between p-4 border-2 border-yellow-400 rounded">                                        
                                        <div className="flex flex-col">
                                        <span className="text-gray-600 text-xs" >{notification.keyword ? "Palavra-chave" : "Evento"}</span>
                                            <span className="text-[#2248FF]">{notification.keyword || notification.evento?.nome}</span>
                                        </div>

                                        <Button variant="ghost" size="sm" onClick={() => deleteNotification(notification.id)}>
                                            <Trash2 className="h-6 w-6 text-red-500" />
                                        </Button>
                                    </li>
                                ))}
                            </ul>
                        </ScrollArea>
                    ) : (
                        <p>Nenhuma notificação encontrada.</p>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    )
}

