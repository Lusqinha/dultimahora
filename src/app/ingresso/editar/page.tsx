/* eslint-disable  @typescript-eslint/no-explicit-any */

"use client"

import { EditTicketForm } from "@/components/ticket/edit-ticket-form"
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
import { Loader2, UserCircle2, Pencil, Trash2, Check, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { BackArrow } from "@/components/layout/back-arrow"
import type React from "react"

export default function EditTicketPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [ticketDetails, setTicketDetails] = useState<Ingresso>()
  const [password, setPassword] = useState("")
  const [cpf, setCpf] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)
  const [showEditForm, setShowEditForm] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showConfirmSaleDialog, setShowConfirmSaleDialog] = useState(false)
  const [saleQuantity, setSaleQuantity] = useState(1) // Added state for sale quantity
  const router = useRouter()

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, "")
    if (numbers.length <= 3) return numbers
    if (numbers.length <= 6) return `${numbers.slice(0, 3)}.${numbers.slice(3)}`
    if (numbers.length <= 9) return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6)}`
    return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6, 9)}-${numbers.slice(9, 11)}`
  }

  const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCPF(e.target.value)
    if (formatted.length <= 14) {
      setCpf(formatted)
    }
  }

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!password || !cpf) {
      toast.error("Preencha todos os campos.")
      return
    }

    if (cpf.replace(/\D/g, "").length !== 11) {
      toast.error("CPF inválido.")
      return
    }

    setIsLoading(true)

    try {
      const response = await api.post("tickets/verify", {
        codigo_ingresso: password,
        cpf: cpf.replace(/\D/g, ""),
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
      setShowEditForm(false)
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
      toast.success("Anúncio removido com sucesso!")
      router.push("/")
    } catch (err) {
      console.error(err)
      toast.error("Erro ao remover o anúncio. Tente novamente.")
    }
  }

  const handleConfirmSale = async () => {
    if (saleQuantity < 1 || saleQuantity > (ticketDetails?.qtd_ingressos || 0)) {
      toast.error("Quantidade inválida")
      return
    }

    try {
      await api.patch(`tickets/${ticketDetails?.id}/confirm-sale`, {
        qtd_sell: saleQuantity,
        actual_qtd: ticketDetails?.qtd_ingressos,
      })
      toast.success("Venda confirmada com sucesso!")
      router.push("/")
    } catch (err) {
      console.error(err)
      toast.error("Erro ao confirmar a venda. Tente novamente.")
    }
  }

  if (isAuthenticated) {
    return (
      <main className="min-h-screen flex items-center flex-col justify-center px-4">
        <BackArrow />
        <div className="max-w-md mx-auto">
          {/* User Profile Card */}
          <Card className="border-none shadow-md">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-4 mb-6">
                <div className="bg-[#FFC006] rounded-full p-3">
                  <UserCircle2 className="w-12 h-12 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Painel do Anúncio</h2>
                  <p className="text-gray-600">{ticketDetails?.nome_completo}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button
                  onClick={() => setShowEditForm(true)}
                  className="w-full bg-[#FFC006] hover:bg-[#FFC006]/90 text-white h-12"
                >
                  <Pencil className="mr-2 h-5 w-5" />
                  Editar Anúncio
                </Button>
                <Button
                  onClick={() => setShowDeleteDialog(true)}
                  variant="outline"
                  className="w-full border-[#FFC006] text-[#FFC006] hover:bg-[#FFC006]/10 h-12"
                >
                  <Trash2 className="mr-2 h-5 w-5" />
                  Remover Anúncio
                </Button>
                <Button
                  onClick={() => setShowConfirmSaleDialog(true)}
                  variant="outline"
                  className="w-full border-green-500 text-green-500 hover:bg-green-50 h-12"
                >
                  <Check className="mr-2 h-5 w-5" />
                  Confirmar Venda
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Edit Form Dialog */}
          {/* add back arrow to set showEditForm false*/}
          <AlertDialog open={showEditForm} onOpenChange={setShowEditForm}>
            <AlertDialogContent className="max-w-xl">
              <AlertDialogHeader>
                <AlertDialogTitle>Editar Anúncio</AlertDialogTitle>
                {/* close button */}
                <button
                  onClick={() => setShowEditForm(false)}
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                  <X className="h-6 w-6" />
                </button>
              </AlertDialogHeader>
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
                    price: ticketDetails.valor_un.toString(),
                  }}
                  onSubmit={handleUpdate}
                  isUpdating={isUpdating}
                />
              )}
            </AlertDialogContent>
          </AlertDialog>

          {/* Delete Confirmation Dialog */}
          <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Remover Anúncio</AlertDialogTitle>
                <AlertDialogDescription>
                  Tem certeza que deseja remover este anúncio? Esta ação não pode ser desfeita.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete} className="bg-red-500 hover:bg-red-600">
                  Remover
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          {/* Confirm Sale Dialog */}
          <AlertDialog open={showConfirmSaleDialog} onOpenChange={setShowConfirmSaleDialog}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Confirmar Venda</AlertDialogTitle>
                <AlertDialogDescription className="space-y-4">
                  <p>Quantos ingressos foram vendidos?</p>
                  <Input
                    type="number"
                    min={1}
                    max={ticketDetails?.qtd_ingressos}
                    value={saleQuantity}
                    onChange={(e) => setSaleQuantity(Number(e.target.value))}
                    className="w-full"
                  />
                  <p className="text-sm text-muted-foreground">
                    Você tem {ticketDetails?.qtd_ingressos} ingresso(s) disponível(is)
                  </p>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={handleConfirmSale} className="bg-green-500 hover:bg-green-600 plausible-event-name=confirma_venda">
                  Confirmar
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          {/* Success Dialog */}
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
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen flex items-center flex-col justify-center px-4">
      <BackArrow />
      <div className="text-center mb-8 bg-[#FFC006] max-w-[455px] mx-auto p-4 rounded-md text-white">
        Bem-vindo ao Painel do Anúncio! Aqui você pode editar detalhes, confirmar a venda do ingresso ou remover seu
        anúncio!
      </div>
      <Card className="w-full max-w-md shadow-md rounded-md">
        <CardHeader className="bg-white text-black w-10/12 mx-auto font-normal rounded-t-md flex flex-row items-center justify-center p-2">
          <UserCircle2 className="w-28 h-28 mr-1 text-[#FFC006]" />
          <CardTitle className="text-2xl font-bold">Acesse o painel do seu anúncio</CardTitle>
        </CardHeader>
        <CardContent className="pt-6 border-t border-gray-200 w-11/12 mx-auto">
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
                onChange={handleCPFChange}
                placeholder="000.000.000-00"
                className="w-full shadow-sm"
                maxLength={14}
              />
            </div>
            <Button type="submit" className="w-full bg-[#FFC006] text-white hover:bg-[#FFC006]/90" disabled={isLoading}>
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

