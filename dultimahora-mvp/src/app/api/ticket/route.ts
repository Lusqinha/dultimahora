import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/db";

export async function GET() {
    
    const ingressos = await prisma.ingresso.findMany( )

}