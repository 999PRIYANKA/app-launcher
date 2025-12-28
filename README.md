# App Launcher

Property management application launcher built with React, TypeScript, and Vite.

## Project Structure

```
app-launcher/
├── index.html              # Main entry point & Tailwind configuration
├── src/
│   ├── index.tsx           # React DOM mounting
│   ├── App.tsx             # Global state, routing, and mode management
│   ├── types.ts            # Central TypeScript interfaces
│   ├── components/         # Main UI Blocks
│   │   ├── common/         # Shared components (RecordDetail, RecordSection, etc.)
│   │   ├── properties/     # Property management components
│   │   ├── leases/         # Lease management components
│   │   ├── tenants/        # Tenant management components
│   │   ├── applications/   # Application components
│   │   ├── accounting/     # Accounting modules (GL, AR, AP, Banking, Owner)
│   │   ├── forms/          # Transaction forms
│   │   ├── messaging/      # Messaging components
│   │   ├── retail/         # Retail app components
│   │   ├── tenant/         # Tenant portal components
│   │   ├── softphone/      # SoftPhone component
│   │   └── voice/          # VoiceAgent component
│   ├── pages/              # Main layout pages
│   ├── apps/               # Specialized modules
│   │   ├── sales/          # CRM (Leads, Opportunities, Accounts)
│   │   ├── hr/             # People Ops (Employees, Applicants, Training)
│   │   ├── hard-money/     # Lending (Loan Leads, Origination, Servicing)
│   │   └── founder/        # Executive Dashboard
│   ├── constants/          # Constants and configuration
│   ├── utils/              # Utility functions
│   └── server/             # Node.js/MERN Backend
│       ├── models/         # MongoDB Schemas
│       ├── routes/         # API endpoints
│       └── services/       # Business logic
└── metadata.json           # Project metadata
```

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Chakra UI** - Component library
- **Redux Toolkit** - State management
- **React Router** - Routing

## Development Guidelines

- Follow atomic design principles
- Maintain consistent file structure
- Use TypeScript for all new files
- Follow the same patterns as auto-despo project

