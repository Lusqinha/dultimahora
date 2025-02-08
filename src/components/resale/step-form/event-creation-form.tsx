'use client';

/* eslint-disable  @typescript-eslint/no-explicit-any */

import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"

interface EventCreationFormProps {
    form: any // Replace 'any' with the actual form type
    onValidityChange?: (isValid: boolean) => void
}

export function EventCreationForm({ form, onValidityChange }: EventCreationFormProps) {
    const [, setIsValid] = useState(false)

    // Watch for changes in name and date fields
    useEffect(() => {
        const subscription = form.watch((value: any) => {
            const nameValid = value.name && value.name.length >= 2
            const dateValid = value.date && value.date.length > 0
            const formIsValid = nameValid && dateValid

            setIsValid(formIsValid)
            onValidityChange?.(formIsValid)
        })

        return () => subscription.unsubscribe()
    }, [form, onValidityChange])

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
                            <Input {...field}
                                maxLength={50}
                            />
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
                                    field.onChange(file || null);
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
