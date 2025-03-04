"use client";
import React from "react";
import { Sword } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

function App() {
  return (
    <div className="min-h-screen bg-[#0B1121] relative overflow-hidden">
      <nav className="fixed top-0 z-50 w-full bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Sword className="h-8 w-8 text-blue-500" />
              <span className="ml-2 text-xl font-semibold text-white">
                Solo System
              </span>
            </div>

            <div className="flex items-center">
              <Link href="/sign-in">
                <Button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                  Enter Gate
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="relative min-h-screen flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 to-[#0B1121] pointer-events-none" />

        <motion.div
          className="relative z-10 max-w-4xl mx-auto px-4 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tight text-white">
            Rise as the
            <span className="block text-blue-500 mt-2">Shadow Monarch</span>
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
              <Button className="w-full md:w-auto px-8 py-3 bg-blue-500/10 border border-blue-400/30 text-blue-400 hover:bg-blue-500/20 transition-all rounded-lg flex items-center justify-center group">
                Enter Into Hunter Gate
                <Sword className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default App;
