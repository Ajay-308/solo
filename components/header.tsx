"use client";

import Link from "next/link";
import { User, Shield } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
  const [user, setUser] = useState<{
    username: string;
    avatar?: string;
  } | null>(null);
  const [avatar, setAvatar] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/profile", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          console.log("User Data:", data);
          setAvatar(data.avatar || null); // Handle undefined avatar
          setUser(data);
        }
      } catch (error) {
        console.log("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    setUser(null);
    setAvatar(null);
    router.push("/");
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-white shadow-sm">
      <div className="flex items-center space-x-2">
        <Shield size={28} className="text-blue-500" />
        <span className="text-xl font-bold">Solo System</span>
      </div>

      <div className="flex space-x-4">
        <Link
          href="/dashboard"
          className="text-gray-600 hover:text-gray-900 transition-colors"
        >
          Dashboard
        </Link>
        <Link
          href="/docs"
          className="text-gray-600 hover:text-gray-900 transition-colors"
        >
          Docs
        </Link>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            {avatar ? (
              <Image
                src={avatar}
                alt="User Avatar"
                width={32}
                height={32}
                className="rounded-full"
              />
            ) : (
              <User className="h-5 w-5" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          {user ? (
            <>
              <DropdownMenuItem className="font-medium">
                {user.username}
              </DropdownMenuItem>
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                Log out
              </DropdownMenuItem>
            </>
          ) : (
            <DropdownMenuItem>
              <Link href="/sign-in">Sign In</Link>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
}
