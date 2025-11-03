
"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { tickets as initialTickets, messages as initialMessages, customers as initialCustomers, templates as initialTemplates, Ticket, Message, Customer, Template } from '@/lib/store';

interface AppState {
  tickets: Ticket[];
  messages: Message[];
  customers: Customer[];
  templates: Template[];
  addTicket: (ticket: Ticket) => void;
  updateTicket: (ticketId: string, updates: Partial<Ticket>) => void;
  addMessage: (message: Message) => void;
  addCustomer: (customer: Customer) => void;
  addTemplate: (template: Template) => void;
  isLoading: boolean;
}

const AppStateContext = createContext<AppState | undefined>(undefined);

export const AppStateProvider = ({ children }: { children: ReactNode }) => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setTickets(initialTickets);
      setMessages(initialMessages);
      setCustomers(initialCustomers);
      setTemplates(initialTemplates);
      setIsLoading(false);
    }, 1000); // 1 second delay

    return () => clearTimeout(timer);
  }, []);

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

  const addTemplate = (template: Template) => {
    setTemplates(prev => [template, ...prev]);
  };

  return (
    <AppStateContext.Provider value={{ tickets, messages, customers, templates, addTicket, updateTicket, addMessage, addCustomer, addTemplate, isLoading }}>
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
