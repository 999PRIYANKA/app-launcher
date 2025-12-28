import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { StandardListView } from '../../components/shared/StandardListView';
import RecordPanelLayout from '../../components/shared/RecordPanelLayout';
import SectionCard from '../../components/shared/SectionCard';
import { 
  PhoneIcon, 
  ClockIcon, 
  InformationCircleIcon, 
  ArrowUpRightIcon, 
  UserGroupIcon,
  ChatBubbleOvalLeftIcon
} from '../../../../constants/icons';
import { APP_ROUTES } from '../../../../config/appRoutes';

const MOCK_VMS = [
  { 
    id: '1', 
    from_number: '+1 (555) 111-2222', 
    to_number: 'Sales Line', 
    duration: 45, 
    duration_seconds: 45,
    media_url: 'https://example.com/vm1.mp3', 
    is_read: false, 
    status: 'unread',
    created_at: 'Oct 26, 2023 10:00 AM', 
    received_at: '2023-10-26T10:00:00Z',
    transcription: 'Hi, this is Bob from the construction site. Just calling to confirm we received the shipment of bricks, but we are missing the pallet of mortar. Please give me a call back at your earliest convenience. Thanks!',
    transcription_text: 'Hi, this is Bob from the construction site. Just calling to confirm we received the shipment of bricks, but we are missing the pallet of mortar. Please give me a call back at your earliest convenience. Thanks!',
    transcription_status: 'completed',
    org_id: 'org_123',
    from_e164: '+15551112222',
    to_e164: '+15550001111',
    from_display: '+1 (555) 111-2222',
    to_display: 'Sales Line',
    call_id: 'call_99',
    contact_id: '1',
    voicemail_box_number_id: 'num_1'
  },
  { 
    id: '2', 
    from_number: '+1 (555) 333-4444', 
    to_number: 'Support Line', 
    duration: 12, 
    duration_seconds: 12,
    media_url: 'https://example.com/vm2.mp3', 
    is_read: true, 
    status: 'read',
    created_at: 'Oct 25, 2023 04:00 PM', 
    received_at: '2023-10-25T16:00:00Z',
    transcription: 'Just checking in regarding the ticket I opened earlier. My login still isn\'t working.',
    transcription_text: 'Just checking in regarding the ticket I opened earlier. My login still isn\'t working. Please update the status.',
    transcription_status: 'completed',
    org_id: 'org_123',
    from_e164: '+15553334444',
    to_e164: '+15550002222',
    from_display: '+1 (555) 333-4444',
    to_display: 'Support Line',
    contact_id: '2'
  },
];

