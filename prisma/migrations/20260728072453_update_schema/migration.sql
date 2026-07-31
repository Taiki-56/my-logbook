/*
  Warnings:

  - The values [PRIVATE] on the enum `PostStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `thumbnail` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the `site_settings` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `category` to the `posts` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Category" AS ENUM ('TECH', 'WORK', 'FITNESS', 'FOOD', 'TRAVEL', 'LIFE');

-- AlterEnum
BEGIN;
CREATE TYPE "PostStatus_new" AS ENUM ('DRAFT', 'PUBLISHED');
ALTER TABLE "public"."post_contents" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "post_contents" ALTER COLUMN "status" TYPE "PostStatus_new" USING ("status"::text::"PostStatus_new");
ALTER TYPE "PostStatus" RENAME TO "PostStatus_old";
ALTER TYPE "PostStatus_new" RENAME TO "PostStatus";
DROP TYPE "public"."PostStatus_old";
ALTER TABLE "post_contents" ALTER COLUMN "status" SET DEFAULT 'DRAFT';
COMMIT;

-- AlterTable
ALTER TABLE "posts" DROP COLUMN "thumbnail",
ADD COLUMN     "category" "Category" NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "currentStreak" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "lastActivityAt" TIMESTAMP(3);

-- DropTable
DROP TABLE "site_settings";
