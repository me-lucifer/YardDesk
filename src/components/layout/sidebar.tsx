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
  AlertTriangle,
  Clock,
  User,
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
    { href: "/views/all", label: "All", icon: Inbox },
    { href: "/views/new-today", label: "New Today", icon: Star },
    { href: "/views/waiting-info", label: "Waiting Info", icon: Clock },
    { href: "/views/breaching-sla", label: "Breaching SLA", icon: AlertTriangle },
    { href: "/views/my-tickets", label: "My Tickets", icon: User },
]

export function AppSidebar() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    if (path === '/inbox') return pathname.startsWith('/inbox') || pathname.startsWith('/ticket') || pathname === '/views/all';
    if (path === '/customers') return pathname.startsWith('/customers');
    if (path.startsWith('/views')) return pathname === path;
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
                                            <view.icon className="w-3.5 h-3.5 mr-2" />
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
