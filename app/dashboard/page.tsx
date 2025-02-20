"use client";

import React from "react";
import { Shield, Sword, Heart, Zap, Brain, Trophy, Code2 } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useUser } from "@clerk/nextjs";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Header from "@/components/header";

interface Stat {
  name: string;
  value: number;
  icon: React.ReactNode;
}

// interface Skill {
//   name: string;
//   level: number;
//   description: string;
// }

export default function Dashboard() {
  const stats: Stat[] = [
    { name: "Strength", value: 95, icon: <Sword className="w-5 h-5" /> },
    { name: "Defense", value: 85, icon: <Shield className="w-5 h-5" /> },
    { name: "HP", value: 2500, icon: <Heart className="w-5 h-5" /> },
    { name: "Mana", value: 1800, icon: <Zap className="w-5 h-5" /> },
    { name: "Intelligence", value: 75, icon: <Brain className="w-5 h-5" /> },
    { name: "Level", value: 99, icon: <Trophy className="w-5 h-5" /> },
  ];

  // const skills: Skill[] = [
  //   {
  //     name: "Dominator's Touch",
  //     level: 4,
  //     description: "Control defeated monsters",
  //   },
  //   {
  //     name: "Ruler's Authority",
  //     level: 3,
  //     description: "Command shadows in battle",
  //   },
  //   {
  //     name: "Shadow Extraction",
  //     level: 5,
  //     description: "Extract shadows from defeated enemies",
  //   },
  //   { name: "Stealth", level: 2, description: "Become one with shadows" },
  // ];
  const { user, isLoaded, isSignedIn } = useUser();

  const [username, setUsername] = useState("");
  const [leetcodeUser, setLeetcodeUser] = useState(false);
  const [contestData, setContestData] = useState<
    { date: string; rating: number }[]
  >([]);
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    if (user) {
      getLeetcodeUsername();
    }
  }, [user]);

  const getLeetcodeUsername = async () => {
    try {
      const res = await fetch(`/api/getData?userId=${user?.id}`);
      const data = await res.json();
      if (res.ok && data.username) {
        setContestData(data.contestHistory);
        setAvatar(data.avatar);
        setUsername(data.username);
        setLeetcodeUser(true);
      }
    } catch (error) {
      console.error("Error fetching LeetCode username:", error);
    }
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user?.id, username }),
      });

      if (res.ok) {
        toast.success("Username saved successfully!");
        setLeetcodeUser(true);
      } else {
        toast.error("Username not found");
      }
    } catch (error) {
      console.error("Failed to save username:", error);
      toast.error("Failed to save username :(");
    }
    setUsername("");
  };

  return (
    <>
      <Header />
      <div className="min-h-screen pt-16 p-6 bg-[#0a0b0e]">
        <div className="max-w-7xl mx-auto">
          <div className="text-[#4a9eff] mb-6">
            <h1 className="text-4xl font-bold font-mono border-b border-[#4a9eff]/30 pb-2">
              STATUS WINDOW
            </h1>
          </div>

          <div className="bg-black/40 rounded-lg p-6 border border-[#4a9eff]/20">
            <div className="flex gap-6">
              <div className="w-32 h-32 rounded-lg border border-[#4a9eff]/30 overflow-hidden">
                {avatar ? (
                  <Image
                    src={avatar}
                    alt="Avatar"
                    width={128}
                    height={128}
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-700" />
                )}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">
                  {leetcodeUser && username ? username : "Sung Jin-Woo"}
                </h2>
                <p className="text-[#4a9eff]">Shadow Monarch</p>
                <div className="mt-2 px-2 py-1 bg-[#4a9eff]/10 border border-[#4a9eff]/30 rounded text-sm">
                  Rank S Hunter
                </div>
              </div>

              <div className="pt-16 px-6">
                {isLoaded && isSignedIn ? (
                  leetcodeUser ? (
                    <h1 className="text-2xl font-bold text-white">
                      {username == ""}
                    </h1>
                  ) : (
                    <div className="flex items-center gap-4">
                      <Input
                        placeholder="Enter LeetCode username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        disabled={leetcodeUser}
                      />
                      <Button
                        onClick={handleSubmit}
                        className="hover:bg-blue-500"
                        disabled={leetcodeUser}
                      >
                        Submit
                      </Button>
                    </div>
                  )
                ) : (
                  <p className="text-white">
                    Please log in to enter your LeetCode username.
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
            {stats.map((stat) => (
              <div
                key={stat.name}
                className="bg-black/40 p-4 rounded-lg border border-[#4a9eff]/20 hover:border-[#4a9eff]/40"
              >
                <div className="flex items-center gap-3">
                  <div className="text-[#4a9eff]">{stat.icon}</div>
                  <div>
                    <div className="text-sm text-[#4a9eff]/80">{stat.name}</div>
                    <div className="text-xl font-bold text-white">
                      {stat.value}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-black/40 p-6 rounded-lg border border-[#4a9eff]/20">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Code2 className="w-5 h-5 text-[#4a9eff]" />
              LeetCode Contest Performance
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={contestData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#4a9eff20" />
                <XAxis dataKey="date" stroke="#4a9eff80" />
                <YAxis
                  stroke="#4a9eff80"
                  domain={[800, "auto"]} // Start at 800, auto-adjust max
                  tickCount={5} // Approximate number of ticks
                  tickFormatter={(tick) => tick} // Ensure ticks are displayed correctly
                />
                <Tooltip />
                <Line type="monotone" dataKey="rating" stroke="#4a9eff" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );
}
