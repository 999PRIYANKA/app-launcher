import React from 'react';
import { ClockIcon, UserGroupIcon, AppGridIcon, ChatBubbleOvalLeftIcon, VoicemailIcon } from '../../../constants/icons';

const tabItems = [
  { id: 'recents', label: 'History', icon: ClockIcon },
  { id: 'contacts', label: 'Contacts', icon: UserGroupIcon },
  { id: 'keypad', label: 'Keypad', icon: AppGridIcon },
  { id: 'sms', label: 'Messages', icon: ChatBubbleOvalLeftIcon },
  { id: 'voicemail', label: 'Voicemail', icon: VoicemailIcon },
];

const TabBar = ({ activeTab, onTabChange }) => {
  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm z-10">
      <div className="flex justify-around items-end pb-2 pt-3">
        {tabItems.map((item) => {
          const isActive = activeTab === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex-1 flex flex-col items-center justify-center space-y-1 focus:outline-none transition-colors ${
                isActive ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <Icon className={`w-8 h-8 ${isActive ? 'stroke-[2px]' : 'stroke-[1.5px]'}`} />
              <span className={`text-xs font-medium ${isActive ? 'text-blue-600' : 'text-gray-500'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default TabBar;

