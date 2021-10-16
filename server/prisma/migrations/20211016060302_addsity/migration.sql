-- CreateTable
CREATE TABLE "sities" (
    "id" SERIAL NOT NULL,
    "adress" TEXT NOT NULL,
    "postal_code" INTEGER NOT NULL,
    "federal_distinct" TEXT NOT NULL,
    "region" TEXT NOT NULL,

    CONSTRAINT "sities_pkey" PRIMARY KEY ("id")
);
