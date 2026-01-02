import React, { useState, useEffect } from 'react';
import RecordDetail from '../../../../components/common/RecordDetail';
import RecordSection from '../../../../components/common/RecordSection';

const EvictionDetailView = ({ eviction, properties, tenants, leases, onBack, onSave }) => {
  const [formData, setFormData] = useState(eviction);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormData(eviction);
  }, [eviction]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
        setErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors[field];
            return newErrors;
        });
    }
  };

  const handleSave = () => {
      const newErrors = {};
      if (!formData.propertyId) newErrors.propertyId = 'Property is required';
      if (!formData.tenantId) newErrors.tenantId = 'Tenant is required';

      if (Object.keys(newErrors).length > 0) {
          setErrors(newErrors);
          return;
      }
      onSave(formData);
  };

  const stageOptions = [
      'Draft / Pre-Notice Review',
      'Notice Prepared', 
      'Notice Served',
      'Filing Pending',
      'Filed with Court',
      'Hearing Scheduled',
      'Judgment Granted',
      'Dismissed / Withdrawn',
      'Tenant Moved Out',
      'Closed'
  ];

  const steps = stageOptions.map(option => ({
      label: option,
      status: formData.evictionStatus === option 
        ? 'current' 
        : (stageOptions.indexOf(formData.evictionStatus) > stageOptions.indexOf(option) ? 'completed' : 'upcoming')
  }));

  const isNew = !eviction.id || eviction.id.startsWith('new');

  return (
    <RecordDetail
        title={isNew ? 'New Eviction' : formData.evictionNumber}
        subtitle={tenants.find(t => t.id === formData.tenantId)?.name || 'Unknown Tenant'}
        onClose={onBack}
        onSave={handleSave}
        status={formData.evictionStatus}
        steps={steps}
    >
        <RecordSection title="Core Information">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Eviction Number</label>
                    <input 
                        type="text" 
                        value={formData.evictionNumber || ''} 
                        onChange={e => handleChange('evictionNumber', e.target.value)} 
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 outline-none"
                        disabled={!isNew}
                    />
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Current Status</label>
                    <select 
                        value={formData.evictionStatus || ''} 
                        onChange={e => handleChange('evictionStatus', e.target.value)} 
                        className="w-full p-2 border rounded-md bg-white border-gray-300 focus:ring-1 focus:ring-blue-500 outline-none"
                    >
                        {stageOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Eviction Type</label>
                    <select 
                        value={formData.evictionType || ''} 
                        onChange={e => handleChange('evictionType', e.target.value)} 
                        className="w-full p-2 border rounded-md bg-white border-gray-300 focus:ring-1 focus:ring-blue-500 outline-none"
                    >
                        <option value="Nonpayment of Rent">Nonpayment of Rent</option>
                        <option value="Lease Violation">Lease Violation</option>
                        <option value="Holdover / Staying After Term">Holdover / Staying After Term</option>
                        <option value="Non-Renewal">Non-Renewal</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4 border-t pt-4 mt-2">
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Property *</label>
                        <select 
                            value={formData.propertyId || ''} 
                            onChange={e => handleChange('propertyId', e.target.value)}
                            className={`w-full p-2 border rounded-md bg-white focus:ring-1 focus:ring-blue-500 outline-none ${errors.propertyId ? 'border-red-500' : 'border-gray-300'}`}
                        >
                            <option value="">Select Property</option>
                            {properties.map(p => <option key={p.id} value={p.id}>{p.propertyName}</option>)}
                        </select>
                        {errors.propertyId && <p className="text-xs text-red-500 mt-1">{errors.propertyId}</p>}
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Tenant *</label>
                        <select 
                            value={formData.tenantId || ''} 
                            onChange={e => handleChange('tenantId', e.target.value)}
                            className={`w-full p-2 border rounded-md bg-white focus:ring-1 focus:ring-blue-500 outline-none ${errors.tenantId ? 'border-red-500' : 'border-gray-300'}`}
                        >
                            <option value="">Select Tenant</option>
                            {tenants.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                        </select>
                        {errors.tenantId && <p className="text-xs text-red-500 mt-1">{errors.tenantId}</p>}
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Lease</label>
                        <select 
                            value={formData.leaseId || ''} 
                            onChange={e => handleChange('leaseId', e.target.value)}
                            className="w-full p-2 border rounded-md bg-white border-gray-300 focus:ring-1 focus:ring-blue-500 outline-none"
                        >
                            <option value="">Select Lease</option>
                            {leases.map(l => <option key={l.id} value={l.id}>{l.leaseNumber || l.tenant}</option>)}
                        </select>
                    </div>
                </div>
            </div>
        </RecordSection>

        <RecordSection title="Notice Details">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Notice Type</label>
                    <select 
                        value={formData.noticeType || ''} 
                        onChange={e => handleChange('noticeType', e.target.value)} 
                        className="w-full p-2 border rounded-md bg-white border-gray-300 focus:ring-1 focus:ring-blue-500 outline-none"
                    >
                        <option value="">Select</option>
                        <option value="Pay or Quit">Pay or Quit</option>
                        <option value="Cure or Quit">Cure or Quit</option>
                        <option value="Unconditional Quit">Unconditional Quit</option>
                        <option value="Non-Renewal">Non-Renewal</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Service Method</label>
                    <select 
                        value={formData.noticeServiceMethod || ''} 
                        onChange={e => handleChange('noticeServiceMethod', e.target.value)} 
                        className="w-full p-2 border rounded-md bg-white border-gray-300 focus:ring-1 focus:ring-blue-500 outline-none"
                    >
                        <option value="">Select</option>
                        <option value="In Person">In Person</option>
                        <option value="Posted on Door">Posted on Door</option>
                        <option value="Certified Mail">Certified Mail</option>
                        <option value="Regular Mail">Regular Mail</option>
                        <option value="Email">Email</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Date Served</label>
                    <input 
                        type="date" 
                        value={formData.noticeServedDate || ''} 
                        onChange={e => handleChange('noticeServedDate', e.target.value)} 
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 outline-none" 
                    />
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Cure By Date</label>
                    <input 
                        type="date" 
                        value={formData.noticeCureByDate || ''} 
                        onChange={e => handleChange('noticeCureByDate', e.target.value)} 
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 outline-none" 
                    />
                </div>
                <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Notice Notes</label>
                    <textarea 
                        rows={2}
                        value={formData.noticeNotes || ''} 
                        onChange={e => handleChange('noticeNotes', e.target.value)} 
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 outline-none" 
                    />
                </div>
            </div>
        </RecordSection>

        <RecordSection title="Court & Legal">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Court Name</label>
                    <input type="text" value={formData.courtName || ''} onChange={e => handleChange('courtName', e.target.value)} className="w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Case Number</label>
                    <input type="text" value={formData.caseNumber || ''} onChange={e => handleChange('caseNumber', e.target.value)} className="w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Filing Date</label>
                    <input type="date" value={formData.filingDate || ''} onChange={e => handleChange('filingDate', e.target.value)} className="w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">First Hearing Date</label>
                    <input type="datetime-local" value={formData.firstHearingDate || ''} onChange={e => handleChange('firstHearingDate', e.target.value)} className="w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Judgment Date</label>
                    <input type="date" value={formData.judgmentDate || ''} onChange={e => handleChange('judgmentDate', e.target.value)} className="w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Outcome</label>
                    <select value={formData.judgmentOutcome || ''} onChange={e => handleChange('judgmentOutcome', e.target.value)} className="w-full p-2 border rounded-md bg-white border-gray-300 focus:ring-1 focus:ring-blue-500 outline-none">
                        <option value="">Select</option>
                        <option value="Judgment for Landlord">Judgment for Landlord</option>
                        <option value="Judgment for Tenant">Judgment for Tenant</option>
                        <option value="Settlement">Settlement</option>
                        <option value="Case Dismissed">Case Dismissed</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Attorney Name</label>
                    <input type="text" value={formData.attorneyName || ''} onChange={e => handleChange('attorneyName', e.target.value)} className="w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Lockout Date</label>
                    <input type="date" value={formData.lockoutScheduledDate || ''} onChange={e => handleChange('lockoutScheduledDate', e.target.value)} className="w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 outline-none" />
                </div>
                <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Legal Notes</label>
                    <textarea rows={3} value={formData.legalNotes || ''} onChange={e => handleChange('legalNotes', e.target.value)} className="w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 outline-none" />
                </div>
            </div>
        </RecordSection>

        <RecordSection title="Financials">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Balance at Notice</label>
                    <div className="relative"><span className="absolute left-3 top-2 text-gray-500">$</span>
                    <input type="number" value={formData.balanceAtNotice || ''} onChange={e => handleChange('balanceAtNotice', parseFloat(e.target.value))} className="w-full p-2 pl-6 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 outline-none" />
                    </div>
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Balance at Filing</label>
                    <div className="relative"><span className="absolute left-3 top-2 text-gray-500">$</span>
                    <input type="number" value={formData.balanceAtFiling || ''} onChange={e => handleChange('balanceAtFiling', parseFloat(e.target.value))} className="w-full p-2 pl-6 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 outline-none" />
                    </div>
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Rent Portion Due</label>
                    <div className="relative"><span className="absolute left-3 top-2 text-gray-500">$</span>
                    <input type="number" value={formData.rentPortionDue || ''} onChange={e => handleChange('rentPortionDue', parseFloat(e.target.value))} className="w-full p-2 pl-6 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 outline-none" />
                    </div>
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Late Fees Due</label>
                    <div className="relative"><span className="absolute left-3 top-2 text-gray-500">$</span>
                    <input type="number" value={formData.lateFeesPortionDue || ''} onChange={e => handleChange('lateFeesPortionDue', parseFloat(e.target.value))} className="w-full p-2 pl-6 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 outline-none" />
                    </div>
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Court Costs Advanced</label>
                    <div className="relative"><span className="absolute left-3 top-2 text-gray-500">$</span>
                    <input type="number" value={formData.courtCostsAdvanced || ''} onChange={e => handleChange('courtCostsAdvanced', parseFloat(e.target.value))} className="w-full p-2 pl-6 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 outline-none" />
                    </div>
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Attorney Fees Advanced</label>
                    <div className="relative"><span className="absolute left-3 top-2 text-gray-500">$</span>
                    <input type="number" value={formData.attorneyFeesAdvanced || ''} onChange={e => handleChange('attorneyFeesAdvanced', parseFloat(e.target.value))} className="w-full p-2 pl-6 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 outline-none" />
                    </div>
                </div>
            </div>
        </RecordSection>

        <RecordSection title="Resolution">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Amount Collected</label>
                    <div className="relative"><span className="absolute left-3 top-2 text-gray-500">$</span>
                    <input type="number" value={formData.amountCollectedDuringEviction || ''} onChange={e => handleChange('amountCollectedDuringEviction', parseFloat(e.target.value))} className="w-full p-2 pl-6 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 outline-none" />
                    </div>
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Write Off Amount</label>
                    <div className="relative"><span className="absolute left-3 top-2 text-gray-500">$</span>
                    <input type="number" value={formData.writeOffAmount || ''} onChange={e => handleChange('writeOffAmount', parseFloat(e.target.value))} className="w-full p-2 pl-6 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 outline-none" />
                    </div>
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Move Out Date</label>
                    <input type="date" value={formData.moveOutDate || ''} onChange={e => handleChange('moveOutDate', e.target.value)} className="w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Unit Condition</label>
                    <select value={formData.unitConditionOnMoveOut || ''} onChange={e => handleChange('unitConditionOnMoveOut', e.target.value)} className="w-full p-2 border rounded-md bg-white border-gray-300 focus:ring-1 focus:ring-blue-500 outline-none">
                        <option value="">Select</option>
                        <option value="Good">Good</option>
                        <option value="Fair">Fair</option>
                        <option value="Poor">Poor</option>
                        <option value="Severe Damage">Severe Damage</option>
                    </select>
                </div>
                <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Turnover Notes</label>
                    <textarea rows={3} value={formData.turnoverNotes || ''} onChange={e => handleChange('turnoverNotes', e.target.value)} className="w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 outline-none" />
                </div>
            </div>
        </RecordSection>
    </RecordDetail>
  );
};

export default EvictionDetailView;
