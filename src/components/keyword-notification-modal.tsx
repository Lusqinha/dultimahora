"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { api } from "@/lib/api"
import { toast } from "sonner"
import { BellRingIcon } from "lucide-react"

export function KeywordNotificationModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [fullName, setFullName] = useState("")
  const [whatsapp, setWhatsapp] = useState("")
  const [keyword, setKeyword] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/\D/g, "")
    if (numbers.length <= 2) return numbers
    if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`
    if (numbers.length <= 11) return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 3)} ${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedNumber = formatPhoneNumber(e.target.value)
    setWhatsapp(formattedNumber)
  }

  const validateForm = () => {
    if (!fullName.trim()) {
      toast.error("Por favor, insira seu nome completo.")
      return false
    }
    if (whatsapp.replace(/\D/g, "").length !== 11) {
      toast.error("Por favor, insira um número de WhatsApp válido.")
      return false
    }
    if (!keyword.trim()) {
      toast.error("Por favor, insira uma palavra-chave.")
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsSubmitting(true)

    const formattedPhone = `+55${whatsapp.replace(/\D/g, "")}`

    try {
      await api.post("/watchlist/keyword", {
        nome_completo: fullName,
        contato_whatsapp: formattedPhone,
        keyword: keyword,
      })
      toast.success("Você receberá notificações sobre eventos relacionados!")
      setIsOpen(false)
      setFullName("")
      setWhatsapp("")
      setKeyword("")
    } catch (error) {
      console.error(error)
      toast.error("Ocorreu um erro ao registrar sua notificação.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Button onClick={() => setIsOpen(true)} className="bg-[#FFC006] text-white hover:bg-[#FFC006]/90">
        <BellRingIcon className="w-6 h-6" />
        Notifique-me
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Receba notificações sobre eventos</DialogTitle>
            <DialogDescription>
              Preencha seus dados para receber atualizações sobre eventos relacionados à sua busca.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="fullName">Nome Completo</Label>
              <Input
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Ex.: João da Silva"
                required
                aria-required="true"
              />
            </div>
            <div>
              <Label htmlFor="whatsapp">WhatsApp</Label>
              <Input
                id="whatsapp"
                type="tel"
                value={whatsapp}
                onChange={handlePhoneChange}
                placeholder="(00) 0 0000-0000"
                required
                aria-required="true"
              />
            </div>
            <div>
              <Label htmlFor="keyword">Palavra-chave</Label>
              <Input
                id="keyword"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Ex.: Armandinho"
                required
                maxLength={20}
                aria-required="true"
              />
            </div>
            <Button type="submit" disabled={isSubmitting} className=" bg-[#FFC006] text-white hover:bg-[#FFC006]/90">
              {isSubmitting ? "Enviando..." : "Enviar"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}

