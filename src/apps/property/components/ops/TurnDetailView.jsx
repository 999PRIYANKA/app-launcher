import React, { useState, useEffect } from 'react';
import RecordDetail from '../../../../components/common/RecordDetail';
import RecordSection from '../../../../components/common/RecordSection';
import * as Icons from '../../../../constants/icons';

const TurnDetailView = ({ 
    turn, 
    relatedWorkOrders = [], 
    onBack, 
    onSave,
    onCreateWorkOrder,
    onViewWorkOrder
}) => {
  const [formData, setFormData] = useState(turn);

  useEffect(() => {
    setFormData(turn);
  }, [turn]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveClick = () => {
    if (onSave) {
        onSave(formData);
    }
  };

  const steps = [
    { label: 'Planned', status: formData.status === 'Planned' ? 'current' : (['Planned'].includes(formData.status) ? 'current' : 'completed') },
    { label: 'Scoping', status: formData.status === 'Scoping' ? 'current' : (['Planned', 'Scoping'].includes(formData.status) ? 'upcoming' : 'completed') },
    { label: 'In Progress', status: formData.status === 'In Progress' ? 'current' : (['Planned', 'Scoping', 'In Progress'].includes(formData.status) ? 'upcoming' : 'completed') },
    { label: 'Completed', status: formData.status === 'Completed' ? 'completed' : 'upcoming' },
  ];

  return (
    <RecordDetail
        title={formData.id ? `Turn: ${formData.unit || 'New Unit'}` : 'New Turn / Make-Ready'}
        subtitle={formData.turnNumber ? `${formData.turnNumber} • ${formData.property || ''}` : 'Draft'}
        onClose={onBack}
        onSave={handleSaveClick}
        status={formData.status}
        steps={steps}
    >
        {/* KPI Panel for Rollups */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
             <h3 className="text-xs font-bold text-blue-800 uppercase tracking-wide mb-3">Project Financials & Status (System Calculated)</h3>
             <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
                <div>
                     <p className="text-xs text-blue-600 mb-1">Est. Cost</p>
                     <p className="text-lg font-bold text-gray-800">${formData.totalEstimatedCost || 0}</p>
                </div>
                <div>
                     <p className="text-xs text-blue-600 mb-1">Actual Cost</p>
                     <p className="text-lg font-bold text-gray-800">${formData.totalActualCost || 0}</p>
                </div>
                <div>
                     <p className="text-xs text-blue-600 mb-1">Total WOs</p>
                     <p className="text-lg font-bold text-gray-800">{formData.totalWorkOrders || 0}</p>
                </div>
                 <div>
                     <p className="text-xs text-blue-600 mb-1">Open WOs</p>
                     <p className="text-lg font-bold text-orange-600">{formData.openWorkOrders || 0}</p>
                </div>
                 <div>
                     <p className="text-xs text-blue-600 mb-1">Completed</p>
                     <p className="text-lg font-bold text-green-600">{formData.completedWorkOrders || 0}</p>
                </div>
             </div>
        </div>

        <RecordSection title="Turn Summary">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div>
                     <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Turn Number</label>
                     <input 
                        type="text" 
                        value={formData.turnNumber} 
                        className="w-full p-2 border border-gray-300 rounded text-sm bg-gray-50 focus:ring-1 focus:ring-blue-500 outline-none" 
                        disabled 
                    />
                </div>
                <div>
                     <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Status</label>
                     <select 
                        value={formData.status} 
                        onChange={(e) => handleChange('status', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded text-sm bg-white focus:ring-1 focus:ring-blue-500 outline-none"
                    >
                        <option>Planned</option>
                        <option>Scoping</option>
                        <option>In Progress</option>
                        <option>On Hold</option>
                        <option>Completed</option>
                        <option>Cancelled</option>
                     </select>
                </div>
                 <div>
                     <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Turn Type</label>
                     <select 
                        value={formData.type || 'Standard'} 
                        onChange={(e) => handleChange('type', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded text-sm bg-white focus:ring-1 focus:ring-blue-500 outline-none"
                    >
                        <option>Standard</option>
                        <option>Heavy</option>
                        <option>Renovation</option>
                        <option>Cleaning-Only</option>
                        <option>Touch-Up</option>
                     </select>
                </div>
                 <div>
                     <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Priority</label>
                     <select 
                        value={formData.priority || 'Medium'} 
                        onChange={(e) => handleChange('priority', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded text-sm bg-white focus:ring-1 focus:ring-blue-500 outline-none"
                    >
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                        <option>Rush</option>
                     </select>
                </div>
                 <div>
                     <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Turn Owner / Manager</label>
                     <input 
                        type="text" 
                        value={formData.manager || ''} 
                        onChange={(e) => handleChange('manager', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none" 
                    />
                </div>
            </div>
        </RecordSection>

        {/* Related Work Orders Table */}
        <RecordSection title="Related Work Orders">
             <div className="flex justify-end mb-3">
                <button 
                    onClick={onCreateWorkOrder}
                    className="flex items-center text-sm font-semibold text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-3 py-1.5 rounded transition-colors"
                >
                    <Icons.PlusCircleIcon className="w-4 h-4 mr-1.5" />
                    Add Work Order
                </button>
             </div>
             {relatedWorkOrders.length > 0 ? (
                 <div className="overflow-x-auto border rounded-md">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">WO #</th>
                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Est. Cost</th>
                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Act. Cost</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {relatedWorkOrders.map((wo) => (
                                <tr key={wo.id} className="hover:bg-gray-50">
                                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700">{wo.workOrderNumber}</td>
                                    <td className="px-3 py-2 whitespace-nowrap text-sm font-medium">
                                        <button 
                                            onClick={() => onViewWorkOrder && onViewWorkOrder(wo)}
                                            className="text-blue-600 hover:underline hover:text-blue-800 text-left"
                                        >
                                            {wo.title}
                                        </button>
                                    </td>
                                    <td className="px-3 py-2 whitespace-nowrap text-sm">
                                         <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                            ${wo.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}
                                        `}>
                                            {wo.status}
                                        </span>
                                    </td>
                                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700">${wo.estimatedCost || 0}</td>
                                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700">${wo.actualCost || 0}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                 </div>
             ) : (
                 <div className="text-center py-8 text-gray-500 text-sm border-2 border-dashed border-gray-200 rounded-lg">
                     <p>No work orders associated with this turn.</p>
                     <button onClick={onCreateWorkOrder} className="text-blue-500 font-medium hover:underline mt-1">Create one now</button>
                 </div>
             )}
        </RecordSection>

        <RecordSection title="Location & Leases">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="col-span-1 md:col-span-2">
                     <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Property</label>
                     <input 
                        type="text" 
                        value={formData.property || ''} 
                        onChange={(e) => handleChange('property', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none" 
                    />
                </div>
                 <div>
                     <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Unit / Suite</label>
                     <input 
                        type="text" 
                        value={formData.unit || ''} 
                        onChange={(e) => handleChange('unit', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none" 
                    />
                </div>
                 <div>
                     <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Outgoing Lease</label>
                     <input 
                        type="text" 
                        value={formData.outgoingLease || ''} 
                        onChange={(e) => handleChange('outgoingLease', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none" 
                    />
                </div>
                 <div>
                     <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Incoming Lease</label>
                     <input 
                        type="text" 
                        value={formData.incomingLease || ''} 
                        onChange={(e) => handleChange('incomingLease', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none" 
                    />
                </div>
            </div>
        </RecordSection>

        <RecordSection title="Schedule">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div>
                     <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Move-Out Date</label>
                     <input 
                        type="date" 
                        value={formData.moveOutDate || ''} 
                        onChange={(e) => handleChange('moveOutDate', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none" 
                    />
                </div>
                 <div>
                     <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Target Ready Date</label>
                     <input 
                        type="date" 
                        value={formData.targetReadyDate || ''} 
                        onChange={(e) => handleChange('targetReadyDate', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none" 
                    />
                </div>
                 <div>
                     <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Actual Ready Date</label>
                     <input 
                        type="date" 
                        value={formData.actualReadyDate || ''} 
                        onChange={(e) => handleChange('actualReadyDate', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none" 
                    />
                </div>
                 <div>
                     <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Target Move-In Date</label>
                     <input 
                        type="date" 
                        value={formData.targetMoveInDate || ''} 
                        onChange={(e) => handleChange('targetMoveInDate', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none" 
                    />
                </div>
             </div>
        </RecordSection>

        <RecordSection title="Budget">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div>
                     <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Budget Amount</label>
                     <div className="relative">
                        <span className="absolute left-3 top-2 text-gray-500">$</span>
                        <input 
                            type="number" 
                            value={formData.budget || 0} 
                            onChange={(e) => handleChange('budget', parseFloat(e.target.value))}
                            className="w-full p-2 pl-6 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none" 
                        />
                     </div>
                </div>
             </div>
        </RecordSection>

        <RecordSection title="Scope & Notes">
            <div className="mb-4">
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Scope of Work Summary</label>
                <textarea 
                    rows={4} 
                    value={formData.scopeOfWork || ''} 
                    onChange={(e) => handleChange('scopeOfWork', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none" 
                    placeholder="Describe scope of work..."
                ></textarea>
            </div>
            <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Internal Notes</label>
                <textarea 
                    rows={3} 
                    value={formData.internalNotes || ''} 
                    onChange={(e) => handleChange('internalNotes', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none"
                ></textarea>
            </div>
        </RecordSection>
    </RecordDetail>
  );
};

export default TurnDetailView;

