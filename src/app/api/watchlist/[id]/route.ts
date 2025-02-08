import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/db"

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {

    const { id } = await params
    
    if (!id) {
        return NextResponse.json({ error: "Missing id" }, { status: 400 })
    }
    
    const watchlist = await prisma.watchlist.delete({
        where: {
        id: parseInt(id),
        },
    })
    
    return NextResponse.json(watchlist, { status: 200 })

}

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) { 
    const{ id } = await params

    let phone_number = id

    // se não hover +55 no início do número, adicionar
    if (!phone_number.startsWith("+55")) {
        phone_number = "+55" + phone_number
    }

    if (!phone_number) {
        return NextResponse.json({ error: "Missing phone_number" }, { status: 400 })
    }

    const watchlist = await prisma.watchlist.findMany({
        where: {
            contato_whatsapp: phone_number
        },
        include: {
            evento: true
        }
    })

    return NextResponse.json(watchlist, { status: 200 })

}