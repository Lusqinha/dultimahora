import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/db";

// quero utilizar o id informado no endereço, com por exemplo /api/events/1 para buscar o evento com id 1
export async function GET(_req: Request, { params }: { params: { id: string } }) {
    
    const {id} = params;

    const eventId = parseInt(id);
    
    const event = await prisma.evento.findUniqueOrThrow({
        where: {
            id: eventId
        },
        select: {
            id: true,
            nome: true,
            date: true,
            local: true,
            banner_path: true,
            ingressos: {
                select: {
                    id: true,
                    nome_completo: true,
                    tipo_ingresso: true,
                    codigo_ingresso: true,
                    contato_whatsapp: true,
                    formato_ingresso: true,
                    disponivel: true,
                    qtd_ingressos: true,
                    valor_un: true,
                }
            }
        }
    })

    return NextResponse.json(event, { status: 200 });
    
}

export async function POST(req: NextRequest) {

    if (!req.body) {
        return NextResponse.json({ error: "Missing body" }, { status: 400 });
    }

    const { nome, date, local, banner_path } = await req.json();

    const evento = await prisma.evento.create({
        data: {
            nome,
            date,
            local,
            banner_path
        }
    })

    return NextResponse.json(evento, { status: 201 });
}

export async function PUT(req: NextRequest) {

    if (!req.body) {
        return NextResponse.json({ error: "Missing body" }, { status: 400 });
    }

    const { id, nome, date, local, banner_path } = await req.json();

    const evento = await prisma.evento.update({
        where: {
            id
        },
        data: {
            nome,
            date,
            local,
            banner_path
        }
    })

    return NextResponse.json(evento);
}

export async function DELETE(req: NextRequest) {

    if (!req.body) {
        return NextResponse.json({ error: "Missing body" }, { status: 400 });
    }

    const { id } = await req.json();

    const evento = await prisma.evento.delete({
        where: {
            id
        }
    })

    return NextResponse.json(evento);
}