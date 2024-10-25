-- CreateTable
CREATE TABLE "Games" (
    "id" SERIAL NOT NULL,
    "appid" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Games_pkey" PRIMARY KEY ("id")
);
