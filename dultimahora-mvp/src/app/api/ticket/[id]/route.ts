import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/db";

export async function GET({ params }: { params: { id?: number, codigo_ingresso? :string } }) {
    const { id, codigo_ingresso } = params;

    const ingresso = await prisma.ingresso.findFirstOrThrow({
        where: {
            OR: [
                { id },
                { codigo_ingresso }
            ]
        }
    })

    return NextResponse.json(ingresso, { status: 200 });

}

export async function POST(req: NextRequest) {

    if (!req.body) {
        return NextResponse.json({ error: "Missing body" }, { status: 400 });
    }

    const { nome_completo, tipo_ingresso, codigo_ingresso, contato_whatsapp, formato_ingresso, disponivel, qtd_ingressos, valor_un, cpf, eventoId } = await req.json();

    const ingresso = await prisma.ingresso.create({
        data: {
            contato_whatsapp,
            formato_ingresso,
            codigo_ingresso,
            nome_completo,
            qtd_ingressos,
            tipo_ingresso,
            disponivel,
            valor_un,
            eventoId,
            cpf,
        }
    })

    return NextResponse.json(ingresso, { status: 201 });
}

export async function PUT(req: NextRequest) {

    if (!req.body) {
        return NextResponse.json({ error: "Missing body" }, { status: 400 });
    }

    const { id, nome_completo, tipo_ingresso, codigo_ingresso, contato_whatsapp, formato_ingresso, disponivel, qtd_ingressos, valor_un, cpf, eventoId } = await req.json();

    const ingresso = await prisma.ingresso.update({
        where: {
            id
        },
        data: {
            contato_whatsapp,
            formato_ingresso,
            codigo_ingresso,
            nome_completo,
            qtd_ingressos,
            tipo_ingresso,
            disponivel,
            valor_un,
            eventoId,
            cpf,
        }
    })

    return NextResponse.json(ingresso, { status: 200 });
}

export async function DELETE({ params }: { params: { id: number } }) {

    const { id } = params;

    await prisma.ingresso.delete({
        where: {
            id
        }
    })

    return NextResponse.json({ message: "Ingresso deletado com sucesso." });
}
