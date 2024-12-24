import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/db";

interface ticketidParams {
  params: {
    id?: string;
  };
}
interface ticketParams {
  body: {
    ingresso: {
      codigo: string;
      cpf: string;
    };
  };
}

export async function GET(_req: Request, { params }: ticketidParams) {
  const { id } = params;

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
  { params }: { params: { id: string } }
) {
  if (!req.body) {
    return NextResponse.json({ error: "Missing body" }, { status: 400 });
  }

  const id = parseInt(params.id);

  const {
    nome_completo,
    tipo_ingresso,
    codigo_ingresso,
    contato_whatsapp,
    formato_ingresso,
    disponivel,
    qtd_ingressos,
    valor_un,
    cpf,
    eventoId,
  } = await req.json();

  const ingresso = await prisma.ingresso.update({
    where: {
      id,
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
    },
  });

  return NextResponse.json(ingresso, { status: 200 });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);

  await prisma.ingresso.delete({
    where: {
      id,
    },
  });

  return NextResponse.json({ message: "Ingresso deletado com sucesso." });
}
