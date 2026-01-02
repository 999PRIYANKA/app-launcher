import React, { useState, useEffect } from 'react';
import RecordDetail from '../../../../components/common/RecordDetail';
import RecordSection from '../../../../components/common/RecordSection';
import * as Icons from '../../../../constants/icons';

const TenantDetailView = ({ 
    tenant, 
    properties = [], 
    evictions = [], 
    leases = [],
    applications = [],
    onBack, 
    onSave 
}) => {
  const [formData, setFormData] = useState(tenant);

  useEffect(() => {
    setFormData(tenant);
  }, [tenant]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveClick = () => {
      if (onSave) {
          onSave(formData);
      }
  };

  // Filter Related Records
  const tenantEvictions = evictions.filter(e => e.tenantId === tenant.id);
  const tenantLeases = leases.filter(l => l.tenant === tenant.name);
  const tenantApps = applications.filter(a => a.applicantName === tenant.name);
  const currentProperty = properties.find(p => p.propertyName === tenant.property);

  return (
    <RecordDetail
        title={formData.name || 'New Tenant'}
        subtitle={formData.property || 'No Property Assigned'}
        onClose={onBack}
        onSave={handleSaveClick}
        status={formData.status}
    >
        {/* UPPER SECTION: Profile & Contact Info */}
        <RecordSection title="Personal Information">
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
                     <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Full Name</label>
                     <input type="text" value={formData.name} onChange={(e) => handleChange('name', e.target.value)} className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                     <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Date of Birth</label>
                     <input type="date" value={formData.dob || ''} onChange={(e) => handleChange('dob', e.target.value)} className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none" />
                </div>
                 <div>
                     <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Email</label>
                     <input type="email" value={formData.email} onChange={(e) => handleChange('email', e.target.value)} className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                     <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Phone</label>
                     <input type="tel" value={formData.phone} onChange={(e) => handleChange('phone', e.target.value)} className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none" />
                </div>
                 <div>
                     <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">SSN (Last 4)</label>
                     <input type="text" maxLength={4} value={formData.ssnLast4 || ''} onChange={(e) => handleChange('ssnLast4', e.target.value)} className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none" />
                </div>
            </div>
        </RecordSection>

        {/* MOVED UP: Employment & Income */}
        <RecordSection title="Employment & Income">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div>
                     <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Employer</label>
                     <input type="text" value={formData.employer || ''} onChange={(e) => handleChange('employer', e.target.value)} className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none" />
                </div>
                 <div>
                     <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Annual Income</label>
                     <div className="relative">
                        <span className="absolute left-3 top-2 text-gray-500">$</span>
                        <input type="number" value={formData.annualIncome || ''} onChange={(e) => handleChange('annualIncome', parseFloat(e.target.value))} className="w-full p-2 pl-6 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none" />
                     </div>
                </div>
             </div>
        </RecordSection>

        {/* MOVED UP: Emergency Contact */}
        <RecordSection title="Emergency Contact">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div>
                     <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Contact Name</label>
                     <input type="text" value={formData.emergencyContactName || ''} onChange={(e) => handleChange('emergencyContactName', e.target.value)} className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                     <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Phone</label>
                     <input type="tel" value={formData.emergencyContactPhone || ''} onChange={(e) => handleChange('emergencyContactPhone', e.target.value)} className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none" />
                </div>
             </div>
        </RecordSection>

        {currentProperty && (
            <RecordSection title="Current Residence">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="col-span-2">
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Address</label>
                        <p className="text-sm font-medium text-gray-900">{currentProperty.address}</p>
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Type</label>
                        <p className="text-sm text-gray-700">{currentProperty.propertyType}</p>
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Unit Info</label>
                        <p className="text-sm text-gray-700">{(currentProperty.units || []).length} Unit(s)</p>
                    </div>
                </div>
            </RecordSection>
        )}

        <div className="mt-8">
            <h3 className="text-lg font-bold text-gray-800 mb-4 px-2 uppercase tracking-wide">Related Object Tables</h3>
            
            {/* LOWER SECTION: Data Tables */}
            <RecordSection title="Lease History">
                {tenantLeases.length > 0 ? (
                    <div className="overflow-x-auto border rounded-md">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Lease #</th>
                                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Property</th>
                                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Start</th>
                                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">End</th>
                                    <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase">Status</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {tenantLeases.map((lease) => (
                                    <tr key={lease.id} className="hover:bg-gray-50">
                                        <td className="px-3 py-2 text-sm font-medium text-blue-600">{lease.leaseNumber || 'N/A'}</td>
                                        <td className="px-3 py-2 text-sm text-gray-900 truncate max-w-xs">{lease.property}</td>
                                        <td className="px-3 py-2 text-sm text-gray-500">{lease.startDate}</td>
                                        <td className="px-3 py-2 text-sm text-gray-500">{lease.endDate}</td>
                                        <td className="px-3 py-2 text-sm text-center">
                                            <span className={`px-2 py-0.5 rounded-full text-xs ${lease.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                                {lease.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-sm text-gray-500 italic text-center py-4">No lease records found.</p>
                )}
            </RecordSection>

            <RecordSection title="Applications">
                {tenantApps.length > 0 ? (
                    <div className="overflow-x-auto border rounded-md">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">App #</th>
                                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Property</th>
                                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Move In</th>
                                    <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase">Status</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {tenantApps.map((app) => (
                                    <tr key={app.id} className="hover:bg-gray-50">
                                        <td className="px-3 py-2 text-sm font-medium text-blue-600">{app.applicationNumber}</td>
                                        <td className="px-3 py-2 text-sm text-gray-900 truncate max-w-xs">{app.propertyName}</td>
                                        <td className="px-3 py-2 text-sm text-gray-500">{app.desiredMoveInDate}</td>
                                        <td className="px-3 py-2 text-sm text-center">
                                            <span className={`px-2 py-0.5 rounded-full text-xs 
                                                ${app.applicationStatus === 'Approved' ? 'bg-green-100 text-green-800' : 
                                                app.applicationStatus === 'Denied' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}
                                            `}>
                                                {app.applicationStatus}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-sm text-gray-500 italic text-center py-4">No applications found.</p>
                )}
            </RecordSection>

            <RecordSection title="Legal & Eviction History">
                {tenantEvictions.length > 0 ? (
                    <div className="overflow-x-auto border rounded-md">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Case #</th>
                                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Filing Date</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {tenantEvictions.map((eviction) => (
                                    <tr key={eviction.id} className="hover:bg-gray-50">
                                        <td className="px-3 py-2 text-sm font-medium text-blue-600">{eviction.evictionNumber}</td>
                                        <td className="px-3 py-2 text-sm text-center">
                                            <span className={`px-2 py-0.5 rounded-full text-xs ${eviction.evictionStatus === 'Closed' ? 'bg-gray-100 text-gray-800' : 'bg-red-100 text-red-800'}`}>
                                                {eviction.evictionStatus}
                                            </span>
                                        </td>
                                        <td className="px-3 py-2 text-sm text-gray-500">{eviction.evictionType}</td>
                                        <td className="px-3 py-2 text-sm text-gray-500">{eviction.filingDate || '-'}</td>
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
    </RecordDetail>
  );
};

export default TenantDetailView;
