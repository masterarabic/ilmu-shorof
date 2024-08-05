/*
  Warnings:

  - You are about to drop the column `userId` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `studentId` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `users` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Student` DROP FOREIGN KEY `Student_userId_fkey`;

-- DropIndex
DROP INDEX `users_studentId_key` ON `users`;

-- DropIndex
DROP INDEX `users_username_key` ON `users`;

-- AlterTable
ALTER TABLE `Student` DROP COLUMN `userId`;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `password`,
    DROP COLUMN `role`,
    DROP COLUMN `studentId`,
    DROP COLUMN `username`;
