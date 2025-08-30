/*
  Warnings:

  - Made the column `phone` on table `Customer` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."Customer" ALTER COLUMN "phone" SET NOT NULL;
