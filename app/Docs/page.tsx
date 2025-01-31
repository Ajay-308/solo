"use client";
import { Navbar } from "@/components/Navbar";
import { Book, FileText, Compass, Sword, Shield } from "lucide-react";

export function Docs() {
  const sections = [
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Getting Started",
      description:
        "Learn the basics of being a hunter and understanding your abilities.",
      links: ["Basic Controls", "Character Creation", "First Steps"],
    },
    {
      icon: <Sword className="w-6 h-6" />,
      title: "Combat System",
      description:
        "Master the art of combat and learn advanced fighting techniques.",
      links: ["Combat Basics", "Skill Combinations", "Battle Tactics"],
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Skills & Abilities",
      description:
        "Detailed guide on all available skills and how to use them effectively.",
      links: ["Skill Tree", "Ability Enhancement", "Passive Skills"],
    },
    {
      icon: <Compass className="w-6 h-6" />,
      title: "Dungeons & Raids",
      description:
        "Everything you need to know about dungeons and raid mechanics.",
      links: ["Dungeon Types", "Raid Strategies", "Boss Mechanics"],
    },
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-16 p-6">
        <div className="max-w-4xl mx-auto">
          {/* Documentation Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-blue-300 mb-4 flex items-center justify-center gap-3">
              <Book className="w-8 h-8" />
              Documentation
            </h1>
            <p className="text-blue-400/80 max-w-2xl mx-auto">
              Complete guide to understanding the Solo Leveling System. Learn
              about combat, skills, dungeons, and everything you need to become
              the strongest hunter.
            </p>
          </div>

          {/* Documentation Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sections.map((section, index) => (
              <div
                key={index}
                className="bg-blue-950/40 rounded-lg p-6 backdrop-blur-sm border border-blue-500/30
                       hover:border-blue-400/50 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-blue-400">{section.icon}</div>
                  <h2 className="text-xl font-bold text-blue-300">
                    {section.title}
                  </h2>
                </div>
                <p className="text-blue-400/70 mb-4">{section.description}</p>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a
                        href="#"
                        className="text-blue-400/80 hover:text-blue-300 transition-colors flex items-center gap-2"
                      >
                        <span className="w-1.5 h-1.5 bg-blue-400/60 rounded-full"></span>
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Quick Search */}
          <div className="mt-12 bg-blue-950/40 rounded-lg p-6 backdrop-blur-sm border border-blue-500/30">
            <div className="max-w-xl mx-auto">
              <h3 className="text-xl font-bold text-blue-300 mb-4 text-center">
                Quick Search
              </h3>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search documentation..."
                  className="w-full bg-blue-950/60 border border-blue-500/30 rounded-lg px-4 py-2 text-blue-300
                         placeholder-blue-400/50 focus:outline-none focus:border-blue-400/50"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
