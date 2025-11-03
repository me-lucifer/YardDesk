"use client"

import React from "react"
import { useRouter } from "next/navigation"
import {
  FileText,
  Inbox,
  LineChart,
  PlusCircle,
  Search as SearchIcon,
  Users,
} from "lucide-react"

import { customers, templates, tickets } from "@/lib/store"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"

export function AppCommandDialog({ ...props }) {
  const router = useRouter()
  const [open, setOpen] = React.useState(false)

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false)
    command()
  }, [])

  return (
    <CommandDialog {...props}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Actions">
          <CommandItem
            onSelect={() => runCommand(() => router.push("/inbox"))}
          >
            <Inbox className="mr-2 h-4 w-4" />
            <span>Go to Inbox</span>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => router.push("/analytics"))}
          >
            <LineChart className="mr-2 h-4 w-4" />
            <span>Go to Analytics</span>
          </CommandItem>
          <CommandItem disabled>
            <PlusCircle className="mr-2 h-4 w-4" />
            <span>New Ticket</span>
            <kbd className="ml-auto rounded bg-muted px-2 py-0.5 text-xs text-muted-foreground">
              ⌘N
            </kbd>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Tickets">
          {tickets.slice(0, 5).map((ticket) => (
            <CommandItem
              key={ticket.id}
              value={`ticket ${ticket.id} ${ticket.vehicle.plate}`}
              onSelect={() =>
                runCommand(() => router.push(`/ticket/${ticket.id}`))
              }
            >
              <FileText className="mr-2 h-4 w-4" />
              <span>{ticket.vehicle.plate} - {ticket.parts.join(", ")}</span>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Customers">
          {customers.slice(0, 5).map((customer) => (
            <CommandItem
              key={customer.id}
              value={`customer ${customer.name} ${customer.phone}`}
              onSelect={() =>
                runCommand(() => router.push(`/customers/${customer.id}`))
              }
            >
              <Users className="mr-2 h-4 w-4" />
              <span>{customer.name}</span>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Templates">
          {templates.slice(0, 5).map((template) => (
            <CommandItem
              key={template.id}
              value={`template ${template.name}`}
              onSelect={() =>
                runCommand(() => router.push("/templates"))
              }
            >
              <FileText className="mr-2 h-4 w-4" />
              <span>{template.name}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
