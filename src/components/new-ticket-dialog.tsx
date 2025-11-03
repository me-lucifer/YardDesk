
"use client"

import React, { useImperativeHandle, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PlusCircle } from "lucide-react"
import { useAppState } from '@/lib/context/app-state-provider';
import { Ticket, Message, Channel } from '@/lib/store';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { toast } from 'sonner';


export const NewTicketDialog = React.forwardRef((props, ref) => {
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const { addTicket, addMessage, addCustomer } = useAppState();
    
    const [customerName, setCustomerName] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');
    const [plate, setPlate] = useState('');
    const [parts, setParts] = useState('');
    const [channel, setChannel] = useState<Channel>('SMS');

    useImperativeHandle(ref, () => ({
        trigger: () => {
            setOpen(true);
        }
    }));

    const handleCreateTicket = () => {
        const now = new Date().toISOString();
        const newTicketId = `TKT-${Date.now()}`;
        
        // For simplicity, we'll create a new customer or find an existing one by phone
        // In a real app, you'd have more robust customer lookup
        let customerId = `CUST-${customerPhone}`;
        addCustomer({
            id: customerId,
            name: customerName || `Customer ${customerPhone}`,
            phone: customerPhone,
            optOut: false,
            vehicles: [],
            previousTicketIds: []
        })

        const newTicket: Ticket = {
            id: newTicketId,
            status: 'New',
            channel: channel,
            createdAt: now,
            updatedAt: now,
            customerId: customerId,
            vehicle: { make: 'Unknown', model: 'Unknown', year: new Date().getFullYear(), plate: plate },
            parts: parts.split(',').map(p => p.trim()).filter(p => p),
            assignedToUserId: null,
            priority: 'Medium',
            slaDueAt: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(),
            lastMessagePreview: `New ticket created for ${plate}`
        };

        const initialMessage: Message = {
            id: `MSG-${Date.now()}`,
            ticketId: newTicketId,
            direction: 'inbound',
            channel: channel,
            body: `Customer request for ${plate}:\nParts: ${parts}`,
            media: [],
            createdAt: now,
            senderName: customerName || `Customer ${customerPhone}`
        };

        addTicket(newTicket);
        addMessage(initialMessage);

        toast.success("Ticket created", {
            description: `Ticket #${newTicket.id} for ${newTicket.vehicle.plate} has been created.`
        })

        setOpen(false);
        // Reset form
        setCustomerName('');
        setCustomerPhone('');
        setPlate('');
        setParts('');
        setChannel('SMS');

        router.push(`/ticket/${newTicketId}`);
    };


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2" />
          New Ticket (⌘+N)
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Ticket</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new support ticket.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="customer-phone" className="text-right">
              Phone
            </Label>
            <Input id="customer-phone" value={customerPhone} onChange={e => setCustomerPhone(e.target.value)} placeholder="Customer phone number" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="customer-name" className="text-right">
              Name
            </Label>
            <Input id="customer-name" value={customerName} onChange={e => setCustomerName(e.target.value)} placeholder="Customer name (optional)" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="plate" className="text-right">
              Plate
            </Label>
            <Input id="plate" value={plate} onChange={e => setPlate(e.target.value)} placeholder="Vehicle registration plate" className="col-span-3" />
          </div>
           <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="parts" className="text-right">
              Parts
            </Label>
            <Input id="parts" value={parts} onChange={e => setParts(e.target.value)} placeholder="e.g., front bumper, headlight" className="col-span-3" />
          </div>
           <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="channel" className="text-right">
              Channel
            </Label>
            <Select value={channel} onValueChange={(value) => setChannel(value as Channel)}>
                <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a channel" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="SMS">SMS</SelectItem>
                    <SelectItem value="WhatsApp">WhatsApp</SelectItem>
                    <SelectItem value="Email">Email</SelectItem>
                </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" onClick={handleCreateTicket}>Create Ticket</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
})

NewTicketDialog.displayName = 'NewTicketDialog'
