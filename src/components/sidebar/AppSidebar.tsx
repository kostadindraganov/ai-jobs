import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarProvider,
    SidebarTrigger,
  } from "@/components/ui/sidebar"
  import { SignedIn } from "@/services/clerk/components/SignInStatus"
  import { AppSidebarClient } from "./_AppSidebarClient"
  import { ReactNode } from "react"
import Link from "next/link"
  
  export function AppSidebar({
    children,
    content,
    footerButton,
  }: {
    children: ReactNode
    content: ReactNode
    footerButton: ReactNode
  }) {
    
    return (
      <SidebarProvider>
        <AppSidebarClient>
          <Sidebar collapsible="icon" className="overflow-hidden">
            <SidebarHeader className="flex-row">
              <SidebarTrigger />
              <Link href="/">
                <span className="text-xl">AI Jobs</span>
              </Link>
            </SidebarHeader>
            <SidebarContent>{content}</SidebarContent>
            <SignedIn>
              <SidebarFooter>
                <SidebarMenu>
                  <SidebarMenuItem>{footerButton}</SidebarMenuItem>
                </SidebarMenu>
              </SidebarFooter>
            </SignedIn>
          </Sidebar>
          <main className="flex-1">{children}</main>
        </AppSidebarClient>
      </SidebarProvider>
    )
  }