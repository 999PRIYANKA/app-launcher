import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { StandardListView } from '../../components/shared/StandardListView';
import RecordPanelLayout from '../../components/shared/RecordPanelLayout';
import SectionCard from '../../components/shared/SectionCard';
import { 
  PhoneIcon, 
  ClockIcon, 
  UserGroupIcon, 
  InformationCircleIcon, 
  ArrowUpRightIcon,
  ChatBubbleOvalLeftIcon
} from '../../../../constants/icons';
import { APP_ROUTES } from '../../../../config/appRoutes';

const MOCK_TRANSCRIPT = [
  { time: '0:02', speaker: 'Agent', text: 'Good morning, this is Dustin with CRM Connect Support. How can I assist you today?' },
  { time: '0:07', speaker: 'Customer', text: "Hi Dustin, I'm having some trouble with the softphone integration on my dashboard. It keeps disconnecting." },
  { time: '0:14', speaker: 'Agent', text: "I'm sorry to hear that. Let's look into your connection settings. Are you on a VPN currently?" },
  { time: '0:21', speaker: 'Customer', text: "Actually, yes. I'm working from the London office today." },
  { time: '0:28', speaker: 'Agent', text: "That might be it. Our WebRTC gateway requires a direct route for low latency. Could you try bypassing the VPN for the *.crm-connect.io domain?" },
];

const MOCK_RECORDINGS = [
  { 
    id: '1', 
    call_id: '1', 
    url: 'https://example.com/rec1.mp3', 
    duration: 124, 
    created_at: 'Oct 25, 2023 09:32 AM', 
    format: 'mp3',
    status: 'available',
    media_type: 'audio',
    agent_name: 'Dustin Wyatt',
    agent_initials: 'DW',
    customer_display: '(555) 123-4567',
    customer_initials: 'JC',
    download_label: 'Download MP3',
    has_transcript: true,
    audio_clarity_percent: 98.4,
    transcription_available: true,
    sentiment: 'positive',
    topics: ['Integration', 'VPN Settings', 'Technical Support'],
    transcript_data: MOCK_TRANSCRIPT
  },
  { 
    id: '2', 
    call_id: '3', 
    url: 'https://example.com/rec2.mp3', 
    duration: 300, 
    created_at: 'Oct 24, 2023 05:00 PM', 
    format: 'wav',
    status: 'processing',
    media_type: 'audio',
    agent_name: 'Alice Johnson',
    agent_initials: 'AJ',
    customer_display: '(555) 333-4444',
    download_label: 'Download WAV',
    has_transcript: false,
    transcription_available: false,
    sentiment: 'neutral',
    topics: ['Follow-up', 'Sales Inquiry']
  },
];

export const RecordingsList = () => {
  const navigate = useNavigate();

  const renderSentiment = (sentiment) => {
    const colors = {
      positive: 'text-green-600 bg-green-50',
      neutral: 'text-slate-500 bg-slate-50',
      negative: 'text-red-600 bg-red-50'
    };
    return (
      <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${colors[sentiment]}`}>
        {sentiment}
      </span>
    );
  };

  return (
    <div className="p-6 h-full">
      <StandardListView
        title="Call Recordings"
        data={MOCK_RECORDINGS}
        onRowClick={(item) => navigate(`${APP_ROUTES.CRM_CONNECT.RECORDINGS}/${item.id}`)}
        columns={[
          { 
            header: 'Timestamp', 
            accessor: (item) => (
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-slate-100 rounded-lg">
                  <ClockIcon className="w-4 h-4 text-slate-500" />
                </div>
                <span className="font-medium text-slate-700">{item.created_at}</span>
              </div>
            )
          },
          { 
            header: 'Agent', 
            accessor: (item) => (
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 bg-indigo-600 text-white rounded-full flex items-center justify-center text-[10px] font-bold">
                  {item.agent_initials}
                </div>
                <span className="text-sm font-semibold">{item.agent_name}</span>
              </div>
            )
          },
          { 
            header: 'Contact', 
            accessor: (item) => (
              <div className="flex flex-col">
                <span className="font-bold text-slate-900">{item.customer_display}</span>
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-tighter">Verified Contact</span>
              </div>
            )
          },
          { header: 'Sentiment', accessor: (item) => renderSentiment(item.sentiment) },
          { 
            header: 'Duration', 
            accessor: (item) => (
              <span className="font-mono text-xs font-bold bg-slate-100 px-2 py-1 rounded">
                {Math.floor(item.duration / 60)}:{(item.duration % 60).toString().padStart(2, '0')}
              </span>
            )
          },
          { 
            header: 'Status', 
            accessor: (item) => (
              <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest ${
                item.status === 'available' ? 'bg-indigo-100 text-indigo-700' : 'bg-amber-50 text-amber-700'
              }`}>
                {item.status}
              </span>
            )
          },
        ]}
      />
    </div>
  );
};

