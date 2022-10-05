/*
  Warnings:

  - The values [PAID] on the enum `accType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "accType_new" AS ENUM ('GUEST', 'FREE', 'PREMIUM');
ALTER TABLE "User" ALTER COLUMN "accountType" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "accountType" TYPE "accType_new" USING ("accountType"::text::"accType_new");
ALTER TYPE "accType" RENAME TO "accType_old";
ALTER TYPE "accType_new" RENAME TO "accType";
DROP TYPE "accType_old";
ALTER TABLE "User" ALTER COLUMN "accountType" SET DEFAULT 'GUEST';
COMMIT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "IP" SET NOT NULL,
ALTER COLUMN "IP" SET DATA TYPE TEXT;
