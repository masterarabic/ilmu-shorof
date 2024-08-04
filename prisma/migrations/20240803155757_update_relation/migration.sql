/*
  Warnings:

  - Made the column `babId` on table `Lesson` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Lesson` DROP FOREIGN KEY `Lesson_babId_fkey`;

-- AlterTable
ALTER TABLE `Lesson` MODIFY `babId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Lesson` ADD CONSTRAINT `Lesson_babId_fkey` FOREIGN KEY (`babId`) REFERENCES `Bab`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
