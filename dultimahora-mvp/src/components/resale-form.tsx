'use client'

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useRouter } from "next/navigation"

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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const formSchema = z.object({
  fullName: z.string().min(2, {
    message: "Nome deve ter pelo menos 2 caracteres.",
  }),
  whatsapp: z.string().min(11, {
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

function generateRandomPassword() {
  return Math.random().toString(36).slice(-8)
}

export function ResaleForm() {
  const router = useRouter()
  const [password, setPassword] = useState("")
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      format: "digital",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const generatedPassword = generateRandomPassword()
      setPassword(generatedPassword)
      
      // In a real app, make API call to create new ticket listing
      // Include the generated password in the API call
      console.log({ ...values, password: generatedPassword })
      
      toast.success("Ingresso anunciado com sucesso!")
      // Don't redirect immediately, allow user to see the password
    } catch (error) {
      toast.error("Erro ao anunciar ingresso. Tente novamente.")
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
              <FormLabel>Selecione o Evento *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um evento" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="reveillon-2025">Reveillon Privilege 2025</SelectItem>
                  <SelectItem value="other">Outro Evento</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

        <Button 
          type="submit" 
          className="w-full bg-[#FBC004] text-black hover:bg-[#FBC004]/90"
        >
          Anunciar Ingresso
        </Button>

        {password && (
          <Alert className="border border-green-500">
            <AlertTitle>Anúncio criado com sucesso!</AlertTitle>
            <AlertDescription>
              Sua senha para editar este anúncio é: <strong>{password}</strong>
              <br />
              Por favor, guarde esta senha em um local seguro. Você precisará dela para editar seu anúncio no futuro.
            </AlertDescription>
          </Alert>
        )}
      </form>
    </Form>
  )
}

