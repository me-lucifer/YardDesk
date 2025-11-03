

"use client"

import { tickets as initialTickets, customers, messages as initialMessages, Message, Ticket, Customer, users, User } from "@/lib/store"
import { notFound, useRouter } from "next/navigation"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, MoreVertical, MessageSquare, Phone, Mail, Clock, PlusCircle, X, FilePlus, UserCheck, Tag, Info, Bot } from "lucide-react"
import Link from "next/link"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
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
import { ReplyComposer, ReplyComposerRef } from "@/components/reply-composer"
import React from "react"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { useAppState } from "@/lib/context/app-state-provider"
import { toast } from "sonner"
import { Skeleton } from "@/components/ui/skeleton"

const channelIcons: { [key: string]: React.ReactNode } = {
  SMS: <MessageSquare className="h-4 w-4 text-muted-foreground" />,
  WhatsApp: <MessageSquare className="h-4 w-4 text-muted-foreground" />,
  Phone: <Phone className="h-4 w-4 text-muted-foreground" />,
  Email: <Mail className="h-4 w-4 text-muted-foreground" />,
}

const commonParts = [
    "Alternator", "Starter Motor", "Radiator", "Front Bumper",
    "Headlight", "Wing Mirror", "Alloy Wheel", "Brake Pads", "Catalytic Converter"
];

const timelineEventIcons: { [key: string]: React.ReactNode } = {
    'created': <FilePlus className="h-4 w-4" />,
    'assigned': <UserCheck className="h-4 w-4" />,
    'status': <Tag className="h-4 w-4" />,
    'message_in': <MessageSquare className="h-4 w-4" />,
    'message_out': <MessageSquare className="h-4 w-4" />,
    'info': <Info className="h-4 w-4" />,
};

function MessageSkeleton() {
    return (
        <>
            <div className="flex gap-3">
                 <Skeleton className="h-9 w-9 rounded-full" />
                 <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-[150px]" />
                    <Skeleton className="h-12 w-full" />
                 </div>
            </div>
             <div className="flex flex-row-reverse gap-3">
                 <Skeleton className="h-9 w-9 rounded-full" />
                 <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-[150px] ml-auto" />
                    <Skeleton className="h-16 w-full" />
                 </div>
            </div>
        </>
    )
}

