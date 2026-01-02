import React from 'react';
import { ArrowUpRightIcon, ArrowDownLeftIcon, InformationCircleIcon } from '../../../constants/icons';
import { useCRMConnect } from '../../../contexts/CRMConnectContext';

const CallTypeIcon = ({ type }) => {
  if (type === 'outgoing') {
    return <ArrowUpRightIcon className="w-6 h-6 text-gray-400" />;
  }
  if (type === 'incoming') {
    return <ArrowDownLeftIcon className="w-6 h-6 text-gray-400" />;
  }
  return null;
};

const RecentsScreen = ({ onCall }) => {
  const { recents } = useCRMConnect();

  // Mock data if recents are empty
  const mockRecents = recents.length > 0 ? recents : [
    { id: 1, name: 'Jane Cooper', number: '555-123-4567', type: 'missed', time: '9:41 AM' },
    { id: 2, number: '555-987-6543', type: 'outgoing', time: 'Yesterday' },
    { id: 3, name: 'John Smith', number: '555-555-1212', type: 'incoming', time: 'Yesterday' },
    { id: 4, name: 'Acme Corp', number: '555-888-9999', type: 'outgoing', time: 'Friday' },
    { id: 5, name: 'Jane Cooper', number: '555-123-4567', type: 'incoming', time: 'Friday' },
    { id: 6, name: 'Unknown', number: '555-234-5678', type: 'missed', time: 'Thursday'},
  ];

  return (
    <div className="h-full bg-white">
      <ul>
        {mockRecents.map((call) => (
          <li key={call.id} className="flex items-center justify-between px-3 py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors group">
            <button onClick={() => onCall(call.number)} className="flex-grow text-left flex items-center space-x-5">
              <div className="flex-grow">
                <p className={`text-2xl font-medium ${call.type === 'missed' ? 'text-red-500' : 'text-slate-900'}`}>
                  {call.name || call.number}
                </p>
                <div className="flex items-center space-x-3 text-gray-500 text-lg mt-2">
                  <CallTypeIcon type={call.type} />
                  <span>{call.name ? call.number : 'Cellular'}</span>
                </div>
              </div>
            </button>
            <div className="flex items-center space-x-3">
              <span className="text-gray-400 text-lg">{call.time}</span>
              <button className="text-blue-500 hover:text-blue-600" aria-label={`More information about call with ${call.name || call.number}`}>
                <InformationCircleIcon className="w-6 h-6" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentsScreen;

