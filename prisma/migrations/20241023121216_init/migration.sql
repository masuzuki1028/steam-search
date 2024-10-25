/*
  Warnings:

  - You are about to drop the `Game` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Game";

-- CreateTable
CREATE TABLE "GameDetails" (
    "id" SERIAL NOT NULL,
    "steamAppId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "requiredAge" INTEGER NOT NULL,
    "isFree" BOOLEAN NOT NULL,
    "detailedDescription" TEXT NOT NULL,
    "shortDescription" TEXT NOT NULL,
    "aboutTheGame" TEXT NOT NULL,
    "developers" TEXT[],
    "publishers" TEXT[],
    "headerImage" TEXT NOT NULL,
    "capsuleImage" TEXT NOT NULL,
    "releaseDate" TEXT NOT NULL,
    "website" TEXT,
    "backgroundImage" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GameDetails_pkey" PRIMARY KEY ("id")
);
