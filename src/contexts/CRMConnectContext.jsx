import React, { createContext, useContext, useState } from 'react';

const CRMConnectContext = createContext(null);

export function CRMConnectProvider({ children }) {
  // --- Call State ---
  const [callState, setCallState] = useState('idle'); // 'idle' | 'calling' | 'connected' | 'ended' | 'wrapup' | 'sms'
  const [callInfo, setCallInfo] = useState({ number: '' });
  const [activeTab, setActiveTab] = useState('keypad'); // 'keypad' | 'favorites' | 'recents' | 'contacts' | 'voicemail' | 'sms'
  const [isPhoneOpen, setIsPhoneOpen] = useState(false);

  const handleInitiateCall = (number) => {
    setCallInfo({ number });
    setCallState('calling');
    setActiveTab('keypad');
  };

  const handleEndCall = () => {
    setCallState('ended');
  };

  const handleSetCallState = (state) => {
    setCallState(state);
  };

  const handleSetActiveTab = (tab) => {
    setActiveTab(tab);
  };

  const handleSetPhoneOpen = (open) => {
    setIsPhoneOpen(open);
  };

  // --- Calls State ---
  const [calls, setCalls] = useState([]);

  const handleAddCall = (call) => {
    setCalls(prev => [...prev, call]);
  };

  const handleUpdateCall = (updatedCall) => {
    setCalls(prev => prev.map(c => c.id === updatedCall.id ? updatedCall : c));
  };

  const handleDeleteCall = (callId) => {
    setCalls(prev => prev.filter(c => c.id !== callId));
  };

  // --- Contacts State ---
  const [contacts, setContacts] = useState([]);

  const handleAddContact = (contact) => {
    setContacts(prev => [...prev, contact]);
  };

  const handleUpdateContact = (updatedContact) => {
    setContacts(prev => prev.map(c => c.id === updatedContact.id ? updatedContact : c));
  };

  const handleDeleteContact = (contactId) => {
    setContacts(prev => prev.filter(c => c.id !== contactId));
  };

  // --- Favorites State ---
  const [favorites, setFavorites] = useState([]);

  const handleAddFavorite = (favorite) => {
    setFavorites(prev => [...prev, favorite]);
  };

  const handleUpdateFavorite = (updatedFavorite) => {
    setFavorites(prev => prev.map(f => f.id === updatedFavorite.id ? updatedFavorite : f));
  };

  const handleDeleteFavorite = (favoriteId) => {
    setFavorites(prev => prev.filter(f => f.id !== favoriteId));
  };

  // --- Recents State ---
  const [recents, setRecents] = useState([]);

  const handleAddRecent = (recent) => {
    setRecents(prev => [...prev, recent]);
  };

  const handleUpdateRecent = (updatedRecent) => {
    setRecents(prev => prev.map(r => r.id === updatedRecent.id ? updatedRecent : r));
  };

  const handleDeleteRecent = (recentId) => {
    setRecents(prev => prev.filter(r => r.id !== recentId));
  };

  // --- Voicemails State ---
  const [voicemails, setVoicemails] = useState([]);

  const handleAddVoicemail = (voicemail) => {
    setVoicemails(prev => [...prev, voicemail]);
  };

  const handleUpdateVoicemail = (updatedVoicemail) => {
    setVoicemails(prev => prev.map(v => v.id === updatedVoicemail.id ? updatedVoicemail : v));
  };

  const handleDeleteVoicemail = (voicemailId) => {
    setVoicemails(prev => prev.filter(v => v.id !== voicemailId));
  };

  // --- SMS Threads State ---
  const [smsThreads, setSmsThreads] = useState([
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
  ]);

  const handleAddSmsThread = (thread) => {
    setSmsThreads(prev => [...prev, thread]);
  };

  const handleUpdateSmsThread = (updatedThread) => {
    setSmsThreads(prev => prev.map(t => t.id === updatedThread.id ? updatedThread : t));
  };

  const handleDeleteSmsThread = (threadId) => {
    setSmsThreads(prev => prev.filter(t => t.id !== threadId));
  };

  const handleAddSmsMessage = (threadId, message) => {
    setSmsThreads(prev => prev.map(t => {
      if (t.id === threadId) {
        return { ...t, messages: [...t.messages, message] };
      }
      return t;
    }));
  };

  // --- Phone Numbers State ---
  const [phoneNumbers, setPhoneNumbers] = useState([]);

  const handleAddPhoneNumber = (phoneNumber) => {
    setPhoneNumbers(prev => [...prev, phoneNumber]);
  };

  const handleUpdatePhoneNumber = (updatedPhoneNumber) => {
    setPhoneNumbers(prev => prev.map(p => p.id === updatedPhoneNumber.id ? updatedPhoneNumber : p));
  };

  const handleDeletePhoneNumber = (phoneNumberId) => {
    setPhoneNumbers(prev => prev.filter(p => p.id !== phoneNumberId));
  };

  // --- Recordings State ---
  const [recordings, setRecordings] = useState([]);

  const handleAddRecording = (recording) => {
    setRecordings(prev => [...prev, recording]);
  };

  const handleUpdateRecording = (updatedRecording) => {
    setRecordings(prev => prev.map(r => r.id === updatedRecording.id ? updatedRecording : r));
  };

  const handleDeleteRecording = (recordingId) => {
    setRecordings(prev => prev.filter(r => r.id !== recordingId));
  };

  // --- Participants State ---
  const [participants, setParticipants] = useState([]);

  const handleAddParticipant = (participant) => {
    setParticipants(prev => [...prev, participant]);
  };

  const handleUpdateParticipant = (updatedParticipant) => {
    setParticipants(prev => prev.map(p => p.id === updatedParticipant.id ? updatedParticipant : p));
  };

  const handleDeleteParticipant = (participantId) => {
    setParticipants(prev => prev.filter(p => p.id !== participantId));
  };

  // --- Show Follow-up Modal State ---
  const [showFollowUpModal, setShowFollowUpModal] = useState(false);

  const handleSetShowFollowUpModal = (show) => {
    setShowFollowUpModal(show);
  };

  // --- Selected Thread ID for SMS ---
  const [selectedThreadId, setSelectedThreadId] = useState(null);

  const handleSetSelectedThreadId = (threadId) => {
    setSelectedThreadId(threadId);
  };

  const value = {
    // Call State
    callState,
    callInfo,
    activeTab,
    isPhoneOpen,
    handleInitiateCall,
    handleEndCall,
    handleSetCallState,
    handleSetActiveTab,
    handleSetPhoneOpen,
    // Calls
    calls,
    handleAddCall,
    handleUpdateCall,
    handleDeleteCall,
    // Contacts
    contacts,
    handleAddContact,
    handleUpdateContact,
    handleDeleteContact,
    // Favorites
    favorites,
    handleAddFavorite,
    handleUpdateFavorite,
    handleDeleteFavorite,
    // Recents
    recents,
    handleAddRecent,
    handleUpdateRecent,
    handleDeleteRecent,
    // Voicemails
    voicemails,
    handleAddVoicemail,
    handleUpdateVoicemail,
    handleDeleteVoicemail,
    // SMS Threads
    smsThreads,
    handleAddSmsThread,
    handleUpdateSmsThread,
    handleDeleteSmsThread,
    handleAddSmsMessage,
    selectedThreadId,
    handleSetSelectedThreadId,
    // Phone Numbers
    phoneNumbers,
    handleAddPhoneNumber,
    handleUpdatePhoneNumber,
    handleDeletePhoneNumber,
    // Recordings
    recordings,
    handleAddRecording,
    handleUpdateRecording,
    handleDeleteRecording,
    // Participants
    participants,
    handleAddParticipant,
    handleUpdateParticipant,
    handleDeleteParticipant,
    // Modals
    showFollowUpModal,
    handleSetShowFollowUpModal,
  };

  return (
    <CRMConnectContext.Provider value={value}>
      {children}
    </CRMConnectContext.Provider>
  );
}

export function useCRMConnect() {
  const context = useContext(CRMConnectContext);
  if (!context) {
    throw new Error('useCRMConnect must be used within CRMConnectProvider');
  }
  return context;
}

