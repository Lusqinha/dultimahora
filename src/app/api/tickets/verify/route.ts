import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

// essa rota é responsável por verificar se o ingresso é válido para editar, irá receber o c´digo do ingresso e o cpf do usuário, e irá retornar o ingresso caso seja válido
export async function POST(req: NextRequest) { 

    const { codigo_ingresso, cpf } = await req.json();
    
    if (!codigo_ingresso || !cpf) {
        return NextResponse.json({ error: "Missing body" }, { status: 400 });
    }

    if (cpf.replace(/\D/g, "").length !== 11) {
        return NextResponse.json({ error: "Invalid CPF" }, { status: 400 });
    }

    const ingresso = await prisma.ingresso.findFirstOrThrow({
        where: {
            codigo_ingresso,
            cpf,
            qtd_ingressos: {
                gt: 0
            }
        }
    })

    return NextResponse.json(ingresso, { status: 200 });
}