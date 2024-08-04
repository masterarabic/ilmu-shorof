/*
  Warnings:

  - The primary key for the `Setting` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Setting` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Setting` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Setting` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD PRIMARY KEY (`name`);

-- CreateIndex
CREATE UNIQUE INDEX `Setting_name_key` ON `Setting`(`name`);
