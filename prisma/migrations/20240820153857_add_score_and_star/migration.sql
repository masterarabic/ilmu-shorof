/*
  Warnings:

  - Added the required column `score` to the `StudentLessonResult` table without a default value. This is not possible if the table is not empty.
  - Added the required column `star` to the `StudentLessonResult` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `StudentLessonResult` ADD COLUMN `score` INTEGER NOT NULL,
    ADD COLUMN `star` INTEGER NOT NULL;
