'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
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
import { api } from "@/lib/api"

const formSchema = z.object({
    name: z.string().min(2, {
        message: "Nome do evento deve ter pelo menos 2 caracteres.",
    }),
    date: z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: "Data inválida.",
    }),
    link: z.string().url().optional().or(z.literal('')),
    banner: z.any().optional().refine(
        (file) => !file || file instanceof File,
        { message: "O banner deve ser um arquivo válido." }
    ),
})

export function EventRegistrationForm() {
    const router = useRouter()
    const [sucess, setSucess] = useState<boolean>(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            date: "",
            link: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const formData = new FormData()
            formData.append('nome', values.name)
            formData.append('date', values.date)
            if(values.banner) formData.append('banner', values.banner as File)
            if (values.link) formData.append('evento_weblink', values.link || "")

            const response = await api.post("events", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            if (response.status === 201) {
                setSucess(true)
                setTimeout(() => {
                    router.push("/resale")
                }, 3000)
            }
        } catch (error) {
            console.error(error)
            toast.error("Erro ao cadastrar evento. Tente novamente.")
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nome do Evento *</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Data do Evento *</FormLabel>
                            <FormControl>
                                <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="link"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Link do Evento</FormLabel>
                            <FormControl>
                                <Input type="url" placeholder="https://..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="banner"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Banner do Evento</FormLabel>
                            <FormControl>
                                <Input
                                    type="file"
                                    accept="image/*"
                                    name={field.name}
                                    ref={field.ref}
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        field.onChange(file || null); // Garante que passe `null` se nenhum arquivo for selecionado
                                    }}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button
                    type="submit"
                    className="w-full bg-[#FBC004] text-black hover:bg-[#FBC004]/90"
                >
                    Cadastrar Evento
                </Button>
            </form>

            {sucess && (
                <Alert variant={"default"}>
                    <AlertTitle>Evento cadastrado com sucesso!</AlertTitle>
                    <AlertDescription>
                        Seu evento foi cadastrado com sucesso. Aguarde a aprovação da nossa equipe.
                    </AlertDescription>
                </Alert>
            )}
        </Form>
    )
}
