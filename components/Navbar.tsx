"use client";
import React, { useState } from "react";
import { Menu, X, Shield } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className=" bg-gray-950 text-gray-100">
      <nav className="fixed w-full bg-gray-900/80 backdrop-blur-sm border-b border-purple-900/50 z-50">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <Shield size={28} className="text-blue-500" />
              <span className="text-xl font-bold">Solo System</span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <button className="bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded-lg transition duration-200">
                Enter Gate
              </button>
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-300 hover:text-blue-500 transition duration-200"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
          {/* for mobile */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-purple-900/50">
              <div className="flex flex-col space-y-4">
                <button className="bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded-lg transition duration-200 w-full">
                  Enter Gate
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
