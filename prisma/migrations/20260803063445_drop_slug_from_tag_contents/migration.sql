/*
  Warnings:

  - You are about to drop the column `slug` on the `tag_contents` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "tag_contents_locale_slug_key";

-- DropIndex
DROP INDEX "tag_contents_slug_key";

-- AlterTable
ALTER TABLE "tag_contents" DROP COLUMN "slug";
