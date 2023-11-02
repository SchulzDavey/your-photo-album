/*
  Warnings:

  - You are about to drop the column `AssetId` on the `album` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `album` DROP COLUMN `AssetId`,
    ADD COLUMN `assetId` VARCHAR(191) NULL;
