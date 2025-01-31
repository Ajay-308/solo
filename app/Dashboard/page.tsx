"use client";
import React from "react";
import {
  Shield,
  Sword,
  Heart,
  Zap,
  Brain,
  Trophy,
  Github,
  ChevronRight,
  Code2,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";

interface Stat {
  name: string;
  value: number;
  icon: React.ReactNode;
}

interface Skill {
  name: string;
  level: number;
  description: string;
}
const githubData = [
  { date: "2024-01", contributions: 120 },
  { date: "2024-02", contributions: 150 },
  { date: "2024-03", contributions: 180 },
  { date: "2024-04", contributions: 220 },
  { date: "2024-05", contributions: 250 },
  { date: "2024-06", contributions: 300 },
];

const leetcodeData = [
  { date: "2024-01", problems: 50 },
  { date: "2024-02", problems: 75 },
  { date: "2024-03", problems: 100 },
  { date: "2024-04", problems: 130 },
  { date: "2024-05", problems: 160 },
  { date: "2024-06", problems: 200 },
];

export default function Dashboard() {
  const [stats] = React.useState<Stat[]>([
    { name: "Strength", value: 95, icon: <Sword className="w-5 h-5" /> },
    { name: "Defense", value: 85, icon: <Shield className="w-5 h-5" /> },
    { name: "HP", value: 2500, icon: <Heart className="w-5 h-5" /> },
    { name: "Mana", value: 1800, icon: <Zap className="w-5 h-5" /> },
    { name: "Intelligence", value: 75, icon: <Brain className="w-5 h-5" /> },
    { name: "Level", value: 99, icon: <Trophy className="w-5 h-5" /> },
  ]);

  const [skills] = React.useState<Skill[]>([
    {
      name: "Dominator's Touch",
      level: 4,
      description: "Control defeated monsters",
    },
    {
      name: "Ruler's Authority",
      level: 3,
      description: "Command shadows in battle",
    },
    {
      name: "Shadow Extraction",
      level: 5,
      description: "Extract shadows from defeated enemies",
    },
    { name: "Stealth", level: 2, description: "Become one with shadows" },
  ]);

  return (
    <>
      <Navbar />

      <div className="min-h-screen pt-16 p-6 bg-[#0a0b0e]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            {/* System Interface Header */}
            <div className="text-[#4a9eff] mb-6">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 bg-[#4a9eff] rounded-full animate-pulse"></div>
                <span className="text-sm font-mono">SYSTEM INTERFACE v2.0</span>
              </div>
              <h1 className="text-4xl font-bold font-mono border-b border-[#4a9eff]/30 pb-2">
                STATUS WINDOW
              </h1>
            </div>

            {/* Character Info */}
            <div className="bg-black/40 rounded-lg p-6 border border-[#4a9eff]/20 mb-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-[#4a9eff]/5 to-transparent"></div>
              <div className="relative flex gap-6">
                <div className="w-32 h-32 rounded-lg bg-gradient-to-br from-[#4a9eff]/20 to-[#4a9eff]/5 border border-[#4a9eff]/30 flex items-center justify-center overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&q=80&w=300&h=300"
                    alt="Character"
                    width={300} // Set width explicitly
                    height={300} // Set height explicitly
                    className="opacity-80 rounded-lg"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-1.5 h-1.5 bg-[#4a9eff] rounded-full"></div>
                    <span className="text-[#4a9eff] text-sm font-mono">
                      HUNTER PROFILE
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2 font-mono">
                    Sung Jin-Woo
                  </h2>
                  <p className="text-[#4a9eff]">Shadow Monarch</p>
                  <div className="mt-2 inline-block px-2 py-1 bg-[#4a9eff]/10 border border-[#4a9eff]/30 rounded text-sm font-mono">
                    Rank S Hunter
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              {stats.map((stat) => (
                <div
                  key={stat.name}
                  className="bg-black/40 p-4 rounded-lg border border-[#4a9eff]/20 relative overflow-hidden
                         hover:border-[#4a9eff]/40 transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#4a9eff]/5 to-transparent"></div>
                  <div className="relative flex items-center gap-3">
                    <div className="text-[#4a9eff]">{stat.icon}</div>
                    <div>
                      <div className="text-sm text-[#4a9eff]/80 font-mono">
                        {stat.name}
                      </div>
                      <div className="text-xl font-bold text-white font-mono">
                        {stat.value}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* GitHub and LeetCode Graphs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* GitHub Contributions */}
              <div className="bg-black/40 p-6 rounded-lg border border-[#4a9eff]/20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#4a9eff]/5 to-transparent"></div>
                <div className="relative">
                  <div className="flex items-center gap-2 mb-4">
                    <Github className="w-5 h-5 text-[#4a9eff]" />
                    <h3 className="text-lg font-bold text-white font-mono">
                      GitHub Activity
                    </h3>
                  </div>
                  <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={githubData}>
                        <CartesianGrid
                          strokeDasharray="3 3"
                          stroke="#4a9eff20"
                        />
                        <XAxis dataKey="date" stroke="#4a9eff80" />
                        <YAxis stroke="#4a9eff80" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#0a0b0e",
                            border: "1px solid rgba(74, 158, 255, 0.2)",
                            borderRadius: "4px",
                          }}
                        />
                        <Line
                          type="monotone"
                          dataKey="contributions"
                          stroke="#4a9eff"
                          strokeWidth={2}
                          dot={{ fill: "#4a9eff" }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* LeetCode Progress */}
              <div className="bg-black/40 p-6 rounded-lg border border-[#4a9eff]/20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#4a9eff]/5 to-transparent"></div>
                <div className="relative">
                  <div className="flex items-center gap-2 mb-4">
                    <Code2 className="w-5 h-5 text-[#4a9eff]" />
                    <h3 className="text-lg font-bold text-white font-mono">
                      LeetCode Progress
                    </h3>
                  </div>
                  <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={leetcodeData}>
                        <CartesianGrid
                          strokeDasharray="3 3"
                          stroke="#4a9eff20"
                        />
                        <XAxis dataKey="date" stroke="#4a9eff80" />
                        <YAxis stroke="#4a9eff80" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#0a0b0e",
                            border: "1px solid rgba(74, 158, 255, 0.2)",
                            borderRadius: "4px",
                          }}
                        />
                        <Line
                          type="monotone"
                          dataKey="problems"
                          stroke="#4a9eff"
                          strokeWidth={2}
                          dot={{ fill: "#4a9eff" }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>

            {/* Skills List */}
            <div className="bg-black/40 rounded-lg p-6 border border-[#4a9eff]/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#4a9eff]/5 to-transparent"></div>
              <div className="relative">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1.5 h-1.5 bg-[#4a9eff] rounded-full"></div>
                  <h2 className="text-xl font-bold text-white font-mono">
                    SKILLS
                  </h2>
                </div>
                <div className="space-y-3">
                  {skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="bg-black/40 p-4 rounded-lg border border-[#4a9eff]/20
                             hover:border-[#4a9eff]/40 transition-all duration-300"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-white font-mono">
                            {skill.name}
                          </h3>
                          <p className="text-sm text-[#4a9eff]/70">
                            {skill.description}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[#4a9eff] font-mono">
                            Lv. {skill.level}
                          </span>
                          <ChevronRight className="w-5 h-5 text-[#4a9eff]/60" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
