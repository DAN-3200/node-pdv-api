-- DropForeignKey
ALTER TABLE "public"."Tag" DROP CONSTRAINT "Tag_productId_fkey";

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("ID") ON DELETE CASCADE ON UPDATE CASCADE;
