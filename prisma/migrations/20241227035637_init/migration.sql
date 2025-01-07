-- CreateTable
CREATE TABLE "Ingresso" (
    "id" SERIAL NOT NULL,
    "eventoId" INTEGER NOT NULL,
    "nome_completo" TEXT NOT NULL,
    "contato_whatsapp" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "qtd_ingressos" INTEGER NOT NULL,
    "valor_un" DOUBLE PRECISION NOT NULL,
    "tipo_ingresso" TEXT NOT NULL,
    "formato_ingresso" TEXT NOT NULL,
    "disponivel" BOOLEAN NOT NULL DEFAULT true,
    "codigo_ingresso" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Ingresso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Evento" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "banner_path" TEXT DEFAULT '/img/dultimahora-evento-placeholder.png',
    "evento_weblink" TEXT,
    "date" TIMESTAMP(3) NOT NULL,
    "local" TEXT NOT NULL DEFAULT 'Santa Maria',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Evento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Venda" (
    "id" SERIAL NOT NULL,
    "ingressoId" INTEGER NOT NULL,
    "codigo_ingresso" TEXT NOT NULL,
    "eventoId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Venda_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Ingresso_codigo_ingresso_key" ON "Ingresso"("codigo_ingresso");

-- CreateIndex
CREATE UNIQUE INDEX "Venda_codigo_ingresso_key" ON "Venda"("codigo_ingresso");

-- AddForeignKey
ALTER TABLE "Ingresso" ADD CONSTRAINT "Ingresso_eventoId_fkey" FOREIGN KEY ("eventoId") REFERENCES "Evento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Venda" ADD CONSTRAINT "Venda_ingressoId_fkey" FOREIGN KEY ("ingressoId") REFERENCES "Ingresso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Venda" ADD CONSTRAINT "Venda_eventoId_fkey" FOREIGN KEY ("eventoId") REFERENCES "Evento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
