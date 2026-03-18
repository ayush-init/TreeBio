import type React from "react"

import { SidebarInset } from "@/components/ui/sidebar"

import { SidebarWrapper } from "@/modules/dashboard/components/sidebar-wrapper"
import { AppSidebar } from "@/modules/dashboard/components/app-sidebar"

import AppHeader from "@/modules/dashboard/components/app-header"

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-50 dark:from-amber-950 dark:via-amber-900 dark:to-amber-950 transition-colors duration-300">
      <SidebarWrapper>
        <AppSidebar />
        <SidebarInset>
         <AppHeader/>
          <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
        </SidebarInset>
      </SidebarWrapper>
    </div>
  )
}

export default AdminLayout
