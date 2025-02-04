import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(req: NextRequest) {

    const data = await req.json();

    const checkWatchlist = await prisma.watchlist.findFirst({
        where: {
            eventoId: data.eventoId,
            contato_whatsapp: data.contato_whatsapp
        }
    });

    if (checkWatchlist) {
        return NextResponse.json({ message: "Você já está na lista de notificação deste evento." }, { status: 400 });
    }

    const watchlist = await prisma.watchlist.create({
        data: {
            eventoId: data.eventoId,
            nome_completo: data.nome_completo,
            contato_whatsapp: data.contato_whatsapp
        }
    });
    
    return NextResponse.json(watchlist, { status: 201 });
}