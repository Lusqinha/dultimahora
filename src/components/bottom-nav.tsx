"use client"

import { Home, Plus, Calendar } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export function BottomNav() {
    const pathname = usePathname()

    return (
        <nav className="fixed bottom-0 left-0 right-0 md:hidden bg-white border-t rounded-t-3xl h-16 flex items-center justify-around">
            <Link
                href="/"
                className={cn(
                    "flex flex-col items-center justify-center text-xs",
                    pathname === "/" ? "text-blue-600" : "text-gray-500",
                )}
            >
                <Home className="h-5 w-5" />
                <span>Início</span>
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
                href="/revender"
                className={cn(
                    "flex flex-col items-center justify-center text-xs",
                    pathname === "/revender" ? "text-blue-600" : "text-gray-500",
                )}
            >
                <Plus className="h-5 w-5" />
                <span>Registrar</span>
            </Link>
        </nav>
    )
}