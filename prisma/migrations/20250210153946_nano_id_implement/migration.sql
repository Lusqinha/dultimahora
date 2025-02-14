-- AlterTable
ALTER TABLE "Ingresso" ALTER COLUMN "codigo_ingresso" SET DEFAULT (substring(md5(random()::text), 1, 6));
