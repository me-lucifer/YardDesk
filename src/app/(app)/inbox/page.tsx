
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
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { tickets, customers } from "@/lib/store"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu"
import { ListFilter, Search, MessageSquare, Phone, Mail, Car, Clock, UserCircle } from "lucide-react"

const channelIcons = {
  SMS: <MessageSquare className="h-4 w-4 text-muted-foreground" />,
  WhatsApp: <MessageSquare className="h-4 w-4 text-muted-foreground" />,
  Phone: <Phone className="h-4 w-4 text-muted-foreground" />,
  Email: <Mail className="h-4 w-4 text-muted-foreground" />,
}

export default function InboxPage() {
  const savedViews = ["All", "New Today", "Waiting Info", "Breaching SLA", "My Tickets"];

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
                    <DropdownMenuCheckboxItem>Assigned</DropdownMenuCheckboxItem>
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
            <TableBody>
              {tickets.map((ticket) => {
                  const customer = customers.find(c => c.id === ticket.customerId);
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
                    <UserCircle className="h-6 w-6 text-muted-foreground" />
                  </TableCell>
                  <TableCell className="text-right text-xs text-muted-foreground">{new Date(ticket.updatedAt).toLocaleDateString()}</TableCell>
                </TableRow>
                  )
            })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
