-- AlterTable
ALTER TABLE "Evento" ADD COLUMN "evento_weblink" TEXT;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Ingresso" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "eventoId" INTEGER NOT NULL,
    "nome_completo" TEXT NOT NULL,
    "contato_whatsapp" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "qtd_ingressos" INTEGER NOT NULL,
    "valor_un" REAL NOT NULL,
    "tipo_ingresso" TEXT NOT NULL,
    "formato_ingresso" TEXT NOT NULL,
    "disponivel" BOOLEAN NOT NULL DEFAULT true,
    "codigo_ingresso" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Ingresso_eventoId_fkey" FOREIGN KEY ("eventoId") REFERENCES "Evento" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Ingresso" ("codigo_ingresso", "contato_whatsapp", "cpf", "createdAt", "disponivel", "eventoId", "formato_ingresso", "id", "nome_completo", "qtd_ingressos", "tipo_ingresso", "updatedAt", "valor_un") SELECT "codigo_ingresso", "contato_whatsapp", "cpf", "createdAt", "disponivel", "eventoId", "formato_ingresso", "id", "nome_completo", "qtd_ingressos", "tipo_ingresso", "updatedAt", "valor_un" FROM "Ingresso";
DROP TABLE "Ingresso";
ALTER TABLE "new_Ingresso" RENAME TO "Ingresso";
CREATE UNIQUE INDEX "Ingresso_codigo_ingresso_key" ON "Ingresso"("codigo_ingresso");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
