"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sword, LayoutDashboard, User, Book, Home } from "lucide-react";

export function Navbar() {
  const pathname = usePathname(); // ✅ Correct way to get current route in Next.js

  const isActive = (path: string) => pathname === path;

  const links = [
    { path: "/", icon: <Home className="w-5 h-5" />, label: "Home" },
    {
      path: "/Dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
      label: "Dashboard",
    },
    { path: "/profile", icon: <User className="w-5 h-5" />, label: "Profile" },
    { path: "/docs", icon: <Book className="w-5 h-5" />, label: "Docs" },
  ];

  return (
    <nav className="bg-blue-950/40 border-b border-blue-500/30 backdrop-blur-sm fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <Sword className="w-8 h-8 text-blue-400" />
            <span className="text-xl font-bold text-blue-300">Solo System</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8">
            {links.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors
                  ${
                    isActive(link.path)
                      ? "text-blue-300 bg-blue-500/20"
                      : "text-blue-400/70 hover:text-blue-300 hover:bg-blue-500/10"
                  }`}
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
