/*
  Warnings:

  - You are about to drop the column `assetId` on the `tag` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `tag` DROP FOREIGN KEY `Tag_assetId_fkey`;

-- AlterTable
ALTER TABLE `asset` ADD COLUMN `tagId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `tag` DROP COLUMN `assetId`;

-- AddForeignKey
ALTER TABLE `Asset` ADD CONSTRAINT `Asset_tagId_fkey` FOREIGN KEY (`tagId`) REFERENCES `Tag`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
