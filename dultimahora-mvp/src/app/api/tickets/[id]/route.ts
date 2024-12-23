import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/db";

export async function GET(_req: Request, { params }: { params: { id?: string, codigo_ingresso? :string } }) {
    const { id, codigo_ingresso } = params;

    if (!id && !codigo_ingresso) {
        return NextResponse.json({ error: "Missing id or codigo_ingresso" }, { status: 400 });
    }

    if (id && codigo_ingresso) {
        return NextResponse.json({ error: "Only one parameter is allowed" }, { status: 400 });
    }

    const ticket_id = id ? parseInt(id) : undefined;

    const ingresso = await prisma.ingresso.findFirstOrThrow({
        where: {
            OR: [
                { id: ticket_id },
                { codigo_ingresso }
            ]
        },
        select: {
            nome_completo: true,
            tipo_ingresso: true,
            contato_whatsapp: true,
            formato_ingresso: true,
            disponivel: true,
            qtd_ingressos: true,
            valor_un: true,
            evento: {
                select: {
                    nome: true
                }
            }
        }
    })

    return NextResponse.json(ingresso, { status: 200 });

}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {

    if (!req.body) {
        return NextResponse.json({ error: "Missing body" }, { status: 400 });
    }

    const id = parseInt(params.id);

    const { nome_completo, tipo_ingresso, codigo_ingresso, contato_whatsapp, formato_ingresso, disponivel, qtd_ingressos, valor_un, cpf, eventoId } = await req.json();

    const ingresso = await prisma.ingresso.update({
        where: {
            id
        },
        data: {
            contato_whatsapp,
            formato_ingresso,
            nome_completo,
            qtd_ingressos,
            tipo_ingresso,
            valor_un,
            eventoId,
            cpf,
        }
    })

    return NextResponse.json(ingresso, { status: 200 });
}

export async function DELETE( _req:NextRequest, { params }: { params: { id: string } }) {

    const id = parseInt(params.id);

    await prisma.ingresso.delete({
        where: {
            id
        }
    })

    return NextResponse.json({ message: "Ingresso deletado com sucesso." });
}
