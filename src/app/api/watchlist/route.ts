import { registerAlert, RegisterAlertData } from "@/services/alert_me/registration";
import { sendWhatsappMessage } from "@/services/alert_me/sender";
import {messages } from "@/services/alert_me/message_template";
import prisma from "@/lib/db";

import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    const data = await req.json();
    if (!data.nome_completo || !data.contato_whatsapp) {
        return NextResponse.json({ error: "Nome e telefone são obrigatórios" }, { status: 400 });
    }

    const registerData: RegisterAlertData = {
        nome_completo: data.nome_completo,
        contato_whatsapp: data.contato_whatsapp,
        eventoId: data.eventoId || null,
        keyword: data.keyword || null,
    };

    try {
        const watchlist = await registerAlert(registerData);
        return NextResponse.json(watchlist, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({"message": "Erro ao criar solicitação"}, { status: 500 });
    }
}

export async function GET(req: NextRequest) { 
    const { searchParams } = new URL(req.url);
    const keyword = searchParams.get("keyword");

    if (!keyword) {
        return NextResponse.json({ error: "Keyword é obrigatória" }, { status: 400 });
    }

    const watchlist = await prisma.watchlist.findMany({
        where: {
            keyword: keyword
        }
    });

    const response_data = []

    try {
        for (const item of watchlist) {
            const message = await sendWhatsappMessage(item.contato_whatsapp, messages.Notificacao_Evento
                .replace("{nome}", item.nome_completo)
                .replace("{alerta}", item.keyword? item.keyword : "")
                .replace("{link}", "https://dultimahora.fluxstudio.com.br/evento")
            );

            response_data.push({
                message: message,
                watchlist: item
            });

        }
        return NextResponse.json(watchlist, { status: 200 });
    }
    catch (error) {
        console.error(error);
        return NextResponse.json({"message": "Erro ao enviar notificação"}, { status: 500 });
    }
}