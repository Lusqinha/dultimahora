"use client"

import { Calendar, Ticket, Bell, HandCoins } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export function BottomNav() {
    const pathname = usePathname()

    return (
        <nav className="fixed bottom-0 left-0 right-0 md:hidden bg-white border-t rounded-t-3xl h-16 flex items-center justify-around">
            <Link
                href="/ingresso/editar"
                className={cn(
                    "flex flex-col items-center justify-center text-xs",
                    pathname === "/ingresso/editar" ? "text-blue-600" : "text-gray-500",
                )}
            >
                <Ticket className="h-5 w-5" />
                <span>Meu ingresso</span>
            </Link>
            <Link
                href="/evento"
                className={cn(
                    "flex flex-col items-center justify-center text-xs",
                    pathname === "/evento" ? "text-blue-600" : "text-gray-500",
                )}
            >
                <Calendar className="h-5 w-5" />
                <span>Eventos</span>
            </Link>
            <Link
                href="/notificacao"
                className={cn(
                    "flex flex-col items-center justify-center text-xs",
                    pathname === "/notificacao" ? "text-blue-600" : "text-gray-500",
                )}
            >
                <Bell className="h-5 w-5" />
                <span>Notifique-me</span>
            </Link>
           
            <Link
                href="/revender"
                className={cn(
                    "flex flex-col items-center justify-center text-xs",
                    pathname === "/revender" ? "text-blue-600" : "text-gray-500",
                )}
            >
                <HandCoins className="h-5 w-5" />
                <span>Revender</span>
            </Link>
        </nav>
    )
}