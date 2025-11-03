
"use client"

import { tickets, customers, messages, Message, Ticket } from "@/lib/store"
import { notFound } from "next/navigation"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, MoreVertical, MessageSquare, Phone, Mail, Clock } from "lucide-react"
import Link from "next/link"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ReplyComposer } from "@/components/reply-composer"
import React from "react"

const channelIcons: { [key: string]: React.ReactNode } = {
  SMS: <MessageSquare className="h-4 w-4 text-muted-foreground" />,
  WhatsApp: <MessageSquare className="h-4 w-4 text-muted-foreground" />,
  Phone: <Phone className="h-4 w-4 text-muted-foreground" />,
  Email: <Mail className="h-4 w-4 text-muted-foreground" />,
}

export default function TicketDetailsPage({ params }: { params: { id: string } }) {
  const [ticket, setTicket] = React.useState<Ticket | undefined>(tickets.find((t) => t.id === params.id));
  const [ticketMessages, setTicketMessages] = React.useState<Message[]>(messages.filter(m => m.ticketId === params.id));

  if (!ticket) {
    notFound()
  }

  const customer = customers.find(c => c.id === ticket.customerId);
  const customerAvatar = PlaceHolderImages.find(p => p.id === 'customer-avatar-1');
  const userAvatar = PlaceHolderImages.find(p => p.id === 'user-avatar-1');

  const handleSendMessage = (newMessage: Omit<Message, 'id' | 'createdAt' | 'senderName'>) => {
    const messageToAdd: Message = {
        ...newMessage,
        id: `MSG-${Date.now()}`,
        createdAt: new Date().toISOString(),
        senderName: "YardDesk"
    }
    setTicketMessages(prev => [...prev, messageToAdd]);
    setTicket(prev => prev ? {...prev, updatedAt: new Date().toISOString()} : undefined);
  };


  return (
    <div className="flex flex-col h-full">
       <div className="flex-shrink-0">
         <Button variant="ghost" asChild>
            <Link href="/inbox">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Inbox
            </Link>
        </Button>
       </div>
       <div className="flex-shrink-0 py-4">
            <div className="flex justify-between items-start">
                <div>
                <h1 className="text-2xl font-bold tracking-tight">{ticket.vehicle.year} {ticket.vehicle.make} {ticket.vehicle.model} - {ticket.parts.join(', ')}</h1>
                <p className="text-sm text-muted-foreground">
                    Ticket ID: {ticket.id}
                </p>
                </div>
                <div className="flex items-center gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline">{ticket.status}</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem>New</DropdownMenuItem>
                            <DropdownMenuItem>In review</DropdownMenuItem>
                            <DropdownMenuItem>Waiting info</DropdownMenuItem>
                            <DropdownMenuItem>Quoted</DropdownMenuItem>
                            <DropdownMenuItem>Closed</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Button variant="outline">Assign</Button>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem disabled>Merge</DropdownMenuItem>
                            <DropdownMenuItem disabled>Duplicate</DropdownMenuItem>
                            <DropdownMenuItem disabled className="text-destructive">Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
       </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 overflow-hidden">
        {/* Left Column: Conversation */}
        <div className="lg:col-span-2 flex flex-col h-full">
           <Card className="flex-1 flex flex-col">
                <CardHeader>
                    <CardTitle>Conversation</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 overflow-y-auto space-y-4">
                    {ticketMessages.map(message => (
                        <div key={message.id} className={`flex gap-3 ${message.direction === 'outbound' ? 'flex-row-reverse' : ''}`}>
                            <Avatar className="h-9 w-9">
                                {message.direction === 'outbound' && userAvatar && <AvatarImage src={userAvatar.imageUrl} alt="Staff" data-ai-hint="person face" />}
                                {message.direction === 'inbound' && customerAvatar && <AvatarImage src={customerAvatar.imageUrl} alt="Customer" data-ai-hint="person face" />}
                                <AvatarFallback>{message.senderName.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className={`flex-1 space-y-1 ${message.direction === 'outbound' ? 'text-right' : ''}`}>
                                <div className={`flex items-center gap-2 ${message.direction === 'outbound' ? 'flex-row-reverse' : ''}`}>
                                    <p className="font-medium">{message.senderName}</p>
                                    <p className="text-xs text-muted-foreground">{new Date(message.createdAt).toLocaleString()}</p>
                                </div>
                                <div className={`p-3 rounded-lg ${message.direction === 'inbound' ? 'bg-muted' : 'bg-primary text-primary-foreground'}`}>
                                    <p className="text-sm whitespace-pre-wrap">{message.body}</p>
                                    {message.media && message.media.length > 0 && (
                                        <div className={`mt-2 flex gap-2 ${message.direction === 'outbound' ? 'justify-end' : ''}`}>
                                            {message.media.map((url, index) => (
                                                <img key={index} src={url} alt="media attachment" className="max-w-[150px] rounded-md" />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>

        {/* Right Column: Metadata */}
        <div className="lg:col-span-1 overflow-y-auto">
          <Tabs defaultValue="summary" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="summary">Summary</TabsTrigger>
              <TabsTrigger value="customer">Customer</TabsTrigger>
              <TabsTrigger value="vehicle">Vehicle</TabsTrigger>
              <TabsTrigger value="parts">Parts</TabsTrigger>
            </TabsList>
            <TabsContent value="summary">
              <Card>
                <CardHeader><CardTitle>Ticket Summary</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Priority</span>
                    <Badge variant={ticket.priority === 'High' || ticket.priority === 'Urgent' ? 'destructive' : ticket.priority === 'Medium' ? 'secondary' : 'outline'}>{ticket.priority}</Badge>
                  </div>
                   <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Channel</span>
                    <div className="flex items-center gap-2">
                        {channelIcons[ticket.channel]}
                        <span>{ticket.channel}</span>
                    </div>
                  </div>
                   <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Assigned To</span>
                     <span>{ticket.assignedToUserId || 'Unassigned'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">SLA</span>
                    <div className="flex items-center gap-2"><Clock className="w-4 h-4"/> 4 hours left</div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="customer">
              <Card>
                <CardHeader>
                  <CardTitle>Customer Details</CardTitle>
                </CardHeader>
                {customer && (
                    <CardContent className="space-y-2">
                        <div className="flex items-center gap-3">
                            <Avatar className="h-12 w-12">
                                {customerAvatar && <AvatarImage src={customerAvatar.imageUrl} alt={customer.name} data-ai-hint="person face" />}
                                <AvatarFallback>{customer.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                             <div>
                                <p className="font-semibold">{customer.name}</p>
                                <Link href={`/customers/${customer.id}`} className="text-sm text-primary hover:underline">View Profile</Link>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 pt-2">
                            <Mail className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm">{customer.email || 'No email'}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Phone className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm">{customer.phone}</span>
                        </div>
                    </CardContent>
                )}
              </Card>
            </TabsContent>
            <TabsContent value="vehicle">
              <Card>
                <CardHeader><CardTitle>Vehicle Information</CardTitle></CardHeader>
                <CardContent>
                    <Table>
                        <TableBody>
                            <TableRow><TableCell className="font-medium">Make</TableCell><TableCell>{ticket.vehicle.make}</TableCell></TableRow>
                            <TableRow><TableCell className="font-medium">Model</TableCell><TableCell>{ticket.vehicle.model}</TableCell></TableRow>
                            <TableRow><TableCell className="font-medium">Year</TableCell><TableCell>{ticket.vehicle.year}</TableCell></TableRow>
                            <TableRow><TableCell className="font-medium">Plate</TableCell><TableCell>{ticket.vehicle.plate}</TableCell></TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="parts">
              <Card>
                <CardHeader><CardTitle>Requested Parts</CardTitle></CardHeader>
                <CardContent>
                    <ul className="list-disc list-inside space-y-2">
                        {ticket.parts.map(part => <li key={part}>{part}</li>)}
                    </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
       <ReplyComposer ticket={ticket} customer={customer} onSendMessage={handleSendMessage} />
    </div>
  )
}
