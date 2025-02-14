/*
  Warnings:

  - Added the required column `qtd_ingressos_vendidos` to the `Venda` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Venda" ADD COLUMN     "qtd_ingressos_vendidos" INTEGER NOT NULL;
