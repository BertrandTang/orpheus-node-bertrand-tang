/*
  Warnings:

  - The values [exotic_wood,noble_and_hardwoods] on the enum `Wood_type` will be removed. If these variants are still used in the database, this will fail.
  - The values [medium_hard] on the enum `Wood_hardness` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `image` to the `Wood` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Wood` ADD COLUMN `image` VARCHAR(191) NOT NULL,
    MODIFY `type` ENUM('softwood', 'exotic wood', 'noble and hardwoods') NOT NULL,
    MODIFY `hardness` ENUM('tender', 'medium hard', 'hard') NOT NULL;
