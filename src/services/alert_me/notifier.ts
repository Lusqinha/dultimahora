import { sendWhatsappMessage } from "./sender";
import type { Ingresso } from "@prisma/client";
import prisma from "@/lib/db";



export async function notifyTicketCreated(ticket: Ingresso) {

    const event = await prisma.evento.findUnique({
        where: {
            id: ticket.eventoId
        }
    });

    const event_text = event ? ` para o evento ${event.nome} ` : " ";

    const message = `👋Olá, ${ticket.nome_completo}! Seu 🎟️ingresso${event_text}foi criado com sucesso! \n\nO código para edição do ingresso é ${ticket.codigo_ingresso} \n\nAcesse o link abaixo para editar o ingresso: \nCaso tenha qualquer dúvida não hesite em nos contatar!\n\n\nhttps://dultimahora.fluxstudio.com.br/ingresso/editar`;

    sendWhatsappMessage(ticket.contato_whatsapp, message);

}