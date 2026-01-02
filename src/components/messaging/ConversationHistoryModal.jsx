import React, { useState, useEffect, useRef } from 'react';
import * as Icons from '../../constants/icons';

const ConversationHistoryModal = ({ title, messages, onClose, onSendMessage }) => {
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = () => {
        if (!newMessage.trim()) return;
        onSendMessage(newMessage);
        setNewMessage('');
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={onClose}></div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full flex flex-col h-[70vh]">
                    {/* Header */}
                    <div className="bg-white px-4 py-3 border-b flex justify-between items-center">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">{title}</h3>
                        <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
                            <Icons.XIcon className="h-6 w-6" />
                        </button>
                    </div>

                    {/* Messages Body */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                        {messages.map(msg => {
                            const isTenant = msg.fromRole === 'Tenant';
                            const isSystem = msg.fromRole === 'System';
                            return (
                                <div key={msg.id} className={`flex ${isSystem ? 'justify-center' : (isTenant ? 'justify-end' : 'justify-start')}`}>
                                    {isSystem ? (
                                        <span className="text-xs text-gray-400 bg-gray-200 px-2 py-1 rounded">{msg.body}</span>
                                    ) : (
                                        <div className={`max-w-[75%] rounded-lg p-3 shadow-sm ${isTenant ? 'bg-green-600 text-white rounded-br-none' : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none'}`}>
                                            <p className="text-sm whitespace-pre-wrap">{msg.body}</p>
                                            <p className={`text-[10px] mt-1 text-right ${isTenant ? 'text-green-100' : 'text-gray-400'}`}>
                                                {new Date(msg.sentAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Footer Input */}
                    <div className="bg-white border-t p-4">
                        <div className="flex space-x-2">
                            <input 
                                type="text" 
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                onKeyDown={handleKeyDown}
                                className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-green-500"
                                placeholder="Type a message..."
                            />
                            <button 
                                onClick={handleSend}
                                disabled={!newMessage.trim()}
                                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:opacity-50 transition-colors"
                            >
                                Send
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConversationHistoryModal;

