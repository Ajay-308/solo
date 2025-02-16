import { NextResponse } from "next/server";
import { LeetCode } from "leetcode-query";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const { username } = await req.json();

    if (!username) {
      return NextResponse.json(
        { error: "Username is required." },
        { status: 400 }
      );
    }

    console.log(`${username} exists`);
    const leetcode = new LeetCode();
    const user = await leetcode.user(username);

    if (!user.matchedUser) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }
    const cookieStore = await cookies();
    const session = cookieStore.get("session");
    console.log(session);

    const contestData = await leetcode.graphql({
      query: `
        query userContestRankingInfo($username: String!) {
          userContestRanking(username: $username) {
            attendedContestsCount
            rating
            globalRanking
            topPercentage
            badge {
              name
            }
          }
          userContestRankingHistory(username: $username) {
            attended
            trendDirection
            problemsSolved
            totalProblems
            finishTimeInSeconds
            rating
            ranking
            contest {
              title
              startTime
            }
          }
        }
      `,
      variables: { username },
    });

    const strength = 100 - contestData.data.userContestRanking.topPercentage;
    const contestHistory = contestData.data.userContestRankingHistory
      .filter((contest: { attended: boolean }) => contest.attended)
      .map((contest: { contest: { title: string }; rating: number }) => ({
        title: contest.contest.title,
        rating: contest.rating,
      }));

    console.log(contestHistory);
    const submissions = user.matchedUser.submitStats.acSubmissionNum || [];

    return NextResponse.json({
      avatar: user.matchedUser.profile.userAvatar,
      username: user.matchedUser.profile.realName,
      profile: user.matchedUser.profile,
      strength: strength,
      mana: user.matchedUser.contributions.points,
      totalSolved: submissions.find((q) => q.difficulty === "All")?.count || 0,
      easySolved: submissions.find((q) => q.difficulty === "Easy")?.count || 0,
      mediumSolved:
        submissions.find((q) => q.difficulty === "Medium")?.count || 0,
      hardSolved: submissions.find((q) => q.difficulty === "Hard")?.count || 0,
      contestRanking: {
        attendedContests:
          contestData.data.userContestRanking?.attendedContestsCount || 0,
        rating: contestData.data.userContestRanking?.rating || 0,
        globalRanking: contestData.data.userContestRanking?.globalRanking || 0,
        topPercentage: contestData.data.userContestRanking?.topPercentage || 0,
        badge: contestData.data.userContestRanking?.badge?.name || null,
      },
      contestHistory,
    });
  } catch (error) {
    console.error("LeetCode API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  const cookieStore = cookies();
  const session = (await cookieStore).get("session");
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json({ username: session.value }, { status: 200 });
}
