"use client";

import React from "react";
import { Search, Bell, Share2, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ModeToggle } from "@/components/theme-toggle";

const TopNavbar = () => {
  return (
    <header className="h-16 bg-transparent border-b border-amber-300/50 dark:border-amber-900/40 backdrop-blur-md flex items-center justify-between px-6 transition-colors duration-300">
      {/* Search */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-amber-600/60 dark:text-amber-400/60" />
          <Input
            placeholder="Search profiles or analytics..."
            className="pl-10 bg-amber-100/30 dark:bg-amber-950/30 border-amber-300/60 dark:border-amber-800/40 text-amber-900 dark:text-white placeholder-amber-600/60 dark:placeholder-amber-700/60 focus:border-amber-500/60 dark:focus:border-amber-500/60 rounded-xl transition-colors duration-300"
          />
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3">
        {/* Share Button */}
        <Button className="bg-gradient-to-r from-amber-500 to-orange-600 text-black hover:from-amber-600 hover:to-orange-700 font-medium rounded-xl px-4 shadow-lg shadow-amber-500/25 hover:shadow-xl hover:shadow-amber-500/30 transition-all duration-300">
          <Share2 className="w-4 h-4 mr-2" />
          Share Tree
        </Button>

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="text-amber-600/60 dark:text-amber-400/60 hover:text-amber-800 dark:hover:text-amber-200 hover:bg-amber-200/20 dark:hover:bg-amber-900/20 transition-all duration-200">
          <Bell className="w-5 h-5" />
        </Button>

        {/* Theme Toggle */}
        <ModeToggle />

        {/* User Avatar */}
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/25">
          <User className="w-4 h-4 text-black" />
        </div>
      </div>
    </header>
  );
};

export { TopNavbar };
