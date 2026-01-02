import React, { useState } from 'react';
import OwnerDrawList from '../components/accounting/Owner/OwnerDrawList';
import OwnerDrawDetailView from '../components/accounting/Owner/OwnerDrawDetailView';
import * as Icons from '../../../constants/icons';

const OwnerAccountingPage = () => {
  const [activeTab, setActiveTab] = useState('Owner Draws');
  const [draws, setDraws] = useState([
      {
          id: '1', 
          drawNumber: 'DRW-001', 
          ownerEntityId: 'o1', 
          ownerName: 'Smith Holdings LLC', 
          date: '2024-02-15', 
          amount: 5000, 
          status: 'Paid'
      }
  ]);
  const [selectedDraw, setSelectedDraw] = useState(null);

  return (
    <div className="relative h-full flex flex-col">
       <div className="bg-white border-b px-6 pt-4">
        <div className="flex space-x-8">
            <button 
                className={`pb-4 text-sm font-medium border-b-2 transition-colors flex items-center ${activeTab === 'Owner Draws' ? 'border-brand-teal text-brand-dark-blue' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                onClick={() => setActiveTab('Owner Draws')}
            >
                <Icons.BanknotesIcon className="w-5 h-5 mr-2" />
                Owner Draws
            </button>
            <button 
                className={`pb-4 text-sm font-medium border-b-2 transition-colors flex items-center ${activeTab === 'Property Shares' ? 'border-brand-teal text-brand-dark-blue' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                onClick={() => setActiveTab('Property Shares')}
            >
                <Icons.BriefcaseIcon className="w-5 h-5 mr-2" />
                Property Shares
            </button>
        </div>
      </div>
      <div className="flex-1 overflow-hidden relative">
          {activeTab === 'Owner Draws' ? (
              <>
                <OwnerDrawList 
                    draws={draws}
                    onAddClick={() => {
                        const newDraw = { 
                            id: Math.random().toString(36).substr(2, 9), 
                            drawNumber: 'New', 
                            ownerEntityId: '', 
                            ownerName: '', 
                            date: '', 
                            amount: 0, 
                            status: 'Draft' 
                        };
                        setSelectedDraw(newDraw);
                    }}
                    onSelect={setSelectedDraw}
                />
                {selectedDraw && (
                    <OwnerDrawDetailView 
                        draw={selectedDraw}
                        onBack={() => setSelectedDraw(null)}
                        onSave={(d) => {
                             const idx = draws.findIndex(x => x.id === d.id);
                             if (idx >= 0) {
                                 const updated = [...draws];
                                 updated[idx] = d;
                                 setDraws(updated);
                             } else {
                                 setDraws([...draws, d]);
                             }
                             setSelectedDraw(null);
                        }}
                    />
                )}
              </>
          ) : (
              <div className="p-10 text-center text-gray-500">Property Shares Management (Not Implemented in Demo)</div>
          )}
      </div>
    </div>
  );
};

export default OwnerAccountingPage;

