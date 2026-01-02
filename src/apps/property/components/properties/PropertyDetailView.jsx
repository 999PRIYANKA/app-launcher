import React, { useEffect, useState, useMemo } from 'react';
import RecordDetail from '../../../../components/common/RecordDetail';
import RecordSection from '../../../../components/common/RecordSection';
import * as Icons from '../../../../constants/icons';
import { generateDiff, createActivityLogs } from '../../../../utils/auditUtils';

// Import related detail views
import LeaseDetailView from '../leases/LeaseDetailView';
import TenantDetailView from '../tenants/TenantDetailView';
import MortgageDetailView from '../mortgages/MortgageDetailView';
import InsuranceDetailView from '../insurance/InsuranceDetailView';
import TaxRecordDetailView from '../tax/TaxRecordDetailView';
import HOADetailView from '../hoa/HOADetailView';
import EvictionDetailView from '../evictions/EvictionDetailView';

const STAGES = [
  { label: 'Intake / New', short: 'New' },
  { label: 'Make-Ready', short: 'Make-Ready' },
  { label: 'Ready to List', short: 'Ready' },
  { label: 'Active Marketing', short: 'Marketing' },
  { label: 'Tours / Showings', short: 'Tours' },
  { label: 'Application / Screening', short: 'Screening' },
  { label: 'Leased / Move-In', short: 'Leased' },
];

