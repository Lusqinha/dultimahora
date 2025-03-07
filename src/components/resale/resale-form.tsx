/* eslint-disable  @typescript-eslint/no-explicit-any */

"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import type { Evento } from "@prisma/client"
import { useState, useEffect, useCallback } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"
import { motion, AnimatePresence } from "framer-motion"
import { Loader2, TicketIcon as TicketsIcon } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { api } from "@/lib/api"
import { Steps } from "@/components/ui/steps"
import EventCard from "@/components/event/event-card"

import { EventSearch } from "./step-form/event-search"
import { EventCreationForm } from "@/components/resale/step-form/event-creation-form"
import { PersonalInfoForm } from "@/components/resale/step-form/personal-info-form"
import { TicketFormatPriceForm } from "@/components/resale/step-form/ticket-form"
import { redirect } from "next/navigation"

const formSchema = z.object({
  eventSearch: z.string().optional(),
  selectedEvent: z.string().optional(),
  name: z
    .string()
    .min(2, {
      message: "Nome do evento deve ter pelo menos 2 caracteres.",
    })
    .optional(),
  date: z
    .string()
    .min(1, {
      message: "Data do evento é obrigatória.",
    })
    .optional(),
  banner: z
    .any()
    .optional()
    .refine((file) => !file || file instanceof File, { message: "O banner deve ser um arquivo válido." }),
  fullName: z.string().min(2, {
    message: "Nome deve ter pelo menos 2 caracteres.",
  }),
  cpf: z.string().regex(/^\d{11}$/, {
    message: "CPF deve conter 11 dígitos numéricos.",
  }),
  whatsapp: z.string().regex(/^\d{10,11}$/, {
    message: "Número de WhatsApp deve conter 10 ou 11 dígitos numéricos.",
  }),
  ticketCount: z.string({
    required_error: "Selecione o número de ingressos.",
  }),
  ticketType: z.string().min(2, {
    message: "Informe o tipo de ingresso.",
  }),
  format: z.enum(["Digital", "Físico"], {
    required_error: "Selecione o formato do ingresso.",
  }),
  price: z.string().min(1, {
    message: "Informe o valor do ingresso.",
  }),
})

const steps = [
  { title: "Buscar Evento", fields: ["eventSearch", "selectedEvent"] },
  { title: "Criar Evento", fields: ["eventName", "eventDate", "eventLocation"] },
  { title: "Dados Pessoais", fields: ["fullName", "cpf", "whatsapp"] },
  { title: "Informações do Ingresso", fields: ["format", "price", "ticketCount", "ticketType"] },
]

