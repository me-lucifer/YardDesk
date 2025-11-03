import { tickets, customers } from "@/lib/mock-data"
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

export default function TicketDetailsPage({ params }: { params: { id: string } }) {
  const ticket = tickets.find((t) => t.id === params.id)
  if (!ticket) {
    notFound()
  }

  const customer = customers.find(c => c.name === ticket.customer.name);

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
              <CardTitle className="text-2xl">{ticket.subject}</CardTitle>
              <CardDescription>
                Ticket ID: {ticket.id}
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
                <Badge variant={ticket.priority === 'High' ? 'destructive' : ticket.priority === 'Medium' ? 'secondary' : 'outline'}>{ticket.priority}</Badge>
                <Badge className={ticket.status === 'Open' ? 'bg-primary' : ''}>{ticket.status}</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
              {customer && (
                <Avatar className="h-12 w-12">
                  <AvatarImage src={customer.avatar} alt={customer.name} data-ai-hint="person face" />
                  <AvatarFallback>{customer.name.charAt(0)}</AvatarFallback>
                </Avatar>
              )}
              <div>
                  <p className="font-semibold">{ticket.customer.name}</p>
                  <p className="text-sm text-muted-foreground">{ticket.customer.email}</p>
              </div>
          </div>
          <Separator className="my-6" />
          <div className="prose dark:prose-invert">
            <p>{ticket.body}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Conversation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="flex gap-3">
                <Avatar className="h-9 w-9">
                    <AvatarImage src="https://picsum.photos/seed/user1/40/40" alt="Staff" data-ai-hint="person face" />
                    <AvatarFallback>S</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                        <p className="font-medium">Staff Member</p>
                        <p className="text-xs text-muted-foreground">2 hours ago</p>
                    </div>
                    <div className="p-3 rounded-lg bg-muted">
                        <p className="text-sm">We are checking our inventory for this part. We will get back to you shortly.</p>
                    </div>
                </div>
            </div>
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
