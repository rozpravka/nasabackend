/*
  Warnings:

  - The primary key for the `Launch` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Launch" DROP CONSTRAINT "Launch_pkey",
ALTER COLUMN "launchId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Launch_pkey" PRIMARY KEY ("launchId");