export const VoicemailsList = () => {
  const navigate = useNavigate();
  return (
    <div className="p-6 h-full">
      <StandardListView
        title="Voicemails"
        data={MOCK_VMS}
        onRowClick={(item) => navigate(`${APP_ROUTES.CRM_CONNECT.VOICEMAILS}/${item.id}`)}
        columns={[
          { 
            header: 'From', 
            accessor: (item) => (
              <div className="flex items-center space-x-3">
                <div className={`w-2 h-2 rounded-full ${item.status === 'unread' ? 'bg-blue-600' : 'bg-transparent'}`}></div>
                <span className="font-bold text-slate-900">{item.from_number}</span>
              </div>
            ),
            className: 'w-64'
          },
          { header: 'Received At', accessor: 'created_at' },
          { 
            header: 'Duration', 
            accessor: (item) => (
              <span className="font-mono text-xs font-bold bg-slate-100 px-2 py-1 rounded">
                0:{item.duration.toString().padStart(2, '0')}
              </span>
            )
          },
          { 
            header: 'Status', 
            accessor: (item) => (
              <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                item.status === 'unread' ? 'bg-blue-100 text-blue-700' : 
                item.status === 'read' ? 'bg-slate-100 text-slate-500' : 'bg-orange-100 text-orange-700'
              }`}>
                {item.status}
              </span>
            )
          },
        ]}
        actions={
          <button className="text-sm font-bold text-indigo-600 hover:text-indigo-800 uppercase tracking-tighter">Mark All as Read</button>
        }
      />
    </div>
  );
};

const Waveform = ({ active }) => {
  const bars = Array.from({ length: 40 }, (_, i) => Math.random() * 20 + 2);
  return (
    <div className="flex items-center justify-between space-x-[2px] h-8 w-full px-1">
      {bars.map((height, i) => (
        <div 
          key={i} 
          className={`flex-1 rounded-full transition-all duration-300 ${active && i < 12 ? 'bg-indigo-400' : 'bg-slate-700'}`} 
          style={{ height: `${height}px` }}
        />
      ))}
    </div>
  );
};

export const VoicemailDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  
  const vm = MOCK_VMS.find(v => v.id === id);
  if (!vm) return <div className="p-8 text-slate-500 font-medium">Voicemail record not found.</div>;

  const handleCall = () => {
    window.dispatchEvent(new CustomEvent('CRM_DIAL', { detail: { number: vm.from_number } }));
  };

  return (
    <RecordPanelLayout 
      title={`Voicemail from ${vm.from_number}`} 
      subtitle={`Received ${vm.created_at}`}
      onBack={() => navigate(APP_ROUTES.CRM_CONNECT.VOICEMAILS)}
      actions={
        <div className="flex space-x-2">
          <button 
            onClick={handleCall}
            className="bg-emerald-500 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-lg shadow-emerald-100 hover:bg-emerald-600 transition-colors flex items-center space-x-2"
          >
            <PhoneIcon className="w-4 h-4" />
            <span>Call Back</span>
          </button>
          {vm.contact_id && (
            <button 
              onClick={() => navigate(`${APP_ROUTES.CRM_CONNECT.CONTACTS}/${vm.contact_id}`)}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-colors flex items-center space-x-2"
            >
              <UserGroupIcon className="w-4 h-4" />
              <span>View Profile</span>
            </button>
          )}
        </div>
      }
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          {/* Integrated Audio Player Card */}
          <SectionCard title="Voicemail Playback">
            <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-2xl border border-white/5">
              <div className="flex items-center space-x-6">
                <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-16 h-16 bg-indigo-500 hover:bg-indigo-400 text-white rounded-full flex items-center justify-center transition-all transform active:scale-90 shadow-lg shadow-indigo-500/20 shrink-0"
                >
                  {isPlaying ? (
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                  ) : (
                    <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" /></svg>
                  )}
                </button>
                <div className="flex-1 space-y-4">
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-1">Playback Timer</p>
                      <span className="text-2xl font-black tabular-nums tracking-tighter">{isPlaying ? '0:12' : '0:00'}</span>
                      <span className="text-xs text-slate-500 ml-2">/ 0:{vm.duration.toString().padStart(2, '0')}</span>
                    </div>
                    <div className="text-right">
                      <span className="px-2 py-0.5 bg-indigo-500/10 text-indigo-400 rounded text-[9px] font-black uppercase tracking-widest border border-indigo-500/20">
                        HD Audio
                      </span>
                    </div>
                  </div>
                  <Waveform active={isPlaying} />
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-white/5 flex justify-between items-center">
                <div className="flex space-x-2">
                  <button className="px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-colors">1.0x</button>
                  <button className="px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-colors">Clean Audio</button>
                </div>
                <button className="text-[10px] font-bold text-indigo-400 hover:text-indigo-300 uppercase tracking-widest">Download MP3</button>
              </div>
            </div>
          </SectionCard>

          {/* Transcription Content */}
          <SectionCard title="AI Transcription">
            <div className="relative group">
              <div className="absolute top-0 right-0">
                <button className="text-[9px] font-black text-indigo-600 bg-indigo-50 px-2 py-1 rounded hover:bg-indigo-100 uppercase tracking-tighter transition-colors">
                  Copy Text
                </button>
              </div>
              <div className="pr-12">
                <div className={`inline-flex items-center px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest mb-4 ${
                  vm.transcription_status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                }`}>
                  {vm.transcription_status}
                </div>
                <p className="text-lg text-slate-700 leading-relaxed font-medium italic">
                  "{vm.transcription_text || vm.transcription || 'No transcription available.'}"
                </p>
                <div className="mt-8 flex items-center space-x-2 text-slate-400">
                  <ChatBubbleOvalLeftIcon className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase tracking-widest italic">Confidence Score: 94%</span>
                </div>
              </div>
            </div>
          </SectionCard>
        </div>

        {/* Sidebar: Metadata & Tech Details */}
        <div className="lg:col-span-1 space-y-6">
          <SectionCard title="Message Technicals">
            <dl className="space-y-6">
              <div>
                <dt className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center mb-1">
                  <PhoneIcon className="w-3 h-3 mr-2" /> Originating Line
                </dt>
                <dd className="text-sm font-bold text-slate-900">{vm.from_number}</dd>
                <dd className="text-[10px] font-mono text-slate-400 mt-0.5">{vm.from_e164}</dd>
              </div>
              <div>
                <dt className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center mb-1">
                  <ArrowUpRightIcon className="w-3 h-3 mr-2" /> Target Line
                </dt>
                <dd className="text-sm font-bold text-slate-900">{vm.to_display}</dd>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <dt className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Duration</dt>
                  <dd className="text-sm font-black text-indigo-600">0:{vm.duration.toString().padStart(2, '0')}</dd>
                </div>
                <div className="text-right">
                  <dt className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Status</dt>
                  <dd className="text-xs font-bold uppercase text-slate-700">{vm.status}</dd>
                </div>
              </div>
              <div className="pt-4 border-t border-slate-100">
                <dt className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center mb-1">
                  <InformationCircleIcon className="w-3 h-3 mr-2" /> Database Reference
                </dt>
                <dd className="text-xs font-mono text-slate-500 bg-slate-50 p-2 rounded truncate">VM_ID_{vm.id}_{vm.call_id || 'LOCAL'}</dd>
              </div>
            </dl>
          </SectionCard>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Line Availability</h4>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-bold text-slate-700">Carrier Gateway Active</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed mb-4">
              This voicemail was routed through the <span className="font-bold">North America Primary</span> gateway and stored in the encrypted media vault.
            </p>
            <button className="w-full py-2 bg-slate-50 hover:bg-slate-100 text-slate-400 text-[10px] font-bold uppercase tracking-widest rounded-lg transition-colors border border-slate-100">
              View Routing Logs
            </button>
          </div>
        </div>
      </div>
    </RecordPanelLayout>
  );
};

export default VoicemailsList;

