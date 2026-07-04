/*
  Warnings:

  - You are about to drop the column `thumnailUrl` on the `posts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "posts" DROP COLUMN "thumnailUrl",
ADD COLUMN     "thumbnail" TEXT;
