import React from 'react';
import { useCRMConnect } from '../../../contexts/CRMConnectContext';

const ContactsScreen = ({ onCall }) => {
  const { contacts } = useCRMConnect();

  // Mock data if contacts are empty
  const mockContacts = contacts.length > 0 ? contacts : [
    { id: '1', name: 'Alice Johnson', number: '555-111-2222' },
    { id: '2', name: 'Bob Williams', number: '555-333-4444' },
    { id: '3', name: 'Charlie Brown', number: '555-555-6666' },
    { id: '4', name: 'David Miller', number: '555-777-8888' },
    { id: '5', name: 'Emily Davis', number: '555-999-0000' },
    { id: '6', name: 'Frank White', number: '555-222-3333' },
    { id: '7', name: 'Grace Lee', number: '555-444-5555' },
    { id: '8', name: 'Henry Taylor', number: '555-666-7777' },
    { id: '9', name: 'Ian Wright', number: '555-888-1111' },
    { id: '10', name: 'Jack Bauer', number: '555-240-0000' },
  ];

  const groupedContacts = mockContacts.reduce((acc, contact) => {
    const firstLetter = contact.name[0].toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(contact);
    return acc;
  }, {});

  const sortedGroups = Object.keys(groupedContacts).sort();

  return (
    <div className="h-full bg-white flex flex-col">
      <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-20">
        <h1 className="text-3xl font-bold text-slate-900">Contacts</h1>
        <button className="w-10 h-10 rounded-full bg-gray-100 text-blue-600 flex items-center justify-center text-2xl font-light hover:bg-gray-200 transition-colors">
            ＋
        </button>
      </div>
      <div className="flex-1 overflow-y-auto">
        {sortedGroups.map((letter) => (
          <div key={letter}>
            <div className="bg-gray-50 border-y border-gray-100 px-6 py-2 sticky top-0 z-10">
                <h2 className="text-slate-900 font-bold text-lg">{letter}</h2>
            </div>
            <ul>
              {groupedContacts[letter].map((contact) => (
                <li key={contact.id} className="border-b border-gray-100 last:border-0">
                  <button onClick={() => onCall(contact.number)} className="w-full text-left px-6 py-3 hover:bg-gray-50 transition-colors group">
                    <div className="text-1xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-1">
                        {contact.name}
                    </div>
                    <div className="text-lg text-gray-400">
                        {contact.number}
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
        {/* Padding for bottom safety */}
        <div className="h-10"></div>
      </div>
    </div>
  );
};

export default ContactsScreen;

