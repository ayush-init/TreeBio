"use client";
import {
  TreesIcon as Tree,
  BarChart3,
  Settings,
  QrCode,
  User,
  Crown,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarSeparator,
} from "@/components/ui/sidebar";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Main navigation items
const mainNavItems = [
  {
    title: "My Tree",
    url: "/admin/my-tree",
    icon: Tree,
  },
  {
    title: "Overview",
    url: "/admin/overview",
    icon: BarChart3,
  },
  {
    title: "Settings",
    url: "/admin/settings",
    icon: Settings,
  },
];

// Tools section
const toolsItems = [
  {
    title: "QR Code Generator",
    url: "/admin/qr",
    icon: QrCode,
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="border-r border-sidebar-border bg-sidebar">
      <SidebarHeader className="bg-transparent">
        <Link href={"/"} className="flex gap-2 items-center justify-start p-4 hover:bg-sidebar-accent rounded-xl transition-all duration-300">
          <Image src={"/logo.svg"} alt="TreeBio Logo" width={32} height={32} />
          <h1 className="text-lg font-bold text-sidebar-foreground">
            LinkNode Admin
          </h1>
        </Link>
        <SidebarSeparator className="bg-sidebar-border" />
      </SidebarHeader>

      <SidebarContent className="bg-transparent">
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-accent-foreground font-semibold">Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    size={"lg"}
                    isActive={pathname === item.url}
                    className="sidebar-menu-item"
                  >
                    <Link href={item.url}>
                      <>
                        <item.icon className="size-6 sidebar-icon" />
                        <span className="font-semibold text-base">
                          {item.title}
                        </span>
                      </>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="bg-sidebar-border" />

        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-accent-foreground font-semibold">Tools</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {toolsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    size={"lg"}
                    isActive={pathname === item.url}
                    className="sidebar-menu-item"
                  >
                    <Link href={item.url}>
                      <item.icon className="size-6 sidebar-icon" />
                      <span className="font-semibold text-base">
                        {item.title}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="bg-transparent border-t border-sidebar-border">
        <div className="flex items-center gap-3 p-4 sidebar-user-profile">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sidebar-primary to-orange-600 p-0.5">
            <div className="w-full h-full rounded-full bg-sidebar flex items-center justify-center">
              <User className="w-5 h-5 text-sidebar-primary" />
            </div>
          </div>
          <div className="flex-1">
            <p className="text-sidebar-foreground font-semibold text-sm">Ayush</p>
            <div className="flex items-center gap-1">
              <Crown className="w-3 h-3 text-sidebar-primary" />
              <p className="text-sidebar-primary text-xs font-medium">Pro Plan</p>
            </div>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
