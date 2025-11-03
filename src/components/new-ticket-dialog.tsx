
"use client"

import React, { useImperativeHandle, useState } from 'react';
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
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { PlusCircle } from "lucide-react"

export const NewTicketDialog = React.forwardRef((props, ref) => {
    const [open, setOpen] = useState(false);

    useImperativeHandle(ref, () => ({
        trigger: () => {
            setOpen(true);
        }
    }));

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2" />
          New Ticket (⌘+N)
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Ticket</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new support ticket.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="customer-name" className="text-right">
              Customer
            </Label>
            <Input id="customer-name" placeholder="Customer name or email" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="subject" className="text-right">
              Subject
            </Label>
            <Input id="subject" placeholder="Ticket subject" className="col-span-3" />
          </div>
           <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="description" className="text-right pt-2">
              Description
            </Label>
            <Textarea id="description" placeholder="Describe the issue..." className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Create Ticket</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
})

NewTicketDialog.displayName = 'NewTicketDialog'
