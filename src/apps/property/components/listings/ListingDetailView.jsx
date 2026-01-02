import React, { useState, useEffect } from 'react';
import RecordDetail from '../../../../components/common/RecordDetail';
import RecordSection from '../../../../components/common/RecordSection';

const ListingDetailView = ({ listing, properties = [], onBack, onSave }) => {
  const [formData, setFormData] = useState(listing);

  useEffect(() => {
    setFormData(listing);
  }, [listing]);

  const steps = [
    { label: 'Draft', status: formData.status === 'Draft' ? 'current' : (['Draft'].includes(formData.status) ? 'current' : 'completed') },
    { label: 'Published', status: formData.status === 'Active' ? 'current' : (['Draft', 'Active'].includes(formData.status) ? 'upcoming' : 'completed') },
    { label: 'Leased', status: formData.status === 'Leased' ? 'completed' : 'upcoming' },
  ];

  return (
    <RecordDetail
        title={formData.property ? `Listing for ${formData.property}` : 'New Listing'}
        subtitle={formData.price ? `$${formData.price}/mo • Listed on ${formData.listedDate}` : 'Draft Listing'}
        onClose={onBack}
        onSave={() => onSave && onSave(formData)}
        status={formData.status}
        steps={steps}
    >
        <RecordSection title="Listing Information">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Property & Date */}
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Property</label>
                    <select 
                        value={formData.property} 
                        onChange={(e) => setFormData({...formData, property: e.target.value})}
                        className="w-full p-2 border border-gray-300 rounded text-sm bg-white focus:ring-1 focus:ring-blue-500 outline-none"
                    >
                        <option value="">Select Property</option>
                        {properties.map(p => (
                            <option key={p.id} value={p.propertyName}>{p.propertyName}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Date Listed</label>
                    <input type="date" value={formData.listedDate} onChange={(e) => setFormData({...formData, listedDate: e.target.value})} className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none" />
                </div>

                {/* Headline - Full Width */}
                <div className="md:col-span-2">
                     <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Headline</label>
                     <input type="text" placeholder="e.g. Spacious 2 Bed / 1 Bath in Downtown" value={formData.headline || ''} onChange={(e) => setFormData({...formData, headline: e.target.value})} className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none" />
                </div>
                
                {/* Rent & Status */}
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Monthly Rent</label>
                    <div className="relative">
                        <span className="absolute left-3 top-2 text-gray-500">$</span>
                        <input type="number" value={formData.price} onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value)})} className="w-full p-2 pl-6 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none" />
                    </div>
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Status</label>
                    <select 
                        value={formData.status} 
                        onChange={(e) => setFormData({...formData, status: e.target.value})}
                        className="w-full p-2 border border-gray-300 rounded text-sm bg-white focus:ring-1 focus:ring-blue-500 outline-none"
                    >
                        <option>Draft</option>
                        <option>Active</option>
                        <option>Off-market</option>
                        <option>Leased</option>
                    </select>
                </div>

                {/* Image URL - Full Width */}
                <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Listing Image URL</label>
                    <div className="flex gap-4">
                        <input 
                            type="text" 
                            value={formData.imageUrl || ''} 
                            onChange={(e) => setFormData({...formData, imageUrl: e.target.value})} 
                            placeholder="https://example.com/listing-image.jpg"
                            className="flex-1 p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none" 
                        />
                        {formData.imageUrl && (
                            <div className="w-16 h-16 rounded overflow-hidden border border-gray-200 bg-gray-100 flex-shrink-0">
                                <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                            </div>
                        )}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">This image will appear on public listing sites.</p>
                </div>

                {/* Description - Full Width */}
                 <div className="md:col-span-2">
                     <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Description</label>
                     <textarea rows={6} className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none" placeholder="Describe the unit features, neighborhood, etc..." value={formData.description || ''} onChange={(e) => setFormData({...formData, description: e.target.value})}></textarea>
                </div>
            </div>
        </RecordSection>

        <RecordSection title="Syndication & Marketing">
             <div className="grid grid-cols-1 gap-2">
                 <label className="flex items-center space-x-3 p-3 border rounded hover:bg-gray-50">
                     <input type="checkbox" defaultChecked className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                     <span className="text-sm font-medium text-gray-700">Zillow Rental Manager</span>
                 </label>
                 <label className="flex items-center space-x-3 p-3 border rounded hover:bg-gray-50">
                     <input type="checkbox" defaultChecked className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                     <span className="text-sm font-medium text-gray-700">Apartments.com</span>
                 </label>
                  <label className="flex items-center space-x-3 p-3 border rounded hover:bg-gray-50">
                     <input type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                     <span className="text-sm font-medium text-gray-700">Facebook Marketplace</span>
                 </label>
             </div>
        </RecordSection>
    </RecordDetail>
  );
};

export default ListingDetailView;

