
import { customers, tickets } from "@/lib/store"
import { notFound } from "next/navigation"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft } from "lucide-react"
import { PlaceHolderImages } from "@/lib/placeholder-images"

export default function CustomerDetailPage({ params }: { params: { id: string } }) {
  const id = params.id;
  const customer = customers.find((c) => c.id === id)
  if (!customer) {
    notFound()
  }

  const customerTickets = tickets.filter(t => t.customerId === customer.id);
  const customerAvatar = PlaceHolderImages.find(p => p.id === 'customer-avatar-1');

  return (
    <div className="space-y-6">
        <div>
         <Button variant="ghost" asChild>
            <Link href="/customers">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Customers
            </Link>
        </Button>
       </div>
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-1">
          <Card>
            <CardHeader className="items-center">
              <Avatar className="h-24 w-24">
                {customerAvatar && <AvatarImage src={customerAvatar.imageUrl} alt={customer.name} data-ai-hint="person face" />}
                <AvatarFallback className="text-3xl">{customer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
            </CardHeader>
            <CardContent className="text-center">
              <CardTitle className="text-2xl">{customer.name}</CardTitle>
              {customer.email && <CardDescription>{customer.email}</CardDescription>}
              <div className="text-sm text-muted-foreground mt-4 space-y-1">
                <p>{customer.phone}</p>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Ticket History</CardTitle>
              <CardDescription>All tickets associated with {customer.name}.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ticket ID</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customerTickets.length > 0 ? (
                    customerTickets.map((ticket) => (
                      <TableRow key={ticket.id}>
                        <TableCell>
                          <Link href={`/ticket/${ticket.id}`} className="font-medium hover:underline text-primary">
                            {ticket.id}
                          </Link>
                        </TableCell>
                        <TableCell>{ticket.lastMessagePreview}</TableCell>
                        <TableCell>
                            <Badge variant={ticket.status === 'New' ? 'default' : ticket.status === 'In review' ? 'secondary' : 'outline'}>{ticket.status}</Badge>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center">
                        No tickets found for this customer.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

    