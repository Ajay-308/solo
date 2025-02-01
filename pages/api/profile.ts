import { NextApiRequest, NextApiResponse } from "next";
import { LeetCode } from "leetcode-query";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed. Use POST." });
  }

  try {
    const { username } = req.body;

    if (!username) {
      return res.status(400).json({ error: "Username is required." });
    }

    const leetcode = new LeetCode();
    const user = await leetcode.user(username);

    if (!user.matchedUser) {
      return res.status(404).json({ error: "User not found." });
    }

    // Get contest data using GraphQL
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

    // Format the contest history data
    const contestHistory = contestData.data.userContestRankingHistory
      .filter((contest: { attended: boolean }) => contest.attended) // Filter attended contests
      .map((contest: { contest: { title: string }; rating: number }) => ({
        title: contest.contest.title,
        rating: contest.rating,
      }));
    console.log(contestHistory);
    const submissions = user.matchedUser.submitStats.acSubmissionNum || [];

    return res.status(200).json({
      avatar: user.matchedUser.profile.userAvatar,
      username: user.matchedUser.profile.realName,
      profile: user.matchedUser.profile,
      mana: user.matchedUser.contributions.points,
      totalSolved: submissions.find((q) => q.difficulty === "All")?.count || 0,
      easySolved: submissions.find((q) => q.difficulty === "Easy")?.count || 0,
      mediumSolved:
        submissions.find((q) => q.difficulty === "Medium")?.count || 0,
      hardSolved: submissions.find((q) => q.difficulty === "Hard")?.count || 0,
      // Contest data
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
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
