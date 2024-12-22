import { NextResponse } from "next/server";
import prisma from "@/lib/db";


export async function GET() {

    const events = await prisma.evento.findMany(
        {
            select : {
                id: true,
                nome: true,
                date: true,
                local: true,
                banner_path: true,
            }
        }
    )

    return NextResponse.json(events);
    
}