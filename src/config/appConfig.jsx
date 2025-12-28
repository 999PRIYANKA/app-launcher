import React from 'react';
import * as Icons from '../constants/icons';
import { APP_ROUTES } from './appRoutes';

// App metadata and sidebar configuration
export const APP_CONFIG = {
  property: {
    id: 'property',
    name: 'Property App',
    displayName: 'Property',
    description: 'Manage leases, maintenance, and tenants.',
    icon: <Icons.BuildingOfficeIcon className="w-8 h-8 text-blue-600" />,
    baseRoute: APP_ROUTES.PROPERTY.BASE,
    defaultRoute: APP_ROUTES.PROPERTY.DASHBOARD,
    sidebarConfig: [
      {
        items: [
          { 
            name: 'DASHBOARD', 
            icon: <Icons.DashboardIcon />, 
            route: APP_ROUTES.PROPERTY.DASHBOARD,
            pageKey: 'DASHBOARD'
          },
          { 
            name: 'COMMUNICATIONS', 
            icon: <Icons.ChatIcon />, 
            route: APP_ROUTES.PROPERTY.COMMUNICATIONS,
            pageKey: 'COMMUNICATIONS'
          }
        ],
      },
      {
        title: 'CONTACTS',
        icon: <Icons.UsersIcon />,
        items: [
          { 
            name: 'TENANTS', 
            icon: <Icons.TenantsIcon />, 
            route: APP_ROUTES.PROPERTY.TENANTS,
            pageKey: 'TENANTS'
          },
          { 
            name: 'LANDLORDS', 
            icon: <Icons.UserGroupIcon />, 
            route: APP_ROUTES.PROPERTY.LANDLORDS,
            pageKey: 'LANDLORDS'
          },
          { 
            name: 'VENDORS', 
            icon: <Icons.TruckIcon />, 
            route: APP_ROUTES.PROPERTY.VENDORS,
            pageKey: 'VENDORS'
          },
        ],
      },
      {
        title: 'PROPERTIES',
        icon: <Icons.PropertiesIcon />,
        items: [
          { 
            name: 'ALL PROPERTIES', 
            icon: <Icons.BuildingOfficeIcon />, 
            route: APP_ROUTES.PROPERTY.PROPERTIES,
            pageKey: 'ALL PROPERTIES'
          },
          { 
            name: 'MORTGAGES', 
            icon: <Icons.BankIcon />, 
            route: APP_ROUTES.PROPERTY.MORTGAGES,
            pageKey: 'MORTGAGES'
          },
          { 
            name: 'INSURANCE', 
            icon: <Icons.ShieldCheckIcon />, 
            route: APP_ROUTES.PROPERTY.INSURANCE,
            pageKey: 'INSURANCE'
          },
          { 
            name: 'TAX RECORDS', 
            icon: <Icons.DocumentTextIcon />, 
            route: APP_ROUTES.PROPERTY.TAX_RECORDS,
            pageKey: 'TAX RECORDS'
          },
          { 
            name: 'HOA', 
            icon: <Icons.AssociationIcon />, 
            route: APP_ROUTES.PROPERTY.HOA,
            pageKey: 'HOA'
          },
        ],
      },
      {
        title: 'OPS & MAINTENANCE',
        icon: <Icons.MaintenanceIcon />,
        items: [
          { 
            name: 'WORK ORDERS', 
            icon: <Icons.WrenchIcon />, 
            route: APP_ROUTES.PROPERTY.WORK_ORDERS,
            pageKey: 'WORK ORDERS'
          },
          { 
            name: 'INSPECTIONS', 
            icon: <Icons.ClipboardCheckIcon />, 
            route: APP_ROUTES.PROPERTY.INSPECTIONS,
            pageKey: 'INSPECTIONS'
          },
          { 
            name: 'TURNS', 
            icon: <Icons.RefreshIcon />, 
            route: APP_ROUTES.PROPERTY.TURNS,
            pageKey: 'TURNS'
          },
        ],
      },
      {
        title: 'LEASING',
        icon: <Icons.KeyIcon />,
        items: [
          { 
            name: 'LISTINGS', 
            icon: <Icons.ListingsIcon />, 
            route: APP_ROUTES.PROPERTY.LISTINGS,
            pageKey: 'LISTINGS'
          },
          { 
            name: 'APPLICATIONS', 
            icon: <Icons.ApplicationsIcon />, 
            route: APP_ROUTES.PROPERTY.APPLICATIONS,
            pageKey: 'APPLICATIONS'
          },
          { 
            name: 'LEASES & FILES', 
            icon: <Icons.LeasesIcon />, 
            route: APP_ROUTES.PROPERTY.LEASES,
            pageKey: 'LEASES & FILES'
          },
          { 
            name: 'EVICTIONS', 
            icon: <Icons.GavelIcon />, 
            route: APP_ROUTES.PROPERTY.EVICTIONS,
            pageKey: 'EVICTIONS'
          },
        ],
      },
      {
        title: 'ACCOUNTING',
        icon: <Icons.CalculatorIcon />,
        items: [
          { 
            name: 'GENERAL LEDGER', 
            icon: <Icons.BookOpenIcon />, 
            route: APP_ROUTES.PROPERTY.GENERAL_LEDGER,
            pageKey: 'GENERAL LEDGER'
          },
          { 
            name: 'ACCOUNTS RECEIVABLE', 
            icon: <Icons.ReceiptRefundIcon />, 
            route: APP_ROUTES.PROPERTY.ACCOUNTS_RECEIVABLE,
            pageKey: 'ACCOUNTS RECEIVABLE'
          },
          { 
            name: 'ACCOUNTS PAYABLE', 
            icon: <Icons.CreditCardIcon />, 
            route: APP_ROUTES.PROPERTY.ACCOUNTS_PAYABLE,
            pageKey: 'ACCOUNTS PAYABLE'
          },
          { 
            name: 'BANKING', 
            icon: <Icons.BankIcon />, 
            route: APP_ROUTES.PROPERTY.BANKING,
            pageKey: 'BANKING'
          },
          { 
            name: 'OWNER ACCOUNTING', 
            icon: <Icons.BriefcaseIcon />, 
            route: APP_ROUTES.PROPERTY.OWNER_ACCOUNTING,
            pageKey: 'OWNER ACCOUNTING'
          },
        ],
      },
    ],
  },
  
  hr: {
    id: 'hr',
    name: 'HR App',
    displayName: 'HR',
    description: 'Manage employees, recruiting, and training.',
    icon: <Icons.UserGroupIcon className="w-8 h-8 text-purple-600" />,
    baseRoute: APP_ROUTES.HR.BASE,
    defaultRoute: APP_ROUTES.HR.DASHBOARD,
    sidebarConfig: [
      {
        items: [
          { 
            name: 'DASHBOARD', 
            icon: <Icons.DashboardIcon />, 
            route: APP_ROUTES.HR.DASHBOARD,
            pageKey: 'DASHBOARD'
          },
        ],
      },
      {
        title: 'PEOPLE',
        icon: <Icons.UserIcon />,
        items: [
          { 
            name: 'EMPLOYEES', 
            icon: <Icons.UserGroupIcon />, 
            route: APP_ROUTES.HR.EMPLOYEES,
            pageKey: 'EMPLOYEES'
          },
          { 
            name: 'APPLICANTS', 
            icon: <Icons.BriefcaseIcon />, 
            route: APP_ROUTES.HR.APPLICANTS,
            pageKey: 'APPLICANTS'
          },
          { 
            name: 'INQUIRIES', 
            icon: <Icons.InboxIcon />, 
            route: APP_ROUTES.HR.INQUIRIES,
            pageKey: 'INQUIRIES'
          },
        ],
      },
      {
        title: 'ORGANIZATION',
        icon: <Icons.BuildingOfficeIcon />,
        items: [
          { 
            name: 'TEAMS', 
            icon: <Icons.UserGroupIcon />, 
            route: APP_ROUTES.HR.TEAMS,
            pageKey: 'TEAMS'
          },
          { 
            name: 'OFFICES', 
            icon: <Icons.BuildingOfficeIcon />, 
            route: APP_ROUTES.HR.OFFICES,
            pageKey: 'OFFICES'
          },
          { 
            name: 'TRAINING', 
            icon: <Icons.AcademicCapIcon />, 
            route: APP_ROUTES.HR.TRAINING,
            pageKey: 'TRAINING'
          },
        ],
      },
    ],
  },
  
  sales: {
    id: 'sales',
    name: 'Sales App',
    displayName: 'Sales',
    description: 'Manage leads, opportunities, and revenue.',
    icon: <Icons.BanknotesIcon className="w-8 h-8 text-green-600" />,
    baseRoute: APP_ROUTES.SALES.BASE,
    defaultRoute: APP_ROUTES.SALES.DASHBOARD,
    sidebarConfig: [
      {
        items: [
          { 
            name: 'DASHBOARD', 
            icon: <Icons.DashboardIcon />, 
            route: APP_ROUTES.SALES.DASHBOARD,
            pageKey: 'DASHBOARD'
          },
        ],
      },
      {
        title: 'SALES',
        icon: <Icons.BriefcaseIcon />,
        items: [
          { 
            name: 'LEADS', 
            icon: <Icons.UserGroupIcon />, 
            route: APP_ROUTES.SALES.LEADS,
            pageKey: 'LEADS'
          },
          { 
            name: 'OPPORTUNITIES', 
            icon: <Icons.CurrencyDollarIcon />, 
            route: APP_ROUTES.SALES.OPPORTUNITIES,
            pageKey: 'OPPORTUNITIES'
          },
          { 
            name: 'ACCOUNTS', 
            icon: <Icons.BuildingStoreIcon />, 
            route: APP_ROUTES.SALES.ACCOUNTS,
            pageKey: 'ACCOUNTS'
          },
          { 
            name: 'CONTACTS', 
            icon: <Icons.UsersIcon />, 
            route: APP_ROUTES.SALES.CONTACTS,
            pageKey: 'CONTACTS'
          },
        ],
      },
    ],
  },
  
  hardMoney: {
    id: 'hardmoney',
    name: 'Hard Money Loan App',
    displayName: 'HardMoney',
    description: 'Manage lending origination and servicing.',
    icon: <Icons.BankIcon className="w-8 h-8 text-emerald-600" />,
    baseRoute: APP_ROUTES.HARD_MONEY.BASE,
    defaultRoute: APP_ROUTES.HARD_MONEY.DASHBOARD,
    sidebarConfig: [
      {
        items: [
          { 
            name: 'DASHBOARD', 
            icon: <Icons.DashboardIcon />, 
            route: APP_ROUTES.HARD_MONEY.DASHBOARD,
            pageKey: 'DASHBOARD'
          },
        ],
      },
      {
        title: 'ORIGINATION',
        icon: <Icons.DocumentTextIcon />,
        items: [
          { 
            name: 'LOAN LEADS', 
            icon: <Icons.UserGroupIcon />, 
            route: APP_ROUTES.HARD_MONEY.LOAN_LEADS,
            pageKey: 'LOAN LEADS'
          },
          { 
            name: 'LOAN APPLICATIONS', 
            icon: <Icons.DocumentTextIcon />, 
            route: APP_ROUTES.HARD_MONEY.LOAN_APPLICATIONS,
            pageKey: 'LOAN APPLICATIONS'
          },
          { 
            name: 'BORROWERS', 
            icon: <Icons.UsersIcon />, 
            route: APP_ROUTES.HARD_MONEY.BORROWERS,
            pageKey: 'BORROWERS'
          },
        ],
      },
      {
        title: 'PORTFOLIO',
        icon: <Icons.BankIcon />,
        items: [
          { 
            name: 'ACTIVE LOANS', 
            icon: <Icons.BankIcon />, 
            route: APP_ROUTES.HARD_MONEY.ACTIVE_LOANS,
            pageKey: 'ACTIVE LOANS'
          },
          { 
            name: 'SERVICING', 
            icon: <Icons.CreditCardIcon />, 
            route: APP_ROUTES.HARD_MONEY.SERVICING,
            pageKey: 'SERVICING'
          },
        ],
      },
      {
        title: 'ADMIN',
        icon: <Icons.SettingsIcon />,
        items: [
          { 
            name: 'LENDING OFFICES', 
            icon: <Icons.BuildingOfficeIcon />, 
            route: APP_ROUTES.HARD_MONEY.LENDING_OFFICES,
            pageKey: 'LENDING OFFICES'
          },
        ],
      },
    ],
  },
  
  partnerSites: {
    id: 'partnersites',
    name: 'Partner Sites App',
    displayName: 'PartnerSites',
    description: 'Manage partner websites and templates.',
    icon: <Icons.BuildingStoreIcon className="w-8 h-8 text-orange-600" />,
    baseRoute: APP_ROUTES.PARTNER_SITES.BASE,
    defaultRoute: APP_ROUTES.PARTNER_SITES.DASHBOARD,
    sidebarConfig: [
      {
        items: [
          { 
            name: 'DASHBOARD', 
            icon: <Icons.DashboardIcon />, 
            route: APP_ROUTES.PARTNER_SITES.DASHBOARD,
            pageKey: 'DASHBOARD'
          },
        ],
      },
      {
        title: 'WEBSITES',
        icon: <Icons.BuildingStoreIcon />,
        items: [
          { 
            name: 'OFFICE RECORD', 
            icon: <Icons.BuildingOfficeIcon />, 
            route: APP_ROUTES.PARTNER_SITES.OFFICE_RECORD,
            pageKey: 'OFFICE RECORD'
          },
          { 
            name: 'TEMPLATE BUILDER', 
            icon: <Icons.WrenchIcon />, 
            route: APP_ROUTES.PARTNER_SITES.TEMPLATE_BUILDER,
            pageKey: 'TEMPLATE BUILDER'
          },
        ],
      },
      {
        title: 'VARIANTS',
        icon: <Icons.AppGridIcon />,
        items: [
          { 
            name: 'VARIANT 1', 
            icon: <Icons.BuildingStoreIcon />, 
            route: APP_ROUTES.PARTNER_SITES.VARIANT_1,
            pageKey: 'VARIANT 1'
          },
          { 
            name: 'VARIANT 2', 
            icon: <Icons.BuildingStoreIcon />, 
            route: APP_ROUTES.PARTNER_SITES.VARIANT_2,
            pageKey: 'VARIANT 2'
          },
          { 
            name: 'VARIANT 3', 
            icon: <Icons.BuildingStoreIcon />, 
            route: APP_ROUTES.PARTNER_SITES.VARIANT_3,
            pageKey: 'VARIANT 3'
          },
          { 
            name: 'VARIANT 4', 
            icon: <Icons.BuildingStoreIcon />, 
            route: APP_ROUTES.PARTNER_SITES.VARIANT_4,
            pageKey: 'VARIANT 4'
          },
          { 
            name: 'VARIANT 5', 
            icon: <Icons.BuildingStoreIcon />, 
            route: APP_ROUTES.PARTNER_SITES.VARIANT_5,
            pageKey: 'VARIANT 5'
          },
          { 
            name: 'VARIANT 6', 
            icon: <Icons.BuildingStoreIcon />, 
            route: APP_ROUTES.PARTNER_SITES.VARIANT_6,
            pageKey: 'VARIANT 6'
          },
          { 
            name: 'VARIANT 7', 
            icon: <Icons.BuildingStoreIcon />, 
            route: APP_ROUTES.PARTNER_SITES.VARIANT_7,
            pageKey: 'VARIANT 7'
          },
          { 
            name: 'VARIANT 8', 
            icon: <Icons.BuildingStoreIcon />, 
            route: APP_ROUTES.PARTNER_SITES.VARIANT_8,
            pageKey: 'VARIANT 8'
          },
          { 
            name: 'VARIANT 9', 
            icon: <Icons.BuildingStoreIcon />, 
            route: APP_ROUTES.PARTNER_SITES.VARIANT_9,
            pageKey: 'VARIANT 9'
          },
          { 
            name: 'VARIANT 10', 
            icon: <Icons.BuildingStoreIcon />, 
            route: APP_ROUTES.PARTNER_SITES.VARIANT_10,
            pageKey: 'VARIANT 10'
          },
          { 
            name: 'PARTNER ORIGINAL', 
            icon: <Icons.BuildingStoreIcon />, 
            route: APP_ROUTES.PARTNER_SITES.PARTNER_ORIGINAL,
            pageKey: 'PARTNER ORIGINAL'
          },
        ],
      },
    ],
  },
  
  founder: {
    id: 'founder',
    name: 'Founder App',
    displayName: 'Founder',
    description: 'Executive command center and aggregated KPIs.',
    icon: <Icons.ChartBarIcon className="w-8 h-8 text-indigo-600" />,
    baseRoute: APP_ROUTES.FOUNDER.BASE,
    defaultRoute: APP_ROUTES.FOUNDER.DASHBOARD,
    sidebarConfig: [
      {
        items: [
          { 
            name: 'DASHBOARD', 
            icon: <Icons.DashboardIcon />, 
            route: APP_ROUTES.FOUNDER.DASHBOARD,
            pageKey: 'DASHBOARD'
          },
        ],
      },
      {
        title: 'STRATEGY',
        icon: <Icons.ChartBarIcon />,
        items: [
          { 
            name: 'COMPANY HEALTH', 
            icon: <Icons.ChartBarIcon />, 
            route: APP_ROUTES.FOUNDER.DASHBOARD, // Placeholder - will be updated when route is added
            pageKey: 'COMPANY HEALTH'
          },
          { 
            name: 'FINANCIALS', 
            icon: <Icons.BanknotesIcon />, 
            route: APP_ROUTES.FOUNDER.DASHBOARD, // Placeholder - will be updated when route is added
            pageKey: 'FINANCIALS'
          },
          { 
            name: 'INVESTOR RELATIONS', 
            icon: <Icons.BriefcaseIcon />, 
            route: APP_ROUTES.FOUNDER.DASHBOARD, // Placeholder - will be updated when route is added
            pageKey: 'INVESTOR RELATIONS'
          },
        ],
      },
    ],
  },
  
  crmConnect: {
    id: 'crmconnect',
    name: 'CRM Connect App',
    displayName: 'CRMConnect',
    description: 'Communications intelligence and SoftPhone widget.',
    icon: <Icons.PhoneIcon className="w-8 h-8 text-blue-600" />,
    baseRoute: APP_ROUTES.CRM_CONNECT.BASE,
    defaultRoute: APP_ROUTES.CRM_CONNECT.DASHBOARD,
    sidebarConfig: [
      {
        title: 'WORKSPACE',
        icon: <Icons.AppGridIcon />,
        items: [
          { 
            name: 'DASHBOARD', 
            icon: <Icons.DashboardIcon />, 
            route: APP_ROUTES.CRM_CONNECT.DASHBOARD,
            pageKey: 'DASHBOARD'
          },
          { 
            name: 'CONTACTS', 
            icon: <Icons.UsersIcon />, 
            route: APP_ROUTES.CRM_CONNECT.CONTACTS,
            pageKey: 'CONTACTS'
          },
        ],
      },
      {
        title: 'VOICE',
        icon: <Icons.PhoneIcon />,
        items: [
          { 
            name: 'CALL LOGS', 
            icon: <Icons.PhoneIcon />, 
            route: APP_ROUTES.CRM_CONNECT.CALLS,
            pageKey: 'CALL LOGS'
          },
          { 
            name: 'PHONE NUMBERS', 
            icon: <Icons.PhoneIcon />, 
            route: APP_ROUTES.CRM_CONNECT.PHONE_NUMBERS,
            pageKey: 'PHONE NUMBERS'
          },
          { 
            name: 'RECORDINGS', 
            icon: <Icons.ClockIcon />, 
            route: APP_ROUTES.CRM_CONNECT.RECORDINGS,
            pageKey: 'RECORDINGS'
          },
          { 
            name: 'VOICEMAILS', 
            icon: <Icons.VoicemailIcon />, 
            route: APP_ROUTES.CRM_CONNECT.VOICEMAILS,
            pageKey: 'VOICEMAILS'
          },
          { 
            name: 'PARTICIPANTS', 
            icon: <Icons.UserGroupIcon />, 
            route: APP_ROUTES.CRM_CONNECT.PARTICIPANTS,
            pageKey: 'PARTICIPANTS'
          },
        ],
      },
      {
        title: 'SMS',
        icon: <Icons.ChatBubbleOvalLeftIcon />,
        items: [
          { 
            name: 'SMS LOGS', 
            icon: <Icons.ChatBubbleOvalLeftIcon />, 
            route: APP_ROUTES.CRM_CONNECT.SMS,
            pageKey: 'SMS LOGS'
          },
        ],
      },
    ],
  },
};

