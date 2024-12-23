'use client'

import { useState } from "react"
import Image from "next/image"
import { EditTicketForm } from "@/components/edit-ticket-form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

interface EditTicketPageProps {
  params: {
    id: string
  }
}

export default function EditTicketPage({ params }: EditTicketPageProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")

  // In a real app, fetch ticket details based on params.id
  const ticketDetails = {
    id: params.id,
    fullName: "Jaíne Stolte",
    whatsapp: "5599999999",
    event: "reveillon-2025",
    ticketCount: "1",
    ticketType: "Pista",
    format: "digital",
    price: "185.00"
  }

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, verify the password with an API call
    if (password === "correct_password") { // Replace with actual verification
      setIsAuthenticated(true)
    } else {
      toast.error("Senha incorreta. Tente novamente.")
    }
  }

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-white">
        <header className="bg-[#3F7EA7] p-4">
          <div className="max-w-xl mx-auto">
            <Image
              src="/placeholder.svg?height=60&width=200"
              alt="D'Ultima Hora Logo"
              width={200}
              height={60}
              className="mx-auto h-12 w-auto"
            />
          </div>
        </header>

        <div className="max-w-xl mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold text-center text-[#3F7EA7] mb-8">
            Digite a senha para editar o anúncio
          </h1>

          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite a senha do anúncio"
            />
            <Button 
              type="submit" 
              className="w-full bg-[#FBC004] text-black hover:bg-[#FBC004]/90"
            >
              Verificar Senha
            </Button>
          </form>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen ">
      <header className="bg-[#3F7EA7] p-4">
        <div className="max-w-xl mx-auto">
          <Image
            src="/placeholder.svg?height=60&width=200"
            alt="D'Ultima Hora Logo"
            width={200}
            height={60}
            className="mx-auto h-12 w-auto"
          />
        </div>
      </header>

      <div className="max-w-xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-center text-[#3F7EA7] mb-8">
          Editar Anúncio
        </h1>

        <EditTicketForm defaultValues={ticketDetails} />
      </div>
    </main>
  )
}

