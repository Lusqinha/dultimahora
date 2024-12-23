import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/db";

export async function POST(req: NextRequest) {
    const data = await req.json();

    console.log("Payload recebido:", data);


    /*
    Payload recebido: {
  nome_completo: 'Bruna Meotti',
  tipo_ingresso: 'Camarote',
  contato_whatsapp: '53991939740',
  formato_ingresso: 'digital',
  qtd_ingressos: 1,
  valor_un: 500,
  cpf: '03485131008',
  eventoId: 1
}
    
    */

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

    return NextResponse.json(ingresso, { status: 201 });
}