export default function TicketDetailsPage({ params }: { params: { id: string } }) {
  const { tickets, messages, updateTicket, addMessage, isLoading } = useAppState();

  const ticket = tickets.find((t) => t.id === params.id);
  const ticketMessages = messages.filter(m => m.ticketId === params.id).sort((a,b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

  const [requestedParts, setRequestedParts] = React.useState(ticket?.parts || []);
  const replyComposerRef = React.useRef<ReplyComposerRef>(null);

  React.useEffect(() => {
    if (ticket) {
      setRequestedParts(ticket.parts);
    }
  }, [ticket]);

  if (isLoading) {
       return (
        <div className="flex h-full items-center justify-center">
            <div className="text-center">
                <p className="text-lg font-semibold">Loading ticket...</p>
                <p className="text-muted-foreground">Please wait a moment.</p>
            </div>
        </div>
    );
  }

  if (!ticket) {
    return notFound();
  }
  
  // Mock timeline data
  const timelineEvents = [
    { id: 'EVT-001', type: 'created', timestamp: ticket.createdAt, actor: 'System', details: `Ticket created via ${ticket.channel}` },
    ...ticketMessages.map((msg, i) => ({
      id: `EVT-MSG-${i}`,
      type: msg.direction === 'inbound' ? 'message_in' : 'message_out',
      timestamp: msg.createdAt,
      actor: msg.senderName,
      details: `${msg.direction === 'inbound' ? 'Received' : 'Sent'} message via ${msg.channel}`
    })),
    { id: 'EVT-002', type: 'status', timestamp: '2024-07-28T11:35:00Z', actor: 'John Doe', details: `Status changed to 'In review'` },
    { id: 'EVT-003', type: 'assigned', timestamp: '2024-07-28T11:35:00Z', actor: 'John Doe', details: `Assigned to User One` },
    { id: 'EVT-004', type: 'info', timestamp: '2024-07-28T15:00:00Z', actor: 'System', details: 'SLA warning: 1 hour remaining' },
  ].sort((a,b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());


  const customer = customers.find(c => c.id === ticket.customerId);
  const customerAvatar = PlaceHolderImages.find(p => p.id === 'customer-avatar-1');
  
  const assignedUser = users.find(u => u.id === ticket.assignedToUserId);
  const userAvatar = PlaceHolderImages.find(p => p.id === assignedUser?.avatarUrl);

  const handleSendMessage = (newMessage: Omit<Message, 'id' | 'createdAt' | 'senderName'>) => {
    const messageToAdd: Message = {
        ...newMessage,
        id: `MSG-${Date.now()}`,
        createdAt: new Date().toISOString(),
        senderName: "YardDesk" // Represents the current user/business
    }
    addMessage(messageToAdd);
    updateTicket(ticket.id, { updatedAt: new Date().toISOString(), parts: requestedParts });
    toast.success("Reply sent", {
        description: `Message sent to ${customer?.name} via ${newMessage.channel}.`
    })
  };
  
  const handlePartChange = (index: number, value: string) => {
    const newParts = [...requestedParts];
    newParts[index] = value;
    setRequestedParts(newParts);
  };

  const handleAddPart = (part?: string) => {
    setRequestedParts([...requestedParts, part || ""]);
  };

  const handleRemovePart = (index: number) => {
    setRequestedParts(requestedParts.filter((_, i) => i !== index));
  };


  const handleSendSmsClick = () => {
    replyComposerRef.current?.setChannel('SMS');
    replyComposerRef.current?.focus();
    toast.info("Switched to SMS channel");
  };

  const getCustomerPreviousTickets = (customer: Customer | undefined) => {
    if (!customer) return [];
    return tickets.filter(t => t.customerId === customer.id && t.id !== ticket?.id);
  }

  const handleAssignUser = (userId: string) => {
    updateTicket(ticket.id, { assignedToUserId: userId });
     const user = users.find(u => u.id === userId);
    toast.success("Ticket assigned", {
        description: `Ticket #${ticket.id} assigned to ${user?.name}.`
    })
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
                <h1 className="text-2xl font-bold tracking-tight">{ticket.vehicle.year} {ticket.vehicle.make} {ticket.vehicle.model} - {requestedParts.join(', ')}</h1>
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
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline">{assignedUser ? assignedUser.name : 'Assign'}</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            <DropdownMenuLabel>Assign to</DropdownMenuLabel>
                            <DropdownMenuRadioGroup value={ticket.assignedToUserId || ''} onValueChange={handleAssignUser}>
                                {users.map(user => (
                                    <DropdownMenuRadioItem key={user.id} value={user.id}>{user.name}</DropdownMenuRadioItem>
                                ))}
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
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
                    {isLoading ? <MessageSkeleton /> : ticketMessages.length > 0 ? (
                        ticketMessages.map(message => (
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
                        ))
                    ) : (
                        <div className="text-center py-12 text-muted-foreground">
                            <Bot className="mx-auto h-12 w-12" />
                            <h3 className="mt-4 text-lg font-semibold">No Messages Yet</h3>
                            <p className="mt-1 text-sm">Start the conversation by sending a message or using a template.</p>
                             <Button variant="outline" className="mt-4" onClick={() => replyComposerRef.current?.focus()}>
                                <MessageSquare className="mr-2 h-4 w-4" /> Send Message
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>

        {/* Right Column: Metadata */}
        <div className="lg:col-span-1 overflow-y-auto">
          <Tabs defaultValue="customer" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="summary">Summary</TabsTrigger>
              <TabsTrigger value="customer">Customer</TabsTrigger>
              <TabsTrigger value="vehicle">Vehicle</TabsTrigger>
              <TabsTrigger value="parts">Parts</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
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
                     <span>{assignedUser?.name || 'Unassigned'}</span>
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
                <CardHeader className="flex flex-row justify-between items-center">
                  <CardTitle>Customer Details</CardTitle>
                  <Button variant="outline" size="sm" onClick={handleSendSmsClick}>
                    <MessageSquare className="mr-2 h-4 w-4" /> Send SMS
                  </Button>
                </CardHeader>
                {customer && (
                    <CardContent className="space-y-4">
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
                        <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-3">
                                <Mail className="w-4 h-4 text-muted-foreground" />
                                <span>{customer.email || 'No email'}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone className="w-4 h-4 text-muted-foreground" />
                                <span>{customer.phone}</span>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="customer-notes">Notes</Label>
                            <Textarea id="customer-notes" defaultValue={customer.notes} placeholder="Add notes about this customer..." />
                        </div>
                        <div className="flex items-center justify-between rounded-lg border p-3">
                            <div className="space-y-0.5">
                                <Label>Opted-out of marketing</Label>
                            </div>
                            <Switch defaultChecked={customer.optOut} />
                        </div>
                        <div>
                            <h4 className="font-medium text-sm mb-2">Previous Tickets</h4>
                            <div className="space-y-2">
                                {getCustomerPreviousTickets(customer).length > 0 ? (
                                    getCustomerPreviousTickets(customer).map(prevTicket => (
                                        <Link key={prevTicket.id} href={`/ticket/${prevTicket.id}`} className="block">
                                            <div className="flex justify-between items-center p-2 rounded-md hover:bg-muted">
                                                <div className="truncate">
                                                    <span className="text-sm font-medium">{prevTicket.parts.join(', ')}</span>
                                                    <p className="text-xs text-muted-foreground">#{prevTicket.id}</p>
                                                </div>
                                                <Badge variant={prevTicket.status === 'New' ? 'default' : prevTicket.status === 'In review' ? 'secondary' : 'outline'}
                                                  className={cn(
                                                    prevTicket.status === 'New' && "bg-emerald-500/20 text-emerald-500 border-emerald-500/20",
                                                    prevTicket.status === 'In review' && "bg-blue-500/20 text-blue-500 border-blue-500/20",
                                                    prevTicket.status === "Breaching SLA" && "bg-destructive/20 text-destructive border-destructive/20",
                                                    "dark:text-white"
                                                  )}
                                                >
                                                  {prevTicket.status}
                                                </Badge>
                                            </div>
                                        </Link>
                                    ))
                                ) : (
                                    <p className="text-xs text-muted-foreground text-center py-4">No previous tickets for this customer.</p>
                                )}
                            </div>
                        </div>
                    </CardContent>
                )}
              </Card>
            </TabsContent>
            <TabsContent value="vehicle">
              <Card>
                <CardHeader><CardTitle>Vehicle Information</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                    <Table>
                        <TableBody>
                            <TableRow><TableCell className="font-medium">Make</TableCell><TableCell>{ticket.vehicle.make}</TableCell></TableRow>
                            <TableRow><TableCell className="font-medium">Model</TableCell><TableCell>{ticket.vehicle.model}</TableCell></TableRow>
                            <TableRow><TableCell className="font-medium">Year</TableCell><TableCell>{ticket.vehicle.year}</TableCell></TableRow>
                            <TableRow><TableCell className="font-medium">Plate</TableCell><TableCell>{ticket.vehicle.plate}</TableCell></TableRow>
                        </TableBody>
                    </Table>
                    <div className="space-y-2">
                        <Label htmlFor="vin">VIN</Label>
                        <Input id="vin" placeholder="Enter VIN..." />
                        <p className="text-xs text-muted-foreground">The VIN can be decoded later to confirm vehicle details.</p>
                    </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="parts">
              <Card>
                <CardHeader>
                    <CardTitle>Requested Parts</CardTitle>
                    <CardDescription>Parts requested by the customer.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        {requestedParts.map((part, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <Input 
                                    value={part} 
                                    onChange={(e) => handlePartChange(index, e.target.value)}
                                    className="flex-1"
                                />
                                <Badge variant="secondary">95%</Badge>
                                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleRemovePart(index)}>
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}
                         <Button variant="outline" size="sm" onClick={() => handleAddPart()}>
                            <PlusCircle className="mr-2 h-4 w-4" /> Add Part
                        </Button>
                    </div>
                    <div>
                        <h4 className="text-sm font-medium mb-2 text-muted-foreground">Common Parts</h4>
                        <div className="flex flex-wrap gap-2">
                            {commonParts.map(part => (
                                <button
                                    key={part}
                                    onClick={() => handleAddPart(part)}
                                    className="px-2 py-1 text-xs rounded-full bg-muted text-muted-foreground hover:bg-secondary transition-colors"
                                >
                                    {part}
                                </button>
                            ))}
                        </div>
                    </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="timeline">
                <Card>
                    <CardHeader>
                        <CardTitle>Ticket Timeline</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-6">
                            {timelineEvents.map((event) => (
                                <li key={event.id} className="flex gap-4">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground">
                                        {timelineEventIcons[event.type] || <Info className="h-4 w-4" />}
                                    </div>
                                    <div className="flex-1 space-y-1">
                                        <p className="text-sm font-medium">{event.details}</p>
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                            <span>by {event.actor}</span>
                                            <span>&middot;</span>
                                            <span>{new Date(event.timestamp).toLocaleString()}</span>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
       <ReplyComposer ref={replyComposerRef} ticket={ticket} customer={customer} onSendMessage={handleSendMessage} />
    </div>
  )
}
