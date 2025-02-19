import { NextResponse } from "next/server";
import { LeetCode } from "leetcode-query";
import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  try {
    // Get Clerk User
    const clerkUser = await currentUser();
    const userId = clerkUser?.id;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get username from request body
    const { username } = await req.json();
    if (!username) {
      return NextResponse.json(
        { error: "Username is required." },
        { status: 400 }
      );
    }

    console.log(`${username} exists`);

    // Fetch data from LeetCode API
    const leetcode = new LeetCode();
    const leetcodeUser = await leetcode.user(username);

    if (!leetcodeUser.matchedUser) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    const contestData = await leetcode.graphql({
      query: `
        query userContestRankingInfo($username: String!) {
          userContestRanking(username: $username) {
            attendedContestsCount
            rating
            globalRanking
            topPercentage
            badge { name }
          }
          userContestRankingHistory(username: $username) {
            attended
            rating
            contest { title }
          }
        }
      `,
      variables: { username },
    });

    // Extract relevant data
    const strength =
      100 - (contestData.data.userContestRanking?.topPercentage || 100);
    const contestHistory = (contestData.data.userContestRankingHistory || [])
      .filter((c: { attended: boolean }) => c.attended)
      .map((c: { contest: { title: string }; rating: number }) => ({
        title: c.contest.title,
        rating: c.rating,
      }));

    const submissions =
      leetcodeUser.matchedUser.submitStats.acSubmissionNum || [];

    const leetCodeStats = {
      userId,
      avatar: leetcodeUser.matchedUser.profile.userAvatar,
      username: leetcodeUser.matchedUser.profile.realName,
      profile: JSON.parse(JSON.stringify(leetcodeUser.matchedUser.profile)),
      strength,
      mana: leetcodeUser.matchedUser.contributions.points,
      totalSolved: submissions.find((q) => q.difficulty === "All")?.count || 0,
      easySolved: submissions.find((q) => q.difficulty === "Easy")?.count || 0,
      mediumSolved:
        submissions.find((q) => q.difficulty === "Medium")?.count || 0,
      hardSolved: submissions.find((q) => q.difficulty === "Hard")?.count || 0,
      attendedContests:
        contestData.data.userContestRanking?.attendedContestsCount || 0,
      rating: contestData.data.userContestRanking?.rating || 0,
      globalRanking: contestData.data.userContestRanking?.globalRanking || 0,
      topPercentage: contestData.data.userContestRanking?.topPercentage || 0,
      badge: contestData.data.userContestRanking?.badge?.name || null,
      contestHistory,
    };
    await prisma.leetCodeStats.upsert({
      where: { userId },
      update: leetCodeStats,
      create: leetCodeStats,
    });

    return NextResponse.json(leetCodeStats, { status: 200 });
  } catch (error) {
    console.error("LeetCode API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
