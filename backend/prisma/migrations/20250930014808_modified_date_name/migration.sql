/*
  Warnings:

  - The primary key for the `Entry` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `publishedAt` on the `Entry` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Entry" DROP CONSTRAINT "Entry_pkey",
DROP COLUMN "publishedAt",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Entry_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Entry_id_seq";
