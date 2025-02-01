"use client"

import { Home, Plus, Calendar, Ticket } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export function DesktopNav() {
    const pathname = usePathname()

    const navItems = [
        {
            href: "/",
            label: "Início",
            icon: Home,
        },
        {
            href: "/evento",
            label: "Eventos",
            icon: Calendar,
        },
        {
            href: "/revender",
            label: "Revender",
            icon: Plus,
        },
        {
            href: "/ingresso/editar",
            label: "Meu Ingresso",
            icon: Ticket,
        },
    ]

    return (
        <header className="hidden md:block fixed top-0 left-0 right-0 bg-white border-b z-50">
            <div className="container mx-auto px-4">
                <nav className="h-16 flex items-center justify-between">
                    {/* Logo/Brand */}
                    <Link href="/" className="flex items-center space-x-2">
                        <Image
                            src="/img/isologo-laranja.svg"
                            alt="Logo Dultimahora"
                            width={80}
                            height={80}
                        />
                    </Link>

                    {/* Navigation Items */}
                    <div className="flex items-center space-x-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center space-x-1 px-3 py-2 rounded-md transition-colors",
                                    pathname === item.href
                                        ? "text-[#2248FF] bg-[#2248FF]/5"
                                        : "text-gray-600 hover:text-[#2248FF] hover:bg-[#2248FF]/5",
                                )}
                            >
                                <item.icon className="h-5 w-5" />
                                <span className="font-medium">{item.label}</span>
                            </Link>
                        ))}
                    </div>
                </nav>
            </div>
        </header>
    )
}

