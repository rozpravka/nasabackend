/*
  Warnings:

  - The primary key for the `Launch` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `flightNumber` on the `Launch` table. All the data in the column will be lost.
  - Added the required column `launchId` to the `Launch` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Launch" DROP CONSTRAINT "Launch_pkey",
DROP COLUMN "flightNumber",
ADD COLUMN     "launchId" INTEGER NOT NULL,
ADD CONSTRAINT "Launch_pkey" PRIMARY KEY ("launchId");
