import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import RecordPanelLayout from '../../components/shared/RecordPanelLayout';
import SectionCard from '../../components/shared/SectionCard';
import { 
  ClockIcon, 
  UserGroupIcon, 
  InformationCircleIcon, 
  ArrowUpRightIcon, 
  PhoneIcon,
  StarIcon
} from '../../../../constants/icons';
import { APP_ROUTES } from '../../../../config/appRoutes';

const MOCK_PARTICIPANTS = {
  'cp_agent_1': {
    id: 'cp_agent_1',
    call_id: '1',
    user_id: 'u_1',
    participant_name: 'Dustin Wyatt',
    role: 'host',
    joined_at: 'Oct 25, 09:30:05 AM',
    left_at: 'Oct 25, 09:32:09 AM',
    participant_status: 'left',
    connection_quality: 98,
    device: 'MacBook Pro 16" - Chrome 120',
    location: 'Austin, TX (US-West Gateway)'
  },
  'cp_cust_1': {
    id: 'cp_cust_1',
    call_id: '1',
    user_id: null,
    participant_name: 'Verified Customer',
    role: 'attendee',
    joined_at: 'Oct 25, 09:30:00 AM',
    left_at: 'Oct 25, 09:32:09 AM',
    participant_status: 'left',
    connection_quality: 84,
    device: 'iPhone 15 Pro - Safari Mobile',
    location: 'New York, NY (US-East Gateway)'
  }
};

const CallParticipantDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const participant = MOCK_PARTICIPANTS[id] || MOCK_PARTICIPANTS['cp_agent_1'];

  if (!participant) return <div className="p-8 text-slate-500">Participant record not found.</div>;

  const durationSeconds = participant.left_at ? 124 : 0;
  const initials = participant.participant_name.split(' ').map(n => n[0]).join('');

  return (
    <RecordPanelLayout
      title={participant.participant_name}
      subtitle={`${participant.role.charAt(0).toUpperCase() + participant.role.slice(1)} Session Details`}
      onBack={() => navigate(`${APP_ROUTES.CRM_CONNECT.CALLS}/${participant.call_id}`)}
      actions={
        <div className="flex space-x-2">
          <button 
            onClick={() => navigate(`${APP_ROUTES.CRM_CONNECT.CALLS}/${participant.call_id}`)}
            className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-slate-50 transition-colors"
          >
            View Full Call Record
          </button>
          {participant.user_id && (
            <button 
              onClick={() => navigate(`${APP_ROUTES.CRM_CONNECT.PARTICIPANTS}/${participant.user_id}`)}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-100"
            >
              View User Profile
            </button>
          )}
        </div>
      }
    >
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 pb-12">
        <div className="lg:col-span-2 space-y-6">
          {/* Participant Session Header */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8">
              <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                participant.participant_status === 'joined' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'
              }`}>
                {participant.participant_status} session
              </span>
            </div>
            <div className="flex items-center space-x-6">
              <div className="w-24 h-24 rounded-full bg-slate-50 flex items-center justify-center text-3xl font-black text-slate-300 border-4 border-slate-100">
                {initials}
              </div>
              <div>
                <h2 className="text-3xl font-black text-slate-900 tracking-tighter mb-1">{participant.participant_name}</h2>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center text-xs font-bold text-indigo-500 uppercase tracking-widest">
                    <StarIcon className="w-3 h-3 mr-1" /> {participant.role}
                  </div>
                  <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
                  <div className="text-xs text-slate-400 font-medium">Session ID: {participant.id}</div>
                </div>
              </div>
            </div>

            {/* Presence Timeline Visualization */}
            <div className="mt-12">
              <div className="flex justify-between items-end mb-4">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Session Timeline</h4>
                <span className="text-xs font-black text-indigo-600">{Math.floor(durationSeconds/60)}m {durationSeconds%60}s Active</span>
              </div>
              <div className="relative h-12 bg-slate-50 rounded-2xl overflow-hidden border border-slate-100">
                <div className="absolute inset-y-0 left-[5%] right-[5%] bg-slate-200/50 rounded-lg"></div>
                <div className="absolute inset-y-0 left-[10%] right-[15%] bg-indigo-500 rounded-lg border-x-4 border-indigo-400 shadow-lg shadow-indigo-100">
                  <div className="h-full w-full flex items-center justify-center">
                    <span className="text-[9px] font-black text-white uppercase tracking-widest opacity-80">Connected Window</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-between mt-3 text-[10px] font-mono text-slate-400 px-1">
                <span>Call Start</span>
                <span>Call End</span>
              </div>
            </div>
          </div>

          <SectionCard title="Session Activity Log">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center shrink-0 border border-green-100">
                  <ArrowUpRightIcon className="w-4 h-4 text-green-600" />
                </div>
                <div className="flex-1 border-b border-slate-50 pb-4">
                  <p className="text-sm font-bold text-slate-900">Joined via Browser Gateway</p>
                  <p className="text-xs text-slate-500 mt-0.5">{participant.joined_at}</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center shrink-0 border border-indigo-100">
                  <PhoneIcon className="w-4 h-4 text-indigo-600" />
                </div>
                <div className="flex-1 border-b border-slate-50 pb-4">
                  <p className="text-sm font-bold text-slate-900">Media Stream Initialized</p>
                  <p className="text-xs text-slate-500 mt-0.5">Opus Codec @ 48kHz, 128kbps</p>
                </div>
              </div>
              <div className="flex items-start space-x-4 opacity-60">
                <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center shrink-0 border border-slate-200">
                  <InformationCircleIcon className="w-4 h-4 text-slate-400" />
                </div>
                <div className="flex-1 pb-4">
                  <p className="text-sm font-bold text-slate-900">Disconnected by User</p>
                  <p className="text-xs text-slate-500 mt-0.5">{participant.left_at || 'Still Active'}</p>
                </div>
              </div>
            </div>
          </SectionCard>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <SectionCard title="Technical Specs">
            <dl className="space-y-6">
              <div>
                <dt className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Session Health</dt>
                <div className="flex items-end justify-between">
                  <span className="text-2xl font-black text-emerald-500 tracking-tighter">{participant.connection_quality}%</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase mb-1">Optimal</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full mt-2 overflow-hidden">
                  <div className="h-full bg-emerald-500" style={{ width: `${participant.connection_quality}%` }}></div>
                </div>
              </div>
              <div>
                <dt className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Hardware & OS</dt>
                <dd className="text-xs font-bold text-slate-800 leading-relaxed">{participant.device}</dd>
              </div>
              <div>
                <dt className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Network Origin</dt>
                <dd className="text-xs font-bold text-slate-800 leading-relaxed">{participant.location}</dd>
              </div>
            </dl>
          </SectionCard>

          <div className="p-6 bg-slate-950 rounded-2xl text-white shadow-xl shadow-slate-200">
            <div className="flex items-center space-x-3 mb-4">
              <InformationCircleIcon className="w-5 h-5 text-indigo-400" />
              <h4 className="font-bold text-sm tracking-tight">Audit Note</h4>
            </div>
            <p className="text-xs leading-relaxed text-slate-400">
              This participant used a verified secure gateway. No jitter or packet loss was detected during the {Math.floor(durationSeconds/60)} minute window.
            </p>
          </div>

          <button 
            onClick={() => navigate(APP_ROUTES.CRM_CONNECT.CALLS)}
            className="w-full py-4 bg-white border border-slate-200 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all border-dashed"
          >
            Return to Call Registry
          </button>
        </div>
      </div>
    </RecordPanelLayout>
  );
};

export default CallParticipantDetail;

