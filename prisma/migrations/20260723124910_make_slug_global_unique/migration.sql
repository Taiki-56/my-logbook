/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `post_contents` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `tag_contents` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "post_contents_locale_slug_key";

-- CreateIndex
CREATE UNIQUE INDEX "post_contents_slug_key" ON "post_contents"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "tag_contents_slug_key" ON "tag_contents"("slug");
