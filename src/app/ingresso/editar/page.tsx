"use client"

import { EditTicketForm } from "@/components/edit-ticket-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import type { Ingresso } from "@prisma/client"
import { useState } from "react"
import { api } from "@/lib/api"
import { toast } from "sonner"
import { Loader2, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import type React from "react" // Added import for React

export default function EditTicketPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [ticketDetails, setTicketDetails] = useState<Ingresso>()
  const [password, setPassword] = useState("")
  const [cpf, setCpf] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)
  const router = useRouter()

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!password || !cpf) {
      toast.error("Preencha todos os campos.")
      return
    }

    setIsLoading(true)

    try {
      const response = await api.post("tickets/verify", {
        codigo_ingresso: password,
        cpf,
      })
      if (response.data) {
        setIsAuthenticated(true)
        setTicketDetails(response.data)
        toast.success("Autenticação bem-sucedida!")
      }
    } catch (err) {
      console.error(err)
      toast.error("Senha ou CPF inválidos. Por favor, tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpdate = async (formData: any) => {
    setIsUpdating(true)
    try {
      await api.put(`tickets/${ticketDetails?.id}`, formData)
      setShowSuccessDialog(true)
    } catch (err) {
      console.error(err)
      toast.error("Erro ao atualizar o ingresso. Tente novamente.")
    } finally {
      setIsUpdating(false)
    }
  }

  const handleDelete = async () => {
    try {
      await api.delete(`tickets/${ticketDetails?.id}`)
      toast.success("Ingresso deletado com sucesso!")
      router.push("/") // Redirect to home page after deletion
    } catch (err) {
      console.error(err)
      toast.error("Erro ao deletar o ingresso. Tente novamente.")
    }
  }

  if (isAuthenticated) {
    return (
      <main className="min-h-screen py-8 px-4">
        <Card className="max-w-xl mx-auto shadow-md">
          <CardHeader className="bg-[#FFC006] rounded-t-md text-white">
            <CardTitle className="text-2xl font-bold text-center">Editar Anúncio</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            {ticketDetails && (
              <EditTicketForm
                ticketId={ticketDetails.id}
                defaultValues={{
                  fullName: ticketDetails.nome_completo,
                  whatsapp: ticketDetails.contato_whatsapp,
                  event: ticketDetails.eventoId.toString(),
                  ticketCount: ticketDetails.qtd_ingressos.toString(),
                  ticketType: ticketDetails.tipo_ingresso,
                  format: ticketDetails.formato_ingresso as "Digital" | "Físico",
                  price: ticketDetails.valor_un.toString()
                }}
                onSubmit={handleUpdate}
                isUpdating={isUpdating}
              />
            )}
          </CardContent>
        </Card>
        <AlertDialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Anúncio Atualizado</AlertDialogTitle>
              <AlertDialogDescription>Seu anúncio foi atualizado com sucesso!</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="justify-center gap-4">
              <AlertDialogAction onClick={() => router.push(`/ingresso/${ticketDetails?.id}`)}>
                Ver Anúncio
              </AlertDialogAction>
              <AlertDialogCancel onClick={() => setShowSuccessDialog(false)}>Fechar</AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <Card className="w-full max-w-md shadow-md rounded-md ">
        <CardHeader className="bg-[#FFC006] text-white rounded-t-md">
          <CardTitle className="text-2xl font-bold text-center">Acesso ao Anúncio</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Senha do Anúncio
              </label>
              <Input
                id="password"
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite a senha do anúncio"
                className="w-full shadow-sm"
              />
            </div>
            <div>
              <label htmlFor="cpf" className="block text-sm font-medium text-gray-700 mb-1">
                CPF
              </label>
              <Input
                id="cpf"
                type="text"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
                placeholder="Digite seu CPF"
                className="w-full shadow-sm"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-[#FFC006] text-white hover:bg-[#FFC006]/90"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verificando...
                </>
              ) : (
                "Acessar Anúncio"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  )
}

