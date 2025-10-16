-- CreateEnum
CREATE TYPE "UnitOptions" AS ENUM ('UN', 'KG', 'Metro', 'Litro', 'Caixa', 'Pacote', 'Fardo');

-- CreateTable
CREATE TABLE "Product" (
    "ID" SERIAL NOT NULL,
    "barcode" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "unit" "UnitOptions" NOT NULL,
    "cost" DOUBLE PRECISION NOT NULL,
    "margin" DOUBLE PRECISION NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "stockBase" INTEGER NOT NULL,
    "stockMin" INTEGER NOT NULL,
    "stockMax" INTEGER NOT NULL,
    "tags" TEXT[],

    CONSTRAINT "Product_pkey" PRIMARY KEY ("ID")
);
