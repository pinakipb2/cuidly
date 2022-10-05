/*
  Warnings:

  - Added the required column `updatedAt` to the `Defaults` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "accType" AS ENUM ('GUEST', 'FREE', 'PAID');

-- AlterTable
ALTER TABLE "Defaults" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT,
    "IP" TEXT[],
    "accountType" "accType" NOT NULL DEFAULT 'GUEST',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
