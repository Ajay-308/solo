/*
  Warnings:

  - You are about to drop the `LeetCodeStats` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "LeetCodeStats";

-- CreateTable
CREATE TABLE "leetCodeStats" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "profile" JSONB NOT NULL,
    "strength" DOUBLE PRECISION NOT NULL,
    "mana" INTEGER NOT NULL,
    "totalSolved" INTEGER NOT NULL,
    "easySolved" INTEGER NOT NULL,
    "mediumSolved" INTEGER NOT NULL,
    "hardSolved" INTEGER NOT NULL,
    "attendedContests" INTEGER NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "globalRanking" INTEGER NOT NULL,
    "topPercentage" DOUBLE PRECISION NOT NULL,
    "badge" TEXT,
    "contestHistory" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "leetCodeStats_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "leetCodeStats_userId_key" ON "leetCodeStats"("userId");
