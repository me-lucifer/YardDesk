
export type TicketStatus = 'New' | 'In review' | 'Waiting info' | 'Quoted' | 'Closed';
export type Channel = 'Phone' | 'SMS' | 'WhatsApp' | 'Email';
export type Priority = 'Low' | 'Medium' | 'High' | 'Urgent';

export interface Ticket {
  id: string;
  status: TicketStatus;
  channel: Channel;
  createdAt: string;
  updatedAt: string;
  customerId: string;
  vehicle: {
    make: string;
    model: string;
    year: number;
    plate: string;
  };
  parts: string[];
  assignedToUserId: string | null;
  priority: Priority;
  slaDueAt: string;
  lastMessagePreview: string;
}

export interface Message {
    id: string;
    ticketId: string;
    direction: 'inbound' | 'outbound';
    channel: Channel;
    body: string;
    media: string[];
    createdAt: string;
    senderName: string;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  notes?: string;
  optOut: boolean;
  vehicles: {
    make: string;
    model: string;
    year: number;
    plate: string;
  }[];
  previousTicketIds: string[];
}

export interface Template {
  id: string;
  name: string;
  body: string;
  variables: string[];
  tags: string[];
}

export const customers: Customer[] = [
    { id: 'CUST-001', name: 'Alice Johnson', phone: '+447912345678', email: 'alice.j@example.com', optOut: false, vehicles: [{ make: 'Ford', model: 'Focus', year: 2018, plate: 'AB18 CDE' }], previousTicketIds: ['TKT-001', 'TKT-005'] },
    { id: 'CUST-002', name: 'Bob Williams', phone: '+447823456789', email: 'b.williams@example.com', optOut: false, vehicles: [{ make: 'Vauxhall', model: 'Corsa', year: 2020, plate: 'FG20 HJK' }], previousTicketIds: ['TKT-002'] },
    { id: 'CUST-003', name: 'Charlie Davis', phone: '+447734567890', optOut: false, vehicles: [{ make: 'BMW', model: '3 Series', year: 2019, plate: 'LM19 NOP' }], previousTicketIds: ['TKT-003'] },
    { id: 'CUST-004', name: 'David Smith', phone: '+447945678901', email: 'd.smith@example.com', optOut: true, vehicles: [{ make: 'Audi', model: 'A3', year: 2021, plate: 'QR21 STU' }], previousTicketIds: ['TKT-004', 'TKT-011'] },
    { id: 'CUST-005', name: 'Eve Brown', phone: '+447856789012', optOut: false, vehicles: [{ make: 'Mercedes-Benz', model: 'A-Class', year: 2017, plate: 'VW17 XYZ' }], previousTicketIds: ['TKT-006'] },
    { id: 'CUST-006', name: 'Frank Green', phone: '+447767890123', email: 'frank.g@example.com', optOut: false, vehicles: [{ make: 'Volkswagen', model: 'Golf', year: 2016, plate: 'BC16 DEF' }], previousTicketIds: ['TKT-007'] },
    { id: 'CUST-007', name: 'Grace Taylor', phone: '+447978901234', optOut: false, vehicles: [{ make: 'Toyota', model: 'Yaris', year: 2022, plate: 'GH22 IJK' }], previousTicketIds: ['TKT-008', 'TKT-012'] },
    { id: 'CUST-008', name: 'Harry Wilson', phone: '+447889012345', email: 'h.wilson@example.co.uk', optOut: false, vehicles: [{ make: 'Nissan', model: 'Qashqai', year: 2019, plate: 'MN19 PQR' }], previousTicketIds: ['TKT-009'] },
    { id: 'CUST-009', name: 'Ivy Evans', phone: '+447790123456', optOut: false, vehicles: [{ make: 'Hyundai', model: 'i10', year: 2020, plate: 'ST20 UVW' }], previousTicketIds: ['TKT-010'] },
];

