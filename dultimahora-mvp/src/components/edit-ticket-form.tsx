'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useRouter } from "next/navigation"
import { api } from "@/lib/api"
import { Evento} from "@prisma/client"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "sonner"

const formSchema = z.object({
  fullName: z.string().min(2, {
    message: "Nome deve ter pelo menos 2 caracteres.",
  }),
  whatsapp: z.number().min(11, {
    message: "Digite um número de WhatsApp válido.",
  }),
  event: z.string({
    required_error: "Selecione um evento.",
  }),
  ticketCount: z.string({
    required_error: "Selecione o número de ingressos.",
  }),
  ticketType: z.string().min(2, {
    message: "Informe o tipo de ingresso.",
  }),
  format: z.enum(["digital", "physical"], {
    required_error: "Selecione o formato do ingresso.",
  }),
  price: z.string().min(1, {
    message: "Informe o valor do ingresso.",
  }),
})

interface EditTicketFormProps {
  defaultValues: z.infer<typeof formSchema>,
  ticketId: number
}

export function EditTicketForm({ defaultValues, ticketId }: EditTicketFormProps) {
  const router = useRouter()

  const [events, setEvents] = useState<Evento[]>([])

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get("events")
        setEvents(response.data)
      } catch (err) {
        console.error(err)
      }
    }

    fetchEvents()
  }, [])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      api.patch(`tickets/${ticketId}`, {
        nome_completo: values.fullName,
        tipo_ingresso: values.ticketType,
        contato_whatsapp: values.whatsapp.toString(),
        formato_ingresso: values.format,
        qtd_ingressos: parseInt(values.ticketCount),
        valor_un: parseFloat(values.price),
        eventoId: parseInt(values.event),
      })
      console.log(values)
    } catch (error) {
      console.error(error)
      toast.error("Erro ao atualizar anúncio. Tente novamente.")
    }
  }

  function onDelete() {
    if (window.confirm("Tem certeza que deseja excluir este anúncio?")) {
      try {
        api.delete(`tickets/${ticketId}`)
        toast.success("Anúncio excluído com sucesso!")
        router.push("/")
      } catch (error) {
        console.error(error)
        toast.error("Erro ao excluir anúncio. Tente novamente.")
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
          name="whatsapp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Numero do seu Whatsapp *</FormLabel>
              <FormControl>
                <Input placeholder="Exemplo: 55999235678" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="event"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Evento *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um evento" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {events.map((event) => (
                    <SelectItem key={event.id} value={event.id.toString()}>
                      {event.nome}
                    </SelectItem>
                  ))}

                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
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
                <FormLabel>Tipo de ingresso *</FormLabel>
                <FormControl>
                  <Input placeholder="(camarote, pista etc...)" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

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
                  className="flex gap-4"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="digital" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Digital
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="physical" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Físico
                    </FormLabel>
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
                <Input type="number" min="0" step="0.01" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col gap-4">
          <Button 
            type="submit" 
            className="w-full bg-[#FBC004] text-black hover:bg-[#FBC004]/90"
          >
            Salvar Alterações
          </Button>
          
          <Button 
            type="button"
            variant="destructive"
            onClick={onDelete}
            className="w-full"
          >
            Excluir Anúncio
          </Button>
        </div>
      </form>
    </Form>
  )
}

