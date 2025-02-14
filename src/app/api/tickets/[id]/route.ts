import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/db";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json({ error: "Missing id " }, { status: 400 });
  }

  const ingresso = await prisma.ingresso.findFirstOrThrow({
    where: {
      id: parseInt(id),
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
          nome: true,
        },
      },
    },
  });

  return NextResponse.json(ingresso, { status: 200 });
}

export async function PUT(
  req: NextRequest,
  { params }: { params:Promise<{id:string}> },
) {
  if (!req.body) {
    return NextResponse.json({ error: "Missing body" }, { status: 400 });
  }

  const {id} = await params;

    const data = await req.json();
    console.log("Payload recebido:", data);
    console.log("ID:", id);

  const ingresso = await prisma.ingresso.update({
    where: {
      id: parseInt(id),
      },

      data: {
        nome_completo: data.nome_completo,
        tipo_ingresso: data.tipo_ingresso,
        contato_whatsapp: data.contato_whatsapp,
        formato_ingresso: data.formato_ingresso,
        qtd_ingressos: data.qtd_ingressos,
        valor_un: data.valor_un,
        eventoId: data.eventoId,
    },
  });

  return NextResponse.json(ingresso, { status: 200 });
}

export async function DELETE(
  _req: NextRequest,{ params }: { params: Promise<{ id: string }> }
) {

  const { id } = await params;

  const id_parsed = parseInt(id);

  await prisma.ingresso.delete({
    where: {
      id:id_parsed,
    },
  });

  return NextResponse.json({ message: "Ingresso deletado com sucesso." });
}
