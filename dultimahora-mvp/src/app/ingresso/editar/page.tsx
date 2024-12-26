'use client'

import { EditTicketForm } from "@/components/edit-ticket-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { type Ingresso } from "@prisma/client"
import { useState } from "react"
import { api } from "@/lib/api"
import { toast } from "sonner"


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
    
  }
    if (isAuthenticated) {
      return (
        <main className="min-h-screen ">

          <div className="max-w-xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold text-center text-[#3F7EA7] mb-8">
              Editar Anúncio
            </h1>

            {ticketDetails && (
              <EditTicketForm ticketId={ticketDetails.id}
                defaultValues={{
                  fullName: ticketDetails.nome_completo,
                  whatsapp: parseInt(ticketDetails.contato_whatsapp),
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
    return (
      <section className="min-h-screen">
        <div className="max-w-xl mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold text-center text-[#3F7EA7] mb-8">
            Digite a senha para editar o anúncio
          </h1>

          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <Input
              type="text"
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

