"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar"
import {
  Inbox,
  FileText,
  LineChart,
  Settings,
  HardHat,
  Star,
  Users,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const menuItems = [
  { href: "/inbox", label: "Inbox", icon: Inbox },
  { href: "/customers", label: "Customers", icon: Users },
  { href: "/analytics", label: "Analytics", icon: LineChart },
  { href: "/templates", label: "Templates", icon: FileText },
  { href: "/settings", label: "Settings", icon: Settings },
]

const savedViews = [
    { href: "/views/unread", label: "Unread" },
    { href: "/views/assigned-to-me", label: "Assigned to Me" },
    { href: "/views/high-priority", label: "High Priority" },
]

export function AppSidebar() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    if (path === '/inbox') return pathname.startsWith('/inbox') || pathname.startsWith('/ticket');
    if (path === '/customers') return pathname.startsWith('/customers');
    if (path === '/views') return pathname.startsWith('/views');
    return pathname.startsWith(path)
  }

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <HardHat className="w-8 h-8 text-primary" />
          <span className="text-xl font-semibold">YardDesk</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton
                asChild
                isActive={isActive(item.href)}
                tooltip={item.label}
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
        <div className="px-4 mt-4">
             <Accordion type="single" collapsible defaultValue="saved-views">
                <AccordionItem value="saved-views" className="border-none">
                    <AccordionTrigger className="text-sm font-medium text-muted-foreground hover:no-underline py-2">Saved Views</AccordionTrigger>
                    <AccordionContent>
                        <SidebarMenu>
                            {savedViews.map(view => (
                                 <SidebarMenuItem key={view.label}>
                                     <SidebarMenuButton asChild variant="ghost" className="h-8 justify-start" isActive={pathname === view.href}>
                                         <Link href={view.href}>
                                            <Star className="w-3.5 h-3.5 mr-2" />
                                             <span>{view.label}</span>
                                         </Link>
                                     </SidebarMenuButton>
                                 </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
      </SidebarContent>
      <SidebarFooter>
      </SidebarFooter>
    </Sidebar>
  )
}
