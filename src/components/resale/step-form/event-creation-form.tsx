/* eslint-disable  @typescript-eslint/no-explicit-any */

import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

interface EventCreationFormProps {
    form: any // Replace 'any' with the actual form type
}

export function EventCreationForm({ form }: EventCreationFormProps) {
    return (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold mb-6">Criar Evento</h2>
            <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Nome do evento *</FormLabel>
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
                        <FormLabel>Data do evento *</FormLabel>
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
        </div>
    )
}


