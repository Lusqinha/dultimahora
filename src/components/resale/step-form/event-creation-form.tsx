'use client';

/* eslint-disable  @typescript-eslint/no-explicit-any */

import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { ChangeEvent, useEffect, useState } from "react"
import { load as nsfwLoad} from 'nsfwjs';

interface EventCreationFormProps {
    form: any // Replace 'any' with the actual form type
    onValidityChange?: (isValid: boolean) => void
}

export function EventCreationForm({ form, onValidityChange }: EventCreationFormProps) {
    const [, setIsValid] = useState(false)
    const [warningMessage, setWarningMessage] = useState<string | null>(null)

    // Watch for changes in name and date fields
    useEffect(() => {
        const subscription = form.watch((value: any) => {
            const nameValid = value.name && value.name.length >= 2
            const dateValid = value.date && value.date.length > 0
            console.log('nameValid', nameValid)
            console.log('dateValid', dateValid)
            console.log('warningMessage', warningMessage)
            const formIsValid = nameValid && dateValid && !warningMessage

            setIsValid(formIsValid)
            onValidityChange?.(formIsValid)
        })

        return () => subscription.unsubscribe()
    }, [form, onValidityChange])

    const handleImageChange = async (file: File | null, e:ChangeEvent<HTMLInputElement>) => {
        if (file) {
            setWarningMessage('Verificando conteúdo da imagem...');
            const image = new Image();
            image.src = URL.createObjectURL(file);
            image.onload = async () => {
                const model = await nsfwLoad("MobileNetV2Mid");
                const predictions = await model.classify(image);
                const nsfwPrediction = predictions.find(prediction => prediction.className === 'Porn' || prediction.className === 'Hentai' || prediction.className === 'Sexy');
                if (nsfwPrediction && nsfwPrediction.probability > 0.6) {
                    setWarningMessage('A imagem selecionada pode conter conteúdo impróprio.');
                    e.target.value = '';
                    form.setValue('banner', null);
                } else {
                    setWarningMessage(null);
                }
            };
        } else {
            setWarningMessage(null);
        }
    };

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
                                    handleImageChange(file || null, e)
                                    field.onChange(file|| null);

                                }}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            {warningMessage && (
                <div className="text-red-500">
                    {warningMessage}
                </div>
            )}
        </div>
    )
}
