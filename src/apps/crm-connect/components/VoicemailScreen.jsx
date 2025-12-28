import React from 'react';
import { useCRMConnect } from '../../../contexts/CRMConnectContext';

const VoicemailScreen = ({ onCall }) => {
  const { voicemails } = useCRMConnect();

  // Mock data if voicemails are empty
  const mockVoicemails = voicemails.length > 0 ? voicemails : [
    { id: 1, name: 'Jane Cooper', number: '555-123-4567', duration: '0:32', date: 'Yesterday' },
    { id: 2, number: '555-987-6543', duration: '1:15', date: 'Friday' },
    { id: 3, name: 'John Smith', number: '555-555-1212', duration: '0:45', date: 'Friday' },
  ];

  return (
    <div className="h-full bg-white">
      <ul>
        {mockVoicemails.map((vm) => (
          <li key={vm.id} className="px-8 py-7 border-b border-gray-100 hover:bg-gray-50 transition-colors">
            <button onClick={() => onCall(vm.number)} className="w-full text-left group">
                <div className="flex justify-between items-center mb-2">
                    <p className="text-3xl text-slate-900 font-semibold group-hover:text-blue-600 transition-colors">{vm.name || vm.number}</p>
                    <span className="text-lg text-gray-400">{vm.date}</span>
                </div>
                <div className="flex justify-between items-center">
                    <p className="text-xl text-gray-500">{vm.name ? vm.number : 'Unknown'}</p>
                    <p className="text-lg text-gray-400 bg-gray-100 px-4 py-1.5 rounded-full">{vm.duration}</p>
                </div>
            </button>
          </li>
        ))}
      </ul>
      <div className="text-center text-gray-400 mt-12 text-lg font-medium">
        <p>{mockVoicemails.length} Voicemails</p>
      </div>
    </div>
  );
};

export default VoicemailScreen;

