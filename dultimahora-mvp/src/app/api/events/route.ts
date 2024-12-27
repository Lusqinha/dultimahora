import fs from 'fs/promises';
import { NextResponse } from "next/server";
import path from 'path';

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

export async function POST(req: NextResponse) {
    
    const formData = await req.formData();
    console.log("Payload recebido:", formData);

    const file = formData.get("banner") as File

    let file_path: string | undefined;

    if (file) {
        const random_name = `${Math.random().toString(36).substring(2)}`

        const data_file = await file.arrayBuffer()
        const save_path = path.join(process.cwd(), 'public', 'banners', random_name)
        await fs.writeFile(save_path, Buffer.from(data_file))

        file_path = `/banners/${random_name}`
    }

    const evento = await prisma.evento.create({
        data: {
            nome: formData.get("nome") as string,
            date: new Date(formData.get("date") as string),
            banner_path: file_path
        }
    })

    return NextResponse.json(evento, { status: 201 });
}