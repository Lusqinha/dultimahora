import { NextResponse, NextRequest } from "next/server";
import { matchKeyword } from "@/services/alert_me/matcher";

import AWS from 'aws-sdk';

import prisma from "@/lib/db";

// Configuração do MinIO (AWS SDK)
const s3 = new AWS.S3({
    endpoint: process.env.ENDPOINT,
  accessKeyId: process.env.ACESSIDKEY,
  secretAccessKey: process.env.SECRETACESSID,
  s3ForcePathStyle: true, 
  signatureVersion: 'v4',
});

const uploadImageToMinio = async (file: File) => {
  const random_name = `${Math.random().toString(36).substring(2)}-${file.name}`;
  const data_file = await file.arrayBuffer();
  
  // Configurar o upload para o MinIO
  const params = {
    Bucket: 'dultimahora-banners',
    Key: random_name,
    Body: Buffer.from(data_file),
    ACL: 'public-read',
  };

  try {
    const data = await s3.upload(params).promise();
    return data.Location;
  } catch (error) {
    console.error('Erro ao fazer upload:', error);
    throw new Error('Erro ao fazer upload da imagem');
  }
};

export async function GET() {
  const events = await prisma.evento.findMany({
    where: {
      date: {
        // Filtra eventos que ainda não aconteceram, pegando a data atual, ignorando a hora
        gte: new Date(new Date().toDateString())
      }
    },
    select: {
      id: true,
      nome: true,
      date: true,
      local: true,
      banner_path: true,
      ingressos: true,
      _count: {
        select: {
          ingressos: {
            where: {
              qtd_ingressos: {
                gt: 0
              }
            }
        }},
      }
    },
    orderBy: {
      date: 'asc'
    }
  });

  const sortedEvents = events.sort((a: { _count: { ingressos: number } }, b: { _count: { ingressos: number } }) => {
    if (a._count.ingressos > 0 && b._count.ingressos === 0) return -1
    if (a._count.ingressos === 0 && b._count.ingressos > 0) return 1
    return 0
  })


  events.forEach((event) => {
    event._count.ingressos = event.ingressos.reduce((acc, ingresso) => acc + ingresso.qtd_ingressos, 0);
  });

  return NextResponse.json(sortedEvents);
}

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  console.log("Payload recebido:", formData);

  const file = formData.get("banner") as File;

  let file_path: string | undefined;

  if (file) {
    try {
      // Fazendo o upload da imagem para o MinIO e obtendo o link
      file_path = await uploadImageToMinio(file);
    } catch (error) {
        console.error('Erro ao enviar a imagem para o MinIO:', error);
      return NextResponse.json({ error: 'Erro ao enviar a imagem para o MinIO' }, { status: 500 });
    }
  }

  console.log("data:", formData.get("date"));

  const evento = await prisma.evento.create({
    data: {
      nome: formData.get("nome") as string,
      date: new Date(formData.get("date") as string),
      banner_path: file_path,
    }
  });

  // Verificar se o evento possui uma keyword
  matchKeyword(evento.nome, evento.id);

  return NextResponse.json(evento, { status: 201 });
}
