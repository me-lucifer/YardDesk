
"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { tickets as initialTickets, messages as initialMessages, customers as initialCustomers, Ticket, Message, Customer } from '@/lib/store';

interface AppState {
  tickets: Ticket[];
  messages: Message[];
  customers: Customer[];
  addTicket: (ticket: Ticket) => void;
  updateTicket: (ticketId: string, updates: Partial<Ticket>) => void;
  addMessage: (message: Message) => void;
  addCustomer: (customer: Customer) => void;
}

const AppStateContext = createContext<AppState | undefined>(undefined);

export const AppStateProvider = ({ children }: { children: ReactNode }) => {
  const [tickets, setTickets] = useState<Ticket[]>(initialTickets);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);

  const addTicket = (ticket: Ticket) => {
    setTickets(prev => [ticket, ...prev]);
  };

  const updateTicket = (ticketId: string, updates: Partial<Ticket>) => {
    setTickets(prev => prev.map(t => (t.id === ticketId ? { ...t, ...updates } : t)));
  };

  const addMessage = (message: Message) => {
    setMessages(prev => [...prev, message]);
  };

  const addCustomer = (customer: Customer) => {
    setCustomers(prev => {
        const exists = prev.some(c => c.id === customer.id || c.phone === customer.phone);
        if (exists) return prev;
        return [...prev, customer];
    })
  }

  return (
    <AppStateContext.Provider value={{ tickets, messages, customers, addTicket, updateTicket, addMessage, addCustomer }}>
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (context === undefined) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return context;
};
