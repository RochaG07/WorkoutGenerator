/*
  Warnings:

  - Added the required column `fk_exercises_muscles` to the `exercises` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "exercises" ADD COLUMN     "fk_exercises_muscles" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "muscles" ADD COLUMN     "fk_exercises_muscles" TEXT;

-- CreateTable
CREATE TABLE "exercises_muscles" (
    "id" TEXT NOT NULL,

    CONSTRAINT "exercises_muscles_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "exercises" ADD CONSTRAINT "exercises_fk_exercises_muscles_fkey" FOREIGN KEY ("fk_exercises_muscles") REFERENCES "exercises_muscles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "muscles" ADD CONSTRAINT "muscles_fk_exercises_muscles_fkey" FOREIGN KEY ("fk_exercises_muscles") REFERENCES "exercises_muscles"("id") ON DELETE SET NULL ON UPDATE CASCADE;
