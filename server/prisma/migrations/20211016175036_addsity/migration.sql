/*
  Warnings:

  - You are about to drop the column `adress` on the `sities` table. All the data in the column will be lost.
  - You are about to drop the column `federal_distinct` on the `sities` table. All the data in the column will be lost.
  - You are about to drop the column `region` on the `sities` table. All the data in the column will be lost.
  - Added the required column `name` to the `sities` table without a default value. This is not possible if the table is not empty.
  - Added the required column `region_id` to the `sities` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "sities" DROP COLUMN "adress",
DROP COLUMN "federal_distinct",
DROP COLUMN "region",
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "region_id" INTEGER NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "postal_code" SET DATA TYPE TEXT;
DROP SEQUENCE "sities_id_seq";

-- CreateTable
CREATE TABLE "regions" (
    "id" INTEGER NOT NULL,
    "name" VARCHAR(100) NOT NULL,

    CONSTRAINT "regions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "sities" ADD CONSTRAINT "sities_region_id_fkey" FOREIGN KEY ("region_id") REFERENCES "regions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
