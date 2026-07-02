/*
  Warnings:

  - You are about to drop the column `emailVerified` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `accounts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ai_generation_logs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `post_embeddings` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `post_translations` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sessions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tag_translations` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `verification_tokens` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `email` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `passwordHash` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "accounts" DROP CONSTRAINT "accounts_userId_fkey";

-- DropForeignKey
ALTER TABLE "ai_generation_logs" DROP CONSTRAINT "ai_generation_logs_postId_fkey";

-- DropForeignKey
ALTER TABLE "post_embeddings" DROP CONSTRAINT "post_embeddings_postTranslationId_fkey";

-- DropForeignKey
ALTER TABLE "post_translations" DROP CONSTRAINT "post_translations_postId_fkey";

-- DropForeignKey
ALTER TABLE "sessions" DROP CONSTRAINT "sessions_userId_fkey";

-- DropForeignKey
ALTER TABLE "tag_translations" DROP CONSTRAINT "tag_translations_tagId_fkey";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "emailVerified",
DROP COLUMN "image",
DROP COLUMN "name",
ALTER COLUMN "email" SET NOT NULL,
ALTER COLUMN "passwordHash" SET NOT NULL;

-- DropTable
DROP TABLE "accounts";

-- DropTable
DROP TABLE "ai_generation_logs";

-- DropTable
DROP TABLE "post_embeddings";

-- DropTable
DROP TABLE "post_translations";

-- DropTable
DROP TABLE "sessions";

-- DropTable
DROP TABLE "tag_translations";

-- DropTable
DROP TABLE "verification_tokens";

-- DropEnum
DROP TYPE "AIGenerationStatus";

-- DropEnum
DROP TYPE "AIGenerationType";

-- CreateTable
CREATE TABLE "post_contents" (
    "id" UUID NOT NULL,
    "postId" UUID NOT NULL,
    "locale" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "projectData" JSONB,
    "html" TEXT,
    "seoTitle" TEXT,
    "seoDescription" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "post_contents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tag_contents" (
    "id" UUID NOT NULL,
    "tagId" UUID NOT NULL,
    "locale" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tag_contents_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "post_contents_postId_locale_key" ON "post_contents"("postId", "locale");

-- CreateIndex
CREATE UNIQUE INDEX "post_contents_locale_slug_key" ON "post_contents"("locale", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "tag_contents_tagId_locale_key" ON "tag_contents"("tagId", "locale");

-- CreateIndex
CREATE UNIQUE INDEX "tag_contents_locale_slug_key" ON "tag_contents"("locale", "slug");

-- AddForeignKey
ALTER TABLE "post_contents" ADD CONSTRAINT "post_contents_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
