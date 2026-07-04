/*
  Warnings:

  - You are about to drop the column `publishedAt` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `posts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "post_contents" ADD COLUMN     "publishedAt" TIMESTAMP(3),
ADD COLUMN     "status" "PostStatus" NOT NULL DEFAULT 'DRAFT';

-- AlterTable
ALTER TABLE "posts" DROP COLUMN "publishedAt",
DROP COLUMN "status";

-- AddForeignKey
ALTER TABLE "tag_contents" ADD CONSTRAINT "tag_contents_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;
