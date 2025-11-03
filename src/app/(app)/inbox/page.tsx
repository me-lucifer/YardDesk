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
import { tickets } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

export default function InboxPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Inbox</h1>
      <Card>
        <CardHeader>
          <CardTitle>All Tickets</CardTitle>
          <CardDescription>A list of all incoming requests and inquiries.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Ticket ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Last Updated</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tickets.map((ticket) => (
                <TableRow key={ticket.id} className="cursor-pointer">
                  <TableCell className="font-medium">
                    <Link href={`/ticket/${ticket.id}`} className="hover:underline text-primary">{ticket.id}</Link>
                  </TableCell>
                  <TableCell>{ticket.customer.name}</TableCell>
                  <TableCell>{ticket.subject}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        ticket.status === "Open"
                          ? "default"
                          : ticket.status === "In Progress"
                          ? "secondary"
                          : "outline"
                      }
                      className={cn(
                        ticket.status === "Open" && "bg-emerald-500/20 text-emerald-500 border-emerald-500/20",
                        ticket.status === "In Progress" && "bg-blue-500/20 text-blue-500 border-blue-500/20",
                        "dark:text-white"
                      )}
                    >
                      {ticket.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">{ticket.lastUpdated}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
