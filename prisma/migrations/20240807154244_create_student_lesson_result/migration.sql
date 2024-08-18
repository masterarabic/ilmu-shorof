-- AlterTable
ALTER TABLE `Student` ADD COLUMN `latestBabId` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `StudentLessonResult` (
    `id` VARCHAR(191) NOT NULL,
    `studentId` VARCHAR(191) NOT NULL,
    `lessonId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `StudentLessonResult_studentId_lessonId_key`(`studentId`, `lessonId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Student` ADD CONSTRAINT `Student_latestBabId_fkey` FOREIGN KEY (`latestBabId`) REFERENCES `Bab`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StudentLessonResult` ADD CONSTRAINT `StudentLessonResult_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StudentLessonResult` ADD CONSTRAINT `StudentLessonResult_lessonId_fkey` FOREIGN KEY (`lessonId`) REFERENCES `Lesson`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
