"use client";

import React, { useState } from "react";
import { Sword, LayoutDashboard, FileText, User, Menu, X } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import toast from "react-hot-toast";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [username, setUsername] = useState("");
  const handleSubmit = async () => {
    try {
      const res = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      });

      const data = await res.json();
      if (res.ok) {
        console.log("Username saved:", data);
        toast.success("Username saved successfully!");
      } else {
        toast.error("username not found");
      }
    } catch (error) {
      console.error("Failed to save username:", error);
      toast.error("Failed to save username :(");
    }
    setUsername("");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen bg-[#0B1121]">
      <nav className="fixed top-0 z-50 w-full border-b border-blue-500/20 bg-[#0B1121]/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-2">
            <Sword size={24} className="text-blue-500" />
            <span className="text-xl font-bold text-blue-100">Solo System</span>
          </div>

          <button
            className="text-gray-300 focus:outline-none md:hidden"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className="hidden md:flex items-center gap-6">
            <NavLink
              icon={<LayoutDashboard size={20} />}
              text="Dashboard"
              href="/dashboard"
            />
            <NavLink icon={<User size={20} />} text="Profile" href="/profile" />
            <NavLink icon={<FileText size={20} />} text="Docs" href="/docs" />
            <UserButton />
          </div>
        </div>
        {isMenuOpen && (
          <div className="bg-[#0B1121]/95 py-4 md:hidden">
            <div className="mx-auto max-w-7xl flex flex-col gap-4 px-6">
              <MobileNavLink
                icon={<LayoutDashboard size={20} />}
                text="Dashboard"
                href="/dashboard"
              />
              <MobileNavLink
                icon={<User size={20} />}
                text="Profile"
                href="/profile"
              />
              <MobileNavLink
                icon={<FileText size={20} />}
                text="Docs"
                href="/docs"
              />
            </div>
          </div>
        )}
      </nav>
      <div className="pt-16 px-6">
        <h1 className="text-2xl font-bold text-white">
          <Input
            placeholder="LeetCode username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Button onClick={handleSubmit} className="hover:bg-blue-500">
            submit
          </Button>
        </h1>
      </div>
    </div>
  );
}

const NavLink = ({
  icon,
  text,
  href,
}: {
  icon: React.ReactNode;
  text: string;
  href: string;
}) => (
  <a
    href={href}
    className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-blue-400 transition-colors rounded-md hover:bg-blue-500/10"
  >
    {icon}
    <span>{text}</span>
  </a>
);

const MobileNavLink = ({
  icon,
  text,
  href,
}: {
  icon: React.ReactNode;
  text: string;
  href: string;
}) => (
  <a
    href={href}
    className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-blue-400 transition-colors rounded-md hover:bg-blue-500/10"
  >
    {icon}
    <span className="text-sm">{text}</span>
  </a>
);

export default Header;
