export type Ticket = {
  id: string;
  customer: {
    name: string;
    email: string;
  };
  subject: string;
  status: 'Open' | 'In Progress' | 'Closed';
  lastUpdated: string;
  priority: 'Low' | 'Medium' | 'High';
  body: string;
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  joined: string;
  avatar: string;
};

export type Template = {
  id: string;
  name: string;
  category: string;
  lastUpdated: string;
};

export const tickets: Ticket[] = [
  {
    id: 'TKT-001',
    customer: { name: 'Alice Johnson', email: 'alice@example.com' },
    subject: 'Inquiry about 2015 Honda Civic alternator',
    status: 'Open',
    lastUpdated: '2023-10-26',
    priority: 'High',
    body: 'Hello, I am looking for a used alternator for a 2015 Honda Civic. Can you let me know if you have one in stock and the price? Thank you.'
  },
  {
    id: 'TKT-002',
    customer: { name: 'Bob Smith', email: 'bob@example.com' },
    subject: 'Headlight for a 2018 Toyota Camry',
    status: 'In Progress',
    lastUpdated: '2023-10-25',
    priority: 'Medium',
    body: 'Looking for a passenger side headlight assembly.'
  },
  {
    id: 'TKT-003',
    customer: { name: 'Charlie Brown', email: 'charlie@example.com' },
    subject: 'Price check on Ford F-150 transmission',
    status: 'Closed',
    lastUpdated: '2023-10-24',
    priority: 'Medium',
    body: 'I was quoted $800, is that correct?'
  },
  {
    id: 'TKT-004',
    customer: { name: 'Diana Prince', email: 'diana@example.com' },
    subject: 'Selling a 2005 Chevrolet Malibu',
    status: 'Open',
    lastUpdated: '2023-10-26',
    priority: 'Low',
    body: 'What is the process for selling a junk car to you?'
  },
];

export const customers: Customer[] = [
  { id: 'CUST-001', name: 'Alice Johnson', email: 'alice@example.com', phone: '123-456-7890', company: 'Self', joined: '2022-01-15', avatar: 'https://picsum.photos/seed/cust1/64/64' },
  { id: 'CUST-002', name: 'Bob Smith', email: 'bob@example.com', phone: '234-567-8901', company: 'Bob\'s Auto Repair', joined: '2021-11-30', avatar: 'https://picsum.photos/seed/cust2/64/64' },
  { id: 'CUST-003', name: 'Charlie Brown', email: 'charlie@example.com', phone: '345-678-9012', company: 'Good Grief Garage', joined: '2023-03-20', avatar: 'https://picsum.photos/seed/cust3/64/64' },
  { id: 'CUST-004', name: 'Diana Prince', email: 'diana@example.com', phone: '456-789-0123', company: 'Themyscira Motors', joined: '2023-08-01', avatar: 'https://picsum.photos/seed/cust4/64/64' },
];

export const templates: Template[] = [
    { id: 'TMPL-001', name: 'Part Not in Stock', category: 'Customer Response', lastUpdated: '2023-09-01' },
    { id: 'TMPL-002', name: 'Quote for Common Part', category: 'Quote', lastUpdated: '2023-09-15' },
    { id: 'TMPL-003', name: 'Vehicle Purchase Offer', category: 'Acquisition', lastUpdated: '2023-10-01' },
    { id: 'TMPL-004', name: 'Follow-up on Inquiry', category: 'Customer Response', lastUpdated: '2023-08-20' },
];

export const analyticsData = {
    ticketsByDay: [
        { date: 'Mon', tickets: 3 },
        { date: 'Tue', tickets: 5 },
        { date: 'Wed', tickets: 8 },
        { date: 'Thu', tickets: 4 },
        { date: 'Fri', tickets: 6 },
        { date: 'Sat', tickets: 2 },
        { date: 'Sun', tickets: 1 },
    ],
    revenueByMonth: [
        { month: 'Jan', revenue: 4000 },
        { month: 'Feb', revenue: 3000 },
        { month: 'Mar', revenue: 5000 },
        { month: 'Apr', revenue: 4500 },
        { month: 'May', revenue: 6000 },
        { month: 'Jun', revenue: 5500 },
    ],
    satisfactionData: [
        { name: '5 Stars', value: 400, fill: 'var(--color-emerald)' },
        { name: '4 Stars', value: 300, fill: 'var(--color-teal)' },
        { name: '3 Stars', value: 100, fill: 'var(--color-amber)' },
        { name: '2 Stars', value: 50, fill: 'var(--color-orange)' },
        { name: '1 Star', value: 20, fill: 'var(--color-red)' },
    ]
};
