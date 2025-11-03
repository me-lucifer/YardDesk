"use client"

import { Search, Rocket } from "lucide-react"
import { Input } from "@/components/ui/input"
import { UserNav } from "@/components/user-nav"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { NewTicketDialog } from "@/components/new-ticket-dialog"
import React from "react"
import { AppCommandDialog } from "@/components/command-dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const demoSteps = [
  {
    title: "1. Inbox Overview",
    description: "This is your central hub for all customer conversations.",
    link: "/inbox",
    linkText: "Go to Inbox"
  },
  {
    title: "2. Open a Ticket",
    description: "Let's look at a ticket that needs a price quote.",
    link: "/ticket/TKT-002",
    linkText: "Open Ticket #TKT-002"
  },
  {
    title: "3. Use a Template",
    description: "In the reply composer, open the template drawer to find a pre-made response.",
    link: "#",
    linkText: "Click the 'Templates' button"
  },
  {
    title: "4. Preview and Send",
    description: "Insert the 'Quote for Part' template, preview it, and send your reply.",
    link: "#",
    linkText: "Preview and Send"
  },
  {
    title: "5. Check Analytics",
    description: "Finally, see how your team is performing on the analytics dashboard.",
    link: "/analytics",
    linkText: "Go to Analytics"
  },
]


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
       <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm">
              <Rocket className="mr-2 h-4 w-4" />
              Start Demo
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80" align="end">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Guided Demo</h4>
                <p className="text-sm text-muted-foreground">
                  Follow these steps to explore the app.
                </p>
              </div>
              <div className="grid gap-4">
                {demoSteps.map((step, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                        {index + 1}
                    </div>
                    <div className="grid gap-1">
                      <p className="text-sm font-medium leading-none">{step.title}</p>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                      {step.link !== "#" ? (
                         <Link href={step.link} className="text-sm text-primary hover:underline">
                            {step.linkText}
                         </Link>
                      ) : (
                         <span className="text-sm text-muted-foreground italic">{step.linkText}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </PopoverContent>
        </Popover>
      <NewTicketDialog ref={newTicketDialogRef} />
      <UserNav />
    </header>
    <AppCommandDialog open={openCommand} onOpenChange={setOpenCommand} />
    </>
  )
}
