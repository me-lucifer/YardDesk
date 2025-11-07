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
