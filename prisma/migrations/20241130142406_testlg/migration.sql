/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Pegawai` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `alamat` to the `Pegawai` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jenisKelamin` to the `Pegawai` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "JenisKelamin" AS ENUM ('LAKI_LAKI', 'PEREMPUAN');

-- AlterTable
ALTER TABLE "Pegawai" ADD COLUMN     "alamat" TEXT NOT NULL,
ADD COLUMN     "jenisKelamin" "JenisKelamin" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Pegawai_email_key" ON "Pegawai"("email");
