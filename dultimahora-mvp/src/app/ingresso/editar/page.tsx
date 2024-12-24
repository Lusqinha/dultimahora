'use client'

import { useState } from "react"
import Image from "next/image"
import { EditTicketForm } from "@/components/edit-ticket-form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { api } from "@/lib/api"
import { type Ingresso } from "@prisma/client"


export default function EditTicketPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [ticketDetails, setTicketDetails] = useState<Ingresso>()
  const [password, setPassword] = useState("")
  const [cpf, setCpf] = useState("")

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!password || !cpf) {
      toast.error("Preencha todos os campos.")
      return
    }

    try {
      const response = await api.post("tickets/verify", {
        codigo_ingresso: password,
        cpf
      })
      if (response.data) {
        setIsAuthenticated(true)
        setTicketDetails(response.data)
      }
    } catch (err) {
      console.error(err)
      toast.error("Senha inválida.")

  }

  if (!isAuthenticated) {
    return (
      <section className="min-h-screen">
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
            <Input
              type="text"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              placeholder="Digite seu CPF"
            />
            <Button 
              type="submit" 
              className="w-full bg-[#FBC004] text-black hover:bg-[#FBC004]/90"
            >
              Verificar Senha
            </Button>
          </form>
        </div>
      </section>
    )
  }

  return (
    <main className="min-h-screen ">

      <div className="max-w-xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-center text-[#3F7EA7] mb-8">
          Editar Anúncio
        </h1>

        {ticketDetails && (
          <EditTicketForm
            defaultValues={{
              fullName: ticketDetails.nome_completo,
              whatsapp: ticketDetails.contato_whatsapp,
              event: ticketDetails.eventoId.toString(),
              ticketCount: ticketDetails.qtd_ingressos.toString(),
              ticketType: ticketDetails.tipo_ingresso,
              format: ticketDetails.formato_ingresso as "digital" | "physical",
              price: ticketDetails.valor_un.toString(),
            }}
          />
        )}
      </div>
    </main>
  )
  }
}

