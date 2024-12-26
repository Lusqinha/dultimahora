-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Evento" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "banner_path" TEXT DEFAULT '/img/dultimahora-evento-placeholder.png',
    "evento_weblink" TEXT,
    "date" DATETIME NOT NULL,
    "local" TEXT NOT NULL DEFAULT 'Santa Maria',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Evento" ("banner_path", "createdAt", "date", "evento_weblink", "id", "local", "nome", "updatedAt") SELECT "banner_path", "createdAt", "date", "evento_weblink", "id", "local", "nome", "updatedAt" FROM "Evento";
DROP TABLE "Evento";
ALTER TABLE "new_Evento" RENAME TO "Evento";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
