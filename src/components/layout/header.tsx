"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { UserNav } from "@/components/user-nav"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { NewTicketDialog } from "@/components/new-ticket-dialog"
import React from "react"
import { AppCommandDialog } from "@/components/command-dialog"

export function Header() {
  const searchInputRef = React.useRef<HTMLInputElement>(null);
  const newTicketDialogRef = React.useRef<{ trigger: () => void }>(null);
  const [openCommand, setOpenCommand] = React.useState(false)


  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "/" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        searchInputRef.current?.focus()
      }
      if (e.key === "n" && (e.metaKey || e.ctrlKey)) {
         e.preventDefault()
        newTicketDialogRef.current?.trigger()
      }
       if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpenCommand((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])


  return (
    <>
    <header className="flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 sticky top-0 z-30">
        <SidebarTrigger className="md:hidden" />
      <div className="flex-1">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            ref={searchInputRef}
            type="search"
            placeholder="Search everything... (⌘+/)"
            className="w-full appearance-none bg-muted pl-8 md:w-1/3 lg:w-1/3"
          />
        </div>
      </div>
      <NewTicketDialog ref={newTicketDialogRef} />
      <UserNav />
    </header>
    <AppCommandDialog open={openCommand} onOpenChange={setOpenCommand} />
    </>
  )
}
