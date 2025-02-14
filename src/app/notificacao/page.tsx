"use client"

import { KeywordNotificationModal } from "@/components/keyword-notification-modal"
import { EventNotificationFlow } from "@/components/event-notification-flow"
import { UserNotificationsModal } from "@/components/user-notification-modal"
import { Card } from "@/components/ui/card"
import { BellDot, BellRing } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function NotificationPage() {
    return (
        <div className="min-h-screen md:pt-24">
            {/* Header Section */}
            <div className="flex flex-col md:hidden items-center pt-6 mb-4 px-4 border-b border-gray-200 w-11/12 mx-auto">
                <div className="mb-6 md:hidden">
                    <Link href="/">
                        <Image src="/img/isologo-laranja.svg" alt="D'Ultima Hora Logo" width={90} height={90} priority />
                    </Link>
                </div>
            </div>

            {/* Notification Options */}
            <div className="max-w-md mx-auto px-4 space-y-4">
                <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer border-2 border-transparent hover:border-[#FFC006]">
                    <div className="flex items-start gap-4">
                        <div className="p-2 bg-[#FFC006]/10 rounded-lg">
                            <BellRing className="w-6 h-6 text-[#FFC006]" />
                        </div>
                        <div className="flex-1">
                            <h2 className="text-lg font-semibold text-[#2248FF] mb-1">Notificação de Ingresso</h2>
                            <p className="text-gray-600 text-sm mb-4">
                                Escolha o evento, e receba notificação dos ingressos que são anunciados.
                            </p>
                            <EventNotificationFlow />
                        </div>
                    </div>
                </Card>

                <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer border-2 border-transparent hover:border-[#FFC006]">
                    <div className="flex items-start gap-4">
                        <div className="p-2 bg-[#FFC006]/10 rounded-lg">
                            <BellRing className="w-6 h-6 text-[#FFC006]" />
                        </div>
                        <div className="flex-1">
                            <h2 className="text-lg font-semibold text-[#2248FF] mb-1">Notificação de Evento</h2>
                            <p className="text-gray-600 text-sm mb-4">
                                Escolha uma palavra-chave (nome do evento, artista, etc.) e receba notificação se o evento for
                                anunciado.
                            </p>
                            <KeywordNotificationModal />
                        </div>
                    </div>
                </Card>

                <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer border-2 border-transparent hover:border-[#2248FF]">
                    <div className="flex items-start gap-4">
                        <div className="p-2 bg-[#2248FF]/10 rounded-lg">
                            <BellDot className="w-6 h-6 text-[#2248FF]" />
                        </div>
                        <div className="flex-1">
                            <h2 className="text-lg font-semibold text-[#2248FF] mb-1">Minhas Notificações</h2>
                            <p className="text-gray-600 text-sm mb-4">
                                Visualize e gerencie suas notificações ativas.
                            </p>
                            <UserNotificationsModal />
                        </div>
                    </div>
                </Card>
            </div>

            
            {/* Info Section */}
            <div className="mt-8 px-4 py-6 bg-white">
                <div className="max-w-md mx-auto text-center">
                    <p className="text-sm text-gray-500">
                        Ao se cadastrar, você concorda em receber notificações via WhatsApp sobre eventos e ingressos. Você pode
                        cancelar a qualquer momento.
                    </p>
                </div>
            </div>
        </div>
    )
}

