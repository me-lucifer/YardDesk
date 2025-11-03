
"use client"

import Link from "next/link"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card"
import { customers, users, Ticket, Message } from "@/lib/store"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuCheckboxItem, DropdownMenuRadioGroup, DropdownMenuRadioItem } from "@/components/ui/dropdown-menu"
import { ListFilter, Search, MessageSquare, Phone, Mail, Car, Clock, PlusCircle } from "lucide-react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import React from "react"
import { useAppState } from "@/lib/context/app-state-provider"
import { toast } from "sonner"
import { Skeleton } from "@/components/ui/skeleton"


const channelIcons = {
  SMS: <MessageSquare className="h-4 w-4 text-muted-foreground" />,
  WhatsApp: <MessageSquare className="h-4 w-4 text-muted-foreground" />,
  Phone: <Phone className="h-4 w-4 text-muted-foreground" />,
  Email: <Mail className="h-4 w-4 text-muted-foreground" />,
}

const availabilityClasses = {
    Available: "bg-green-500",
    Busy: "bg-orange-500",
    Offline: "bg-gray-500",
}

function InboxSkeleton() {
    return (
        <TableBody>
            {Array.from({ length: 10 }).map((_, i) => (
                 <TableRow key={i}>
                    <TableCell><Skeleton className="h-5 w-16" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-40" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                    <TableCell><Skeleton className="h-8 w-8 rounded-full" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-20" /></TableCell>
                 </TableRow>
            ))}
        </TableBody>
    )
}

export default function InboxPage() {
  const { tickets, addTicket, addMessage, isLoading } = useAppState();
  
  const savedViews = ["All", "New Today", "Waiting Info", "Breaching SLA", "Assigned to me"];

  const handleSimulateMissedCall = () => {
    const newTicketId = `TKT-${Date.now()}`;
    const newCustomerId = 'CUST-002'; // Using an existing customer for simulation
    const customer = customers.find(c => c.id === newCustomerId);

    const newTicket: Ticket = {
      id: newTicketId,
      status: 'New',
      channel: 'Phone',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      customerId: newCustomerId,
      vehicle: { make: 'Ford', model: 'Fiesta', year: 2020, plate: 'AB12 CDE' },
      parts: ['front bumper'],
      assignedToUserId: null,
      priority: 'High',
      slaDueAt: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(),
      lastMessagePreview: 'Customer replied: AB12 CDE, front bumper'
    };

    const newMessage: Message = {
      id: `MSG-${Date.now()}`,
      ticketId: newTicketId,
      direction: 'inbound',
      channel: 'SMS',
      body: 'Customer replied: AB12 CDE, front bumper',
      media: [],
      createdAt: new Date().toISOString(),
      senderName: customer?.name || "Unknown Customer"
    };

    addTicket(newTicket);
    addMessage(newMessage);
    toast.success("Simulated missed call", { description: `New ticket #${newTicketId} created.`});
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Inbox</h1>
        <div className="flex items-center gap-2">
            {savedViews.map((view, index) => (
                <Button key={view} variant={index === 0 ? "secondary" : "ghost"}>
                    {view}
                </Button>
            ))}
        </div>
      </div>
       <Card>
        <CardHeader>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="relative flex-1 md:grow-0">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                type="search"
                placeholder="Search by plate, phone, or parts..."
                className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
                />
            </div>
            <div className="flex items-center gap-2">
                <Button variant="outline" onClick={handleSimulateMissedCall}>
                  Simulate Missed Call
                </Button>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-9 gap-1">
                        <ListFilter className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Filter
                        </span>
                    </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem checked>
                        Status
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>Channel</DropdownMenuCheckboxItem>
                     <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="w-full justify-start font-normal h-8 px-2">Assigned</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56" align="start">
                            <DropdownMenuLabel>Assign to</DropdownMenuLabel>
                            <DropdownMenuRadioGroup value="all">
                                <DropdownMenuRadioItem value="all">All</DropdownMenuRadioItem>
                                {users.map(user => (
                                    <DropdownMenuRadioItem key={user.id} value={user.id}>{user.name}</DropdownMenuRadioItem>
                                ))}
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                     <DropdownMenuCheckboxItem>Priority</DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Status</TableHead>
                <TableHead>Vehicle</TableHead>
                <TableHead>Parts</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>SLA</TableHead>
                <TableHead>Assigned</TableHead>
                <TableHead className="text-right">Last Updated</TableHead>
              </TableRow>
            </TableHeader>
            {isLoading ? <InboxSkeleton /> : (
            <TableBody>
              {tickets.length > 0 ? tickets.map((ticket) => {
                  const customer = customers.find(c => c.id === ticket.customerId);
                  const assignedUser = users.find(u => u.id === ticket.assignedToUserId);
                  const userAvatarMeta = PlaceHolderImages.find(p => p.id === assignedUser?.avatarUrl);
                  return (
                <TableRow key={ticket.id} className="cursor-pointer">
                  <TableCell>
                    <Badge
                      variant={
                        ticket.status === "New"
                          ? "default"
                          : ticket.status === "In review"
                          ? "secondary"
                          : "outline"
                      }
                      className={cn(
                        ticket.status === "New" && "bg-emerald-500/20 text-emerald-500 border-emerald-500/20",
                        ticket.status === "In review" && "bg-blue-500/20 text-blue-500 border-blue-500/20",
                        "dark:text-white"
                      )}
                    >
                      {ticket.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                        <Car className="h-4 w-4 text-muted-foreground" />
                        <Link href={`/ticket/${ticket.id}`} className="font-medium hover:underline text-primary">
                            {ticket.vehicle.plate}
                        </Link>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="truncate">{ticket.parts.join(', ')}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                        {channelIcons[ticket.channel]}
                        <div>
                            <div>{customer?.name}</div>
                            <div className="text-xs text-muted-foreground">{customer?.phone}</div>
                        </div>
                    </div>
                  </TableCell>
                   <TableCell>
                    <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">4 hours left</span>
                    </div>
                  </TableCell>
                  <TableCell>
                     {assignedUser ? (
                        <Avatar className="h-8 w-8">
                            {userAvatarMeta && <AvatarImage src={userAvatarMeta.imageUrl} alt={assignedUser.name} />}
                            <AvatarFallback>{assignedUser.name.charAt(0)}</AvatarFallback>
                             <span className={cn("absolute bottom-0 right-0 block h-2 w-2 rounded-full ring-2 ring-card", availabilityClasses[assignedUser.availability])} />
                        </Avatar>
                        ) : (
                         <div className="h-8 w-8 rounded-full bg-muted" />
                        )}
                  </TableCell>
                  <TableCell className="text-right text-xs text-muted-foreground">{new Date(ticket.updatedAt).toLocaleDateString()}</TableCell>
                </TableRow>
                  )
            }) : (
                 <TableRow>
                    <TableCell colSpan={7} className="h-48 text-center">
                        <div className="flex flex-col items-center gap-4">
                            <h3 className="text-xl font-semibold">Inbox Zero!</h3>
                            <p className="text-muted-foreground">You've cleared all your tickets. Great job!</p>
                             <Button variant="outline" onClick={handleSimulateMissedCall}>
                                <PlusCircle className="mr-2 h-4 w-4" />
                                Simulate Missed Call
                            </Button>
                        </div>
                    </TableCell>
                </TableRow>
            )}
            </TableBody>
            )}
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