export function ResaleForm() {
  const [currentStep, setCurrentStep] = useState(0)
  const [password, setPassword] = useState<string | null>(null)
  const [events, setEvents] = useState<Evento[]>([])
  const [searchResults, setSearchResults] = useState<Evento[]>([])
  const [selectedEvent, setSelectedEvent] = useState<Evento | null>(null)
  const [isCreatingEvent, setIsCreatingEvent] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [eventsLoaded] = useState(false)
  const [isEventFormValid, setIsEventFormValid] = useState(false) // Added state for form validity
  const form = useForm<z.infer<typeof formSchema>>({
    // Changed to let
    resolver: zodResolver(formSchema),
    defaultValues: {
      format: "Digital",
    },
  })

  const fetchEvents = useCallback(() => {
    if (!eventsLoaded) {
      api
        .get("events")
        .then((response) => {
          setEvents(response.data)
        })
        .catch((error) => {
          console.error(error)
          toast.error("Erro ao carregar eventos. Tente novamente.")
        })
    }
  }, [eventsLoaded])

  useEffect(() => {
    fetchEvents()
  }, [fetchEvents])

  const searchEvents = (query: string) => {
    const results = events.filter((event) => event.nome.toLowerCase().includes(query.toLowerCase()))
    setSearchResults(results)
  }

  async function createEvent(values: z.infer<typeof formSchema>) {
    try {
      const formData = new FormData()
      if (values.name) formData.append("nome", values.name)
      if (values.date) formData.append("date", values.date)
      if (values.banner) formData.append("banner", values.banner as File)

      const response = await api.post("events", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      if (response.status === 201) {
        setSelectedEvent(response.data)
        toast.success("Evento criado com sucesso!")
        setIsCreatingEvent(false)
        setCurrentStep(2) // Move to ticket details step
      }
    } catch (error) {
      console.error(error)
      toast.error("Erro ao criar evento. Tente novamente.")
    }
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    try {
      if (isCreatingEvent) {
        // Create new event
        const formData = new FormData()
        if (values.name) formData.append("nome", values.name)
        if (values.date) formData.append("date", values.date)
        if (values.banner) formData.append("banner", values.banner as File)

        const eventResponse = await api.post("events", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })

        if (eventResponse.status === 201) {
          setSelectedEvent(eventResponse.data)
          toast.success("Evento criado com sucesso!")
          setIsCreatingEvent(false)
          setCurrentStep(2) // Move to ticket details step
          return
        }
      }

      // Create ticket listing
      const response = await api.post("tickets", {
        nome_completo: values.fullName,
        tipo_ingresso: values.ticketType,
        contato_whatsapp: values.whatsapp,
        formato_ingresso: values.format,
        qtd_ingressos: Number.parseInt(values.ticketCount),
        valor_un: Number.parseFloat(values.price),
        cpf: values.cpf,
        eventoId: selectedEvent?.id,
      })

      if (response.status === 201) {
        setPassword(response.data.codigo_ingresso)
        setShowSuccessModal(true)
      }
    } catch (error) {
      console.error(error)
      toast.error("Erro ao processar sua solicitação. Tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleNext = async () => {
    const fields = steps[currentStep].fields
    const isValid = await form.trigger(fields as any)
    if (isValid) {
      setIsLoading(true)
      if (currentStep === 0 && !selectedEvent) {
        setIsCreatingEvent(true)
        setCurrentStep(1) // Move to event creation step
      } else if (currentStep === 1 && !selectedEvent && !isCreatingEvent) {
        // Prevent advancing if no event is selected or being created
        setIsLoading(false)
        return
      } else {
        setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
      }

      if (currentStep === 1 && isCreatingEvent) {
        setIsCreatingEvent(false)
        await createEvent(form.getValues())
      }
      setIsLoading(false)
    }
  }

  const handlePrevious = () => {
    if (currentStep === 1 && isCreatingEvent) {
      setIsCreatingEvent(false)
      setCurrentStep(0)
    } else {
      setCurrentStep((prev) => Math.max(prev - 1, 0))
    }
  }

  const isLastStep = currentStep === steps.length - 1

  const formatCPF = (value: string) => {
    return value.replace(/\D/g, "").replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
  }

  const formatPhone = (value: string) => {
    return value.replace(/\D/g, "").replace(/(\d{2})(\d{4,5})(\d{4})/, "($1) $2-$3")
  }

  return (
    <div className="w-full max-w-2xl mx-auto md:pt-10">
      <h1 className="text-2xl flex items-center justify-center gap-3 font-bold text-center text-[#2248FF] pb-6">
        <TicketsIcon />
        Revender Ingresso
      </h1>

      {currentStep === 0 && (
        <div className="bg-[#FBC004] rounded-2xl p-4 mb-10">
          <p className="text-justify text-sm text-white font-bold [text-align-last:center]">
            {`O D'Ultimahora é uma plataforma para unir quem quer vender,
              com quem quer comprar, sem qualquer taxa ou cobrança.
              Ao anunciar seu ingresso os interessados irão lhe chamar, e a
              negociação é por sua conta...`}
          </p>
        </div>
      )}

      <div className="mb-12">
        <Steps currentStep={currentStep} steps={steps} />
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ x: 10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -10, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {currentStep === 0 && (
                <EventSearch
                  searchEvents={searchEvents}
                  searchResults={searchResults}
                  selectedEvent={selectedEvent}
                  setSelectedEvent={setSelectedEvent}
                  setIsCreatingEvent={setIsCreatingEvent}
                  setCurrentStep={setCurrentStep}
                  form={form}
                />
              )}

              {currentStep === 1 && (
                <div className="space-y-6">
                  {isCreatingEvent ? (
                    <EventCreationForm form={form} onValidityChange={setIsEventFormValid} />
                  ) : (
                  <div className="space-y-4">
                    <h3 className="font-bold">Evento Selecionado: </h3>

                    {selectedEvent && <EventCard {...selectedEvent} clickable={false} />}

                    <Button
                      type="button"
                      className="bg-[#2248ff] text-white hover:bg-[#2248ff]/90"
                      onClick={() => {
                        setSelectedEvent(null)
                        setCurrentStep(0)
                      }}
                    >
                      Alterar Evento
                    </Button>
                  </div>
                  )}
                </div>
              )}

              {currentStep === 2 && <PersonalInfoForm form={form} formatCPF={formatCPF} formatPhone={formatPhone} />}

              {currentStep === 3 && <TicketFormatPriceForm form={form} />}
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-between mt-6">
            {currentStep > 0 && (
              <Button type="button" variant="outline" onClick={handlePrevious}>
                Voltar
              </Button>
            )}
            {!isLastStep ? (
              <Button
                type="button"
                className="ml-auto bg-[#FBC004] text-white hover:bg-[#FBC004]/90"
                onClick={handleNext}
                disabled={
                  isLoading ||
                  (currentStep === 1 && !selectedEvent && !isCreatingEvent) ||
                  (currentStep === 1 && isCreatingEvent && !isEventFormValid) // Updated disabled condition
                }
              >
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Próximo
              </Button>
            ) : (
              <Button
                type="submit"
                className="ml-auto bg-[#FBC004] text-white hover:bg-[#FBC004]/90"
                disabled={isLoading}
              >
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Anunciar Ingresso
              </Button>
            )}
          </div>
        </form>
      </Form>

      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Anúncio criado com sucesso!</DialogTitle>
            <DialogDescription>
              A senha do seu anúncio é:
              <br />
              <strong>{password}</strong>
              <br />
              Por favor, guarde esta senha em um local seguro. Você precisará dela para editar seu anúncio no futuro.
              (Tambem irá receber a senha Via WhatsApp)
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              className="bg-[#FBC004] text-white hover:bg-[#FBC004]/90"
              onClick={() => {
                setShowSuccessModal(false)
                redirect(`/evento/${selectedEvent?.id}`)
              }}
            >
              Ir para o evento
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