export const tickets: Ticket[] = [
    { id: 'TKT-001', status: 'New', channel: 'Email', createdAt: '2024-07-28T10:00:00Z', updatedAt: '2024-07-28T10:00:00Z', customerId: 'CUST-001', vehicle: { make: 'Ford', model: 'Focus', year: 2018, plate: 'AB18 CDE' }, parts: ['alternator'], assignedToUserId: null, priority: 'Medium', slaDueAt: '2024-07-29T10:00:00Z', lastMessagePreview: 'Hi, I need an alternator for my Ford Focus...' },
    { id: 'TKT-002', status: 'In review', channel: 'SMS', createdAt: '2024-07-28T11:30:00Z', updatedAt: '2024-07-28T11:35:00Z', customerId: 'CUST-002', vehicle: { make: 'Vauxhall', model: 'Corsa', year: 2020, plate: 'FG20 HJK' }, parts: ['front bumper', 'left headlight'], assignedToUserId: 'USER-001', priority: 'High', slaDueAt: '2024-07-28T15:30:00Z', lastMessagePreview: 'Need a front bumper and left headlight for a Corsa.' },
    { id: 'TKT-003', status: 'Waiting info', channel: 'WhatsApp', createdAt: '2024-07-27T14:00:00Z', updatedAt: '2024-07-27T16:00:00Z', customerId: 'CUST-003', vehicle: { make: 'BMW', model: '3 Series', year: 2019, plate: 'LM19 NOP' }, parts: ['radiator'], assignedToUserId: 'USER-002', priority: 'Medium', slaDueAt: '2024-07-28T14:00:00Z', lastMessagePreview: 'Can you send a picture of the connector?' },
    { id: 'TKT-004', status: 'Quoted', channel: 'Email', createdAt: '2024-07-27T09:00:00Z', updatedAt: '2024-07-27T10:30:00Z', customerId: 'CUST-004', vehicle: { make: 'Audi', model: 'A3', year: 2021, plate: 'QR21 STU' }, parts: ['right wing mirror'], assignedToUserId: 'USER-001', priority: 'Low', slaDueAt: '2024-07-29T09:00:00Z', lastMessagePreview: 'The price for the wing mirror is £120 + VAT.' },
    { id: 'TKT-005', status: 'Closed', channel: 'Phone', createdAt: '2024-07-26T15:00:00Z', updatedAt: '2024-07-27T11:00:00Z', customerId: 'CUST-001', vehicle: { make: 'Ford', model: 'Focus', year: 2018, plate: 'AB18 CDE' }, parts: ['oil filter'], assignedToUserId: 'USER-002', priority: 'Low', slaDueAt: '2024-07-28T15:00:00Z', lastMessagePreview: 'Sold. Customer collected.' },
    { id: 'TKT-006', status: 'New', channel: 'SMS', createdAt: '2024-07-28T12:00:00Z', updatedAt: '2024-07-28T12:00:00Z', customerId: 'CUST-005', vehicle: { make: 'Mercedes-Benz', model: 'A-Class', year: 2017, plate: 'VW17 XYZ' }, parts: ['brake pads', 'brake discs'], assignedToUserId: null, priority: 'High', slaDueAt: '2024-07-28T16:00:00Z', lastMessagePreview: 'URGENT: Need front brake pads and discs for A-Class.' },
    { id: 'TKT-007', status: 'In review', channel: 'WhatsApp', createdAt: '2024-07-28T09:30:00Z', updatedAt: '2024-07-28T09:45:00Z', customerId: 'CUST-006', vehicle: { make: 'Volkswagen', model: 'Golf', year: 2016, plate: 'BC16 DEF' }, parts: ['exhaust system'], assignedToUserId: 'USER-001', priority: 'Medium', slaDueAt: '2024-07-29T09:30:00Z', lastMessagePreview: 'Looking for a full cat-back exhaust for a 2016 Golf.' },
    { id: 'TKT-008', status: 'New', channel: 'Email', createdAt: '2024-07-28T13:00:00Z', updatedAt: '2024-07-28T13:00:00Z', customerId: 'CUST-007', vehicle: { make: 'Toyota', model: 'Yaris', year: 2022, plate: 'GH22 IJK' }, parts: ['catalytic converter'], assignedToUserId: null, priority: 'Urgent', slaDueAt: '2024-07-28T17:00:00Z', lastMessagePreview: 'My catalytic converter was stolen. Do you have one for a 22 plate Yaris?' },
    { id: 'TKT-009', status: 'Waiting info', channel: 'Phone', createdAt: '2024-07-27T18:00:00Z', updatedAt: '2024-07-28T09:00:00Z', customerId: 'CUST-008', vehicle: { make: 'Nissan', model: 'Qashqai', year: 2019, plate: 'MN19 PQR' }, parts: ['starter motor'], assignedToUserId: 'USER-002', priority: 'Medium', slaDueAt: '2024-07-28T18:00:00Z', lastMessagePreview: 'Left voicemail. Need to know if it\'s a petrol or diesel.' },
    { id: 'TKT-010', status: 'Quoted', channel: 'SMS', createdAt: '2024-07-28T08:00:00Z', updatedAt: '2024-07-28T08:15:00Z', customerId: 'CUST-009', vehicle: { make: 'Hyundai', model: 'i10', year: 2020, plate: 'ST20 UVW' }, parts: ['windscreen'], assignedToUserId: 'USER-001', priority: 'High', slaDueAt: '2024-07-28T12:00:00Z', lastMessagePreview: 'Quote sent: £250 fitted.' },
    { id: 'TKT-011', status: 'Closed', channel: 'WhatsApp', createdAt: '2024-07-25T11:00:00Z', updatedAt: '2024-07-26T14:00:00Z', customerId: 'CUST-004', vehicle: { make: 'Audi', model: 'A3', year: 2021, plate: 'QR21 STU' }, parts: ['alloy wheel'], assignedToUserId: 'USER-001', priority: 'Medium', slaDueAt: '2024-07-26T11:00:00Z', lastMessagePreview: 'Customer happy with the wheel. All done.' },
    { id: 'TKT-012', status: 'New', channel: 'Email', createdAt: '2024-07-28T14:00:00Z', updatedAt: '2024-07-28T14:00:00Z', customerId: 'CUST-007', vehicle: { make: 'Toyota', model: 'Yaris', year: 2022, plate: 'GH22 IJK' }, parts: ['rear light cluster'], assignedToUserId: null, priority: 'Low', slaDueAt: '2024-07-30T14:00:00Z', lastMessagePreview: 'Hi, following up on my other request, do you also have a rear light cluster?' },
];

