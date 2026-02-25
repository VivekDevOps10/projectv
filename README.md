# Live OPD Queue & Clinic Visibility System

Production-style Next.js demo app for high-volume OPD clinics to manage live queue, reception workflow, and waiting-room display screens.

## Tech Stack
- Next.js (App Router + TypeScript)
- Tailwind CSS
- Frontend-only state (mock data, no backend)

## Features
- Mock login page
- Doctor dashboard with KPI cards and queue controls
- Reception panel for adding patients and status updates
- Public TV display mode with large typography
- Responsive sidebar navigation and premium clinic-style UI

## Project Structure

```text
.
├── app/
│   ├── dashboard/page.tsx
│   ├── display/page.tsx
│   ├── login/page.tsx
│   ├── reception/page.tsx
│   ├── settings/page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── app-shell.tsx
│   ├── queue-provider.tsx
│   └── sidebar.tsx
├── lib/
│   ├── mockPatients.ts
│   └── types.ts
├── package.json
├── tailwind.config.ts
└── README.md
```

## Local Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start development server:
   ```bash
   npm run dev
   ```
3. Open:
   - http://localhost:3000/login

## Production Build

```bash
npm run build
npm run start
```

## Deploy to Vercel

1. Push code to GitHub.
2. Import repository into Vercel.
3. Framework preset: **Next.js** (auto-detected).
4. Build command: `npm run build` (default).
5. Output: `.next` (auto).
6. Deploy.

No environment variables required for this mock-data demo.
