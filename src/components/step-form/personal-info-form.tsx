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
    )
}

