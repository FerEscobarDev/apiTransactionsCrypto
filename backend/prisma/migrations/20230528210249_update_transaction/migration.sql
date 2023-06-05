/*
  Warnings:

  - You are about to alter the column `amountCrypto` on the `Transaction` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `priceUsd` on the `Transaction` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.

*/
-- AlterTable
ALTER TABLE `Transaction` MODIFY `amountCrypto` DOUBLE NOT NULL,
    MODIFY `priceUsd` DOUBLE NOT NULL;
