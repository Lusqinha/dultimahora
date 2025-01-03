import { NextResponse } from "next/server";
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
    Bucket: 'dultimahora-banners',  // Substitua pelo nome do seu bucket
    Key: random_name,  // Nome do arquivo (com nome aleatório)
    Body: Buffer.from(data_file),  // Conteúdo do arquivo
    ACL: 'public-read',  // Permitir leitura pública
  };

  try {
    const data = await s3.upload(params).promise();
    return data.Location;  // Retorna o link público da imagem
  } catch (error) {
    console.error('Erro ao fazer upload:', error);
    throw new Error('Erro ao fazer upload da imagem');
  }
};

export async function GET() {
  const events = await prisma.evento.findMany({
    select: {
      id: true,
      nome: true,
      date: true,
      local: true,
      banner_path: true,
    }
  });

  return NextResponse.json(events);
}

export async function POST(req: NextResponse) {
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

  const evento = await prisma.evento.create({
    data: {
      nome: formData.get("nome") as string,
      date: new Date(formData.get("date") as string),
      banner_path: file_path,  // Link do banner armazenado no MinIO
    }
  });

  return NextResponse.json(evento, { status: 201 });
}
