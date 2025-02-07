import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";


export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!req.body) {
    return NextResponse.json({ error: "Missing body" }, { status: 400 });
  }

  const { id } = await params;

  const data = await req.json();
  console.log("Payload recebido:", data);
  console.log("ID:", id);

  const ingresso = await prisma.ingresso.update({
    where: {
      id: parseInt(id),
    },

      data: {
        // qtd atual de ingressos - qtd vendidos
        qtd_ingressos: data.actual_qtd - data.qtd_sell,
    },
  });
    
    
    const venda = await prisma.venda.create({
        data: {
            codigo_ingresso: ingresso.codigo_ingresso,
            eventoId: ingresso.eventoId,
            ingressoId: ingresso.id,
            qtd_ingressos_vendidos: data.qtd_sell,
        }
    })



  return NextResponse.json(venda, { status: 200 });
}
