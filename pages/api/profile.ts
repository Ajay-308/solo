import { LeetCode } from "leetcode-query";

async function testLeetCodeAPI() {
  const leetcode = new LeetCode();
  const user = await leetcode.user("ajay308");
  const question = user.matchedUser?.submitStats?.acSubmissionNum;
  console.log(user);
  console.log(question);
}

testLeetCodeAPI().catch(console.error);