// Helper functions
export const getAppConfig = (appId) => {
  // Map display names to config keys
  const appIdMap = {
    'Property': 'property',
    'HR': 'hr',
    'Sales': 'sales',
    'HardMoney': 'hardMoney',
    'PartnerSites': 'partnerSites',
    'Founder': 'founder',
    'CRMConnect': 'crmConnect',
  };
  
  const configKey = appIdMap[appId] || appId?.toLowerCase() || 'property';
  return APP_CONFIG[configKey] || APP_CONFIG.property;
};

export const getAllApps = () => {
  return Object.values(APP_CONFIG);
};

// Get app config by route path
export const getAppConfigByRoute = (pathname) => {
  if (pathname.startsWith('/app/property')) return APP_CONFIG.property;
  if (pathname.startsWith('/app/hr')) return APP_CONFIG.hr;
  if (pathname.startsWith('/app/sales')) return APP_CONFIG.sales;
  if (pathname.startsWith('/app/hard-money')) return APP_CONFIG.hardMoney;
  if (pathname.startsWith('/app/partner-sites')) return APP_CONFIG.partnerSites;
  if (pathname.startsWith('/app/founder')) return APP_CONFIG.founder;
  if (pathname.startsWith('/app/crm-connect')) return APP_CONFIG.crmConnect;
  return APP_CONFIG.property; // Default
};

