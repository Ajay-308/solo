"use client";

import React, { useState, useEffect } from "react";
import { Sword, LayoutDashboard, FileText, User, Menu, X } from "lucide-react";
import { UserButton, useUser } from "@clerk/nextjs";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import toast from "react-hot-toast";

function Header() {
  const { user, isLoaded, isSignedIn } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [leetcodeUser, setLeetcodeUser] = useState(false);

  useEffect(() => {
    if (user) {
      getLeetcodeUsername();
    }
  }, [user]); // Fetch data when the user is available

  const getLeetcodeUsername = async () => {
    try {
      const res = await fetch(`/api/getData?userId=${user?.id}`);
      const data = await res.json();
      if (res.ok && data.username) {
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
    <div className="min-h-screen bg-[#0B1121]">
      <nav className="fixed top-0 z-50 w-full border-b border-blue-500/20 bg-[#0B1121]/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-2">
            <Sword size={24} className="text-blue-500" />
            <span className="text-xl font-bold text-blue-100">Solo System</span>
          </div>

          <button
            className="text-gray-300 focus:outline-none md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
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
        {isLoaded && isSignedIn ? (
          leetcodeUser ? (
            <h1 className="text-2xl font-bold text-white">
              LeetCode Username: {username}
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