export const RecordingDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  
  const rec = MOCK_RECORDINGS.find(r => r.id === id);
  if (!rec) return <div className="p-8 text-slate-500 font-medium">Recording not found.</div>;

  return (
    <RecordPanelLayout 
      title="Communication Audit" 
      subtitle={`Session ID: ${rec.id} | Linked Call: #${rec.call_id}`}
      onBack={() => navigate(APP_ROUTES.CRM_CONNECT.RECORDINGS)}
      actions={
        <div className="flex space-x-2">
          <button className="bg-white border border-slate-200 px-4 py-2 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors flex items-center space-x-2">
            <InformationCircleIcon className="w-4 h-4" />
            <span>Share</span>
          </button>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-colors">
            Flag Review
          </button>
        </div>
      }
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-8 space-y-8">
          {/* Integrated Player Card */}
          <div className="bg-slate-950 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[100px] rounded-full -mr-32 -mt-32"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Live Playback Control</h3>
                  <p className="text-xl font-bold tracking-tight">Audio Stream: {rec.format.toUpperCase()} Protocol</p>
                </div>
                <div className="text-right">
                  <span className="px-3 py-1 bg-white/10 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md border border-white/10">
                    Quality: {rec.audio_clarity_percent}%
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-8 mb-10">
                <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-20 h-20 bg-indigo-500 hover:bg-indigo-400 text-white rounded-full flex items-center justify-center transition-all transform active:scale-90 shadow-xl shadow-indigo-500/30"
                >
                  {isPlaying ? (
                    <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                  ) : (
                    <svg className="w-10 h-10 ml-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" /></svg>
                  )}
                </button>
                
                <div className="flex-1">
                  <div className="flex justify-between text-[11px] font-mono text-slate-400 mb-3">
                    <span className={isPlaying ? "text-indigo-400 animate-pulse" : ""}>00:12</span>
                    <span>{Math.floor(rec.duration / 60)}:{(rec.duration % 60).toString().padStart(2, '0')}</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full relative overflow-hidden group cursor-pointer">
                    <div className="h-full bg-gradient-to-r from-indigo-600 to-indigo-400 w-1/4 rounded-full relative">
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg scale-0 group-hover:scale-100 transition-transform"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4">
                <button className="py-3 bg-white/5 hover:bg-white/10 rounded-xl text-[9px] font-black uppercase tracking-widest border border-white/5 transition-all">Speed 1x</button>
                <button className="py-3 bg-white/5 hover:bg-white/10 rounded-xl text-[9px] font-black uppercase tracking-widest border border-white/5 transition-all">Pitch Normal</button>
                <button className="py-3 bg-white/5 hover:bg-white/10 rounded-xl text-[9px] font-black uppercase tracking-widest border border-white/5 transition-all">Noise Reduction</button>
                <button className="py-3 bg-indigo-500/20 text-indigo-400 hover:bg-indigo-500/30 rounded-xl text-[9px] font-black uppercase tracking-widest border border-indigo-500/20 transition-all">Download {rec.format.toUpperCase()}</button>
              </div>
            </div>
          </div>

          {/* Transcription Viewer */}
          <SectionCard title="Conversation Transcript (AI Generated)">
            {!rec.transcription_available ? (
              <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center">
                  <ChatBubbleOvalLeftIcon className="w-8 h-8 text-slate-300" />
                </div>
                <div>
                  <p className="text-slate-900 font-bold">Transcription Pending</p>
                  <p className="text-sm text-slate-400">The AI is currently processing this audio file...</p>
                </div>
                <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg text-xs font-bold hover:bg-indigo-700 transition-colors">
                  Prioritize Process
                </button>
              </div>
            ) : (
              <div className="space-y-8 max-h-[600px] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-slate-200">
                {rec.transcript_data?.map((entry, idx) => (
                  <div key={idx} className={`flex items-start group ${entry.speaker === 'Agent' ? 'flex-row' : 'flex-row-reverse'}`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-sm ${
                      entry.speaker === 'Agent' ? 'bg-indigo-600 text-white mr-4' : 'bg-slate-800 text-white ml-4'
                    }`}>
                      <span className="text-[10px] font-bold">{entry.speaker === 'Agent' ? rec.agent_initials : rec.customer_initials}</span>
                    </div>
                    <div className={`flex-1 ${entry.speaker === 'Agent' ? 'text-left' : 'text-right'}`}>
                      <div className={`flex items-center mb-1 space-x-2 ${entry.speaker === 'Agent' ? 'justify-start' : 'justify-end'}`}>
                        <span className="text-[11px] font-black uppercase tracking-widest text-slate-400 group-hover:text-indigo-600 transition-colors">
                          {entry.speaker}
                        </span>
                        <span className="text-[10px] font-mono text-slate-300">{entry.time}</span>
                      </div>
                      <div className={`inline-block px-5 py-3 rounded-2xl text-sm leading-relaxed ${
                        entry.speaker === 'Agent' 
                        ? 'bg-indigo-50 text-indigo-900 rounded-tl-none border border-indigo-100' 
                        : 'bg-slate-50 text-slate-900 rounded-tr-none border border-slate-100'
                      }`}>
                        {entry.text}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </SectionCard>
        </div>

        {/* Intelligence Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <SectionCard title="Session Intelligence">
            <div className="space-y-6">
              <div>
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 block">Sentiment Breakdown</label>
                <div className="flex items-center space-x-2">
                  <div className={`w-4 h-4 rounded-full ${rec.sentiment === 'positive' ? 'bg-green-500' : 'bg-slate-400'}`}></div>
                  <span className="text-sm font-bold capitalize text-slate-800">{rec.sentiment} Outlook</span>
                </div>
                <div className="mt-3 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden flex">
                  <div className="h-full bg-green-500 w-3/4"></div>
                  <div className="h-full bg-amber-400 w-1/4"></div>
                </div>
                <p className="text-[10px] text-slate-400 mt-2 italic">Based on behavioral voice analysis</p>
              </div>

              <div className="pt-6 border-t border-slate-100">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 block">Extracted Topics</label>
                <div className="flex flex-wrap gap-2">
                  {rec.topics.map(topic => (
                    <span key={topic} className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-bold rounded-lg border border-indigo-100">
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Recording Technicals">
            <dl className="space-y-4">
              <div className="flex justify-between items-center">
                <dt className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Format</dt>
                <dd className="text-xs font-mono bg-slate-100 px-2 py-1 rounded text-slate-600">{rec.format.toUpperCase()}</dd>
              </div>
              <div className="flex justify-between items-center">
                <dt className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Duration</dt>
                <dd className="text-xs font-bold text-slate-900">{Math.floor(rec.duration/60)}m {rec.duration%60}s</dd>
              </div>
              <div className="flex justify-between items-center">
                <dt className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Protocol</dt>
                <dd className="text-xs font-bold text-slate-900">{rec.media_type === 'audio' ? 'VoIP / Audio' : 'Video'}</dd>
              </div>
              <div className="flex justify-between items-center">
                <dt className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Encryption</dt>
                <dd className="text-[10px] font-bold text-green-600 uppercase">AES-256</dd>
              </div>
            </dl>
            <button 
              onClick={() => navigate(`${APP_ROUTES.CRM_CONNECT.CALLS}/${rec.call_id}`)}
              className="w-full mt-6 py-3 bg-white border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest text-indigo-600 hover:bg-indigo-50 transition-colors flex items-center justify-center space-x-2"
            >
              <span>Inspect Call Record</span>
              <ArrowUpRightIcon className="w-3 h-3" />
            </button>
          </SectionCard>

          <div className="p-6 bg-indigo-600 rounded-2xl text-white shadow-xl shadow-indigo-100">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-white/20 rounded-lg">
                <UserGroupIcon className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm tracking-tight">Agent Coaching</h4>
            </div>
            <p className="text-xs leading-relaxed opacity-90 mb-4">
              Dustin demonstrated excellent active listening during this 2-minute session. Audio clarity was peak at {rec.audio_clarity_percent}%.
            </p>
            <button className="text-[10px] font-bold uppercase tracking-widest border-b border-white/50 hover:border-white transition-all">
              Add to Performance Log
            </button>
          </div>
        </div>
      </div>
    </RecordPanelLayout>
  );
};

export default RecordingsList;

