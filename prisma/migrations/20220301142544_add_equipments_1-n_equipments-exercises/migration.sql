-- DropIndex
DROP INDEX "exercises_name_key";

-- AlterTable
ALTER TABLE "exercises" ADD COLUMN     "fk_equipment_id" TEXT;

-- CreateTable
CREATE TABLE "equipments" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "equipments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "equipments_name_key" ON "equipments"("name");

-- AddForeignKey
ALTER TABLE "exercises" ADD CONSTRAINT "exercises_fk_equipment_id_fkey" FOREIGN KEY ("fk_equipment_id") REFERENCES "equipments"("id") ON DELETE SET NULL ON UPDATE CASCADE;
