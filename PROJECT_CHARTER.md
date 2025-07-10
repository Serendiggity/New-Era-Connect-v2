# Project Charter: New Era Connect

## 1. Vision & Mission

**Vision:** To become the industry-standard tool for seamlessly converting in-person event interactions into actionable, personalized sales opportunities.

**Mission:** To build a beautiful, intelligent, and fast application that eliminates the manual data entry and follow-up friction for business development professionals, allowing them to focus on building relationships.

## 2. Core Problem

Salespeople and business development representatives attend conferences and collect dozens of business cards. The process of manually transcribing these cards, organizing the contacts, and writing personalized follow-up emails is tedious, time-consuming, and error-prone. This friction leads to missed opportunities.

## 3. Target Audience

*   Sales Representatives
*   Business Development Managers
*   Startup Founders
*   Realtors & Consultants
*   Anyone who relies on networking events for lead generation.

## 4. Key Features (User Stories)

The application achieves its mission through the following core features:

*   **Event Management:** Users can create "Events" to act as folders for contacts from a specific conference or meeting.
*   **AI-Powered Scanning:** Users can upload a photo of a business card, and the app uses OCR and AI to automatically extract contact information and create a new contact record.
*   **Natural Language Search:** Users can search their contacts using plain English queries (e.g., "contacts from the tech industry in New York") instead of simple keyword matching.
*   **Lead Organization:** Users can view all contacts and group them into "Lead Groups" for targeted follow-up (e.g., "Hot Leads," "Follow Up in 1 Week").
*   **Automated Email Drafting:** Users can connect their Gmail account, select a Lead Group, and use AI to generate personalized email drafts for every contact in that group.

## 5. Technology Stack

*   **Frontend:** React, Vite, TypeScript, TanStack Query, Shadcn/ui, Tailwind CSS
*   **Backend:** Node.js, Express.js, TypeScript
*   **Database:** Postgres with Drizzle ORM
*   **Authentication:** Clerk
*   **External Services:** OpenAI (for AI extraction), Google Cloud (for Gmail API)

## 6. Success Metrics

The project is successful if it achieves the following:
*   **Functionality:** All user stories are fully implemented and bug-free.
*   **User Experience:** The application is fast, intuitive, and requires minimal training to use.
*   **Efficiency Gain:** The time from receiving a business card to sending a personalized follow-up is reduced by at least 90%. 