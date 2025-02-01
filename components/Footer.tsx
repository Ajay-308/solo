import React from "react";
import { Github, Twitter, Mail } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-blue-950/40 border-t border-blue-500/30 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-blue-300 font-bold text-lg">
              Solo Leveling System
            </h3>
            <p className="text-blue-400/70 text-sm">
              Become the strongest hunter and rise through the ranks.
            </p>
          </div>

          <div>
            <h4 className="text-blue-300 font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-blue-400/70">
              <li>
                <Link
                  href="/"
                  className="hover:text-blue-300 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="hover:text-blue-300 transition-colors"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/profile"
                  className="hover:text-blue-300 transition-colors"
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  href="/docs"
                  className="hover:text-blue-300 transition-colors"
                >
                  Documentation
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-blue-300 font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-blue-400/70">
              <li>
                <a
                  href="/docs/guides"
                  className="hover:text-blue-300 transition-colors"
                >
                  Guides
                </a>
              </li>
              <li>
                <a
                  href="/docs/skills"
                  className="hover:text-blue-300 transition-colors"
                >
                  Skills Database
                </a>
              </li>
              <li>
                <a
                  href="/docs/dungeons"
                  className="hover:text-blue-300 transition-colors"
                >
                  Dungeon Maps
                </a>
              </li>
              <li>
                <a
                  href="/docs/monsters"
                  className="hover:text-blue-300 transition-colors"
                >
                  Monster Index
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-blue-300 font-semibold mb-4">Connect</h4>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-blue-500/30 text-center text-blue-400/70 text-sm">
          <p>
            &copy; {new Date().getFullYear()} Solo Leveling System. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
