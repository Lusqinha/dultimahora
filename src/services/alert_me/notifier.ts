import { sendWhatsappMessage } from "./sender";
import type { Ingresso } from "@prisma/client";
import { host } from "@/lib/env";
import prisma from "@/lib/db";

export async function notifyTicketCreated(ticket: Ingresso) {
    const event = await prisma.evento.findUnique({
        where: {
            id: ticket.eventoId
        }
    });

    const event_text = event ? ` para o evento ${event.nome} 🎉` : " ";
    const message = `🎟️✨ Olá, *${ticket.nome_completo.trimEnd().trimStart()}*! Seu ingresso${event_text} foi criado com sucesso! 🚀🥳  

🔑 *Código de edição:* \n ${ticket.codigo_ingresso}  

Se precisar de qualquer ajuda, estamos à disposição! 💬😊

🔗 *Acesse o link abaixo para editar, remover ou confirmar a venda seu ingresso:*  


${host}/ingresso/editar 
`;

    sendWhatsappMessage(ticket.contato_whatsapp, message);
}
