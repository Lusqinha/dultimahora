import { NextRequest, NextResponse } from "next/server";
import { validateWhatsapp } from "@/services/validate_whatsapp";
import prisma from "@/lib/db";

export async function POST(req: NextRequest) {

    const data = await req.json();

    const isValid = await validateWhatsapp(data.contato_whatsapp);

    if (!isValid) {
        return NextResponse.json({ message: "Número de WhatsApp inválido." }, { status: 400 });
    }

    const checkWatchlist = await prisma.watchlist.findFirst({
        where: {
            keyword: data.keyword.toLowerCase(),
            contato_whatsapp: data.contato_whatsapp
        }
    });

    if (checkWatchlist) {
        return NextResponse.json({ message: "Você já está na lista de notificação para esta palavra-chave." }, { status: 400 });
    }

    const watchlist = await prisma.watchlist.create({
        data: {
            nome_completo: data.nome_completo,
            contato_whatsapp: data.contato_whatsapp,
            keyword: data.keyword.toLowerCase(),
        }
    });
    
    return NextResponse.json(watchlist, { status: 201 });
}