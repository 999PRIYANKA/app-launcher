import React, { useState, useEffect } from 'react';
import DialerScreen from './DialerScreen';
import InCallScreen from './InCallScreen';
import WrapUpModal from './WrapUpModal';
import TabBar from './TabBar';
import FavoritesScreen from './FavoritesScreen';
import RecentsScreen from './RecentsScreen';
import ContactsScreen from './ContactsScreen';
import VoicemailScreen from './VoicemailScreen';
import FollowUpModal from './FollowUpModal';
import SmsScreen from './SmsScreen';
import SmsListScreen from './SmsListScreen';
import { PhoneIcon, XMarkIcon } from '../../../constants/icons';
import { CallState } from '../types';

const initialThreads = [
  { 
    id: '1', 
    name: 'Sarah Connor', 
    number: '(555) 010-2020', 
    unread: true, 
    messages: [
      { id: 'm1', sender: 'them', text: 'Hey, is the unit still available?', timestamp: 'Today 9:10 AM' },
      { id: 'm2', sender: 'me', text: 'Yes, would you like to schedule a tour?', timestamp: 'Today 9:12 AM' }
    ] 
  },
];

const SoftPhoneWidget = () => {
  const [callState, setCallState] = useState(CallState.IDLE);
  const [callInfo, setCallInfo] = useState({ number: '' });
  const [activeTab, setActiveTab] = useState('keypad');
  const [showFollowUpModal, setShowFollowUpModal] = useState(false);
  const [isPhoneOpen, setIsPhoneOpen] = useState(false);
  const [threads, setThreads] = useState(initialThreads);
  const [selectedThreadId, setSelectedThreadId] = useState(null);

  // Global Listener for 'CRM_DIAL' events
  useEffect(() => {
    const handleGlobalDial = (e) => {
      const customEvent = e;
      if (customEvent.detail?.number) {
        handleInitiateCall(customEvent.detail.number);
        setIsPhoneOpen(true);
      }
    };

    window.addEventListener('CRM_DIAL', handleGlobalDial);
    return () => window.removeEventListener('CRM_DIAL', handleGlobalDial);
  }, []);

  useEffect(() => {
    let timer;
    if (callState === CallState.CALLING) {
      timer = setTimeout(() => setCallState(CallState.CONNECTED), 2000);
      return () => clearTimeout(timer);
    } else if (callState === CallState.ENDED) {
      timer = setTimeout(() => setCallState(CallState.WRAPUP), 1500);
      return () => clearTimeout(timer);
    }
  }, [callState]);

  const handleInitiateCall = (number) => {
    setCallInfo({ number });
    setCallState(CallState.CALLING);
    setActiveTab('keypad'); 
  };

  const handleEndCall = () => setCallState(CallState.ENDED);

  const handleWrapUpComplete = (disposition) => {
    if (disposition === 'Schedule a follow-up appointment') {
      setShowFollowUpModal(true);
    } else {
      setCallState(CallState.IDLE);
      setActiveTab('recents');
    }
  };

  const handleSendSms = (text) => {
    if (selectedThreadId) {
      setThreads(prev => prev.map(t => {
        if (t.id === selectedThreadId) {
          return { ...t, messages: [...t.messages, { id: Date.now().toString(), text, sender: 'me', timestamp: 'Just now' }] };
        }
        return t;
      }));
    } else {
      setCallState(CallState.IDLE);
    }
  };

  const renderActiveTabScreen = () => {
    switch (activeTab) {
      case 'favorites': 
        return <FavoritesScreen onCall={handleInitiateCall} />;
      case 'recents': 
        return <RecentsScreen onCall={handleInitiateCall} />;
      case 'contacts': 
        return <ContactsScreen onCall={handleInitiateCall} />;
      case 'keypad': 
        return <DialerScreen onInitiateCall={handleInitiateCall} lastDialedNumber={callInfo.number} />;
      case 'voicemail': 
        return <VoicemailScreen onCall={handleInitiateCall} />;
      case 'sms': 
        return <SmsListScreen onSelectThread={(id) => { setSelectedThreadId(id); setCallState(CallState.SMS); }} />;
      default: 
        return <DialerScreen onInitiateCall={handleInitiateCall} lastDialedNumber={callInfo.number} />;
    }
  };

  return (
    <>
      {isPhoneOpen && (
        <div className={`
          fixed z-[100] bg-white shadow-2xl flex flex-col overflow-hidden border border-slate-200 ring-1 ring-slate-950/10 transition-all duration-300
          ${window.innerWidth < 640 
            ? 'inset-0 w-full h-full rounded-none' 
            : 'bottom-12 left-6 w-[400px] h-[750px] rounded-2xl'
          }
        `}>
          <div className="bg-slate-900 text-white p-5 flex items-center justify-between shrink-0 h-24 shadow-md">
            <div className="flex items-center space-x-4">
              <div className="w-11 h-11 rounded-full bg-indigo-500 flex items-center justify-center text-lg font-bold">DW</div>
              <div>
                <p className="font-bold">SoftPhone</p>
                <p className="text-xs text-green-400 font-bold uppercase tracking-widest">Active</p>
              </div>
            </div>
            <button 
              onClick={() => setIsPhoneOpen(false)} 
              className="text-slate-400 hover:text-white transition-colors p-2"
            >
              <XMarkIcon className="w-8 h-8" />
            </button>
          </div>
          <div className="flex-1 flex flex-col min-h-0 relative">
            {callState === CallState.SMS ? (
              <SmsScreen 
                threadId={selectedThreadId}
                tempNumber={callInfo.number}
                onSend={handleSendSms}
                onBack={() => setCallState(CallState.IDLE)}
                onCall={handleInitiateCall}
              />
            ) : callState === CallState.IDLE ? (
              <div className="h-full flex flex-col">
                <TabBar activeTab={activeTab} onTabChange={setActiveTab} />
                <main className="flex-grow overflow-y-auto">{renderActiveTabScreen()}</main>
              </div>
            ) : (
              <InCallScreen 
                number={callInfo.number} 
                callState={callState} 
                onEndCall={handleEndCall} 
              />
            )}
            {callState === CallState.WRAPUP && !showFollowUpModal && (
              <WrapUpModal onComplete={handleWrapUpComplete} />
            )}
            {showFollowUpModal && (
              <FollowUpModal 
                onSchedule={() => {
                  setShowFollowUpModal(false); 
                  setCallState(CallState.IDLE);
                  setActiveTab('recents');
                }} 
                onCancel={() => {
                  setShowFollowUpModal(false); 
                  setCallState(CallState.IDLE);
                  setActiveTab('recents');
                }} 
              />
            )}
          </div>
        </div>
      )}
      {!isPhoneOpen && (
        <button 
          onClick={() => setIsPhoneOpen(true)}
          className="fixed bottom-6 left-6 w-16 h-16 md:w-20 md:h-20 bg-indigo-600 rounded-full shadow-2xl flex items-center justify-center hover:bg-indigo-500 transition-all hover:scale-105 active:scale-95 z-[90] border-4 border-white"
        >
          <PhoneIcon className="w-6 h-6 md:w-8 md:h-8 text-white" />
        </button>
      )}
    </>
  );
};

export default SoftPhoneWidget;

