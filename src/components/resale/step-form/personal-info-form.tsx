/* eslint-disable  @typescript-eslint/no-explicit-any */

import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

interface PersonalInfoFormProps {
    form: any // Replace 'any' with the actual form type
    formatCPF: (value: string) => string
    formatPhone: (value: string) => string
}

export function PersonalInfoForm({ form, formatCPF, formatPhone }: PersonalInfoFormProps) {
    return (
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
                                value={field.value ? formatCPF(field.value) : ""}
                                onChange={(e) => {
                                    const rawValue = e.target.value.replace(/\D/g, ""); // Remove caracteres especiais
                                    field.onChange(rawValue); // Salva apenas números no estado
                                }}
                                maxLength={14}
                                placeholder="000.000.000-00"
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
                        <FormLabel>Número do seu WhatsApp *</FormLabel>
                        <FormControl>
                            <Input
                                {...field}
                                value={field.value ? formatPhone(field.value) : ""}
                                onChange={(e) => {
                                    const rawValue = e.target.value.replace(/\D/g, ""); // Remove caracteres especiais
                                    field.onChange(rawValue); // Salva apenas números no estado
                                }}
                                maxLength={15}
                                placeholder="(00) 00000-0000"
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </>
    );
}

