"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import type { Evento } from "@prisma/client"
import { useState, useEffect, useCallback } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"
import { motion, AnimatePresence } from "framer-motion"
import { Search } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { api } from "@/lib/api"
import { Steps } from "@/components/ui/steps"
import { Card, CardContent } from "@/components/ui/card"
import { smallDateString } from "@/lib/utils"

const formSchema = z.object({
  eventSearch: z.string().optional(),
  selectedEvent: z.string().optional(),
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
  { title: "Detalhes do Evento", fields: ["ticketCount", "ticketType"] },
  { title: "Dados Pessoais", fields: ["fullName", "cpf", "whatsapp"] },
  { title: "Informações do Ingresso", fields: ["format", "price"] },
]

export function ResaleForm() {
  const [currentStep, setCurrentStep] = useState(0)
  const [password, setPassword] = useState<string | null>(null)
  const [events, setEvents] = useState<Evento[]>([])
  const [searchResults, setSearchResults] = useState<Evento[]>([])
  const [selectedEvent, setSelectedEvent] = useState<Evento | null>(null)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      format: "Digital",
    },
  })

  const fetchEvents = useCallback(() => {
    api
      .get("events")
      .then((response) => {
        setEvents(response.data)
      })
      .catch((error) => {
        console.error(error)
        toast.error("Erro ao carregar eventos. Tente novamente.")
      })
  }, [])

  useEffect(() => {
    fetchEvents()
  }, [fetchEvents])

  const searchEvents = (query: string) => {
    const results = events.filter((event) => event.nome.toLowerCase().includes(query.toLowerCase()))
    setSearchResults(results)
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
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
        toast.success("Ingresso anunciado com sucesso!")
      }
    } catch (error) {
      console.error(error)
      toast.error("Erro ao anunciar ingresso. Tente novamente.")
    }
  }

  const handleNext = async () => {
    const fields = steps[currentStep].fields
    const isValid = await form.trigger(fields as any)
    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
    }
  }

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0))
  }

  const isLastStep = currentStep === steps.length - 1

  const formatCPF = (value: string) => {
    return value.replace(/\D/g, "").replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
  }

  const formatPhone = (value: string) => {
    return value.replace(/\D/g, "").replace(/(\d{2})(\d{4,5})(\d{4})/, "($1) $2-$3")
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold mb-8">Criar anúncio</h1>

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
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-6">Informações do evento</h2>
                    <FormField
                      control={form.control}
                      name="eventSearch"
                      render={({ field }) => (
                        <FormItem className="space-y-4">
                          <FormLabel>Nome do evento</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                              <Input
                                {...field}
                                placeholder="Busque pelo nome do evento"
                                className="pl-10"
                                onChange={(e) => {
                                  field.onChange(e)
                                  searchEvents(e.target.value)
                                }}
                              />
                            </div>
                          </FormControl>
                          {searchResults.length > 0 && (
                            <div className="mt-2 rounded-lg border bg-card text-card-foreground shadow-sm">
                              <div className="p-2">
                                <p className="px-2 py-1.5 text-sm text-muted-foreground">
                                  Resultados:
                                </p>
                                <div className="space-y-1">
                                  {searchResults.map((event) => (
                                    <div
                                      key={event.id}
                                      className="flex items-center gap-3 rounded-md px-2 py-1.5 hover:bg-accent cursor-pointer"
                                      onClick={() => {
                                        form.setValue('selectedEvent', event.id.toString())
                                        setSelectedEvent(event)
                                      }}
                                    >
                                      <input
                                        type="radio"
                                        className="h-4 w-4 rounded-full border-primary text-primary"
                                        checked={selectedEvent?.id === event.id}
                                        onChange={() => { }}
                                      />
                                      <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 overflow-hidden rounded-md">
                                          <img
                                            src={event.banner_path || '/placeholder.svg?height=40&width=40'}
                                            alt={event.nome}
                                            className="h-full w-full object-cover"
                                          />
                                        </div>
                                        <span className="text-sm font-medium">
                                          {event.nome}
                                        </span>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              )}

              {currentStep === 1 && (
                <>
                  {selectedEvent ? (
                    <div className="space-y-4">
                      <h3 className="font-bold">Evento Selecionado: {selectedEvent.nome}</h3>
                      <p>Data: {smallDateString(selectedEvent.date)}</p>
                      <p>Local: {selectedEvent.local}</p>
                      <Button type="button" onClick={() => setSelectedEvent(null)}>
                        Alterar Evento
                      </Button>
                    </div>
                  ) : (
                    <Alert>
                      <AlertTitle>Nenhum evento selecionado</AlertTitle>
                      <AlertDescription>Por favor, volte ao passo anterior e selecione um evento.</AlertDescription>
                    </Alert>
                  )}

                  <FormField
                    control={form.control}
                    name="ticketCount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Número de Ingressos *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Quantidade" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {[1, 2, 3, 4, 5].map((num) => (
                              <SelectItem key={num} value={num.toString()}>
                                {num}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="ticketType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Insira o Tipo de ingresso *</FormLabel>
                        <FormControl>
                          <Input placeholder="(camarote, pista etc...)" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}

              {currentStep === 2 && (
                <>
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome Completo *</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="cpf"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CPF *</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            onChange={(e) => {
                              const formatted = formatCPF(e.target.value)
                              e.target.value = formatted
                              field.onChange(formatted.replace(/\D/g, ""))
                            }}
                            maxLength={14}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="whatsapp"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Numero do seu Whatsapp *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="(99) 99999-9999"
                            {...field}
                            onChange={(e) => {
                              const formatted = formatPhone(e.target.value)
                              e.target.value = formatted
                              field.onChange(formatted.replace(/\D/g, ""))
                            }}
                            maxLength={15}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}

              {currentStep === 3 && (
                <>
                  <FormField
                    control={form.control}
                    name="format"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Formato do ingresso: *</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="Digital" />
                              </FormControl>
                              <FormLabel className="font-normal">Digital</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="Físico" />
                              </FormControl>
                              <FormLabel className="font-normal">Físico</FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Valor que quer vender(cada) *</FormLabel>
                        <FormControl>
                          <Input type="number" min="0" step="0.10" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-between mt-6">
            {currentStep > 0 && (
              <Button type="button" variant="outline" onClick={handlePrevious}>
                Voltar
              </Button>
            )}
            {!isLastStep ? (
              <Button type="button" className="ml-auto" onClick={handleNext}>
                Próximo
              </Button>
            ) : (
              <Button type="submit" className="ml-auto bg-[#FBC004] text-black hover:bg-[#FBC004]/90">
                Anunciar Ingresso
              </Button>
            )}
          </div>
        </form>
      </Form>

      {password && (
        <Alert className="mt-6 border border-green-500">
          <AlertTitle>Anúncio criado com sucesso!</AlertTitle>
          <AlertDescription>
            Sua senha para editar este anúncio é: <strong>{password}</strong>
            <br />
            Por favor, guarde esta senha em um local seguro. Você precisará dela para editar seu anúncio no futuro.
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}

