/*
  Warnings:

  - You are about to drop the column `tagId` on the `asset` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `asset` DROP FOREIGN KEY `Asset_tagId_fkey`;

-- AlterTable
ALTER TABLE `asset` DROP COLUMN `tagId`;

-- AlterTable
ALTER TABLE `tag` ADD COLUMN `assetId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Tag` ADD CONSTRAINT `Tag_assetId_fkey` FOREIGN KEY (`assetId`) REFERENCES `Asset`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