export const messages: Message[] = [
    { id: 'MSG-001', ticketId: 'TKT-001', direction: 'inbound', channel: 'Email', body: 'Hi, I need an alternator for my Ford Focus, license plate AB18 CDE. Can you give me a price and availability?', media: [], createdAt: '2024-07-28T10:00:00Z', senderName: 'Alice Johnson' },
    { id: 'MSG-002', ticketId: 'TKT-002', direction: 'inbound', channel: 'SMS', body: 'Need a front bumper and left headlight for a Corsa, FG20 HJK', media: [], createdAt: '2024-07-28T11:30:00Z', senderName: 'Bob Williams' },
    { id: 'MSG-003', ticketId: 'TKT-002', direction: 'outbound', channel: 'SMS', body: 'Hi Bob, we have those in stock. The bumper is £150 and the headlight is £90. We can have them ready for collection tomorrow.', media: [], createdAt: '2024-07-28T11:35:00Z', senderName: 'YardDesk' },
    { id: 'MSG-004', ticketId: 'TKT-003', direction: 'inbound', channel: 'WhatsApp', body: 'Got a 2019 BMW 3 series, plate LM19 NOP. Need a radiator.', media: ['https://picsum.photos/seed/part1/600/400'], createdAt: '2024-07-27T14:00:00Z', senderName: 'Charlie Davis' },
    { id: 'MSG-005', ticketId: 'TKT-003', direction: 'outbound', channel: 'WhatsApp', body: 'Hi Charlie, thanks for the picture. Can you send a picture of the connector on the radiator please? Just want to make sure we get you the right one.', media: [], createdAt: '2024-07-27T16:00:00Z', senderName: 'YardDesk' },
];

export const templates: Template[] = [
    { id: 'TMPL-001', name: 'Part Not in Stock', body: 'Hi {{customerName}}, unfortunately we do not have the {{partName}} for your {{vehicleMake}} {{vehicleModel}} in stock at the moment.', variables: ['customerName', 'partName', 'vehicleMake', 'vehicleModel'], tags: ['stock', 'response'] },
    { id: 'TMPL-002', name: 'Quote for Part', body: 'Hi {{customerName}}, the price for the {{partName}} for your {{vehicleMake}} {{vehicleModel}} is £{{price}}. This is for a used part in good condition.', variables: ['customerName', 'partName', 'vehicleMake', 'vehicleModel', 'price'], tags: ['quote'] },
    { id: 'TMPL-003', name: 'Request for More Info (VIN)', body: 'Hi {{customerName}}, to make sure we get the exact right part for your {{vehicleMake}} {{vehicleModel}}, could you please provide the VIN?', variables: ['customerName', 'vehicleMake', 'vehicleModel'], tags: ['info', 'request'] },
];

const topPartsData = tickets.flatMap(t => t.parts).reduce((acc, part) => {
    const existing = acc.find(p => p.part === part);
    if (existing) {
        existing.count++;
    } else {
        acc.push({ part, count: 1 });
    }
    return acc;
}, [] as { part: string; count: number }[]).sort((a, b) => b.count - a.count);


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
    topParts: topPartsData,
    responseTimeDistribution: [
        { bucket: '<15m', count: 12 },
        { bucket: '15-30m', count: 25 },
        { bucket: '30-60m', count: 18 },
        { bucket: '1-2h', count: 8 },
        { bucket: '2-4h', count: 5 },
        { bucket: '>4h', count: 2 },
    ],
    satisfactionData: [
        { name: '5 Stars', value: 400, fill: 'var(--color-emerald)' },
        { name: '4 Stars', value: 300, fill: 'var(--color-teal)' },
        { name: '3 Stars', value: 100, fill: 'var(--color-amber)' },
        { name: '2 Stars', value: 50, fill: 'var(--color-orange)' },
        { name: '1 Star', value: 20, fill: 'var(--color-red)' },
    ]
};
