
import { tickets, customers, messages } from "@/lib/store"
import { notFound } from "next/navigation"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Send } from "lucide-react"
import Link from "next/link"
import { PlaceHolderImages } from "@/lib/placeholder-images"

export default function TicketDetailsPage({ params }: { params: { id: string } }) {
  const ticket = tickets.find((t) => t.id === params.id)
  if (!ticket) {
    notFound()
  }

  const customer = customers.find(c => c.id === ticket.customerId);
  const ticketMessages = messages.filter(m => m.ticketId === ticket.id);
  const customerAvatar = PlaceHolderImages.find(p => p.id === 'customer-avatar-1');
  const userAvatar = PlaceHolderImages.find(p => p.id === 'user-avatar-1');

  return (
    <div className="max-w-4xl mx-auto space-y-6">
       <div>
         <Button variant="ghost" asChild>
            <Link href="/inbox">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Inbox
            </Link>
        </Button>
       </div>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl">{ticket.vehicle.year} {ticket.vehicle.make} {ticket.vehicle.model} - {ticket.parts.join(', ')}</CardTitle>
              <CardDescription>
                Ticket ID: {ticket.id}
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
                <Badge variant={ticket.priority === 'High' || ticket.priority === 'Urgent' ? 'destructive' : ticket.priority === 'Medium' ? 'secondary' : 'outline'}>{ticket.priority}</Badge>
                <Badge className={ticket.status === 'New' ? 'bg-primary' : ''}>{ticket.status}</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
              {customer && (
                <Avatar className="h-12 w-12">
                  {customerAvatar && <AvatarImage src={customerAvatar.imageUrl} alt={customer.name} data-ai-hint="person face" />}
                  <AvatarFallback>{customer.name.charAt(0)}</AvatarFallback>
                </Avatar>
              )}
              <div>
                  <p className="font-semibold">{customer?.name}</p>
                  <p className="text-sm text-muted-foreground">{customer?.email}</p>
              </div>
          </div>
          <Separator className="my-6" />
          <div className="prose dark:prose-invert">
            <p>{ticket.lastMessagePreview}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Conversation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
            {ticketMessages.map(message => (
                <div key={message.id} className="flex gap-3">
                    <Avatar className="h-9 w-9">
                        {message.direction === 'outbound' && userAvatar && <AvatarImage src={userAvatar.imageUrl} alt="Staff" data-ai-hint="person face" />}
                        {message.direction === 'inbound' && customerAvatar && <AvatarImage src={customerAvatar.imageUrl} alt="Customer" data-ai-hint="person face" />}
                        <AvatarFallback>{message.senderName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                            <p className="font-medium">{message.senderName}</p>
                            <p className="text-xs text-muted-foreground">{new Date(message.createdAt).toLocaleString()}</p>
                        </div>
                        <div className="p-3 rounded-lg bg-muted">
                            <p className="text-sm">{message.body}</p>
                        </div>
                    </div>
                </div>
            ))}
        </CardContent>
        <CardFooter>
            <div className="w-full flex items-center gap-2">
                <Textarea placeholder="Type your reply here..." className="flex-1" />
                <Button>
                    <Send className="h-4 w-4 mr-2" />
                    Reply
                </Button>
            </div>
        </CardFooter>
      </Card>
    </div>
  )
}
