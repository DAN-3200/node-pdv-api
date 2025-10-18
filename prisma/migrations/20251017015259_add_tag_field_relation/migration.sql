/*
  Warnings:

  - You are about to drop the column `tags` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "tags";

-- CreateTable
CREATE TABLE "Tag" (
    "ID" SERIAL NOT NULL,
    "key" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("ID")
);

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;
