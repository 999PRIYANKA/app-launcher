import React, { useState, useEffect } from 'react';
import RecordDetail from '../../../../components/common/RecordDetail';
import RecordSection from '../../../../components/common/RecordSection';
import * as Icons from '../../../../constants/icons';

const LandlordDetailView = ({ 
    landlord, 
    properties = [], 
    leases = [],
    applications = [],
    evictions = [],
    onBack, 
    onSave 
}) => {
  const [formData, setFormData] = useState(landlord);

  useEffect(() => {
    setFormData(landlord);
  }, [landlord]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Filter Related Records
  // Using contactName as a proxy for Owner relationship in this mock data structure
  const ownedProperties = properties.filter(p => p.contactName === landlord.name || (landlord.companyName && p.contactName === landlord.companyName));
  const ownedPropertyNames = ownedProperties.map(p => p.propertyName);
  const ownedPropertyIds = ownedProperties.map(p => p.id);

  const landlordLeases = leases.filter(l => ownedPropertyNames.includes(l.property));
  const landlordApps = applications.filter(a => ownedPropertyNames.includes(a.propertyName || ''));
  const landlordEvictions = evictions.filter(e => ownedPropertyIds.includes(e.propertyId));

  const isNew = !landlord.name;

  return (
    <RecordDetail
        title={isNew ? 'New Landlord' : formData.name}
        subtitle={formData.companyName}
        onClose={onBack}
        onSave={() => onSave(formData)}
        status={formData.status}
        headerIcon={<Icons.AccountIcon className="w-6 h-6" />}
    >
        <RecordSection title="Contact Information">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Full Name</label>
                    <input 
                        type="text" 
                        value={formData.name || ''} 
                        onChange={e => handleChange('name', e.target.value)} 
                        className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none" 
                    />
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Company Name</label>
                    <input 
                        type="text" 
                        value={formData.companyName || ''} 
                        onChange={e => handleChange('companyName', e.target.value)} 
                        className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none" 
                    />
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Email</label>
                    <input 
                        type="email" 
                        value={formData.email || ''} 
                        onChange={e => handleChange('email', e.target.value)} 
                        className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none" 
                    />
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Phone</label>
                    <input 
                        type="tel" 
                        value={formData.phone || ''} 
                        onChange={e => handleChange('phone', e.target.value)} 
                        className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none" 
                    />
                </div>
                <div className="col-span-2">
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Address</label>
                    <input 
                        type="text" 
                        value={formData.address || ''} 
                        onChange={e => handleChange('address', e.target.value)} 
                        className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none" 
                    />
                </div>
            </div>
        </RecordSection>

        <RecordSection title={`Owned Properties (${ownedProperties.length})`}>
            {ownedProperties.length > 0 ? (
                <div className="space-y-2">
                    {ownedProperties.map(p => (
                        <div key={p.id} className="flex justify-between items-center p-3 border rounded hover:bg-gray-50">
                            <div>
                                <p className="text-sm font-semibold text-blue-600">{p.propertyName}</p>
                                <p className="text-xs text-gray-500">{p.address}</p>
                            </div>
                            <span className={`text-xs px-2 py-1 rounded-full ${p.rentalStatus === 'Occupied' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                {p.rentalStatus || 'Unknown'}
                            </span>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-sm text-gray-500 italic">No properties assigned to this landlord.</p>
            )}
        </RecordSection>

        <RecordSection title={`Active Leases (${landlordLeases.length})`}>
            {landlordLeases.length > 0 ? (
                <div className="overflow-x-auto border rounded-md">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Property</th>
                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Tenant</th>
                                <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase">Rent</th>
                                <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase">Status</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {landlordLeases.map((l) => (
                                <tr key={l.id} className="hover:bg-gray-50">
                                    <td className="px-3 py-2 text-sm text-gray-900 truncate max-w-xs">{l.property}</td>
                                    <td className="px-3 py-2 text-sm font-medium text-blue-600">{l.tenant}</td>
                                    <td className="px-3 py-2 text-sm text-gray-900 text-right">${l.amount}</td>
                                    <td className="px-3 py-2 text-sm text-center">
                                        <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">{l.status}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-sm text-gray-500 italic">No active leases found for owned properties.</p>
            )}
        </RecordSection>

        <RecordSection title={`Applications (${landlordApps.length})`}>
             {landlordApps.length > 0 ? (
                <div className="overflow-x-auto border rounded-md">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Applicant</th>
                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Property</th>
                                <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase">Status</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {landlordApps.map((a) => (
                                <tr key={a.id} className="hover:bg-gray-50">
                                    <td className="px-3 py-2 text-sm font-medium text-blue-600">{a.applicantName}</td>
                                    <td className="px-3 py-2 text-sm text-gray-900 truncate max-w-xs">{a.propertyName}</td>
                                    <td className="px-3 py-2 text-sm text-center">
                                        <span className={`text-xs px-2 py-0.5 rounded-full ${a.applicationStatus === 'Approved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                            {a.applicationStatus}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-sm text-gray-500 italic">No applications found.</p>
            )}
        </RecordSection>

        <RecordSection title={`Evictions (${landlordEvictions.length})`}>
             {landlordEvictions.length > 0 ? (
                <div className="overflow-x-auto border rounded-md">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Case #</th>
                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Filed</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {landlordEvictions.map((e) => (
                                <tr key={e.id} className="hover:bg-gray-50">
                                    <td className="px-3 py-2 text-sm font-medium text-blue-600">{e.evictionNumber}</td>
                                    <td className="px-3 py-2 text-sm text-center">
                                        <span className="text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded-full">{e.evictionStatus}</span>
                                    </td>
                                    <td className="px-3 py-2 text-sm text-gray-500">{e.filingDate || '-'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-sm text-gray-500 italic">No evictions found.</p>
            )}
        </RecordSection>

        <RecordSection title="Settings & Notes">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Status</label>
                    <select 
                        value={formData.status || 'Active'} 
                        onChange={e => handleChange('status', e.target.value)} 
                        className="w-full p-2 border border-gray-300 rounded text-sm bg-white focus:ring-1 focus:ring-blue-500 outline-none"
                    >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Tax ID / SSN</label>
                    <input 
                        type="text" 
                        value={formData.taxId || ''} 
                        onChange={e => handleChange('taxId', e.target.value)} 
                        className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none" 
                    />
                </div>
                <div className="col-span-2">
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Notes</label>
                    <textarea 
                        rows={4} 
                        value={formData.notes || ''} 
                        onChange={e => handleChange('notes', e.target.value)} 
                        className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none" 
                    />
                </div>
            </div>
        </RecordSection>
    </RecordDetail>
  );
};

export default LandlordDetailView;

