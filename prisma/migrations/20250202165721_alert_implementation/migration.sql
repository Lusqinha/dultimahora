-- CreateTable
CREATE TABLE "Watchlist" (
    "id" SERIAL NOT NULL,
    "nome_completo" TEXT NOT NULL,
    "contato_whatsapp" TEXT NOT NULL,
    "keyword" TEXT,
    "eventoId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Watchlist_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Watchlist" ADD CONSTRAINT "Watchlist_eventoId_fkey" FOREIGN KEY ("eventoId") REFERENCES "Evento"("id") ON DELETE SET NULL ON UPDATE CASCADE;
