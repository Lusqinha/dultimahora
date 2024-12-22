-- CreateTable
CREATE TABLE "Ingresso" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "eventoId" INTEGER NOT NULL,
    "nome_completo" TEXT NOT NULL,
    "contato_whatsapp" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "qtd_ingressos" INTEGER NOT NULL,
    "valor_un" REAL NOT NULL,
    "tipo_ingresso" TEXT NOT NULL,
    "formato_ingresso" TEXT NOT NULL,
    "disponivel" BOOLEAN NOT NULL,
    "codigo_ingresso" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Ingresso_eventoId_fkey" FOREIGN KEY ("eventoId") REFERENCES "Evento" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Evento" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "banner_path" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "local" TEXT NOT NULL DEFAULT 'Santa Maria',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Venda" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ingressoId" INTEGER NOT NULL,
    "codigo_ingresso" TEXT NOT NULL,
    "eventoId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Venda_ingressoId_fkey" FOREIGN KEY ("ingressoId") REFERENCES "Ingresso" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Venda_eventoId_fkey" FOREIGN KEY ("eventoId") REFERENCES "Evento" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Ingresso_codigo_ingresso_key" ON "Ingresso"("codigo_ingresso");

-- CreateIndex
CREATE UNIQUE INDEX "Venda_codigo_ingresso_key" ON "Venda"("codigo_ingresso");
