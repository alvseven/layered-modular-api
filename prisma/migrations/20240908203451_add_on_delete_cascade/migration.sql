-- DropForeignKey
ALTER TABLE "crops" DROP CONSTRAINT "crops_farmerId_fkey";

-- AddForeignKey
ALTER TABLE "crops" ADD CONSTRAINT "crops_farmerId_fkey" FOREIGN KEY ("farmerId") REFERENCES "farmers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
