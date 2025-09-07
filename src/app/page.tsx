import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import { AppSidebarClient } from "./_AppSidebarClient";
import Link from "next/link";
import { LogInIcon } from "lucide-react";
import { SignedIn, SignedOut } from "@/services/clerk/components/SignInStatus";
import { SidebarUserButtonClient } from "./features/users/components/_SidebarUserButtonClient";

export default function HomePage() {
  return (
  <SidebarProvider className="overflow-y-hidden">
     <AppSidebarClient>
      <Sidebar collapsible="icon" className="overflow-hidden">
        <SidebarHeader className="flex-row">
        <SidebarTrigger />
        <span className="text-xl text-nowrap">AI jobs</span>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                  <SignedOut>   
                    <SidebarMenuItem>
                      <SidebarMenuButton>
                        <Link href="/sign-in">
                        <LogInIcon />
                        <span>Sign in</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SignedOut>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SignedIn>
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
              <SidebarUserButtonClient user={{name: "John Doe", imageUrl: "https://github.com/shadcn.png", email: "john.doe@example.com"}}/>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </SignedIn>
      </Sidebar>
      <main className="flex-1">children</main>
    </AppSidebarClient>
    </SidebarProvider>
  )
}