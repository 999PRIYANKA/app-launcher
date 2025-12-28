// Types for CRM Connect App

export const CallState = {
  IDLE: 'idle',
  CALLING: 'calling',
  CONNECTED: 'connected',
  ENDED: 'ended',
  WRAPUP: 'wrapup',
  SMS: 'sms',
};

export const Tab = {
  KEYPAD: 'keypad',
  FAVORITES: 'favorites',
  RECENTS: 'recents',
  CONTACTS: 'contacts',
  VOICEMAIL: 'voicemail',
  SMS: 'sms',
};

export const CallType = {
  INCOMING: 'incoming',
  OUTGOING: 'outgoing',
  MISSED: 'missed',
};

// Contact interface
export const createContact = (data) => ({
  id: data.id || '',
  name: data.name || '',
  number: data.number || '',
  email: data.email || '',
  title: data.title || '',
  ...data,
});

// Recent Call interface
export const createRecentCall = (data) => ({
  id: data.id || 0,
  name: data.name || null,
  number: data.number || '',
  type: data.type || CallType.INCOMING,
  time: data.time || '',
  ...data,
});

// SMS Thread interface
export const createSmsThread = (data) => ({
  id: data.id || '',
  name: data.name || '',
  number: data.number || '',
  unread: data.unread || false,
  messages: data.messages || [],
  ...data,
});

// SMS Message interface
export const createSmsMessage = (data) => ({
  id: data.id || '',
  sender: data.sender || 'me',
  text: data.text || '',
  timestamp: data.timestamp || '',
  ...data,
});

// Voicemail interface
export const createVoicemail = (data) => ({
  id: data.id || 0,
  name: data.name || null,
  number: data.number || '',
  duration: data.duration || '',
  date: data.date || '',
  ...data,
});

// --- CRM Models ---

// CallRecord interface
export const createCallRecord = (data) => ({
  id: data.id || '',
  caller_number: data.caller_number || '',
  callee_number: data.callee_number || '',
  direction: data.direction || 'inbound',
  status: data.status || 'completed',
  duration: data.duration || 0,
  started_at: data.started_at || '',
  disposition: data.disposition || '',
  disposition_notes: data.disposition_notes || '',
  agent_user_id: data.agent_user_id || '',
  agent_name: data.agent_name || '',
  contact_id: data.contact_id || null,
  recording_url: data.recording_url || null,
  transcript: data.transcript || null,
  sentiment: data.sentiment || 'neutral',
  ...data,
});

// SmsLog interface
export const createSmsLog = (data) => ({
  id: data.id || '',
  contact_number: data.contact_number || '',
  contact_name: data.contact_name || '',
  direction: data.direction || 'inbound',
  body: data.body || '',
  timestamp: data.timestamp || '',
  status: data.status || 'sent',
  ...data,
});

// PhoneNumber interface
export const createPhoneNumber = (data) => ({
  id: data.id || '',
  number: data.number || '',
  label: data.label || 'Work',
  type: data.type || 'voip',
  status: data.status || 'active',
  owner_id: data.owner_id || '',
  display_number: data.display_number || data.number || '',
  e164: data.e164 || '',
  provider: data.provider || 'manual',
  provider_phone_number_sid: data.provider_phone_number_sid || null,
  assigned_user_id: data.assigned_user_id || null,
  org_id: data.org_id || '',
  ...data,
});

// CallRecording interface
export const createCallRecording = (data) => ({
  id: data.id || '',
  call_id: data.call_id || '',
  url: data.url || '',
  duration: data.duration || 0,
  created_at: data.created_at || '',
  format: data.format || 'mp3',
  file_name: data.file_name || null,
  file_size_bytes: data.file_size_bytes || null,
  status: data.status || 'available',
  media_type: data.media_type || 'audio',
  agent_name: data.agent_name || '',
  agent_initials: data.agent_initials || '',
  customer_display: data.customer_display || null,
  customer_initials: data.customer_initials || null,
  download_label: data.download_label || 'Download',
  has_transcript: data.has_transcript || false,
  audio_clarity_percent: data.audio_clarity_percent || null,
  transcription_available: data.transcription_available || false,
  ...data,
});

// VoicemailRecord interface
export const createVoicemailRecord = (data) => ({
  id: data.id || '',
  from_number: data.from_number || '',
  to_number: data.to_number || '',
  duration: data.duration || 0,
  duration_seconds: data.duration_seconds || data.duration || 0,
  media_url: data.media_url || '',
  transcription: data.transcription || '',
  transcription_text: data.transcription_text || data.transcription || '',
  transcription_status: data.transcription_status || 'pending',
  is_read: data.is_read || false,
  created_at: data.created_at || '',
  received_at: data.received_at || data.created_at || '',
  contact_id: data.contact_id || null,
  org_id: data.org_id || '',
  status: data.status || 'unread',
  from_e164: data.from_e164 || '',
  to_e164: data.to_e164 || '',
  from_display: data.from_display || data.from_number || '',
  to_display: data.to_display || data.to_number || '',
  voicemail_box_number_id: data.voicemail_box_number_id || null,
  call_id: data.call_id || null,
  media_content_type: data.media_content_type || null,
  ...data,
});

// CallParticipant interface
export const createCallParticipant = (data) => ({
  id: data.id || '',
  call_id: data.call_id || '',
  user_id: data.user_id || null,
  participant_name: data.participant_name || '',
  role: data.role || 'attendee',
  joined_at: data.joined_at || '',
  left_at: data.left_at || null,
  participant_status: data.participant_status || 'joined',
  ...data,
});

// SoftphoneAccess interface
export const createSoftphoneAccess = (data) => ({
  id: data.id || '',
  org_id: data.org_id || '',
  user_id: data.user_id || '',
  user_name: data.user_name || '',
  status: data.status || 'enabled',
  role: data.role || 'agent',
  can_make_outbound_calls: data.can_make_outbound_calls !== undefined ? data.can_make_outbound_calls : true,
  can_receive_inbound_calls: data.can_receive_inbound_calls !== undefined ? data.can_receive_inbound_calls : true,
  can_listen_to_recordings: data.can_listen_to_recordings !== undefined ? data.can_listen_to_recordings : true,
  can_view_transcripts: data.can_view_transcripts !== undefined ? data.can_view_transcripts : true,
  created_at: data.created_at || '',
  updated_at: data.updated_at || '',
  ...data,
});
