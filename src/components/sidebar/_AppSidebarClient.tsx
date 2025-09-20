"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { useIsMobile } from "@/hooks/use-mobile"
import { ReactNode } from "react"
import Link from "next/link"

export function AppSidebarClient({ children }: { children: ReactNode }) {
  const isMobile = useIsMobile()

  if (isMobile) {
    return (
      <div className="flex flex-col w-full">
        <div className="p-2 border-b flex items-center justify-between gap-1 w-full">
          <SidebarTrigger />
          <div className="flex items-center justify-center w-full pr-12">
            <Link href="/">
              <span className="text-xl">AI Jobs</span>
            </Link>
        </div>
        </div>
        <div className="flex-1 flex">{children}</div>
      </div>
    )
  }

  return children
}