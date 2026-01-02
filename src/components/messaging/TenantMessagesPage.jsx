import React, { useState, useEffect, useRef } from 'react';
import * as Icons from '../../constants/icons';

const TenantMessagesPage = ({ conversations, messages, onSendMessage }) => {
    const [selectedConversationId, setSelectedConversationId] = useState(null);
    const [statusFilter, setStatusFilter] = useState('Open');
    const [searchTerm, setSearchTerm] = useState('');
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef(null);

    const filteredConversations = conversations.filter(c => {
        const matchesStatus = statusFilter === 'All' || c.status === statusFilter;
        const matchesSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesStatus && matchesSearch;
    }).sort((a, b) => new Date(b.lastMessageAt).getTime() - new Date(a.lastMessageAt).getTime());

    const selectedConversation = conversations.find(c => c.id === selectedConversationId);
    const currentMessages = messages
        .filter(m => m.conversationId === selectedConversationId)
        .sort((a, b) => new Date(a.sentAt).getTime() - new Date(b.sentAt).getTime());

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [currentMessages, selectedConversationId]);

    const handleSend = () => {
        if (!newMessage.trim() || !selectedConversationId) return;
        onSendMessage(selectedConversationId, newMessage, 'Manager');
        setNewMessage('');
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const formatDate = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className="flex h-full bg-white border-t border-gray-200">
            {/* Left Pane: List */}
            <div className="w-1/3 border-r border-gray-200 flex flex-col">
                <div className="p-4 border-b border-gray-200">
                    <div className="relative mb-3">
                        <Icons.SearchIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        <input 
                            type="text" 
                            placeholder="Search tenants or units..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 border rounded-md w-full focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm" 
                        />
                    </div>
                    <div className="flex space-x-2">
                        {['Open', 'Closed', 'All'].map((status) => (
                            <button
                                key={status}
                                onClick={() => setStatusFilter(status)}
                                className={`px-3 py-1 text-xs font-medium rounded-full ${statusFilter === status ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                            >
                                {status}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {filteredConversations.map(conv => (
                        <div 
                            key={conv.id}
                            onClick={() => setSelectedConversationId(conv.id)}
                            className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${selectedConversationId === conv.id ? 'bg-blue-50 border-l-4 border-l-blue-500' : 'border-l-4 border-l-transparent'}`}
                        >
                            <div className="flex justify-between items-start mb-1">
                                <h4 className={`text-sm font-semibold ${selectedConversationId === conv.id ? 'text-blue-900' : 'text-gray-900'}`}>{conv.title}</h4>
                                {conv.unreadForManager > 0 && (
                                    <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">{conv.unreadForManager}</span>
                                )}
                            </div>
                            <p className="text-xs text-gray-500 truncate mb-1">{conv.lastMessagePreview}</p>
                            <p className="text-[10px] text-gray-400 text-right">{formatDate(conv.lastMessageAt)}</p>
                        </div>
                    ))}
                    {filteredConversations.length === 0 && (
                        <div className="p-8 text-center text-gray-500 text-sm">No conversations found.</div>
                    )}
                </div>
            </div>

            {/* Right Pane: Chat */}
            <div className="w-2/3 flex flex-col bg-gray-50">
                {selectedConversation ? (
                    <>
                        {/* Chat Header */}
                        <div className="bg-white border-b border-gray-200 p-4 flex justify-between items-center shadow-sm z-10">
                            <div>
                                <h3 className="text-lg font-bold text-gray-800">{selectedConversation.title}</h3>
                                <div className="flex items-center text-xs text-gray-500 mt-1">
                                    <span className={`w-2 h-2 rounded-full mr-2 ${selectedConversation.status === 'Open' ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                                    {selectedConversation.status}
                                </div>
                            </div>
                            <div className="flex space-x-2">
                                <button className="p-2 text-gray-400 hover:text-gray-600 border rounded-md bg-white hover:bg-gray-50">
                                    <Icons.AccountIcon className="w-5 h-5" />
                                </button>
                                <select className="border border-gray-300 rounded-md text-sm px-2 py-1 bg-white focus:outline-none">
                                    <option>Mark as Closed</option>
                                    <option>Mark as Open</option>
                                </select>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-4">
                            {currentMessages.map(msg => {
                                const isManager = msg.fromRole === 'Manager' || msg.fromRole === 'System';
                                const isSystem = msg.fromRole === 'System';
                                return (
                                    <div key={msg.id} className={`flex ${isSystem ? 'justify-center' : (isManager ? 'justify-end' : 'justify-start')}`}>
                                        {isSystem ? (
                                            <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full">{msg.body}</span>
                                        ) : (
                                            <div className={`max-w-[70%] rounded-lg p-3 shadow-sm ${isManager ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none'}`}>
                                                <p className="text-sm whitespace-pre-wrap">{msg.body}</p>
                                                <p className={`text-[10px] mt-1 text-right ${isManager ? 'text-blue-100' : 'text-gray-400'}`}>
                                                    {new Date(msg.sentAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="bg-white border-t border-gray-200 p-4">
                            <div className="relative rounded-md shadow-sm">
                                <textarea
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    rows={2}
                                    className="form-textarea block w-full rounded-md border-gray-300 pl-4 pr-12 py-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm resize-none"
                                    placeholder="Type a reply to the resident..."
                                ></textarea>
                                <div className="absolute bottom-3 right-3 flex items-center space-x-2">
                                    <button className="text-gray-400 hover:text-gray-600">
                                        <Icons.ClipboardIcon className="w-5 h-5" />
                                    </button>
                                    <button 
                                        onClick={handleSend}
                                        disabled={!newMessage.trim()}
                                        className="bg-blue-600 text-white rounded-full p-2 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        <Icons.ChevronRightIcon className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
                        <div className="bg-gray-100 p-6 rounded-full mb-4">
                            <Icons.AccountIcon className="w-12 h-12 text-gray-300" />
                        </div>
                        <p>Select a conversation to start messaging</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TenantMessagesPage;
