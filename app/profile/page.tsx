"use client";
import React, { useState } from "react";

import { Navbar } from "@/components/Navbar";

export default function Profile() {
  const [username, setUsername] = useState("");

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-16 p-6">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter username"
          className="p-2 border border-gray-500 rounded"
        />
        <p className="mt-4 text-white">Username: {username}</p>
      </div>
    </>
  );
}
