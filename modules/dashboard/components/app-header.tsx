"use client"
import { ModeToggle } from '@/components/theme-toggle'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'
import React from 'react'

import { usePathname } from 'next/navigation'

const AppHeader = () => {

    const pathname = usePathname();

    const splitedPathName = pathname.split("/admin/").pop()?.split("/") || [];
    const currentPage = splitedPathName[splitedPathName.length - 1]

  return (
     <header className="flex h-16 shrink-0 items-center gap-2 border-b border-white/10 px-4 bg-transparent backdrop-blur-md">
          <SidebarTrigger className="-ml-1 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300" />
          <Separator orientation="vertical" className="mr-2 h-4 bg-white/10" />
          <Breadcrumb className="flex flex-1 items-center justify-between">
            <BreadcrumbList>
              <BreadcrumbItem  className="hidden md:block">
                <BreadcrumbLink href="/admin/my-tree" className="text-gray-300 hover:text-white transition-colors">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block text-gray-500" />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-white font-medium">
                    {currentPage.charAt(0).toUpperCase() + currentPage.slice(1).replace('-', ' ')}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
            <ModeToggle />
          </Breadcrumb>
        </header>
  )
}

export default AppHeader