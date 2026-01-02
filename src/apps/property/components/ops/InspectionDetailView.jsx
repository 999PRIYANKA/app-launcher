import React, { useState, useEffect } from 'react';
import RecordDetail from '../../../../components/common/RecordDetail';
import RecordSection from '../../../../components/common/RecordSection';

const InspectionDetailView = ({ inspection, onBack, onSave }) => {
  const [formData, setFormData] = useState(inspection);

  useEffect(() => {
    setFormData(inspection);
  }, [inspection]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveClick = () => {
    if (onSave) {
        onSave(formData);
    }
  };

  return (
    <RecordDetail
        title={formData.id ? `${formData.type} Inspection` : 'New Inspection'}
        subtitle={formData.inspectionNumber ? `${formData.inspectionNumber} • ${formData.property || ''}` : 'Draft'}
        onClose={onBack}
        onSave={handleSaveClick}
        status={formData.status}
    >
        <RecordSection title="Inspection Summary">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div>
                     <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Inspection Number</label>
                     <input 
                        type="text" 
                        value={formData.inspectionNumber} 
                        className="w-full p-2 border border-gray-300 rounded text-sm bg-gray-50 focus:ring-1 focus:ring-blue-500 outline-none" 
                        disabled 
                    />
                </div>
                 <div>
                     <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Inspection Type</label>
                     <select 
                        value={formData.type} 
                        onChange={(e) => handleChange('type', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded text-sm bg-white focus:ring-1 focus:ring-blue-500 outline-none"
                    >
                        <option>Move-In</option>
                        <option>Move-Out</option>
                        <option>Annual</option>
                        <option>Drive-By</option>
                        <option>Safety</option>
                        <option>Other</option>
                     </select>
                </div>
                 <div>
                     <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Status</label>
                     <select 
                        value={formData.status} 
                        onChange={(e) => handleChange('status', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded text-sm bg-white focus:ring-1 focus:ring-blue-500 outline-none"
                    >
                        <option>Scheduled</option>
                        <option>In Progress</option>
                        <option>Completed</option>
                        <option>Cancelled</option>
                        <option>No-Show</option>
                     </select>
                </div>
                <div>
                     <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Inspector</label>
                     <input 
                        type="text" 
                        value={formData.inspector || ''} 
                        onChange={(e) => handleChange('inspector', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none" 
                    />
                </div>
                 <div>
                     <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Checklist Template</label>
                     <input 
                        type="text" 
                        value={formData.checklistTemplate || ''} 
                        onChange={(e) => handleChange('checklistTemplate', e.target.value)}
                        placeholder="Search templates..." 
                        className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none" 
                    />
                </div>
            </div>
        </RecordSection>

        <RecordSection title="Location & Lease">
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
                     <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Related Lease</label>
                     <input 
                        type="text" 
                        value={formData.lease || ''} 
                        onChange={(e) => handleChange('lease', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none" 
                    />
                </div>
            </div>
        </RecordSection>

        <RecordSection title="Scheduling">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div>
                     <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Scheduled Date & Time</label>
                     <input 
                        type="datetime-local" 
                        value={formData.scheduledDate || ''} 
                        onChange={(e) => handleChange('scheduledDate', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none" 
                    />
                </div>
                 <div>
                     <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Completed Date & Time</label>
                     <input 
                        type="datetime-local" 
                        value={formData.completedDate || ''} 
                        onChange={(e) => handleChange('completedDate', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none" 
                    />
                </div>
             </div>
        </RecordSection>

        <RecordSection title="Findings & Conditions">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div>
                     <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Overall Condition</label>
                     <select 
                        value={formData.overallCondition || 'Good'} 
                        onChange={(e) => handleChange('overallCondition', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded text-sm bg-white focus:ring-1 focus:ring-blue-500 outline-none"
                    >
                        <option>Excellent</option>
                        <option>Good</option>
                        <option>Fair</option>
                        <option>Poor</option>
                     </select>
                </div>
                 <div>
                     <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Cleanliness Rating</label>
                     <select 
                        value={formData.cleanlinessRating || 'Good'} 
                        onChange={(e) => handleChange('cleanlinessRating', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded text-sm bg-white focus:ring-1 focus:ring-blue-500 outline-none"
                    >
                        <option>Excellent</option>
                        <option>Good</option>
                        <option>Fair</option>
                        <option>Poor</option>
                     </select>
                </div>
                 <div>
                     <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Damage Severity</label>
                     <select 
                        value={formData.damageSeverity || 'None'} 
                        onChange={(e) => handleChange('damageSeverity', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded text-sm bg-white focus:ring-1 focus:ring-blue-500 outline-none"
                    >
                        <option>None</option>
                        <option>Minor</option>
                        <option>Moderate</option>
                        <option>Major</option>
                     </select>
                </div>
            </div>
            <div className="mt-4">
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">General Notes</label>
                <textarea 
                    rows={4} 
                    value={formData.notes || ''} 
                    onChange={(e) => handleChange('notes', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none" 
                    placeholder="Enter detailed findings..."
                ></textarea>
            </div>
        </RecordSection>

        <RecordSection title="Follow Up">
             <div className="flex items-center mb-4">
                <input 
                    type="checkbox" 
                    checked={formData.followUpRequired || false} 
                    onChange={(e) => handleChange('followUpRequired', e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mr-2" 
                />
                <label className="text-sm font-medium text-gray-700">Follow-Up Required?</label>
             </div>
             <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Follow-Up Summary</label>
                <textarea 
                    rows={3} 
                    value={formData.followUpSummary || ''} 
                    onChange={(e) => handleChange('followUpSummary', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none" 
                    placeholder="Describe next steps..."
                ></textarea>
             </div>
        </RecordSection>
    </RecordDetail>
  );
};

export default InspectionDetailView;

