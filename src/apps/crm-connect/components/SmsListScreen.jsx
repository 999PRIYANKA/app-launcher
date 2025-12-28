import React from 'react';
import { useCRMConnect } from '../../../contexts/CRMConnectContext';

const SmsListScreen = ({ onSelectThread }) => {
  const { smsThreads } = useCRMConnect();

  return (
    <div className="h-full bg-white flex flex-col">
      <div className="p-6 border-b border-gray-100 flex justify-between items-center">
        <h1 className="text-4xl font-bold text-slate-900">Messages</h1>
        <button className="text-blue-600 font-semibold text-lg hover:text-blue-700">New</button>
      </div>
      <ul className="flex-1 overflow-y-auto">
        {smsThreads.map((thread) => {
            const lastMessage = thread.messages[thread.messages.length - 1];
            return (
              <li key={thread.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <button 
                    onClick={() => onSelectThread(thread.id)} 
                    className="w-full text-left px-6 py-6 flex items-start space-x-5 relative"
                >
                    <div className="w-16 h-16 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-2xl font-bold flex-shrink-0">
                        {thread.name ? thread.name.charAt(0) : '#'}
                    </div>
                    <div className="flex-grow min-w-0 pt-1">
                        <div className="flex justify-between items-baseline mb-2">
                            <h3 className="text-2xl font-bold text-slate-900 truncate">{thread.name || thread.number}</h3>
                            <span className="text-base text-gray-400 flex-shrink-0 ml-3">
                                {lastMessage ? lastMessage.timestamp : ''}
                            </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <p className={`text-lg truncate pr-3 ${thread.unread ? 'font-semibold text-slate-900' : 'text-gray-500'}`}>
                                {lastMessage ? (
                                    lastMessage.sender === 'me' ? `You: ${lastMessage.text}` : lastMessage.text
                                ) : 'No messages'}
                            </p>
                            {thread.unread && (
                                <span className="w-4 h-4 bg-blue-600 rounded-full flex-shrink-0"></span>
                            )}
                        </div>
                    </div>
                </button>
              </li>
            );
        })}
      </ul>
    </div>
  );
};

export default SmsListScreen;

