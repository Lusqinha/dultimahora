import { NextResponse, NextRequest } from "next/server";
import { validateWhatsapp } from "@/services/validate_whatsapp";
import { matchEvent } from "@/services/alert_me/matcher";
import prisma from "@/lib/db";

export async function POST(req: NextRequest) {
    const data = await req.json();

    console.log("Payload recebido:", data);

    const isValid = await validateWhatsapp(data.contato_whatsapp);

    if (!isValid) {
        return NextResponse.json({ message: "Número de WhatsApp inválido." }, { status: 400 });
    }

    const ingresso = await prisma.ingresso.create({
        data: {
            nome_completo: data.nome_completo,
            contato_whatsapp: data.contato_whatsapp,
            formato_ingresso: data.formato_ingresso,
            qtd_ingressos: data.qtd_ingressos,
            valor_un: data.valor_un,
            cpf: data.cpf,
            eventoId: data.eventoId,
            tipo_ingresso: data.tipo_ingresso,
            disponivel: true
        }
    })

    console.log("ID ingresso:", ingresso.eventoId);
    matchEvent(ingresso.eventoId);

    return NextResponse.json(ingresso, { status: 201 });
}