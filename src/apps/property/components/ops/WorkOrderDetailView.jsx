import React, { useState, useEffect } from 'react';
import RecordDetail from '../../../../components/common/RecordDetail';
import RecordSection from '../../../../components/common/RecordSection';

const WorkOrderDetailView = ({ workOrder, availableTurns = [], properties = [], onBack, onSave }) => {
  const [formData, setFormData] = useState(workOrder);

  useEffect(() => {
    setFormData(workOrder);
  }, [workOrder]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveClick = () => {
    if (onSave) {
        onSave(formData);
    }
  };

  const steps = [
    { label: 'New', status: formData.status === 'New' ? 'current' : (['New'].includes(formData.status) ? 'current' : 'completed') },
    { label: 'Scheduled', status: formData.status === 'Scheduled' ? 'current' : (['New', 'Triaged', 'Scheduled'].includes(formData.status) ? 'upcoming' : 'completed') },
    { label: 'In Progress', status: formData.status === 'In Progress' ? 'current' : (['New', 'Triaged', 'Scheduled', 'In Progress'].includes(formData.status) ? 'upcoming' : 'completed') },
    { label: 'Completed', status: formData.status === 'Completed' ? 'completed' : 'upcoming' },
  ];

  return (
    <RecordDetail
        title={formData.title || 'New Work Order'}
        subtitle={`${formData.workOrderNumber} • ${formData.property || ''}`}
        onClose={onBack}
        onSave={handleSaveClick}
        status={formData.status}
        steps={steps}
    >
        <RecordSection title="Summary">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-1 md:col-span-2">
                     <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Work Order Title / Summary</label>
                     <input 
                        type="text" 
                        value={formData.title} 
                        onChange={(e) => handleChange('title', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none" 
                     />
                </div>
                <div>
                     <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Work Order Number</label>
                     <input type="text" value={formData.workOrderNumber} className="w-full p-2 border border-gray-300 rounded text-sm bg-gray-50 focus:ring-1 focus:ring-blue-500 outline-none" disabled />
                </div>
                <div>
                     <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Status</label>
                     <select 
                        value={formData.status} 
                        onChange={(e) => handleChange('status', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded text-sm bg-white focus:ring-1 focus:ring-blue-500 outline-none"
                    >
                        <option>New</option>
                        <option>Triaged</option>
                        <option>Scheduled</option>
                        <option>In Progress</option>
                        <option>On Hold</option>
                        <option>Completed</option>
                        <option>Cancelled</option>
                     </select>
                </div>
                <div>
                     <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Priority</label>
                     <select 
                        value={formData.priority}
                        onChange={(e) => handleChange('priority', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded text-sm bg-white focus:ring-1 focus:ring-blue-500 outline-none"
                    >
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                        <option>Emergency</option>
                     </select>
                </div>
                <div>
                     <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Category</label>
                     <select 
                        value={formData.category} 
                        onChange={(e) => handleChange('category', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded text-sm bg-white focus:ring-1 focus:ring-blue-500 outline-none"
                    >
                        <option>Plumbing</option>
                        <option>Electrical</option>
                        <option>HVAC</option>
                        <option>Appliance</option>
                        <option>General</option>
                        <option>Other</option>
                     </select>
                </div>
                 <div>
                     <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Work Order Type</label>
                     <select 
                        value={formData.type || 'Standard'} 
                        onChange={(e) => handleChange('type', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded text-sm bg-white focus:ring-1 focus:ring-blue-500 outline-none"
                    >
                        <option>Standard</option>
                        <option>Turn</option>
                        <option>Preventive</option>
                        <option>Inspection Follow-Up</option>
                        <option>Capital</option>
                     </select>
                </div>
            </div>
        </RecordSection>

        {/* Project Association */}
        <RecordSection title="Project Association">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="col-span-1 md:col-span-2">
                     <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Related Turn / Make-Ready</label>
                     <select 
                        value={formData.turnId || ''} 
                        onChange={(e) => handleChange('turnId', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded text-sm bg-white focus:ring-1 focus:ring-blue-500 outline-none"
                     >
                        <option value="">-- None --</option>
                        {availableTurns.map(turn => (
                            <option key={turn.id} value={turn.id}>{turn.turnNumber} - {turn.unit} ({turn.status})</option>
                        ))}
                     </select>
                     <p className="text-xs text-gray-500 mt-1">Associate this work order with a parent project.</p>
                </div>
             </div>
        </RecordSection>

        <RecordSection title="Location & Reporter">
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
                     <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Unit / Suite</label>
                     <input type="text" value={formData.unit || ''} onChange={(e) => handleChange('unit', e.target.value)} className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none" />
                </div>
                 <div>
                     <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Related Lease</label>
                     <input type="text" value={formData.lease || ''} onChange={(e) => handleChange('lease', e.target.value)} className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none" />
                </div>
                 <div>
                     <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Reported By</label>
                     <input type="text" value={formData.reportedBy || ''} onChange={(e) => handleChange('reportedBy', e.target.value)} className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none" />
                </div>
                 <div>
                     <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Reporter Type</label>
                     <select value={formData.reporterType || ''} onChange={(e) => handleChange('reporterType', e.target.value)} className="w-full p-2 border border-gray-300 rounded text-sm bg-white focus:ring-1 focus:ring-blue-500 outline-none">
                        <option value="">Select</option>
                        <option>Tenant</option>
                        <option>Employee</option>
                        <option>Owner</option>
                        <option>Other</option>
                     </select>
                </div>
                 <div>
                     <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Request Source</label>
                     <select value={formData.requestSource || ''} onChange={(e) => handleChange('requestSource', e.target.value)} className="w-full p-2 border border-gray-300 rounded text-sm bg-white focus:ring-1 focus:ring-blue-500 outline-none">
                        <option value="">Select</option>
                        <option>Phone</option>
                        <option>Portal</option>
                        <option>Email</option>
                        <option>Text</option>
                        <option>Internal</option>
                     </select>
                </div>
             </div>
        </RecordSection>

        <RecordSection title="Assignment & Scheduling">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div>
                     <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Assigned To (Internal)</label>
                     <input type="text" value={formData.assignedTo || ''} onChange={(e) => handleChange('assignedTo', e.target.value)} className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none" />
                </div>
                 <div>
                     <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Vendor / Contractor</label>
                     <input type="text" value={formData.vendor || ''} onChange={(e) => handleChange('vendor', e.target.value)} className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none" />
                </div>
                 <div>
                     <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Scheduled Start</label>
                     <input type="datetime-local" value={formData.scheduledStart || ''} onChange={(e) => handleChange('scheduledStart', e.target.value)} className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none" />
                </div>
                 <div>
                     <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Due Date</label>
                     <input type="date" value={formData.dueDate || ''} onChange={(e) => handleChange('dueDate', e.target.value)} className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none" />
                </div>
                 <div>
                     <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Completed Date</label>
                     <input type="datetime-local" value={formData.completedDate || ''} onChange={(e) => handleChange('completedDate', e.target.value)} className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none" />
                </div>
             </div>
        </RecordSection>

        <RecordSection title="Access">
            <div className="grid grid-cols-1 gap-4">
                <div>
                     <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Entry Permission</label>
                     <select value={formData.entryPermission || 'Ok to Enter'} onChange={(e) => handleChange('entryPermission', e.target.value)} className="w-full p-2 border border-gray-300 rounded text-sm bg-white focus:ring-1 focus:ring-blue-500 outline-none">
                        <option>Ok to Enter</option>
                        <option>Call First</option>
                        <option>Tenant Must Be Present</option>
                     </select>
                </div>
                 <div>
                     <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Entry Notes</label>
                     <input type="text" value={formData.entryNotes || ''} onChange={(e) => handleChange('entryNotes', e.target.value)} placeholder="e.g. Gate code 1234, Dog in backyard" className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none" />
                </div>
            </div>
        </RecordSection>

        <RecordSection title="Financials">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div>
                     <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Estimated Cost</label>
                     <div className="relative">
                        <span className="absolute left-3 top-2 text-gray-500">$</span>
                        <input 
                            type="number" 
                            value={formData.estimatedCost || ''} 
                            onChange={(e) => handleChange('estimatedCost', parseFloat(e.target.value))}
                            className="w-full p-2 pl-6 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none" 
                        />
                     </div>
                </div>
                 <div>
                     <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Actual Cost</label>
                     <div className="relative">
                        <span className="absolute left-3 top-2 text-gray-500">$</span>
                        <input 
                            type="number" 
                            value={formData.actualCost || ''} 
                            onChange={(e) => handleChange('actualCost', parseFloat(e.target.value))}
                            className="w-full p-2 pl-6 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none" 
                        />
                     </div>
                </div>
                 <div>
                     <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Bill To</label>
                     <select value={formData.billTo || ''} onChange={(e) => handleChange('billTo', e.target.value)} className="w-full p-2 border border-gray-300 rounded text-sm bg-white focus:ring-1 focus:ring-blue-500 outline-none">
                        <option value="">Select</option>
                        <option>Owner</option>
                        <option>Tenant</option>
                        <option>Company</option>
                        <option>Shared</option>
                     </select>
                </div>
                 <div>
                     <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Tenant Charge Amount</label>
                     <div className="relative">
                        <span className="absolute left-3 top-2 text-gray-500">$</span>
                        <input 
                            type="number" 
                            value={formData.tenantChargeAmount || ''} 
                            onChange={(e) => handleChange('tenantChargeAmount', parseFloat(e.target.value))}
                            className="w-full p-2 pl-6 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none" 
                        />
                     </div>
                </div>
             </div>
        </RecordSection>

        <RecordSection title="Notes">
             <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Description</label>
                <textarea rows={3} value={formData.description || ''} onChange={(e) => handleChange('description', e.target.value)} className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none mb-4"></textarea>
             </div>
             <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Internal Notes</label>
                <textarea rows={3} value={formData.internalNotes || ''} onChange={(e) => handleChange('internalNotes', e.target.value)} className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none"></textarea>
             </div>
        </RecordSection>
    </RecordDetail>
  );
};

export default WorkOrderDetailView;

