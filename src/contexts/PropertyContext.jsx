import React, { createContext, useContext, useState } from 'react';

const PropertyContext = createContext(null);

export function PropertyProvider({ children }) {
  // --- Properties State ---
  const [properties, setProperties] = useState([
    {
      id: '1',
      propertyName: "test Property 123",
      address: "123 Test Street, Austin TX",
      propertyType: "Single Family",
      tags: [],
      contactName: "Dwellio",
      contactEmail: "",
      contactPhone: "",
      contactAddress: "",
      units: [{ unitName: 'Main', unitType: 'Residential', bedrooms: 3, bathrooms: 2, squareFeet: 1500, rentIncludes: [], amenities: [] }],
      status: "Vacant",
      price: 1,
      imageUrl: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      rentalStatus: "Vacant",
      isVacant: true,
      currentMonthlyRent: 0,
      pitiaPrincipalInterestMonthly: 850.50,
      pitiaTaxesMonthly: 400.00,
      pitiaInsuranceMonthly: 120.00,
      pitiaHoaMonthly: 50.00,
      pitiaTotalMonthly: 1420.50,
      pitiaLastUpdated: '2024-03-01'
    },
    {
      id: '2',
      propertyName: "3809 Billingsley Street # a, Houston TX 77009",
      address: "3809 Billingsley Street # a, Houston TX 77009",
      propertyType: "Rental",
      tags: [],
      contactName: "Smith Holdings LLC",
      contactEmail: "",
      contactPhone: "",
      contactAddress: "",
      units: [{ unitName: 'Main', unitType: 'Residential', bedrooms: 1, bathrooms: 1, squareFeet: 1200, rentIncludes: [], amenities: [] }],
      status: "ongoing",
      price: 1650,
      imageUrl: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      rentalStatus: "Occupied",
      isVacant: false,
      currentMonthlyRent: 1650,
      currentTenantCount: 1,
      pitiaPrincipalInterestMonthly: 900.00,
      pitiaTaxesMonthly: 350.00,
      pitiaInsuranceMonthly: 100.00,
      pitiaHoaMonthly: 0.00,
      pitiaTotalMonthly: 1350.00,
      pitiaLastUpdated: '2024-03-05'
    }
  ]);

  const handleAddProperty = (property) => {
    setProperties(prev => [...prev, property]);
  };

  const handleUpdateProperty = (updatedProperty) => {
    setProperties(prev => prev.map(p => p.id === updatedProperty.id ? updatedProperty : p));
  };

  // --- Leases State ---
  const [leases, setLeases] = useState([
    { id: '1', leaseNumber: 'L-2024-001', property: '3809 Billingsley Street # a, Houston TX 77009', unit: 'Unit 1', tenant: 'John Doe', startDate: '2024-01-01', endDate: '2024-12-31', amount: 1650, status: 'Active', type: 'New', deposit: 1650, paymentFrequency: 'Monthly', lateFeePolicy: '$50 after 3rd', isDepositHeld: true, petsAllowed: false },
    { id: '2', leaseNumber: 'L-2023-089', property: 'test Property 123', unit: 'Main', tenant: 'Jane Smith', startDate: '2023-05-01', endDate: '2024-04-30', amount: 1200, status: 'Ended', type: 'Renewal', deposit: 1200, paymentFrequency: 'Monthly', lateFeePolicy: '5%', isDepositHeld: true }
  ]);

  const handleAddLease = (lease) => setLeases(prev => [...prev, lease]);
  const handleUpdateLease = (updatedLease) => setLeases(prev => prev.map(l => l.id === updatedLease.id ? updatedLease : l));
  const handleDeleteLease = (leaseId) => setLeases(prev => prev.filter(l => l.id !== leaseId));

  // --- Tenants State ---
  const [tenants, setTenants] = useState([
    { id: '1', name: 'John Doe', property: '3809 Billingsley Street # a, Houston TX 77009', email: 'john@example.com', phone: '(555) 123-4567', status: 'Current' },
    { id: '2', name: 'Jane Smith', property: 'test Property 123', email: 'jane@example.com', phone: '(555) 987-6543', status: 'Past' }
  ]);

  const handleAddTenant = (tenant) => setTenants(prev => [...prev, tenant]);
  const handleUpdateTenant = (updatedTenant) => setTenants(prev => prev.map(t => t.id === updatedTenant.id ? updatedTenant : t));
  const handleDeleteTenant = (tenantId) => setTenants(prev => prev.filter(t => t.id !== tenantId));

  // --- Landlords & Vendors ---
  const [landlords, setLandlords] = useState([
    { id: '1', name: 'Smith Holdings LLC', companyName: 'Smith Holdings LLC', email: 'owner@smith.com', phone: '(555) 111-2222', status: 'Active', propertiesOwnedCount: 1 }
  ]);

  const handleAddLandlord = (l) => setLandlords(prev => [...prev, l]);
  const handleUpdateLandlord = (l) => setLandlords(prev => prev.map(item => item.id === l.id ? l : item));

  const [vendors, setVendors] = useState([
    { id: '1', companyName: 'ABC Plumbing', contactName: 'Mario', email: 'mario@abcplumbing.com', phone: '(555) 999-0000', category: 'Plumbing', status: 'Active' }
  ]);

  const handleAddVendor = (v) => setVendors(prev => [...prev, v]);
  const handleUpdateVendor = (v) => setVendors(prev => prev.map(item => item.id === v.id ? v : item));

  // --- Mortgages State ---
  const [mortgages, setMortgages] = useState([
    {
      id: '1',
      propertyId: '2',
      lenderName: 'Wells Fargo',
      loanNumber: '10002345',
      interestRate: 4.5,
      originalLoanAmount: 250000,
      currentPrincipalBalance: 240000,
      monthlyPaymentPI: 1266,
      loanStartDate: '2023-01-01',
      maturityDate: '2053-01-01',
      paymentDueDayOfMonth: 1,
      isDelinquent: false
    }
  ]);

  const handleAddMortgage = (mortgage) => {
    setMortgages(prev => [...prev, mortgage]);
  };

  const handleUpdateMortgage = (updatedMortgage) => {
    setMortgages(prev => prev.map(m => m.id === updatedMortgage.id ? updatedMortgage : m));
  };

  const handleDeleteMortgage = (id) => {
    setMortgages(prev => prev.filter(m => m.id !== id));
  };

  // --- Insurance State ---
  const [insurancePolicies, setInsurancePolicies] = useState([
    {
      id: '1',
      propertyId: '2',
      carrierName: 'State Farm',
      policyNumber: 'POL-888999',
      policyType: 'Landlord',
      isPrimaryHazardPolicy: true,
      annualPremium: 1200,
      isPolicyActive: true,
      billingFrequency: 'Annual',
      policyStartDate: '2024-01-01',
      policyEndDate: '2025-01-01'
    }
  ]);

  const handleAddInsurance = (policy) => {
    setInsurancePolicies(prev => [...prev, policy]);
  };

  const handleUpdateInsurance = (updatedPolicy) => {
    setInsurancePolicies(prev => prev.map(p => p.id === updatedPolicy.id ? updatedPolicy : p));
  };

  const handleDeleteInsurance = (id) => {
    setInsurancePolicies(prev => prev.filter(p => p.id !== id));
  };

  // --- Tax Records State ---
  const [taxRecords, setTaxRecords] = useState([
    {
      id: '1',
      propertyId: '2',
      taxAuthorityName: 'Harris County Tax Office',
      taxAuthorityType: 'County',
      taxYear: 2024,
      annualTaxAmount: 4200,
      isEscrowed: true,
      isDelinquent: false,
      assessedValue: 250000,
      billDueDate: '2025-01-31'
    }
  ]);

  const handleAddTaxRecord = (record) => {
    setTaxRecords(prev => [...prev, record]);
  };

  const handleUpdateTaxRecord = (updatedRecord) => {
    setTaxRecords(prev => prev.map(r => r.id === updatedRecord.id ? updatedRecord : r));
  };

  const handleDeleteTaxRecord = (id) => {
    setTaxRecords(prev => prev.filter(r => r.id !== id));
  };

  // --- HOA Accounts State ---
  const [hoaAccounts, setHoaAccounts] = useState([
    {
      id: '1',
      propertyId: '1',
      associationName: 'Austin Hills HOA',
      hoaDuesAmount: 50,
      hoaDuesFrequency: 'Monthly',
      isDelinquent: false,
      lienFiled: false,
      managementCompanyName: 'FirstService Residential',
      contactPhone: '(512) 555-0100',
      nextDuesDueDate: '2025-03-01'
    }
  ]);

  const handleAddHOA = (account) => {
    setHoaAccounts(prev => [...prev, account]);
  };

  const handleUpdateHOA = (updatedAccount) => {
    setHoaAccounts(prev => prev.map(a => a.id === updatedAccount.id ? updatedAccount : a));
  };

  const handleDeleteHOA = (id) => {
    setHoaAccounts(prev => prev.filter(a => a.id !== id));
  };

  // --- Evictions State ---
  const [evictions, setEvictions] = useState([
    {
      id: '1',
      evictionId: '1',
      evictionNumber: 'EVC-2025-001',
      propertyId: '2',
      tenantId: '1',
      leaseId: '1',
      evictionType: 'Nonpayment of Rent',
      evictionStatus: 'Notice Served',
      noticeType: 'Pay or Quit',
      noticeServedDate: '2025-03-01',
      noticeServiceMethod: 'Posted on Door',
      balanceAtNotice: 1650,
      rentPortionDue: 1650,
      filingDate: '2025-03-10'
    }
  ]);

  const handleAddEviction = (eviction) => {
    setEvictions(prev => [...prev, eviction]);
  };

  const handleUpdateEviction = (updatedEviction) => {
    setEvictions(prev => prev.map(e => e.id === updatedEviction.id ? updatedEviction : e));
  };

  const handleDeleteEviction = (id) => {
    setEvictions(prev => prev.filter(e => e.id !== id));
  };

  // --- Maintenance Requests (shared with Tenant Portal) ---
  const [maintenanceRequests, setMaintenanceRequests] = useState([
    {
      id: '1', workOrderNumber: 'WO-1001', title: 'Leaky Faucet', status: 'New', 
      property: '3809 Billingsley Street # a', unit: 'Unit 1', priority: 'Low', category: 'Plumbing',
      reportedBy: 'John Doe', reportedAt: '2025-02-15T10:00:00Z', tenantUserId: 't1'
    }
  ]);

  const handleAddMaintenanceRequest = (req) => {
    setMaintenanceRequests(prev => [req, ...prev]);
  };

  // --- Applications State ---
  const [applications, setApplications] = useState([
    {
      id: '1',
      applicationNumber: 'APP-1001',
      applicantName: 'Alice Cooper',
      propertyId: '1',
      propertyName: '3809 Billingsley Street # a',
      unit: 'Unit 1',
      desiredMoveInDate: '2025-02-10',
      applicationStatus: 'Submitted',
      applicationStep: 'Review & Submit',
      employmentStatus: 'Employed',
      employerName: 'Cooper Corp',
      grossMonthlyIncome: 5000,
      otherIncomeAmount: 0,
      totalStatedMonthlyIncome: 5000,
      applicationFeeAmount: 50,
      applicationFeePayer: 'Applicant',
      applicationFeeStatus: 'Paid',
      legalFirstName: 'Alice',
      legalLastName: 'Cooper',
      dateOfBirth: '1985-05-15',
      mobilePhone: '(555) 999-8888',
      email: 'alice@example.com',
      totalAdults: 1,
      totalChildren: 0,
      petCount: 0,
      vehicleCount: 1,
      consentCreditCheck: true,
      consentBackgroundCheck: true,
      consentElectronicDelivery: true,
      internalDecision: 'Pending',
      proposedMonthlyRent: 1650,
      proposedSecurityDeposit: 1650
    }
  ]);

  const handleApplicationUpdate = (updatedApp) => {
    setApplications(prev => {
      const exists = prev.find(a => a.id === updatedApp.id);
      if (exists) {
        return prev.map(a => a.id === updatedApp.id ? updatedApp : a);
      } else {
        return [...prev, updatedApp];
      }
    });
  };

  // --- Messaging State ---
  const [conversations, setConversations] = useState([
    {
      id: 'c1',
      tenantUserId: 't1',
      propertyId: '2',
      title: 'John Doe - 3809 Billingsley # a',
      lastMessagePreview: 'Is it okay if I paint the living room?',
      lastMessageAt: '2025-02-10T14:30:00Z',
      unreadForTenant: 0,
      unreadForManager: 1,
      status: 'Open',
      createdAt: '2025-01-01T12:00:00Z',
      updatedAt: '2025-02-10T14:30:00Z'
    }
  ]);

  const [messages, setMessages] = useState([
    {
      id: 'm1', conversationId: 'c1', fromUserId: 't1', fromRole: 'Tenant', 
      body: 'Hi, I have a question about the lease.', sentAt: '2025-01-01T12:05:00Z', messageType: 'Text', direction: 'IncomingFromTenant'
    },
    {
      id: 'm2', conversationId: 'c1', fromUserId: 'm1', fromRole: 'Manager', 
      body: 'Sure, what can I help you with?', sentAt: '2025-01-01T13:00:00Z', messageType: 'Text', direction: 'OutgoingToTenant'
    },
    {
      id: 'm3', conversationId: 'c1', fromUserId: 't1', fromRole: 'Tenant', 
      body: 'Is it okay if I paint the living room?', sentAt: '2025-02-10T14:30:00Z', messageType: 'Text', direction: 'IncomingFromTenant'
    }
  ]);

  // Shared Messaging Logic
  const handleSendMessage = (conversationId, body, fromRole) => {
    let activeConvId = conversationId;
    const timestamp = new Date().toISOString();

    if (!activeConvId) {
      const newConv = {
        id: Math.random().toString(36).substr(2, 9),
        tenantUserId: 't1',
        propertyId: '2',
        title: 'John Doe - 3809 Billingsley Street # a',
        lastMessagePreview: body,
        lastMessageAt: timestamp,
        unreadForTenant: 0,
        unreadForManager: 1,
        status: 'Open',
        createdAt: timestamp,
        updatedAt: timestamp
      };
      setConversations(prev => [newConv, ...prev]);
      activeConvId = newConv.id;
    } else {
      setConversations(prev => prev.map(c => {
        if (c.id === activeConvId) {
          return {
            ...c,
            lastMessagePreview: body,
            lastMessageAt: timestamp,
            unreadForManager: fromRole === 'Tenant' ? c.unreadForManager + 1 : c.unreadForManager,
            unreadForTenant: fromRole === 'Manager' ? c.unreadForTenant + 1 : c.unreadForTenant,
            updatedAt: timestamp
          };
        }
        return c;
      }));
    }

    const newMsg = {
      id: Math.random().toString(36).substr(2, 9),
      conversationId: activeConvId,
      fromUserId: fromRole === 'Tenant' ? 't1' : 'm1',
      fromRole,
      body,
      sentAt: timestamp,
      messageType: 'Text',
      direction: fromRole === 'Tenant' ? 'IncomingFromTenant' : 'OutgoingToTenant'
    };
    setMessages(prev => [...prev, newMsg]);
  };

  // --- Global Activity & Tasks State ---
  const [activities, setActivities] = useState([]);
  const [tasks, setTasks] = useState([]);

  const handleLogActivity = (logs) => {
    setActivities(prev => [...logs, ...prev]);
  };

  const handleAddTask = (task) => {
    setTasks(prev => [...prev, task]);
  };

  const handleUpdateTask = (updatedTask) => {
    setTasks(prev => prev.map(t => t.id === updatedTask.id ? updatedTask : t));
  };

  const value = {
    // Properties
    properties,
    handleAddProperty,
    handleUpdateProperty,
    // Leases
    leases,
    handleAddLease,
    handleUpdateLease,
    handleDeleteLease,
    // Tenants
    tenants,
    handleAddTenant,
    handleUpdateTenant,
    handleDeleteTenant,
    // Landlords
    landlords,
    handleAddLandlord,
    handleUpdateLandlord,
    // Vendors
    vendors,
    handleAddVendor,
    handleUpdateVendor,
    // Mortgages
    mortgages,
    handleAddMortgage,
    handleUpdateMortgage,
    handleDeleteMortgage,
    // Insurance
    insurancePolicies,
    handleAddInsurance,
    handleUpdateInsurance,
    handleDeleteInsurance,
    // Tax Records
    taxRecords,
    handleAddTaxRecord,
    handleUpdateTaxRecord,
    handleDeleteTaxRecord,
    // HOA
    hoaAccounts,
    handleAddHOA,
    handleUpdateHOA,
    handleDeleteHOA,
    // Evictions
    evictions,
    handleAddEviction,
    handleUpdateEviction,
    handleDeleteEviction,
    // Maintenance
    maintenanceRequests,
    handleAddMaintenanceRequest,
    // Applications
    applications,
    handleApplicationUpdate,
    // Messaging
    conversations,
    messages,
    handleSendMessage,
    // Activities & Tasks
    activities,
    tasks,
    handleLogActivity,
    handleAddTask,
    handleUpdateTask,
  };

  return (
    <PropertyContext.Provider value={value}>
      {children}
    </PropertyContext.Provider>
  );
}

export function useProperty() {
  const context = useContext(PropertyContext);
  if (!context) {
    throw new Error('useProperty must be used within PropertyProvider');
  }
  return context;
}

