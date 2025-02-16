"use client";
import Navbar from "@/components/Navbar";
import { Sword } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/profile");
        const data = await res.json();

        if (res.ok && data?.username) {
          console.log("Redirecting to Home...");
          router.replace("/Home");
        } else {
          console.log("No user found, staying on landing page.");
        }
      } catch (error) {
        console.log("Error fetching session:", error);
      }
    };

    checkAuth();
  }, [router]);
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-black text-white">
        <p className="text-blue-400">Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <Navbar />

      <div className="relative min-h-screen flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 to-black pointer-events-none" />

        <motion.div
          className="relative z-10 max-w-4xl mx-auto px-4 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tight">
            Rise as the
            <span className="block text-blue-400 mt-2">Shadow Monarch</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            Begin your journey to become the strongest hunter. Level up, gain
            new abilities, and command an army of shadows.
          </p>

          <motion.div
            className="flex flex-col md:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <Link href="/sign-in" className="w-full md:w-auto">
              <button className="w-full md:w-auto px-8 py-3 bg-blue-500/10 border border-blue-400/30 text-blue-400 hover:bg-blue-500/20 transition-all rounded-lg flex items-center justify-center group">
                Enter Into Hunter Gate
                <Sword className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
