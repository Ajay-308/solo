"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function LeetCodeSignIn() {
  const [username, setUsername] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();

  const fetchProfileData = async () => {
    if (!username) {
      toast.error("Please enter username!");
      return;
    }

    try {
      const res = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      });

      if (res.ok) {
        console.log("User verified successfully");
        toast.success("User verified successfully!", {
          position: "top-center",
        });
        setTimeout(() => {
          router.push("/Home");
        }, 2000);
      } else {
        toast.error("Username does not exist");
        console.log("Username does not exist");
      }
    } catch (error) {
      toast.error("Error during API call");
      console.log("Error during API call:", error);
    }
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <motion.div
        className="relative p-8 border-2 border-blue-500 rounded-lg shadow-lg w-[400px] text-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {!submitted ? (
          <form onSubmit={handleFormSubmit} className="flex flex-col">
            <h2 className="text-xl font-semibold text-blue-400">
              Sign In with LeetCode
            </h2>
            <p className="mt-2 text-gray-300">Enter your name to begin:</p>
            <input
              type="text"
              className="mt-2 px-4 py-2 bg-gray-800 border border-blue-500 rounded-lg text-white text-center"
              placeholder="Your Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && setSubmitted(true)}
            />
            <button
              type="submit"
              className="mt-8 px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold shadow-lg"
            >
              Submit
            </button>
          </form>
        ) : (
          <div>
            <h2 className="text-xl font-semibold text-blue-400">
              NOTIFICATION
            </h2>
            <p className="mt-2 text-gray-300">
              You have acquired the qualifications to be a{" "}
              <span className="text-blue-400">Player</span>. Will you accept?
            </p>
            <div className="mt-6 flex justify-center gap-4">
              <motion.button
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold shadow-lg"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={fetchProfileData}
              >
                ACCEPT
              </motion.button>
              <motion.button
                className="px-6 py-2 bg-gray-700 hover:bg-gray-800 rounded-lg text-white font-semibold shadow-lg"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSubmitted(false)}
              >
                DECLINE
              </motion.button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
