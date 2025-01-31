import React from "react";
import { ArrowRight, Shield, Sword, Trophy } from "lucide-react";
import Link from "next/link";

export function Home() {
  const features = [
    {
      icon: <Sword className="w-6 h-6" />,
      title: "Combat System",
      description:
        "Master various combat skills and techniques to become stronger.",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Dungeon Raids",
      description: "Explore dangerous dungeons and face powerful monsters.",
    },
    {
      icon: <Trophy className="w-6 h-6" />,
      title: "Ranking System",
      description: "Climb the ranks and become the strongest hunter.",
    },
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-blue-300 mb-6">
              Rise as the Shadow Monarch
            </h1>
            <p className="text-xl text-blue-400/80 mb-8 max-w-2xl mx-auto">
              Begin your journey to become the strongest hunter. Level up, gain
              new abilities, and command an army of shadows.
            </p>
            <div className="flex justify-center space-x-4">
              <Link
                href="/dashboard"
                className="inline-flex items-center px-6 py-3 rounded-lg bg-blue-500/20 border border-blue-400/30
                         text-blue-300 hover:bg-blue-500/30 transition-colors"
              >
                Get Started
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                href="/docs"
                className="inline-flex items-center px-6 py-3 rounded-lg border border-blue-400/30
                         text-blue-300 hover:bg-blue-500/20 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-blue-950/40 rounded-lg p-6 border border-blue-500/30 backdrop-blur-sm
                       hover:border-blue-400/50 transition-all duration-300"
            >
              <div className="text-blue-400 mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-blue-300 mb-2">
                {feature.title}
              </h3>
              <p className="text-blue-400/70">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
