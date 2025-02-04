import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(req: NextRequest) {

    const data = await req.json();

    const watchlist = await prisma.watchlist.create({
        data: {
            nome_completo: data.nome_completo,
            contato_whatsapp: data.contato_whatsapp,
            eventoId: data.eventoId
        }
    });
    
    return NextResponse.json(watchlist, { status: 201 });
}