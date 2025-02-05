"use client";

import { KeywordNotificationModal } from "@/components/keyword-notification-modal"
export default function NotificationPage() {

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
            <div className="max-w-md w-full space-y-8 text-center">
                <h1 className="text-3xl font-bold text-[#2248FF]">Notificações de Eventos</h1>
                <p className="text-gray-600">
                    Receba alertas sobre eventos que te interessam diretamente no seu WhatsApp.
                    Configure suas palavras-chave e fique por dentro das novidades!
                </p>
                <KeywordNotificationModal />
            </div>
        </div>
    )
}
