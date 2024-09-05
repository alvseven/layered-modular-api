-- CreateEnum
CREATE TYPE "CropType" AS ENUM ('SOYBEAN', 'CORN', 'COTTON', 'COFFEE', 'SUGARCANE');

-- CreateTable
CREATE TABLE "farmers" (
    "id" TEXT NOT NULL,
    "document" TEXT NOT NULL,
    "producerName" TEXT NOT NULL,
    "farmName" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "totalArea" DOUBLE PRECISION NOT NULL,
    "arableArea" DOUBLE PRECISION NOT NULL,
    "vegetationArea" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "farmers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "crops" (
    "id" TEXT NOT NULL,
    "name" "CropType" NOT NULL,
    "farmerId" TEXT NOT NULL,

    CONSTRAINT "crops_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "farmers_document_key" ON "farmers"("document");

-- AddForeignKey
ALTER TABLE "crops" ADD CONSTRAINT "crops_farmerId_fkey" FOREIGN KEY ("farmerId") REFERENCES "farmers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
