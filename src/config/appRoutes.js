// Route constants for all apps
// This file defines all route paths used in the application

export const APP_ROUTES = {
  // App Launcher (Home)
  LAUNCHER: '/',
  
  // Property App Routes
  PROPERTY: {
    BASE: '/app/property',
    DASHBOARD: '/app/property/dashboard',
    COMMUNICATIONS: '/app/property/communications',
    TENANTS: '/app/property/tenants',
    LANDLORDS: '/app/property/landlords',
    VENDORS: '/app/property/vendors',
    PROPERTIES: '/app/property/properties',
    MORTGAGES: '/app/property/mortgages',
    INSURANCE: '/app/property/insurance',
    TAX_RECORDS: '/app/property/tax-records',
    HOA: '/app/property/hoa',
    WORK_ORDERS: '/app/property/work-orders',
    INSPECTIONS: '/app/property/inspections',
    TURNS: '/app/property/turns',
    LISTINGS: '/app/property/listings',
    APPLICATIONS: '/app/property/applications',
    LEASES: '/app/property/leases',
    EVICTIONS: '/app/property/evictions',
    INCOME: '/app/property/income',
    EXPENSES: '/app/property/expenses',
    GENERAL_LEDGER: '/app/property/general-ledger',
    ACCOUNTS_RECEIVABLE: '/app/property/accounts-receivable',
    ACCOUNTS_PAYABLE: '/app/property/accounts-payable',
    BANKING: '/app/property/banking',
    OWNER_ACCOUNTING: '/app/property/owner-accounting',
  },
  
  // HR App Routes
  HR: {
    BASE: '/app/hr',
    DASHBOARD: '/app/hr/dashboard',
    EMPLOYEES: '/app/hr/employees',
    APPLICANTS: '/app/hr/applicants',
    INQUIRIES: '/app/hr/inquiries',
    TRAINING: '/app/hr/training',
    TEAMS: '/app/hr/teams',
    OFFICES: '/app/hr/offices',
  },
  
  // Sales App Routes
  SALES: {
    BASE: '/app/sales',
    DASHBOARD: '/app/sales/dashboard',
    LEADS: '/app/sales/leads',
    OPPORTUNITIES: '/app/sales/opportunities',
    ACCOUNTS: '/app/sales/accounts',
    CONTACTS: '/app/sales/contacts',
  },
  
  // Hard Money App Routes
  HARD_MONEY: {
    BASE: '/app/hard-money',
    DASHBOARD: '/app/hard-money/dashboard',
    LOAN_LEADS: '/app/hard-money/loan-leads',
    LOAN_APPLICATIONS: '/app/hard-money/loan-applications',
    BORROWERS: '/app/hard-money/borrowers',
    ACTIVE_LOANS: '/app/hard-money/active-loans',
    SERVICING: '/app/hard-money/servicing',
    LENDING_OFFICES: '/app/hard-money/lending-offices',
  },
  
  // Partner Sites App Routes
  PARTNER_SITES: {
    BASE: '/app/partner-sites',
    DASHBOARD: '/app/partner-sites/dashboard',
    OFFICE_RECORD: '/app/partner-sites/office-record',
    TEMPLATE_BUILDER: '/app/partner-sites/template-builder',
    WEBSITE_WIZARD: '/app/partner-sites/website-wizard',
    AGENT_SITES: '/app/partner-sites/agent-sites',
    VARIANT_1: '/app/partner-sites/variant-1',
    VARIANT_2: '/app/partner-sites/variant-2',
    VARIANT_3: '/app/partner-sites/variant-3',
    VARIANT_4: '/app/partner-sites/variant-4',
    VARIANT_5: '/app/partner-sites/variant-5',
    VARIANT_6: '/app/partner-sites/variant-6',
    VARIANT_7: '/app/partner-sites/variant-7',
    VARIANT_8: '/app/partner-sites/variant-8',
    VARIANT_9: '/app/partner-sites/variant-9',
    VARIANT_10: '/app/partner-sites/variant-10',
    PARTNER_ORIGINAL: '/app/partner-sites/partner-original',
    TEMPLATE_A: '/app/partner-sites/template-a',
    TEMPLATE_B: '/app/partner-sites/template-b',
  },
  
  // Founder App Routes
  FOUNDER: {
    BASE: '/app/founder',
    DASHBOARD: '/app/founder/dashboard',
  },
  
  // CRM Connect App Routes
  CRM_CONNECT: {
    BASE: '/app/crm-connect',
    DASHBOARD: '/app/crm-connect/dashboard',
    CALLS: '/app/crm-connect/communications/calls',
    PHONE_NUMBERS: '/app/crm-connect/communications/phone-numbers',
    RECORDINGS: '/app/crm-connect/communications/recordings',
    VOICEMAILS: '/app/crm-connect/communications/voicemails',
    PARTICIPANTS: '/app/crm-connect/communications/participants',
    SMS: '/app/crm-connect/communications/sms-logs',
    CONTACTS: '/app/crm-connect/contacts',
  },
  
  // Special Routes
  APPLICANT_WIZARD: '/applicant-wizard/:id?',
};