const PropertyDetailView = ({ 
    property, 
    allProperties = [],
    landlords = [],
    leases = [], 
    tenants = [], 
    mortgages = [],
    policies = [], 
    taxRecords = [],
    hoaAccounts = [],
    evictions = [],
    activities = [],
    tasks = [],
    onLogActivity,
    onAddTask,
    onUpdateTask,
    onBack, 
    onUpdate,
    
    onAddLease, onUpdateLease, onDeleteLease,
    onAddTenant, onUpdateTenant, onDeleteTenant,
    onAddMortgage, onUpdateMortgage, onDeleteMortgage,
    onAddInsurance, onUpdateInsurance, onDeleteInsurance,
    onAddTaxRecord, onUpdateTaxRecord, onDeleteTaxRecord,
    onAddHOA, onUpdateHOA, onDeleteHOA,
    onAddEviction, onUpdateEviction, onDeleteEviction
}) => {
  // Migration logic for initial property load
  const migratedProperty = useMemo(() => {
    let currentStatus = property.status || 'Intake / New';
    const legacyMap = {
        'NEW': 'Intake / New',
        'MARKETING PREP': 'Ready to List',
        'ACTIVE MARKETING': 'Active Marketing',
        'LEASED': 'Leased / Move-In',
        'ongoing': 'Intake / New',
        'Vacant': 'Intake / New'
    };
    
    if (legacyMap[currentStatus]) {
        currentStatus = legacyMap[currentStatus];
    } else if (!STAGES.find(s => s.label === currentStatus)) {
        currentStatus = 'Intake / New';
    }

    return { ...property, status: currentStatus };
  }, [property]);

  const [formData, setFormData] = useState(migratedProperty);

  useEffect(() => {
      setFormData(migratedProperty);
  }, [migratedProperty]);

  // Editing States for Sub-Records
  const [editingLease, setEditingLease] = useState(null);
  const [editingTenant, setEditingTenant] = useState(null);
  const [editingMortgage, setEditingMortgage] = useState(null);
  const [editingInsurance, setEditingInsurance] = useState(null);
  const [editingTaxRecord, setEditingTaxRecord] = useState(null);
  const [editingHOA, setEditingHOA] = useState(null);
  const [editingEviction, setEditingEviction] = useState(null);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
      if (onUpdate) {
          const diffs = generateDiff(property, formData);
          if (diffs.length > 0 && onLogActivity && property.id) {
              const logs = createActivityLogs(property.id, diffs);
              onLogActivity(logs);
          }
          onUpdate(formData);
      }
  };

  const handleStageClick = (newStageLabel) => {
      const newStage = newStageLabel;
      const oldStage = formData.status;
      if (newStage === oldStage) return;

      setFormData(prev => {
          const updated = { ...prev, status: newStage };
          if (onUpdate) onUpdate(updated);
          return updated;
      });
      
      if (onLogActivity && property.id) {
          onLogActivity([{
              id: Math.random().toString(36).substr(2, 9),
              recordId: property.id,
              timestamp: new Date().toISOString(),
              userId: 'u1',
              userName: 'Dustin Wyatt',
              action: 'Update',
              details: `Changed Property Stage from "${oldStage}" to "${newStage}"`
          }]);
      }
  };

  const steps = useMemo(() => {
    const currentIdx = STAGES.findIndex(s => s.label === formData.status);
    return STAGES.map((s, idx) => ({
        label: s.label,
        shortLabel: s.short,
        status: idx < currentIdx ? 'completed' : (idx === currentIdx ? 'current' : 'upcoming')
    }));
  }, [formData.status]);

  const highlights = [
      { label: 'Property Owner', value: landlords.find(l => l.id === formData.ownerId)?.name || 'Unassigned' },
      { label: 'Property Type', value: formData.propertyType },
      { label: 'Bed / Bath', value: `${formData.bedrooms || 0} / ${formData.bathrooms || 0}` },
      { label: 'Market Rent', value: formData.price ? `$${formData.price.toLocaleString()}` : '—' },
      { label: 'Rental Status', value: formData.rentalStatus },
      { label: 'PITIA Total', value: formData.pitiaTotalMonthly ? `$${formData.pitiaTotalMonthly.toLocaleString()}` : '—' },
      { label: 'Current Rent', value: formData.currentMonthlyRent ? `$${formData.currentMonthlyRent.toLocaleString()}` : '—' },
      { label: 'Last Modified By', value: 'Dustin Wyatt' }
  ];

  const handleAddUnit = () => {
      const newUnit = {
          unitName: `Unit ${formData.units.length + 1}`,
          unitType: 'Residential',
          bedrooms: 1,
          bathrooms: 1,
          squareFeet: 0,
          rentIncludes: [],
          amenities: []
      };
      const updatedUnits = [...(formData.units || []), newUnit];
      const updatedProp = { ...formData, units: updatedUnits };
      setFormData(updatedProp);
      if (onUpdate) onUpdate(updatedProp);
  };

  // --- Creation Handlers (Open Nested Detail Views) ---
  const initiateCreateLease = () => {
      const newLease = {
          id: `new-${Math.random()}`,
          leaseNumber: '',
          property: formData.propertyName,
          tenant: '',
          status: 'Draft',
          startDate: '',
          endDate: '',
          amount: formData.currentMonthlyRent || 0,
          type: 'New',
          paymentFrequency: 'Monthly'
      };
      setEditingLease(newLease);
  };

  const initiateCreateTenant = () => {
      setEditingTenant({
          id: `new-${Math.random()}`,
          name: '',
          property: formData.propertyName,
          email: '',
          phone: '',
          status: 'Current'
      });
  };

  const initiateCreateMortgage = () => {
      setEditingMortgage({
          id: `new-${Math.random()}`,
          propertyId: formData.id || '',
          lenderName: '',
          monthlyPaymentPI: 0
      });
  };

  const initiateCreateInsurance = () => {
      setEditingInsurance({
          id: `new-${Math.random()}`,
          propertyId: formData.id || '',
          carrierName: '',
          policyNumber: '',
          policyType: 'Landlord',
          isPolicyActive: true,
          isPrimaryHazardPolicy: false,
          annualPremium: 0,
          billingFrequency: 'Annual',
          policyStartDate: '',
          policyEndDate: ''
      });
  };

  const initiateCreateTax = () => {
      setEditingTaxRecord({
          id: `new-${Math.random()}`,
          propertyId: formData.id || '',
          taxAuthorityName: '',
          taxAuthorityType: 'County',
          taxYear: new Date().getFullYear(),
          annualTaxAmount: 0,
          isEscrowed: false,
          isDelinquent: false
      });
  };

  const initiateCreateHOA = () => {
      setEditingHOA({
          id: `new-${Math.random()}`,
          propertyId: formData.id || '',
          associationName: '',
          hoaDuesAmount: 0,
          hoaDuesFrequency: 'Monthly',
          isDelinquent: false,
          lienFiled: false
      });
  };

  const initiateCreateEviction = () => {
      setEditingEviction({
          id: `new-${Math.random()}`,
          evictionId: '',
          evictionNumber: '',
          propertyId: formData.id || '',
          tenantId: '', 
          leaseId: '',
          evictionType: 'Nonpayment of Rent',
          evictionStatus: 'Draft / Pre-Notice Review'
      });
  };

  // Scroll Helper
  const scrollToSection = (id) => {
      const element = document.getElementById(id);
      if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
  };

  // Vertical Toolbar
  const RightSidebar = (
      <div className="flex flex-col gap-6 w-full">
          <button onClick={() => scrollToSection('section-info')} className="flex flex-col items-center text-gray-500 hover:text-blue-600 group" title="Summary">
              <div className="p-2 rounded-lg group-hover:bg-blue-50">
                  <Icons.PropertiesIcon className="w-5 h-5" />
              </div>
              <span className="text-[10px] mt-1">Info</span>
          </button>
          <button onClick={() => scrollToSection('section-units')} className="flex flex-col items-center text-gray-500 hover:text-blue-600 group" title="Units">
              <div className="p-2 rounded-lg group-hover:bg-blue-50">
                  <Icons.UnitIcon className="w-5 h-5" />
              </div>
              <span className="text-[10px] mt-1">Units</span>
          </button>
          <button onClick={() => scrollToSection('section-leases')} className="flex flex-col items-center text-gray-500 hover:text-blue-600 group" title="Leases">
              <div className="p-2 rounded-lg group-hover:bg-blue-50">
                  <Icons.LeasesIcon className="w-5 h-5" />
              </div>
              <span className="text-[10px] mt-1">Leases</span>
          </button>
          <button onClick={() => scrollToSection('section-tenants')} className="flex flex-col items-center text-gray-500 hover:text-blue-600 group" title="Tenants">
              <div className="p-2 rounded-lg group-hover:bg-blue-50">
                  <Icons.TenantsIcon className="w-5 h-5" />
              </div>
              <span className="text-[10px] mt-1">Tenants</span>
          </button>
          <button onClick={() => scrollToSection('section-financials')} className="flex flex-col items-center text-gray-500 hover:text-blue-600 group" title="Financials">
              <div className="p-2 rounded-lg group-hover:bg-blue-50">
                  <Icons.BanknotesIcon className="w-5 h-5" />
              </div>
              <span className="text-[10px] mt-1">Finance</span>
          </button>
      </div>
  );

  return (
    <>
    <RecordDetail
        title={formData.address}
        subtitle={formData.propertyName}
        onClose={onBack}
        onSave={handleSave}
        status={formData.status}
        steps={steps}
        onStepClick={handleStageClick}
        rightSidebar={RightSidebar}
        recordId={property.id}
        activities={activities}
        tasks={tasks}
        onAddTask={onAddTask}
        onUpdateTask={onUpdateTask}
        highlights={highlights}
    >
        <div id="section-info" className="space-y-4 scroll-mt-4">
            <RecordSection title="Property Summary">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="col-span-2">
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Property Name</label>
                        <input type="text" value={formData.propertyName} onChange={(e) => handleChange('propertyName', e.target.value)} className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none" />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Type</label>
                        <select className="w-full p-2 border border-gray-300 rounded text-sm bg-white focus:ring-1 focus:ring-blue-500 outline-none" value={formData.propertyType} onChange={(e) => handleChange('propertyType', e.target.value)}>
                            <option>Single Family</option>
                            <option>Multi Family</option>
                            <option>Condo</option>
                            <option>Townhouse</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Market Rent</label>
                        <div className="relative">
                            <span className="absolute left-3 top-2 text-gray-500">$</span>
                            <input type="number" value={formData.price || ''} onChange={(e) => handleChange('price', parseFloat(e.target.value))} className="w-full p-2 pl-6 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Bedrooms</label>
                        <input 
                            type="number" 
                            value={formData.bedrooms || 0} 
                            onChange={(e) => handleChange('bedrooms', parseInt(e.target.value))} 
                            className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none" 
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Bathrooms</label>
                        <input 
                            type="number" 
                            step="0.5"
                            value={formData.bathrooms || 0} 
                            onChange={(e) => handleChange('bathrooms', parseFloat(e.target.value))} 
                            className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none" 
                        />
                    </div>

                    <div className="col-span-2">
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Property Image URL</label>
                        <div className="flex gap-4">
                            <input 
                                type="text" 
                                value={formData.imageUrl || ''} 
                                onChange={(e) => handleChange('imageUrl', e.target.value)} 
                                placeholder="https://example.com/image.jpg"
                                className="flex-1 p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none" 
                            />
                            {formData.imageUrl && (
                                <div className="w-16 h-16 rounded overflow-hidden border border-gray-200 bg-gray-100 flex-shrink-0">
                                    <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </RecordSection>

            {/* Financial Snapshot Section */}
            <RecordSection title="Financial Snapshot / PITIA & Rent">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2 border-b pb-1">Rental Status</h4>
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Rental Status</label>
                        <select
                            value={formData.rentalStatus || ''}
                            onChange={(e) => handleChange('rentalStatus', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded text-sm bg-white focus:ring-1 focus:ring-blue-500 outline-none"
                        >
                            <option value="">Select Status</option>
                            <option value="Occupied">Occupied</option>
                            <option value="Vacant">Vacant</option>
                            <option value="Notice Given">Notice Given</option>
                            <option value="Lease Ending Soon">Lease Ending Soon</option>
                        </select>
                    </div>
                    <div className="flex items-center mt-6">
                        <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                checked={formData.isVacant || false}
                                onChange={(e) => handleChange('isVacant', e.target.checked)}
                                className="rounded text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-sm text-gray-700 font-medium">Is Vacant?</span>
                        </label>
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Current Monthly Rent</label>
                        <div className="relative">
                            <span className="absolute left-3 top-2 text-gray-500">$</span>
                            <input
                                type="number"
                                value={formData.currentMonthlyRent || ''}
                                onChange={(e) => handleChange('currentMonthlyRent', parseFloat(e.target.value))}
                                className="w-full p-2 pl-6 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Total PITIA</label>
                        <div className="relative">
                            <span className="absolute left-3 top-2 text-gray-500">$</span>
                            <input
                                type="number"
                                value={formData.pitiaTotalMonthly || ''}
                                onChange={(e) => handleChange('pitiaTotalMonthly', parseFloat(e.target.value))}
                                className="w-full p-2 pl-6 border border-gray-300 rounded text-sm bg-gray-50 focus:ring-1 focus:ring-blue-500 outline-none font-bold text-gray-800"
                            />
                        </div>
                    </div>
                </div>
            </RecordSection>
        </div>

        <div id="section-units" className="scroll-mt-4">
            <RecordSection title="Units">
                <div className="flex justify-end mb-2">
                    <button onClick={handleAddUnit} className="text-blue-600 text-sm font-semibold flex items-center hover:underline">
                        <Icons.PlusCircleIcon className="w-4 h-4 mr-1"/> Add Unit
                    </button>
                </div>
                <div className="overflow-x-auto border rounded-md">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Unit Name</th>
                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Beds</th>
                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Baths</th>
                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Sq Ft</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {(formData.units || []).map((unit, idx) => (
                                <tr key={idx} className="hover:bg-gray-50">
                                    <td className="px-3 py-2 text-sm font-medium text-blue-600">{unit.unitName}</td>
                                    <td className="px-3 py-2 text-sm text-gray-500">{unit.unitType}</td>
                                    <td className="px-3 py-2 text-sm text-gray-500">{unit.bedrooms}</td>
                                    <td className="px-3 py-2 text-sm text-gray-500">{unit.bathrooms}</td>
                                    <td className="px-3 py-2 text-sm text-gray-500">{unit.squareFeet}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </RecordSection>
        </div>

        <div id="section-leases" className="scroll-mt-4">
            <RecordSection title="Leases">
                <div className="flex justify-end mb-2">
                    <button onClick={initiateCreateLease} className="text-blue-600 text-sm font-semibold flex items-center hover:underline">
                        <Icons.PlusCircleIcon className="w-4 h-4 mr-1"/> Add Lease
                    </button>
                </div>
                {leases.length > 0 ? (
                    <div className="overflow-x-auto border rounded-md">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Tenant</th>
                                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Start</th>
                                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">End</th>
                                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                    <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {leases.map((lease) => (
                                    <tr key={lease.id} className="hover:bg-gray-50 group">
                                        <td className="px-3 py-2 text-sm font-medium text-blue-600 cursor-pointer" onClick={() => setEditingLease(lease)}>{lease.tenant}</td>
                                        <td className="px-3 py-2 text-sm text-gray-500">{lease.startDate}</td>
                                        <td className="px-3 py-2 text-sm text-gray-500">{lease.endDate}</td>
                                        <td className="px-3 py-2 text-sm">
                                            <span className={`px-2 py-0.5 rounded-full text-xs ${lease.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                                {lease.status}
                                            </span>
                                        </td>
                                        <td className="px-3 py-2 text-center">
                                            <div className="flex justify-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button onClick={() => setEditingLease(lease)} className="text-gray-500 hover:text-blue-600"><Icons.EditIcon className="w-4 h-4"/></button>
                                                <button onClick={() => onDeleteLease && onDeleteLease(lease.id)} className="text-gray-500 hover:text-red-600"><Icons.DeleteIcon className="w-4 h-4"/></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-sm text-gray-500 italic text-center py-4">No leases found.</p>
                )}
            </RecordSection>
        </div>

        <div id="section-tenants" className="scroll-mt-4">
            <RecordSection title="Tenants">
                <div className="flex justify-end mb-2">
                    <button 
                        onClick={initiateCreateTenant}
                        className="text-blue-600 text-sm font-semibold flex items-center hover:underline"
                    >
                        <Icons.PlusCircleIcon className="w-4 h-4 mr-1"/> Add Tenant
                    </button>
                </div>
                {tenants.length > 0 ? (
                    <div className="overflow-x-auto border rounded-md">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
                                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                    <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {tenants.map((tenant) => (
                                    <tr key={tenant.id} className="hover:bg-gray-50 group">
                                        <td className="px-3 py-2 text-sm font-medium text-blue-600 cursor-pointer" onClick={() => setEditingTenant(tenant)}>{tenant.name}</td>
                                        <td className="px-3 py-2 text-sm text-gray-500">{tenant.email}</td>
                                        <td className="px-3 py-2 text-sm text-gray-500">{tenant.phone}</td>
                                        <td className="px-3 py-2 text-sm">
                                            <span className={`px-2 py-0.5 rounded-full text-xs ${tenant.status === 'Current' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                                {tenant.status}
                                            </span>
                                        </td>
                                        <td className="px-3 py-2 text-center">
                                            <div className="flex justify-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button onClick={() => setEditingTenant(tenant)} className="text-gray-500 hover:text-blue-600"><Icons.EditIcon className="w-4 h-4"/></button>
                                                <button onClick={() => onDeleteTenant && onDeleteTenant(tenant.id)} className="text-gray-500 hover:text-red-600"><Icons.DeleteIcon className="w-4 h-4"/></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-sm text-gray-500 italic text-center py-4">No tenants found.</p>
                )}
            </RecordSection>
        </div>

        <div id="section-evictions" className="scroll-mt-4">
            <RecordSection title="Evictions">
                <div className="flex justify-end mb-2">
                    <button onClick={initiateCreateEviction} className="text-red-600 text-sm font-semibold flex items-center hover:underline">
                        <Icons.GavelIcon className="w-4 h-4 mr-1"/> New Eviction
                    </button>
                </div>
                {evictions && evictions.length > 0 ? (
                    <div className="overflow-x-auto border rounded-md">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Eviction #</th>
                                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Filing Date</th>
                                    <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {evictions.map((eviction) => (
                                    <tr key={eviction.id} className="hover:bg-gray-50 group">
                                        <td className="px-3 py-2 text-sm font-medium text-blue-600 cursor-pointer" onClick={() => setEditingEviction(eviction)}>{eviction.evictionNumber}</td>
                                        <td className="px-3 py-2 text-sm text-center">
                                            <span className={`px-2 py-0.5 rounded-full text-xs ${eviction.evictionStatus === 'Closed' ? 'bg-gray-100 text-gray-800' : 'bg-red-100 text-red-800'}`}>
                                                {eviction.evictionStatus}
                                            </span>
                                        </td>
                                        <td className="px-3 py-2 text-sm text-gray-500">{eviction.evictionType}</td>
                                        <td className="px-3 py-2 text-sm text-gray-500">{eviction.filingDate || '-'}</td>
                                        <td className="px-3 py-2 text-center">
                                            <div className="flex justify-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button onClick={() => setEditingEviction(eviction)} className="text-gray-500 hover:text-blue-600"><Icons.EditIcon className="w-4 h-4"/></button>
                                                <button onClick={() => onDeleteEviction && onDeleteEviction(eviction.id)} className="text-gray-500 hover:text-red-600"><Icons.DeleteIcon className="w-4 h-4"/></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-sm text-gray-500 italic text-center py-4">No eviction records found.</p>
                )}
            </RecordSection>
        </div>

        <div id="section-financials" className="space-y-4 scroll-mt-4">
            <h3 className="text-lg font-bold text-gray-800 mt-8 mb-4 px-2 uppercase tracking-wide">Financial & PITIA Details</h3>

            {/* Mortgages Related List */}
            <RecordSection title="Mortgages">
                <div className="flex justify-end mb-2">
                    <button 
                        onClick={initiateCreateMortgage}
                        className="text-blue-600 text-sm font-semibold flex items-center hover:underline"
                    >
                        <Icons.PlusCircleIcon className="w-4 h-4 mr-1"/> Add Mortgage
                    </button>
                </div>
                {mortgages.length > 0 ? (
                    <div className="overflow-x-auto border rounded-md">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Lender</th>
                                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Loan #</th>
                                    <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase">Rate</th>
                                    <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase">Payment</th>
                                    <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase">Balance</th>
                                    <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {mortgages.map((m) => (
                                    <tr key={m.id} className="hover:bg-gray-50 group">
                                        <td className="px-3 py-2 text-sm font-medium text-blue-600 cursor-pointer" onClick={() => setEditingMortgage(m)}>{m.lenderName}</td>
                                        <td className="px-3 py-2 text-sm text-gray-500">{m.loanNumber || '-'}</td>
                                        <td className="px-3 py-2 text-sm text-gray-900 text-right">{m.interestRate}%</td>
                                        <td className="px-3 py-2 text-sm text-gray-900 text-right">${(m.monthlyPaymentPI || 0).toLocaleString()}</td>
                                        <td className="px-3 py-2 text-sm text-gray-900 text-right">${(m.currentPrincipalBalance || 0).toLocaleString()}</td>
                                        <td className="px-3 py-2 text-center">
                                            <div className="flex justify-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button onClick={() => setEditingMortgage(m)} className="text-gray-500 hover:text-blue-600"><Icons.EditIcon className="w-4 h-4"/></button>
                                                <button onClick={() => onDeleteMortgage && onDeleteMortgage(m.id)} className="text-gray-500 hover:text-red-600"><Icons.DeleteIcon className="w-4 h-4"/></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-sm text-gray-500 italic text-center py-4">No mortgages found.</p>
                )}
            </RecordSection>

            {/* Insurance Related List */}
            <RecordSection title="Insurance Policies">
                <div className="flex justify-end mb-2">
                    <button 
                        onClick={initiateCreateInsurance}
                        className="text-blue-600 text-sm font-semibold flex items-center hover:underline"
                    >
                        <Icons.PlusCircleIcon className="w-4 h-4 mr-1"/> Add Policy
                    </button>
                </div>
                {policies.length > 0 ? (
                    <div className="overflow-x-auto border rounded-md">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Carrier</th>
                                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                                    <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase">Premium</th>
                                    <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase">Status</th>
                                    <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {policies.map((p) => (
                                    <tr key={p.id} className="hover:bg-gray-50 group">
                                        <td className="px-3 py-2 text-sm font-medium text-blue-600 cursor-pointer" onClick={() => setEditingInsurance(p)}>{p.carrierName}</td>
                                        <td className="px-3 py-2 text-sm text-gray-500">{p.policyType}</td>
                                        <td className="px-3 py-2 text-sm text-gray-900 text-right">${(p.annualPremium || 0).toLocaleString()}</td>
                                        <td className="px-3 py-2 text-sm text-center">
                                            <span className={`px-2 py-0.5 rounded-full text-xs ${p.isPolicyActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                                {p.isPolicyActive ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                        <td className="px-3 py-2 text-center">
                                            <div className="flex justify-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button onClick={() => setEditingInsurance(p)} className="text-gray-500 hover:text-blue-600"><Icons.EditIcon className="w-4 h-4"/></button>
                                                <button onClick={() => onDeleteInsurance && onDeleteInsurance(p.id)} className="text-gray-500 hover:text-red-600"><Icons.DeleteIcon className="w-4 h-4"/></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-sm text-gray-500 italic text-center py-4">No insurance policies found.</p>
                )}
            </RecordSection>

            {/* Tax Records Related List */}
            <RecordSection title="Tax Records">
                <div className="flex justify-end mb-2">
                    <button 
                        onClick={initiateCreateTax}
                        className="text-blue-600 text-sm font-semibold flex items-center hover:underline"
                    >
                        <Icons.PlusCircleIcon className="w-4 h-4 mr-1"/> Add Tax Record
                    </button>
                </div>
                {taxRecords && taxRecords.length > 0 ? (
                    <div className="overflow-x-auto border rounded-md">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Authority</th>
                                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Year</th>
                                    <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase">Amount</th>
                                    <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase">Status</th>
                                    <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {taxRecords.map((t) => (
                                    <tr key={t.id} className="hover:bg-gray-50 group">
                                        <td className="px-3 py-2 text-sm font-medium text-blue-600 cursor-pointer" onClick={() => setEditingTaxRecord(t)}>{t.taxAuthorityName}</td>
                                        <td className="px-3 py-2 text-sm text-gray-500">{t.taxYear}</td>
                                        <td className="px-3 py-2 text-sm text-gray-900 text-right">${(t.annualTaxAmount || 0).toLocaleString()}</td>
                                        <td className="px-3 py-2 text-sm text-center">
                                            <span className={`px-2 py-0.5 rounded-full text-xs ${t.isDelinquent ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                                                {t.isDelinquent ? 'Delinquent' : 'Current'}
                                            </span>
                                        </td>
                                        <td className="px-3 py-2 text-center">
                                            <div className="flex justify-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button onClick={() => setEditingTaxRecord(t)} className="text-gray-500 hover:text-blue-600"><Icons.EditIcon className="w-4 h-4"/></button>
                                                <button onClick={() => onDeleteTaxRecord && onDeleteTaxRecord(t.id)} className="text-gray-500 hover:text-red-600"><Icons.DeleteIcon className="w-4 h-4"/></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-sm text-gray-500 italic text-center py-4">No tax records found.</p>
                )}
            </RecordSection>

            {/* HOA Accounts Related List */}
            <RecordSection title="HOA Accounts">
                <div className="flex justify-end mb-2">
                    <button 
                        onClick={initiateCreateHOA}
                        className="text-blue-600 text-sm font-semibold flex items-center hover:underline"
                    >
                        <Icons.PlusCircleIcon className="w-4 h-4 mr-1"/> Add HOA Account
                    </button>
                </div>
                {hoaAccounts && hoaAccounts.length > 0 ? (
                    <div className="overflow-x-auto border rounded-md">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Association</th>
                                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Dues</th>
                                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Frequency</th>
                                    <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase">Status</th>
                                    <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {hoaAccounts.map((h) => (
                                    <tr key={h.id} className="hover:bg-gray-50 group">
                                        <td className="px-3 py-2 text-sm font-medium text-blue-600 cursor-pointer" onClick={() => setEditingHOA(h)}>{h.associationName}</td>
                                        <td className="px-3 py-2 text-sm text-gray-900">${(h.hoaDuesAmount || 0).toLocaleString()}</td>
                                        <td className="px-3 py-2 text-sm text-gray-500">{h.hoaDuesFrequency}</td>
                                        <td className="px-3 py-2 text-sm text-center">
                                            <span className={`px-2 py-0.5 rounded-full text-xs ${h.lienFiled ? 'bg-red-100 text-red-800' : (h.isDelinquent ? 'bg-orange-100 text-orange-800' : 'bg-green-100 text-green-800')}`}>
                                                {h.lienFiled ? 'Lien Filed' : (h.isDelinquent ? 'Delinquent' : 'Current')}
                                            </span>
                                        </td>
                                        <td className="px-3 py-2 text-center">
                                            <div className="flex justify-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button onClick={() => setEditingHOA(h)} className="text-gray-500 hover:text-blue-600"><Icons.EditIcon className="w-4 h-4"/></button>
                                                <button onClick={() => onDeleteHOA && onDeleteHOA(h.id)} className="text-gray-500 hover:text-red-600"><Icons.DeleteIcon className="w-4 h-4"/></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-sm text-gray-500 italic text-center py-4">No HOA accounts found.</p>
                )}
            </RecordSection>
        </div>

        <RecordSection title="Ownership & Tax">
             <div className="grid grid-cols-1 gap-4">
                 <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Property Owner (Landlord)</label>
                    <div className="relative">
                        <select 
                            value={formData.ownerId || ''} 
                            onChange={(e) => handleChange('ownerId', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none bg-white font-medium text-gray-900"
                        >
                            <option value="">-- No Owner Assigned --</option>
                            {landlords.map(l => (
                                <option key={l.id} value={l.id}>{l.name} {l.companyName ? `(${l.companyName})` : ''}</option>
                            ))}
                        </select>
                        <Icons.UserIcon className="absolute right-8 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Legacy Owner Entity (Notes)</label>
                    <input 
                        type="text" 
                        value={formData.contactName || ''} 
                        onChange={(e) => handleChange('contactName', e.target.value)}
                        placeholder="Owner LLC or name placeholder" 
                        className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none" 
                    />
                </div>
             </div>
        </RecordSection>

    </RecordDetail>

    {/* Nested Detail Views */}
    {editingLease && (
        <div style={{zIndex: 60}} className="relative">
            <LeaseDetailView 
                lease={editingLease}
                properties={allProperties}
                onBack={() => setEditingLease(null)}
                onSave={(lease) => {
                    if (lease.id.startsWith('new')) {
                        if (onAddLease) onAddLease(lease);
                    } else {
                        if (onUpdateLease) onUpdateLease(lease);
                    }
                    setEditingLease(null);
                }}
            />
        </div>
    )}

    {editingTenant && (
        <div style={{zIndex: 60}} className="relative">
            <TenantDetailView 
                tenant={editingTenant}
                properties={allProperties}
                onBack={() => setEditingTenant(null)}
                onSave={(tenant) => {
                    if (tenant.id.startsWith('new')) {
                        if (onAddTenant) onAddTenant(tenant);
                    } else {
                        if (onUpdateTenant) onUpdateTenant(tenant);
                    }
                    setEditingTenant(null);
                }}
            />
        </div>
    )}

    {editingMortgage && (
        <div style={{zIndex: 60}} className="relative">
            <MortgageDetailView
                mortgage={editingMortgage}
                properties={allProperties}
                onBack={() => setEditingMortgage(null)}
                onSave={(m) => {
                    if (m.id.startsWith('new')) {
                        if (onAddMortgage) onAddMortgage(m);
                    } else {
                        if (onUpdateMortgage) onUpdateMortgage(m);
                    }
                    setEditingMortgage(null);
                }}
            />
        </div>
    )}

    {editingInsurance && (
        <div style={{zIndex: 60}} className="relative">
            <InsuranceDetailView
                policy={editingInsurance}
                properties={allProperties}
                onBack={() => setEditingInsurance(null)}
                onSave={(p) => {
                    if (p.id.startsWith('new')) {
                        if (onAddInsurance) onAddInsurance(p);
                    } else {
                        if (onUpdateInsurance) onUpdateInsurance(p);
                    }
                    setEditingInsurance(null);
                }}
            />
        </div>
    )}

    {editingTaxRecord && (
        <div style={{zIndex: 60}} className="relative">
            <TaxRecordDetailView
                taxRecord={editingTaxRecord}
                properties={allProperties}
                onBack={() => setEditingTaxRecord(null)}
                onSave={(t) => {
                    if (t.id.startsWith('new')) {
                        if (onAddTaxRecord) onAddTaxRecord(t);
                    } else {
                        if (onUpdateTaxRecord) onUpdateTaxRecord(t);
                    }
                    setEditingTaxRecord(null);
                }}
            />
        </div>
    )}

    {editingHOA && (
        <div style={{zIndex: 60}} className="relative">
            <HOADetailView
                account={editingHOA}
                properties={allProperties}
                onBack={() => setEditingHOA(null)}
                onSave={(h) => {
                    if (h.id.startsWith('new')) {
                        if (onAddHOA) onAddHOA(h);
                    } else {
                        if (onUpdateHOA) onUpdateHOA(h);
                    }
                    setEditingHOA(null);
                }}
            />
        </div>
    )}

    {editingEviction && (
        <div style={{zIndex: 60}} className="relative">
            <EvictionDetailView
                eviction={editingEviction}
                properties={allProperties}
                tenants={tenants || []}
                leases={leases || []}
                onBack={() => setEditingEviction(null)}
                onSave={(e) => {
                    if (e.id.startsWith('new')) {
                        if (onAddEviction) onAddEviction(e);
                    } else {
                        if (onUpdateEviction) onUpdateEviction(e);
                    }
                    setEditingEviction(null);
                }}
            />
        </div>
    )}
    </>
  );
};

export default PropertyDetailView;

