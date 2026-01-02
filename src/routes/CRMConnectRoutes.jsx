import React from 'react';
import { Routes, Route } from 'react-router-dom';

// CRM Connect App Pages
import CRMConnectDashboardPage from '../apps/crm-connect/pages/CRMConnectDashboardPage';
import { ContactsList, ContactDetail } from '../apps/crm-connect/pages/contacts/ContactsPages';
import { CallsList } from '../apps/crm-connect/pages/communications/CallsPages';
import CallParticipantDetail from '../apps/crm-connect/pages/communications/CallParticipantDetail';
import { PhoneNumbersList, PhoneNumberDetail } from '../apps/crm-connect/pages/communications/PhoneNumbersPages';
import { RecordingsList, RecordingDetail } from '../apps/crm-connect/pages/communications/RecordingsPages';
import { VoicemailsList, VoicemailDetail } from '../apps/crm-connect/pages/communications/VoicemailsPages';
import { ParticipantsList, ParticipantDetail } from '../apps/crm-connect/pages/communications/ParticipantsPages';
import { SmsLogsList, SmsLogDetail } from '../apps/crm-connect/pages/communications/SmsPages';

// CRM Connect App Routes
export const CRMConnectRoutes = () => {
  return (
    <Routes>
      <Route path="dashboard" element={<CRMConnectDashboardPage />} />
      
      {/* Contacts Routes */}
      <Route path="contacts" element={<ContactsList />} />
      <Route path="contacts/:id" element={<ContactDetail />} />
      
      {/* Communications Routes */}
      <Route path="communications/calls" element={<CallsList />} />
      <Route path="communications/calls/:id" element={<CallsList />} />
      <Route path="communications/call-participants/:id" element={<CallParticipantDetail />} />
      
      <Route path="communications/phone-numbers" element={<PhoneNumbersList />} />
      <Route path="communications/phone-numbers/:id" element={<PhoneNumberDetail />} />
      
      <Route path="communications/recordings" element={<RecordingsList />} />
      <Route path="communications/recordings/:id" element={<RecordingDetail />} />
      
      <Route path="communications/voicemails" element={<VoicemailsList />} />
      <Route path="communications/voicemails/:id" element={<VoicemailDetail />} />
      
      <Route path="communications/participants" element={<ParticipantsList />} />
      <Route path="communications/participants/:id" element={<ParticipantDetail />} />
      
      <Route path="communications/sms-logs" element={<SmsLogsList />} />
      <Route path="communications/sms-logs/:id" element={<SmsLogDetail />} />
      
      {/* Default redirect to dashboard */}
      <Route path="*" element={<CRMConnectDashboardPage />} />
    </Routes>
  );
};

export default CRMConnectRoutes;

