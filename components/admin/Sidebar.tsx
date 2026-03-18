"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { 
  TreesIcon as Tree,
  BarChart3,
  Settings,
  QrCode,
  Home,
  User
} from "lucide-react";

const Sidebar = () => {
  const pathname = usePathname();

  const navItems = [
    {
      title: "Dashboard",
      url: "/admin",
      icon: Home,
    },
    {
      title: "My Tree",
      url: "/admin/my-tree",
      icon: Tree,
    },
    {
      title: "Analytics",
      url: "/admin/overview",
      icon: BarChart3,
    },
    {
      title: "QR Generator",
      url: "/admin/qr",
      icon: QrCode,
    },
    {
      title: "Settings",
      url: "/admin/settings",
      icon: Settings,
    },
  ];

  return (
    <div className="w-64 h-screen bg-gradient-to-b from-amber-100/95 via-amber-200/95 to-amber-100/95 dark:from-amber-950/95 dark:via-amber-900/95 dark:to-amber-950/95 backdrop-blur-md border-r border-amber-300/50 dark:border-amber-900/40 flex flex-col transition-colors duration-300">
      {/* Logo */}
      <div className="p-6 border-b border-amber-300/50 dark:border-amber-900/40">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/25">
            <Tree className="w-6 h-6 text-black" />
          </div>
          <div>
            <h1 className="text-amber-900 dark:text-white font-bold text-lg">TreeBio</h1>
            <p className="text-amber-600/70 dark:text-amber-400/70 text-xs">Admin Panel</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.url || (item.url !== "/admin" && pathname.startsWith(item.url));
          
          return (
            <Link
              key={item.title}
              href={item.url}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 transform hover:scale-[1.02]
                ${isActive 
                  ? 'bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-700 dark:text-amber-400 border border-amber-500/30 dark:border-amber-500/30 shadow-lg shadow-amber-500/10' 
                  : 'text-amber-700/60 dark:text-amber-300/60 hover:text-amber-800 dark:hover:text-amber-200 hover:bg-amber-200/30 dark:hover:bg-amber-900/20 hover:border hover:border-amber-400/30 dark:hover:border-amber-800/30'
                }
              `}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.title}</span>
            </Link>
          );
        })}
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-amber-300/50 dark:border-amber-900/40">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-amber-200/50 to-amber-100/50 dark:from-amber-900/30 dark:to-amber-800/30 border border-amber-300/40 dark:border-amber-700/40">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/25">
            <User className="w-5 h-5 text-black" />
          </div>
          <div className="flex-1">
            <p className="text-amber-900 dark:text-white font-medium text-sm">Alex Rivera</p>
            <p className="text-amber-600 dark:text-amber-400 text-xs font-medium">Pro Plan</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Sidebar };
