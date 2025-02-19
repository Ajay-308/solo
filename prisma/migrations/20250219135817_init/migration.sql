-- CreateTable
CREATE TABLE "LeetCodeStats" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "username" TEXT NOT NULL,
    "realName" TEXT,
    "avatar" TEXT,
    "strength" INTEGER NOT NULL,
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

    CONSTRAINT "LeetCodeStats_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LeetCodeStats_userId_key" ON "LeetCodeStats"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "LeetCodeStats_username_key" ON "LeetCodeStats"("username");
