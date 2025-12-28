import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRightIcon, ChevronLeftIcon, PhoneIcon } from '../../../constants/icons';
import { useCRMConnect } from '../../../contexts/CRMConnectContext';

const SmsScreen = ({ threadId, tempNumber, onSend, onBack, onCall }) => {
  const { smsThreads } = useCRMConnect();
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef(null);

  const thread = smsThreads.find(t => t.id === threadId);
  const displayNumber = thread?.number || tempNumber || 'Unknown';
  const displayName = thread?.name || displayNumber;
  const messages = thread?.messages || [];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (inputText.trim()) {
      onSend(inputText);
      setInputText('');
    }
  };

  const handleKeyDown = (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          handleSend();
      }
  }

  return (
    <div className="bg-white h-full flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-5 py-5 border-b border-gray-100 shadow-sm flex-shrink-0 bg-white z-10">
        <div className="flex items-center">
            <button onClick={onBack} className="text-gray-600 hover:text-gray-900 mr-5 -ml-2 p-2">
                <ChevronLeftIcon className="w-10 h-10" />
            </button>
            <div>
                <h2 className="text-2xl font-bold text-slate-900 leading-tight">{displayName}</h2>
                <p className="text-base text-gray-500">{displayNumber}</p>
            </div>
        </div>
        <button 
            onClick={() => onCall(displayNumber)} 
            className="text-gray-400 hover:text-green-500 transition-colors p-4"
        >
            <PhoneIcon className="w-10 h-10" />
        </button>
      </header>

      {/* Messages Area */}
      <div className="flex-grow overflow-y-auto p-6 space-y-6 bg-white">
        {messages.map((msg) => {
            const isMe = msg.sender === 'me';
            return (
                <div key={msg.id} className={`flex w-full ${isMe ? 'justify-end' : 'justify-start'}`}>
                    <div 
                        className={`max-w-[80%] px-6 py-5 text-xl rounded-3xl ${
                            isMe 
                            ? 'bg-blue-600 text-white rounded-br-none' 
                            : 'bg-gray-100 text-slate-800 rounded-bl-none'
                        }`}
                    >
                        {msg.text}
                    </div>
                </div>
            );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-6 border-t border-gray-100 bg-white pb-10">
        <div className="relative flex items-center">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full bg-white border border-gray-300 text-slate-900 text-xl rounded-full py-5 pl-8 pr-16 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-400"
              placeholder="Type a message..."
            />
            <button
              onClick={handleSend}
              disabled={!inputText.trim()}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-600 hover:text-blue-700 disabled:text-gray-300 p-2"
            >
               <ArrowUpRightIcon className="w-8 h-8" />
            </button>
        </div>
      </div>
    </div>
  );
};

export default SmsScreen;

