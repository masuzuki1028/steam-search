/*
  Warnings:

  - A unique constraint covering the columns `[appid]` on the table `Games` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Games_appid_key" ON "Games"("appid");
