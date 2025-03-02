import { sendWhatsappMessage } from "@/services/alert_me/sender";
import { template_messages } from "./message_template";
import type { Watchlist } from "@prisma/client";
import prisma from "@/lib/db";

const ignoreWords = [
    'a', 'o', 'e', 'é', 'de', 'do', 'da', 'em', 'para', 'por', 'com', 'sem', 'que', 'na', 'no', 'as', 'os', 'um', 'uma', 'uns', 'umas', 'ao', 'aos', 'à', 'às', 'pelo', 'pela', 'pelos', 'pelas', ' '
];

export interface CheckData {
    eventoId?: number
    keyword?: string
    contato_whatsapp: string
    nome_completo: string
}

async function handleAlert(watchlists: Watchlist[], event_id: number) {
    if (watchlists.length === 0) {
        console.log('Nenhuma watchlist encontrada');
        return;
    }

    for (const watchlist of watchlists) {        
        if (watchlist.keyword !== null) {
            console.log('Enviando mensagem de keyword para:', watchlist.contato_whatsapp);

            const message = template_messages.Notificacao_Evento
                .replace('{nome}', watchlist.nome_completo)
                .replace('{alerta}', watchlist.keyword ?? '')
                .replace('{link}', `${process.env.HOST}/evento/${event_id}`)
            
            sendWhatsappMessage(watchlist.contato_whatsapp, message);
        } else if (watchlist.eventoId !== null) {
            console.log('Enviando mensagem de evento para:', watchlist.contato_whatsapp);
            const event = await prisma.evento.findUnique({
                where: {
                    id: watchlist.eventoId
                }
            });
            
            const message = template_messages.Notificacao_Ingresso
            .replace('{nome}', watchlist.nome_completo)
            .replace('{evento}', event?.nome ?? '')
            .replace('{link}', `${process.env.HOST}/evento/${watchlist.eventoId}`)
            
            sendWhatsappMessage(watchlist.contato_whatsapp, message);
        }
        
    }
}


export async function matchEvent(eventoId: number) {
    const watchlists = await prisma.watchlist.findMany({
        where: {
            eventoId: eventoId,
            evento: {
                date: {
                    gte: new Date(new Date().toDateString())
                }
            }
        }
    })

    console.log('Watchlists encontradas:', watchlists);

    handleAlert(watchlists, eventoId);
}

export async function matchKeyword(event_name: string, event_id: number) {

    const watchlists:Watchlist[] = [];

    const words = event_name.split(' ').filter(word => !ignoreWords.includes(word));

    words.push(event_name);

    console.log('Palavras a serem procuradas:', words);

    for (const word of words) {
        const founded_watchlists = await prisma.watchlist.findMany({
            where: {
                keyword: {
                    contains: word.toLocaleLowerCase(),
                    mode: 'insensitive'
                }
            }
        })

        watchlists.push(...founded_watchlists);
    }

    console.log('Watchlists encontradas:', watchlists);

    handleAlert(watchlists, event_id);
}