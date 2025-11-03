````markdown
# YardDesk — Staff/Admin Workflow Prototype (Car Salvage Intake)

A clean, high-fidelity **frontend-only** prototype that demonstrates how staff at a car salvage yard can triage and respond to part requests captured from phone/SMS/WhatsApp. Built for fast demos and iteration; ready to deploy on **Vercel**.

> **Status:** MVP (no backend). All data is local (mock store). Designed to later plug into telephony (Twilio), STT/NLP (Google/Azure/AWS), and messaging (SMS/WhatsApp/Email).

---

## Table of Contents
- [Why this exists](#why-this-exists)
- [Key features](#key-features)
- [Tech stack](#tech-stack)
- [Architecture overview](#architecture-overview)
- [App routes](#app-routes)
- [Data model (mock)](#data-model-mock)
- [Keyboard shortcuts](#keyboard-shortcuts)
- [Getting started (local)](#getting-started-local)
- [Environment variables](#environment-variables)
- [Deployment (Vercel)](#deployment-vercel)
- [Sample demo flow](#sample-demo-flow)
- [What’s in / out of scope](#whats-in--out-of-scope)
- [Roadmap](#roadmap)
- [Security & compliance notes](#security--compliance-notes)
- [Project conventions](#project-conventions)
- [License](#license)

---

## Why this exists
The yard receives ~100 calls/day and misses ~50. The goal is to **deflect calls to automated intake** (collect vehicle registration + requested parts), convert them into **structured tickets**, and let staff **reply quickly** using **pre-written templates** over SMS/WhatsApp/email.

This repo hosts the **Staff/Admin** side prototype to review, triage, reply, and analyze requests.

---

## Key features
- **Inbox queue** with status, SLA badge, channel, assignee, and quick filters.
- **Ticket detail** with threaded conversation, metadata (Customer, Vehicle, Parts, Timeline).
- **Reply composer** with template library, variable substitution, preview before send.
- **Templates page** for managing canned responses and tags.
- **Analytics**: KPIs + charts (tickets/day, top parts, response times) using mock data.
- **Settings**: business profile, messaging defaults, SLAs, retention (display only).
- **Command palette & global search** (tickets/customers/templates).
- **Simulate missed call** to auto-create realistic tickets for demos.
- **Dark mode** and accessible, responsive UI.

---

## Tech stack
- **Framework**: Next.js (React)
- **Styling**: Tailwind CSS
- **UI Kit**: shadcn/ui + lucide-react icons
- **State**: Client store (e.g., Zustand/Context) with seeded mock data
- **Charts**: Recharts
- **Tooling**: TypeScript, ESLint

_No backend; no database. All state lives client-side for demo purposes._

---

## Architecture overview

```mermaid
flowchart LR
  subgraph Client (Browser)
    A[Inbox / Analytics / Settings]
    B[Ticket Detail]
    C[Templates]
    D[Mock Store (tickets, messages, customers, templates)]
  end

  A <--> D
  B <--> D
  C <--> D

  %% Future integrations (not implemented)
  D -. planned API .- E[(Backend API)]
  E -. webhooks .- F[Telephony (Twilio)]
  E -. STT/NLP .- G[Speech-to-Text Provider]
  E -. messaging .- H[SMS/WhatsApp/Email]
````

---

## App routes

* `/inbox` — Queue with filters, saved views, row → ticket navigation
* `/ticket/[id]` — Thread + metadata (Summary, Customer, Vehicle, Parts, Timeline)
* `/templates` — Manage canned responses and tags
* `/analytics` — KPI cards + charts (derived from mock data)
* `/settings` — Business profile, messaging defaults, SLAs, retention (mock)
* `/customers/[id]` — (Optional) lightweight customer detail
* Global UI: left sidebar nav, topbar with search, **New Ticket** modal, user menu

---

## Data model (mock)

**tickets**

* `id`, `status` (`New|In review|Waiting info|Quoted|Closed`)
* `channel` (`Phone|SMS|WhatsApp|Email`)
* `createdAt`, `updatedAt`, `priority`, `slaDueAt`
* `customerId`, `vehicle` `{ plate, vin?, make?, model?, year? }`
* `parts[]` (raw + canonicalized), `assignedToUserId`
* `lastMessagePreview`

**messages**

* `id`, `ticketId`, `direction` (`inbound|outbound`), `channel`
* `body`, `media[]`, `createdAt`, `senderName`

**customers**

* `id`, `name?`, `phone`, `email?`, `optOut` (bool)
* `notes?`, `vehicles[]`, `previousTicketIds[]`

**templates**

* `id`, `name`, `body`, `variables[]` (e.g., `plate, parts, customer_name, price, eta`)
* `tags[]` (e.g., Pricing, Info, Follow-up)

The seed includes ~12 realistic tickets (UK-style plates like `AB12 CDE`), mixed channels, and some long threads for demo.

---

## Keyboard shortcuts

* `/` — Focus global search
* `N` — Open **New Ticket** modal
* `Ctrl/Cmd + K` — Command palette (navigate to pages, create ticket, search)
* `Esc` — Close modals/drawers

---

## Getting started (local)

> Requires Node 18+.

```bash
# clone
git clone https://github.com/<your-org>/<your-repo>.git
cd <your-repo>

# install (choose one)
npm install
# or
yarn
# or
pnpm install

# run dev
npm run dev
# http://localhost:3000
```

Common scripts (adjust to your package.json):

```bash
npm run dev        # start dev server
npm run build      # production build
npm run start      # serve production build
npm run lint       # lint
```

---

## Environment variables

This MVP is frontend-only; all env vars are optional and used for branding/config.

Create `.env.local`:

```bash
NEXT_PUBLIC_APP_NAME=YardDesk
NEXT_PUBLIC_BRAND_ACCENT=emerald
NEXT_PUBLIC_DEMO_MODE=true
NEXT_PUBLIC_ENABLE_DARK_MODE=true
```

You can add more (e.g., flags for charts, seeded data days, etc.) and read via `process.env.NEXT_PUBLIC_*`.

---

## Deployment (Vercel)

1. Push this repo to GitHub.
2. In Vercel:

   * **New Project** → Import GitHub repo
   * Framework: **Next.js**
   * Set Environment Variables (same as `.env.local`)
3. Deploy. Each push to `main` triggers a new deployment.

*No images/screenshots are required. All charts and UI are client-rendered.*

---

## Sample demo flow

1. Open `/inbox`. Use filters (e.g., **New Today**, **Breaching SLA**).
2. Click a ticket row to open `/ticket/[id]`.
3. Review **Summary** and **Parts** tabs; open **Customer** to see history.
4. Click **Templates** in the composer, pick **Price quote**, preview variables (`{{plate}}`, `{{parts}}`, `{{price}}`, `{{eta}}`), then **Send** (appends to thread).
5. Navigate to `/analytics` to show KPIs and charts.
6. Use **Simulate Missed Call** in Inbox header to create a new realistic ticket.

---

## What’s in / out of scope

**Included**

* High-fidelity UI: inbox, ticket, templates, analytics, settings
* Mock store with realistic seed data and flows
* Command palette, global search, dark mode
* Variable substitution preview in composer
* Demo helpers (simulate missed call, saved views)

**Not included (by design)**

* Real telephony, speech-to-text, messaging, or persistence
* Auth, RBAC, and server-side APIs
* Payments, inventory, VIN/plate decoding

---

## Roadmap

* Integrate real backend (REST/GraphQL) and DB (Postgres/Supabase)
* Webhooks for telephony (Twilio) and messaging (SMS/WhatsApp)
* STT/NLP normalization service with confidence prompts
* Role-based access control and audit exports
* SLA policies with server-side timers and notifications
* Inventory lookup and pricing rules
* File uploads (photos of parts) with CDN storage

---

## Security & compliance notes

* Add a consent line in IVR for recordings; provide SMS/WhatsApp opt-out (“STOP”).
* Retention: delete audio/transcripts per policy; minimize PII exposure in logs.
* Tokenize public ticket links; avoid exposing raw phone numbers in URLs.
* Validate regional formats for registrations; store raw + normalized forms.

---

## Project conventions

* TypeScript, strict mode
* Tailwind 8px spacing scale, accessible color contrast
* shadcn/ui components; lucide-react icons
* Recharts for analytics
* Lightweight state (Zustand/Context) with selectors and seed loader
* Linting rules aligned with Next.js defaults

---

## License

This project is published under the **MIT License**. See `LICENSE` file for details.

```

**Tip:** If you later wire a backend, document the API contract (e.g., `/intake`, `/messages/send`, `/tickets/:id`) in a new `docs/api.md` and add a “Configuration” section for Twilio/WhatsApp keys with clear environment variable names.
```
