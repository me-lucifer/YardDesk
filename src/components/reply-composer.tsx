
"use client"

import { useState, useImperativeHandle, forwardRef, useRef } from "react"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  FileText,
  Send,
  Sparkles,
  Eye,
  MessageSquare,
  Mail,
  Phone,
} from "lucide-react"
import { templates, Ticket, Customer, Message, Channel, users } from "@/lib/store"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ScrollArea } from "./ui/scroll-area"
import { Badge } from "./ui/badge"
import React from "react"

interface ReplyComposerProps {
  ticket: Ticket
  customer: Customer | undefined
  onSendMessage: (message: Omit<Message, 'id' | 'createdAt' | 'senderName'>) => void
}

export interface ReplyComposerRef {
    setChannel: (channel: Channel) => void;
    focus: () => void;
}

const channelIcons: { [key: string]: React.ReactNode } = {
  SMS: <MessageSquare className="h-4 w-4" />,
  WhatsApp: <MessageSquare className="h-4 w-4" />,
  Phone: <Phone className="h-4 w-4" />,
  Email: <Mail className="h-4 w-4" />,
}

const quickChips = [
    { label: "Need VIN", text: "To ensure we get the right part, could you please provide the vehicle's VIN?" },
    { label: "Price quote", text: "The price for the {{parts}} is £{{price}} + VAT." },
    { label: "Request photos", text: "Could you please send some photos of the part you need?" },
    { label: "Out of stock—alternatives", text: "Unfortunately, that part is out of stock. We do have alternatives available if you're interested." },
]


export const ReplyComposer = forwardRef<ReplyComposerRef, ReplyComposerProps>(({ ticket, customer, onSendMessage }, ref) => {
  const [message, setMessage] = useState("")
  const [channel, setChannel] = useState<Channel>(ticket.channel)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const currentUser = users[0]; // Assume current user

  useImperativeHandle(ref, () => ({
    setChannel: (newChannel: Channel) => {
        setChannel(newChannel);
    },
    focus: () => {
        textareaRef.current?.focus();
    }
  }));

  const handleTemplateSelect = (templateBody: string) => {
    let newBody = templateBody;
    if (customer) {
        newBody = newBody.replace(/{{customerName}}/g, customer.name);
    }
    newBody = newBody.replace(/{{vehicleMake}}/g, ticket.vehicle.make);
    newBody = newBody.replace(/{{vehicleModel}}/g, ticket.vehicle.model);
    newBody = newBody.replace(/{{plate}}/g, ticket.vehicle.plate);
    newBody = newBody.replace(/{{parts}}/g, ticket.parts.join(', '));
    
    // For variables we don't have data for yet, we leave the placeholder
    // e.g. {{price}} or {{eta}}
    
    setMessage(currentMessage => currentMessage ? `${currentMessage}\n${newBody}` : newBody);
    setIsDrawerOpen(false);
  }

  const handleQuickChipSelect = (chipText: string) => {
    let newText = chipText;
     if (customer) {
        newText = newText.replace(/{{customerName}}/g, customer.name);
    }
    newText = newText.replace(/{{parts}}/g, ticket.parts.join(', '));
    
    setMessage(currentMessage => currentMessage ? `${currentMessage}\n${newText}` : newText);
  }

  const handleSend = () => {
    if (!message.trim()) return

    onSendMessage({
        ticketId: ticket.id,
        direction: 'outbound',
        channel: channel,
        body: message,
        media: [],
        // senderName is added in the parent component
    })
    setMessage("");
  }


  return (
    <div className="flex-shrink-0 mt-auto pt-4 pb-2 bg-background sticky bottom-0">
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen} direction="right">
        <Dialog>
            <div className="border rounded-lg p-2 bg-card">
                <div className="grid gap-2">
                    <Textarea
                        ref={textareaRef}
                        placeholder={`Reply to ${customer?.name || 'customer'}...`}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="border-0 focus-visible:ring-0"
                        rows={4}
                    />
                    <div className="flex items-center justify-between">
                         <div className="flex items-center gap-1 flex-wrap">
                            <DrawerTrigger asChild>
                                <Button variant="ghost" size="sm">
                                    <FileText className="mr-2 h-4 w-4" /> Templates
                                </Button>
                            </DrawerTrigger>
                             <DialogTrigger asChild>
                                <Button variant="ghost" size="sm">
                                    <Eye className="mr-2 h-4 w-4" /> Preview
                                </Button>
                            </DialogTrigger>
                             <Button variant="ghost" size="sm" disabled>
                                <Sparkles className="mr-2 h-4 w-4" /> AI Assist
                            </Button>
                        </div>
                        <div className="flex items-center gap-2">
                            <Select value={channel} onValueChange={(value) => setChannel(value as any)}>
                                <SelectTrigger className="w-[120px]">
                                    <div className="flex items-center gap-2">
                                        {channelIcons[channel]}
                                        <SelectValue />
                                    </div>
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.keys(channelIcons).map(ch => (
                                         <SelectItem key={ch} value={ch}>
                                            <div className="flex items-center gap-2">
                                                {channelIcons[ch]}
                                                <span>{ch}</span>
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Button onClick={handleSend}>
                                <Send className="mr-2" />
                                Reply
                            </Button>
                        </div>
                    </div>
                    <div className="flex gap-2 flex-wrap px-2">
                        {quickChips.map(chip => (
                            <button
                                key={chip.label}
                                onClick={() => handleQuickChipSelect(chip.text)}
                                className="px-2 py-1 text-xs rounded-full bg-muted text-muted-foreground hover:bg-secondary transition-colors"
                            >
                                {chip.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Preview Message</DialogTitle>
                </DialogHeader>
                <div className="prose prose-sm dark:prose-invert rounded-md border p-4 bg-muted max-h-[50vh] overflow-y-auto">
                    <p className="whitespace-pre-wrap">{message}</p>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                        Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>

        <DrawerContent className="h-full max-w-md ml-auto p-4">
          <DrawerHeader>
            <DrawerTitle>Select a Template</DrawerTitle>
          </DrawerHeader>
          <ScrollArea className="flex-1">
            <div className="space-y-4">
              {templates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => handleTemplateSelect(template.body)}
                  className="w-full text-left p-4 rounded-lg border hover:bg-muted transition-colors"
                >
                  <p className="font-semibold">{template.name}</p>
                  <p className="text-sm text-muted-foreground mt-1 truncate">
                    {template.body}
                  </p>
                  <div className="flex gap-2 mt-2">
                    {template.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                  </div>
                </button>
              ))}
            </div>
          </ScrollArea>
        </DrawerContent>
      </Drawer>
    </div>
  )
});
ReplyComposer.displayName = 'ReplyComposer';

    