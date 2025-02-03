import { validateNumber } from "@/lib/utils";
import prisma from "@/lib/db";

export interface RegisterAlertData {
    nome_completo: string
    contato_whatsapp: string
    eventoId: number | null
    keyword: string | null
}

export function registerAlert(data: RegisterAlertData) {
    if (!validateNumber(data.contato_whatsapp)) {
        throw new Error("Número de telefone inválido");
    }

    const watchlist = prisma.watchlist.create({
        data: data
    });

    return watchlist;
}
