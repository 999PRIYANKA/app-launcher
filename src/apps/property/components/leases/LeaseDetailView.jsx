import React, { useState, useEffect } from 'react';
import RecordDetail from '../../../../components/common/RecordDetail';
import RecordSection from '../../../../components/common/RecordSection';
import * as Icons from '../../../../constants/icons';

const LeaseDetailView = ({ lease, properties = [], evictions = [], onBack, onSave }) => {
  const [formData, setFormData] = useState(lease);

  useEffect(() => {
    setFormData(lease);
  }, [lease]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveClick = () => {
      if (onSave) {
          onSave(formData);
      }
  };

  const steps = [
    { label: 'Draft', status: formData.status === 'Draft' ? 'current' : (['Draft'].includes(formData.status) ? 'current' : 'completed') },
    { label: 'Pending Signature', status: formData.status === 'Pending Signature' ? 'current' : (['Draft', 'Pending Signature'].includes(formData.status) ? 'upcoming' : 'completed') },
    { label: 'Active', status: formData.status === 'Active' ? 'current' : (['Active', 'Notice Given', 'Ended'].includes(formData.status) ? 'completed' : 'upcoming') },
    { label: 'Ended', status: formData.status === 'Ended' ? 'completed' : 'upcoming' },
  ];

  const leaseEvictions = evictions.filter(e => e.leaseId === lease.id);

  return (
    <RecordDetail
        title={formData.tenant ? `Lease for ${formData.tenant}` : 'New Residential Lease'}
        subtitle={formData.property || 'No Property Selected'}
        onClose={onBack}
        onSave={handleSaveClick}
        status={formData.status}
        steps={steps}
    >
        {/* Core Lease Info */}
        <RecordSection title="Lease Information">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div>
                     <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Lease Number</label>
                     <input 
                        type="text" 
                        value={formData.leaseNumber || ''} 
                        onChange={(e) => handleChange('leaseNumber', e.target.value)}
                        placeholder="Auto-generated if empty"
                        className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none" 
                    />
                </div>
                <div>
                     <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Status</label>
                     <select 
                        value={formData.status} 
                        onChange={(e) => handleChange('status', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded text-sm bg-white focus:ring-1 focus:ring-blue-500 outline-none"
                    >
                        <option>Prospect</option>
                        <option>Draft</option>
                        <option>Pending Signature</option>
                        <option>Approved - Not Moved In</option>
                        <option>Active</option>
                        <option>Notice Given</option>
                        <option>Ended</option>
                        <option>Cancelled</option>
                     </select>
                </div>
                <div>
                     <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Lease Type</label>
                     <select 
                        value={formData.type || ''} 
                        onChange={(e) => handleChange('type', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded text-sm bg-white focus:ring-1 focus:ring-blue-500 outline-none"
                    >
                        <option value="">Select Type</option>
                        <option>New</option>
                        <option>Renewal</option>
                        <option>Month-to-Month</option>
                        <option>Short-Term</option>
                        <option>Corporate</option>
                        <option>Other</option>
                     </select>
                </div>
                 <div>
                     <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Lease Source</label>
                     <select 
                        value={formData.source || ''} 
                        onChange={(e) => handleChange('source', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded text-sm bg-white focus:ring-1 focus:ring-blue-500 outline-none"
                    >
                        <option value="">Select Source</option>
                        <option>Online Application</option>
                        <option>Manual</option>
                        <option>Walk-In</option>
                        <option>Referral</option>
                        <option>Other</option>
                     </select>
                </div>
            </div>
        </RecordSection>

        {/* Property & Tenant */}
        <RecordSection title="Property & Tenant">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="col-span-1 md:col-span-2">
                     <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Property</label>
                     <select
                        value={formData.property || ''}
                        onChange={(e) => handleChange('property', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded text-sm bg-white focus:ring-1 focus:ring-blue-500 outline-none"
                     >
                        <option value="">Select Property</option>
                        {properties.map(p => (
                            <option key={p.id} value={p.propertyName}>{p.propertyName}</option>
                        ))}
                     </select>
                </div>
                <div>
                     <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Unit</label>
                     <input 
                        type="text" 
                        value={formData.unit || ''} 
                        onChange={(e) => handleChange('unit', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none" 
                    />
                </div>
                <div>
                     <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Max Occupancy</label>
                     <input 
                        type="number" 
                        value={formData.maxOccupancy || ''} 
                        onChange={(e) => handleChange('maxOccupancy', parseInt(e.target.value))}
                        className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none" 
                    />
                </div>
                 <div className="col-span-1 md:col-span-2">
                     <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Primary Tenant</label>
                     <input 
                        type="text" 
                        value={formData.tenant} 
                        onChange={(e) => handleChange('tenant', e.target.value)}
                        placeholder="Search Tenant..."
                        className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none" 
                    />
                </div>
                 <div>
                     <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Co-Tenant Count</label>
                     <input 
                        type="number" 
                        value={formData.coTenantCount || 0} 
                        onChange={(e) => handleChange('coTenantCount', parseInt(e.target.value))}
                        className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none" 
                    />
                </div>
            </div>
        </RecordSection>

        {/* Dates */}
        <RecordSection title="Key Dates">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                     <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Start Date</label>
                     <input 
                        type="date" 
                        value={formData.startDate} 
                        onChange={(e) => handleChange('startDate', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none" 
                    />
                </div>
                <div>
                     <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">End Date</label>
                     <input 
                        type="date" 
                        value={formData.endDate} 
                        onChange={(e) => handleChange('endDate', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none" 
                    />
                </div>
                 <div>
                     <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Move In Date</label>
                     <input 
                        type="date" 
                        value={formData.moveInDate || ''} 
                        onChange={(e) => handleChange('moveInDate', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none" 
                    />
                </div>
                 <div>
                     <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Move Out Date</label>
                     <input 
                        type="date" 
                        value={formData.moveOutDate || ''} 
                        onChange={(e) => handleChange('moveOutDate', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none" 
                    />
                </div>
                 <div>
                     <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Notice Given Date</label>
                     <input 
                        type="date" 
                        value={formData.noticeGivenDate || ''} 
                        onChange={(e) => handleChange('noticeGivenDate', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none" 
                    />
                </div>
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 border-t pt-4">
                 <div>
                     <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Renewal Offer Date</label>
                     <input 
                        type="date" 
                        value={formData.renewalOfferDate || ''} 
                        onChange={(e) => handleChange('renewalOfferDate', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none" 
                    />
                </div>
                <div>
                     <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Renewal Decision Date</label>
                     <input 
                        type="date" 
                        value={formData.renewalDecisionDate || ''} 
                        onChange={(e) => handleChange('renewalDecisionDate', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none" 
                    />
                </div>
             </div>
        </RecordSection>

        {/* Financials */}
        <RecordSection title="Financial Details">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div>
                     <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Base Rent</label>
                     <div className="relative">
                        <span className="absolute left-3 top-2 text-gray-500">$</span>
                        <input 
                            type="number" 
                            value={formData.amount} 
                            onChange={(e) => handleChange('amount', parseFloat(e.target.value))}
                            className="w-full p-2 pl-6 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none" 
                        />
                     </div>
                </div>
                <div>
                     <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Rent Frequency</label>
                     <select 
                        value={formData.paymentFrequency || 'Monthly'} 
                        onChange={(e) => handleChange('paymentFrequency', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded text-sm bg-white focus:ring-1 focus:ring-blue-500 outline-none"
                    >
                        <option>Monthly</option>
                        <option>Weekly</option>
                        <option>Other</option>
                     </select>
                </div>
            </div>
            <div className="mt-4 space-y-2">
                 <label className="flex items-center space-x-2">
                    <input 
                        type="checkbox" 
                        checked={formData.isProratedStart || false} 
                        onChange={(e) => handleChange('isProratedStart', e.target.checked)}
                        className="rounded text-blue-600 focus:ring-blue-500" 
                    />
                    <span className="text-sm text-gray-700">Is Prorated Start?</span>
                </label>
                 <label className="flex items-center space-x-2">
                    <input 
                        type="checkbox" 
                        checked={formData.lastMonthRentCollected || false} 
                        onChange={(e) => handleChange('lastMonthRentCollected', e.target.checked)}
                        className="rounded text-blue-600 focus:ring-blue-500" 
                    />
                    <span className="text-sm text-gray-700">Last Month Rent Collected?</span>
                </label>
            </div>
            <div className="mt-4">
                 <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Late Fee Policy</label>
                 <input 
                    type="text" 
                    value={formData.lateFeePolicy || ''} 
                    onChange={(e) => handleChange('lateFeePolicy', e.target.value)}
                    placeholder="e.g. 5% after 5 days" 
                    className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none" 
                />
            </div>
        </RecordSection>

        {/* Deposits */}
        <RecordSection title="Deposits & Fees">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div>
                     <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Security Deposit</label>
                     <div className="relative">
                        <span className="absolute left-3 top-2 text-gray-500">$</span>
                        <input 
                            type="number" 
                            value={formData.deposit || 0} 
                            onChange={(e) => handleChange('deposit', parseFloat(e.target.value))}
                            className="w-full p-2 pl-6 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none" 
                        />
                     </div>
                </div>
                 <div>
                     <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Pet Deposit</label>
                     <div className="relative">
                        <span className="absolute left-3 top-2 text-gray-500">$</span>
                        <input 
                            type="number" 
                            value={formData.petDepositAmount || 0} 
                            onChange={(e) => handleChange('petDepositAmount', parseFloat(e.target.value))}
                            className="w-full p-2 pl-6 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none" 
                        />
                     </div>
                </div>
                 <div>
                     <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Non-Refundable Fees</label>
                     <div className="relative">
                        <span className="absolute left-3 top-2 text-gray-500">$</span>
                        <input 
                            type="number" 
                            value={formData.nonRefundableFees || 0} 
                            onChange={(e) => handleChange('nonRefundableFees', parseFloat(e.target.value))}
                            className="w-full p-2 pl-6 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none" 
                        />
                     </div>
                </div>
            </div>
            <div className="mt-4">
                <label className="flex items-center space-x-2">
                    <input 
                        type="checkbox" 
                        checked={formData.isDepositHeld || false} 
                        onChange={(e) => handleChange('isDepositHeld', e.target.checked)}
                        className="rounded text-blue-600 focus:ring-blue-500" 
                    />
                    <span className="text-sm text-gray-700">Is Deposit Held?</span>
                </label>
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 border-t pt-4">
                 <div>
                     <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Deposit Refund Status</label>
                     <select 
                        value={formData.depositRefundStatus || 'Not Assessed'} 
                        onChange={(e) => handleChange('depositRefundStatus', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded text-sm bg-white focus:ring-1 focus:ring-blue-500 outline-none"
                    >
                        <option>Not Assessed</option>
                        <option>Refund in Process</option>
                        <option>Partially Refunded</option>
                        <option>Fully Refunded</option>
                        <option>Forfeited</option>
                     </select>
                </div>
                 <div>
                     <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Deposit Refund Date</label>
                     <input 
                        type="date" 
                        value={formData.depositRefundDate || ''} 
                        onChange={(e) => handleChange('depositRefundDate', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none" 
                    />
                </div>
             </div>
        </RecordSection>

        {/* Legal & Compliance - New Section for Eviction integration */}
        <RecordSection title="Legal & Compliance">
            {leaseEvictions.length > 0 ? (
                <div className="overflow-x-auto border rounded-md mb-4">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Case #</th>
                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Filed</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {leaseEvictions.map((eviction) => (
                                <tr key={eviction.id} className="hover:bg-gray-50">
                                    <td className="px-3 py-2 text-sm font-medium text-blue-600">{eviction.evictionNumber}</td>
                                    <td className="px-3 py-2 text-sm text-center">
                                        <span className={`px-2 py-0.5 rounded-full text-xs ${eviction.evictionStatus === 'Closed' ? 'bg-gray-100 text-gray-800' : 'bg-red-100 text-red-800'}`}>
                                            {eviction.evictionStatus}
                                        </span>
                                    </td>
                                    <td className="px-3 py-2 text-sm text-gray-500">{eviction.filingDate || '-'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-sm text-gray-500 italic mb-4">No active legal proceedings.</p>
            )}
        </RecordSection>

        {/* Policies & Notes */}
        <RecordSection title="Policies & Amenities">
            <div className="space-y-4">
                 <label className="flex items-center space-x-2">
                    <input 
                        type="checkbox" 
                        checked={formData.petsAllowed || false} 
                        onChange={(e) => handleChange('petsAllowed', e.target.checked)}
                        className="rounded text-blue-600 focus:ring-blue-500" 
                    />
                    <span className="text-sm text-gray-700">Pets Allowed?</span>
                </label>
                <div>
                     <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Utility Responsibility</label>
                     <input 
                        type="text" 
                        value={formData.utilityResponsibility || ''} 
                        onChange={(e) => handleChange('utilityResponsibility', e.target.value)}
                        placeholder="e.g. Tenant pays Electric & Gas"
                        className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none" 
                    />
                </div>
                <div>
                     <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Parking Details</label>
                     <input 
                        type="text" 
                        value={formData.parkingDetails || ''} 
                        onChange={(e) => handleChange('parkingDetails', e.target.value)}
                        placeholder="e.g. 1 Covered Spot #22"
                        className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none" 
                    />
                </div>
                 <div>
                     <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Smoking Policy</label>
                     <input 
                        type="text" 
                        value={formData.smokingPolicy || ''} 
                        onChange={(e) => handleChange('smokingPolicy', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none" 
                    />
                </div>
            </div>
        </RecordSection>

        <RecordSection title="Files & Notes">
             <div className="mb-4">
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Notes</label>
                <textarea 
                    rows={4} 
                    value={formData.notes || ''}
                    onChange={(e) => handleChange('notes', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none" 
                    placeholder="General notes about this lease..."
                ></textarea>
             </div>
             <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 cursor-pointer">
                 <Icons.ClipboardIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                 <p className="text-sm text-gray-600">Drag and drop signed lease PDF here</p>
                 <p className="text-xs text-gray-400">or click to browse</p>
             </div>
        </RecordSection>
    </RecordDetail>
  );
};

export default LeaseDetailView;
