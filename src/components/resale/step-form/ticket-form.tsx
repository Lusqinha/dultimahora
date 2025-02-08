/* eslint-disable  @typescript-eslint/no-explicit-any */
"use client"

import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useEffect } from "react"

interface TicketFormatPriceFormProps {
    form: any // Replace 'any' with the actual form type
}

export function TicketFormatPriceForm({ form }: TicketFormatPriceFormProps) {
    // Reset touched states when component mounts
    useEffect(() => {
        form.clearErrors()
    }, [form])

    return (
        <>
            <FormField
                control={form.control}
                name="ticketCount"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Número de Ingressos *</FormLabel>
                        <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            // Only show error after user interaction
                            onOpenChange={() => {
                                if (!field.value) {
                                    form.trigger("ticketCount")
                                }
                            }}
                        >
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
                            <Input
                                placeholder="(camarote, pista etc...)"
                                {...field}
                                // Only show error after user interaction
                                onBlur={(e) => {
                                    field.onBlur()
                                    if (!e.target.value) {
                                        form.trigger("ticketType")
                                    }
                                }}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="format"
                render={({ field }) => (
                    <FormItem className="space-y-3">
                        <FormLabel>Formato do ingresso: *</FormLabel>
                        <FormControl>
                            <RadioGroup
                                onValueChange={(value) => {
                                    field.onChange(value)
                                    form.trigger("format")
                                }}
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
                        <FormLabel>Valor para vender cada ingresso *</FormLabel>
                        {/* show */}
                        <FormControl>
                            <Input
                                type="number"
                                min="1"
                                step="0.01"
                                placeholder="R$"
                                
                                {...field}
                                // Only show error after user interaction
                                onBlur={(e) => {
                                    field.onBlur()
                                    if (!e.target.value) {
                                        form.trigger("price")
                                    }
                                }}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </>
    )
}

