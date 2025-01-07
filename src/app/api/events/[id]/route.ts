import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/db";

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;

    const eventId = parseInt(id, 10);
    if (isNaN(eventId)) {
        return NextResponse.json({ error: "Invalid event ID" }, { status: 400 });
    }

    try {
        const event = await prisma.evento.findUniqueOrThrow({
            where: { id: eventId },
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
                    },
                },
            },
        });

        return NextResponse.json(event, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }
}

// Função para criar um novo evento
export async function POST(req: NextRequest) {
    try {
        const { nome, date, local, banner_path } = await req.json();

        const evento = await prisma.evento.create({
            data: { nome, date, local, banner_path },
        });

        return NextResponse.json(evento, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to create event" }, { status: 400 });
    }
}

// Função para atualizar um evento existente
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;

    const eventId = parseInt(id, 10);
    if (isNaN(eventId)) {
        return NextResponse.json({ error: "Invalid event ID" }, { status: 400 });
    }

    try {
        const { nome, date, local, banner_path } = await req.json();

        const evento = await prisma.evento.update({
            where: { id: eventId },
            data: { nome, date, local, banner_path },
        });

        return NextResponse.json(evento, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to update event" }, { status: 400 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;

    const eventId = parseInt(id, 10);
    if (isNaN(eventId)) {
        return NextResponse.json({ error: "Invalid event ID" }, { status: 400 });
    }

    try {
        const evento = await prisma.evento.delete({
            where: { id: eventId },
        });

        return NextResponse.json(evento, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to delete event" }, { status: 400 });
    }
}
