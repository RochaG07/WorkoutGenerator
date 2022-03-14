/*
  Warnings:

  - You are about to drop the column `fk_exercises_muscles` on the `exercises` table. All the data in the column will be lost.
  - You are about to drop the column `fk_exercises_muscles` on the `muscles` table. All the data in the column will be lost.
  - Added the required column `fk_exercises_id` to the `exercises_muscles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fk_muscles_id` to the `exercises_muscles` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "exercises" DROP CONSTRAINT "exercises_fk_exercises_muscles_fkey";

-- DropForeignKey
ALTER TABLE "muscles" DROP CONSTRAINT "muscles_fk_exercises_muscles_fkey";

-- AlterTable
ALTER TABLE "exercises" DROP COLUMN "fk_exercises_muscles";

-- AlterTable
ALTER TABLE "exercises_muscles" ADD COLUMN     "fk_exercises_id" TEXT NOT NULL,
ADD COLUMN     "fk_muscles_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "muscles" DROP COLUMN "fk_exercises_muscles";

-- AddForeignKey
ALTER TABLE "exercises_muscles" ADD CONSTRAINT "exercises_muscles_fk_exercises_id_fkey" FOREIGN KEY ("fk_exercises_id") REFERENCES "exercises"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exercises_muscles" ADD CONSTRAINT "exercises_muscles_fk_muscles_id_fkey" FOREIGN KEY ("fk_muscles_id") REFERENCES "muscles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
