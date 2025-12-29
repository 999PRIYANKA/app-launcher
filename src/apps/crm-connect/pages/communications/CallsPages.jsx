import React, { useState, useMemo, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DataTable from '../../../../components/common/DataTable';
import SearchBox from '../../../../components/common/SearchBox';
import Pagination from '../../../../components/common/Pagination';
import RecordPanelLayout from '../../components/shared/RecordPanelLayout';
import SectionCard from '../../components/shared/SectionCard';
import { 
  PhoneIcon, 
  ArrowUpRightIcon, 
  ArrowDownLeftIcon, 
  ClockIcon,
  InformationCircleIcon,
  UserGroupIcon
} from '../../../../constants/icons';
import { APP_ROUTES } from '../../../../config/appRoutes';

const MOCK_TRANSCRIPT = [
  { time: '00:02', speaker: 'Agent', text: 'Hello, this is Dustin from CRM Connect. How can I help you today?' },
  { time: '00:08', speaker: 'Client', text: 'Hey Dustin, I saw the Q4 promotion on your website and wanted to get more details.' },
  { time: '00:15', speaker: 'Agent', text: 'Absolutely! We have several tiers depending on your team size. Are you looking at the Pro or Enterprise plan?' },
  { time: '00:22', speaker: 'Client', text: 'Probably Enterprise. We have about 45 agents globally.' },
];

const MOCK_CALLS = [
  { 
    id: '1', 
    caller_number: '(555) 123-4567', 
    callee_number: '(555) 987-6543', 
    direction: 'inbound', 
    status: 'completed', 
    duration: 124, 
    started_at: 'Oct 25, 09:30 AM', 
    disposition: 'Meaningful contact', 
    disposition_notes: 'Client interested in Q4 promo. Needs follow-up next Tuesday regarding pricing tiers.',
    agent_user_id: 'dustin_01',
    agent_name: 'Dustin Wyatt',
    contact_id: '1',
    recording_url: 'https://example.com/recording1.mp3',
    transcript: MOCK_TRANSCRIPT,
    sentiment: 'positive'
  },
  { 
    id: '2', 
    caller_number: '(555) 555-5555', 
    callee_number: '(555) 111-2222', 
    direction: 'outbound', 
    status: 'no-answer', 
    duration: 0, 
    started_at: 'Oct 25, 10:15 AM', 
    disposition: 'Left voicemail', 
    disposition_notes: 'Automated voicemail left. No response yet.',
    agent_user_id: 'alice_02',
    agent_name: 'Alice Johnson',
    contact_id: '2',
    recording_url: null,
    sentiment: 'neutral'
  },
  { 
    id: '3', 
    caller_number: '(555) 333-4444', 
    callee_number: '(555) 987-6543', 
    direction: 'inbound', 
    status: 'missed', 
    duration: 0, 
    started_at: 'Oct 24, 04:45 PM',
    agent_user_id: 'bob_03',
    agent_name: 'Bob Williams',
    contact_id: null,
    recording_url: null
  },
  { 
    id: '4', 
    caller_number: '(555) 222-3333', 
    callee_number: '(555) 987-6543', 
    direction: 'inbound', 
    status: 'completed', 
    duration: 450, 
    started_at: 'Oct 24, 02:15 PM', 
    disposition: 'Successful Sale', 
    disposition_notes: 'Closed the Enterprise deal. Signed contract expected tomorrow.',
    agent_user_id: 'dustin_01',
    agent_name: 'Dustin Wyatt',
    contact_id: '3',
    recording_url: 'https://example.com/recording4.mp3',
    sentiment: 'positive'
  },
];

const Waveform = () => {
  const bars = Array.from({ length: 48 }, (_, i) => Math.random() * 24 + 4);
  return (
    <div className="flex items-center justify-between space-x-[2px] h-10 w-full px-2 opacity-60">
      {bars.map((height, i) => (
        <div 
          key={i} 
          className={`flex-1 rounded-full transition-all ${i < 15 ? 'bg-indigo-400' : 'bg-slate-700'}`} 
          style={{ height: `${height}px` }}
        />
      ))}
    </div>
  );
};

const CallDetailView = ({ id }) => {
  const navigate = useNavigate();
  const selectedCall = MOCK_CALLS.find(c => c.id === id);

  if (!selectedCall) return <div className="p-8 text-slate-500 font-medium">Call record not found.</div>;

  const transcriptToRender = selectedCall.transcript || MOCK_TRANSCRIPT;
  const contactNumber = selectedCall.direction === 'inbound' ? selectedCall.caller_number : selectedCall.callee_number;

  return (
    <RecordPanelLayout
      title={`Call with ${contactNumber}`}
      subtitle={`Initiated on ${selectedCall.started_at}`}
      onBack={() => navigate(APP_ROUTES.CRM_CONNECT.CALLS)}
      actions={
        <div className="flex space-x-2">
          <button 
            disabled={!selectedCall.recording_url}
            onClick={() => selectedCall.recording_url && window.open(selectedCall.recording_url, '_blank')}
            className={`bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-slate-50 transition-colors flex items-center space-x-2 ${!selectedCall.recording_url ? 'opacity-40 cursor-not-allowed grayscale' : ''}`}
          >
            <InformationCircleIcon className="w-4 h-4" />
            <span>Download Recording</span>
          </button>
          <button 
            disabled={!selectedCall.contact_id}
            onClick={() => selectedCall.contact_id && navigate(`${APP_ROUTES.CRM_CONNECT.CONTACTS}/${selectedCall.contact_id}`)}
            className={`bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100 flex items-center space-x-2 ${!selectedCall.contact_id ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <UserGroupIcon className="w-4 h-4" />
            <span>View Profile</span>
          </button>
        </div>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Call Summary & Participants Hub */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SectionCard title="Participants Hub">
              <div className="flex items-center justify-between p-2 relative h-full">
                <button 
                  onClick={() => navigate(`${APP_ROUTES.CRM_CONNECT.CALLS}/call-participants/cp_agent_${selectedCall.id}`)}
                  className="flex flex-col items-center space-y-2 z-10 hover:scale-105 transition-transform"
                >
                  <div className="w-14 h-14 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-black border-4 border-white shadow-sm ring-1 ring-indigo-50">
                    {selectedCall.agent_name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <span className="text-[10px] font-bold text-slate-900 text-center">{selectedCall.agent_name.split(' ')[0]}</span>
                  <span className="text-[9px] font-bold text-indigo-400 uppercase tracking-tighter">Agent</span>
                </button>

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 border-t-2 border-dashed border-slate-200"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-1 rounded-full border border-slate-100">
                  <PhoneIcon className="w-3 h-3 text-slate-300" />
                </div>

                <button 
                  onClick={() => navigate(`${APP_ROUTES.CRM_CONNECT.CALLS}/call-participants/cp_cust_${selectedCall.id}`)}
                  className="flex flex-col items-center space-y-2 z-10 hover:scale-105 transition-transform"
                >
                  <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 font-black border-4 border-white shadow-sm ring-1 ring-slate-50">
                    <UserGroupIcon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-900 text-center">Customer</span>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Verified</span>
                </button>
              </div>
            </SectionCard>

            <SectionCard title="AI Sentiment Summary">
              <div className="flex flex-col h-full justify-between">
                <div className={`inline-flex items-center px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest mb-3 self-start ${
                  selectedCall.sentiment === 'positive' ? 'bg-green-100 text-green-700' :
                  selectedCall.sentiment === 'negative' ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-600'
                }`}>
                  {selectedCall.sentiment || 'Neutral'} Sentiment
                </div>
                <div className="text-xs text-slate-700 leading-relaxed italic border-l-2 border-slate-100 pl-4 py-1">
                  {selectedCall.disposition_notes || 'AI is processing this call to generate behavioral insights...'}
                </div>
              </div>
            </SectionCard>
          </div>

          {/* Transcript Area */}
          <SectionCard title="Conversation Transcript">
            <div className="space-y-8">
              {transcriptToRender.map((entry, idx) => (
                <div key={idx} className="flex items-start group">
                  <div className="w-16 shrink-0 pt-1.5">
                    <span className="text-[10px] font-mono text-slate-400 bg-slate-50 px-2 py-0.5 rounded-full border border-slate-100 opacity-0 group-hover:opacity-100 transition-opacity">
                      {entry.time}
                    </span>
                  </div>
                  <div className="flex-1 border-b border-slate-50 pb-6 group-last:border-0 group-last:pb-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className={`text-[11px] font-black uppercase tracking-wider ${entry.speaker === 'Agent' ? 'text-indigo-600' : 'text-slate-900'}`}>
                        {entry.speaker}
                      </span>
                      {entry.speaker === 'Agent' && <span className="bg-indigo-50 text-indigo-500 text-[8px] font-bold px-1 rounded uppercase">System</span>}
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed font-medium">{entry.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>

        <div className="lg:col-span-1 space-y-6">
          {/* Audio Player */}
          <SectionCard title="Call Recording">
            <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-2xl ring-1 ring-white/5">
              <div className="flex items-center space-x-4 mb-6">
                <button className="w-12 h-12 bg-indigo-500 text-white rounded-full flex items-center justify-center shrink-0 hover:bg-indigo-400 hover:scale-105 transition-all active:scale-95 shadow-lg shadow-indigo-500/20">
                  <svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" /></svg>
                </button>
                <div className="flex-1">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Playback Status</p>
                  <div className="flex justify-between items-end">
                    <span className="text-xl font-black tabular-nums tracking-tighter">00:00</span>
                    <span className="text-[10px] font-mono text-slate-500">/ {Math.floor(selectedCall.duration/60)}:{(selectedCall.duration%60).toString().padStart(2,'0')}</span>
                  </div>
                </div>
              </div>
              
              <Waveform />

              <div className="mt-6 flex gap-2">
                <button className="flex-1 py-2.5 bg-slate-800 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-slate-700 transition-colors border border-white/5">
                  Search Transcript
                </button>
                <button className="px-4 py-2.5 bg-indigo-600/20 text-indigo-400 rounded-xl hover:bg-indigo-600/30 transition-colors border border-indigo-500/10">
                  <ArrowUpRightIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          </SectionCard>

          {/* Metadata */}
          <SectionCard title="Session Details">
            <dl className="space-y-6">
              <div className="group">
                <dt className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center group-hover:text-indigo-500 transition-colors">
                  <InformationCircleIcon className="w-3 h-3 mr-2" /> Call Reference ID
                </dt>
                <dd className="text-xs font-mono text-slate-600 mt-1 flex items-center justify-between bg-slate-50 p-2 rounded-lg border border-slate-100">
                  {selectedCall.id}
                  <button className="text-[8px] font-bold text-indigo-600 uppercase hover:underline">Copy</button>
                </dd>
              </div>
              <div className="flex justify-between">
                <div>
                  <dt className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center">
                    <ArrowUpRightIcon className="w-3 h-3 mr-2 text-indigo-500" /> Direction
                  </dt>
                  <dd className="text-sm font-bold text-slate-900 capitalize mt-1 pl-5">{selectedCall.direction}</dd>
                </div>
                <div className="text-right">
                  <dt className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Disposition</dt>
                  <dd className="text-sm font-bold text-indigo-600 mt-1">{selectedCall.disposition || 'Pending'}</dd>
                </div>
              </div>
              <div>
                <dt className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center">
                  <ClockIcon className="w-3 h-3 mr-2 text-indigo-500" /> Session Timing
                </dt>
                <dd className="text-xs font-semibold text-slate-700 mt-1 pl-5">
                  Started {selectedCall.started_at}
                  <div className="text-[10px] text-slate-400 font-medium">Duration: {selectedCall.duration} seconds</div>
                </dd>
              </div>
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center text-[10px] font-bold text-white uppercase">{selectedCall.agent_name[0]}</div>
                  <span className="text-xs font-bold text-slate-700">{selectedCall.agent_name}</span>
                </div>
                <span className={`px-2 py-0.5 text-[9px] font-black uppercase rounded-md ${
                  selectedCall.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {selectedCall.status}
                </span>
              </div>
            </dl>
          </SectionCard>
        </div>
      </div>
    </RecordPanelLayout>
  );
};

export const CallsList = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  if (id) {
    return <CallDetailView id={id} />;
  }

  const headers = [
    { value: 'started_at', label: 'Started At' },
    { 
      value: 'contact', 
      label: 'Contact',
      render: (item) => (
        <div className="flex flex-col">
          <span className="font-bold text-slate-900">
            {item.direction === 'inbound' ? item.caller_number : item.callee_number}
          </span>
          <span className="text-[10px] text-slate-400 font-medium uppercase tracking-tighter">
            {item.direction === 'inbound' ? 'Caller' : 'Dialed'}
          </span>
        </div>
      )
    },
    { 
      value: 'direction', 
      label: 'Direction',
      render: (item) => (
        <div className="flex items-center space-x-2">
          {item.direction === 'inbound' ? (
            <div className="flex items-center text-green-600 bg-green-50 px-2 py-1 rounded-md text-[10px] font-bold">
              <ArrowDownLeftIcon className="w-3 h-3 mr-1" /> INBOUND
            </div>
          ) : (
            <div className="flex items-center text-blue-600 bg-blue-50 px-2 py-1 rounded-md text-[10px] font-bold">
              <ArrowUpRightIcon className="w-3 h-3 mr-1" /> OUTBOUND
            </div>
          )}
        </div>
      )
    },
    { 
      value: 'duration', 
      label: 'Duration',
      render: (item) => `${Math.floor(item.duration / 60)}:${(item.duration % 60).toString().padStart(2, '0')}`
    },
    { 
      value: 'status', 
      label: 'Status',
      render: (item) => (
        <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
          item.status === 'completed' ? 'bg-green-100 text-green-700' : 
          item.status === 'missed' ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-600'
        }`}>
          {item.status}
        </span>
      )
    },
    { 
      value: 'action', 
      label: 'Action',
      render: (item) => (
        <button 
          onClick={(e) => { 
            e.stopPropagation(); 
            window.dispatchEvent(new CustomEvent('CRM_DIAL', { detail: { number: item.direction === 'inbound' ? item.caller_number : item.callee_number } }));
          }}
          className="p-2 text-indigo-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-all"
          title="Call Back"
        >
          <PhoneIcon className="w-4 h-4" />
        </button>
      )
    },
  ];

  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) return MOCK_CALLS;
    return MOCK_CALLS.filter((item) =>
      Object.values(item).some(
        (val) =>
          val !== null &&
          val !== undefined &&
          String(val).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm]);

  // Reset to page 1 when search term changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Calculate pagination
  const totalItems = filteredData.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  const pagination = useMemo(() => ({
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1,
  }), [currentPage, totalPages, totalItems]);

  const handlePageChange = useCallback((newPage) => {
    if (newPage >= 1 && newPage <= totalPages && newPage !== currentPage) {
      setCurrentPage(newPage);
    }
  }, [totalPages, currentPage]);

  const handlePrevPage = useCallback(() => {
    if (pagination.hasPrevPage) {
      setCurrentPage(currentPage - 1);
    }
  }, [pagination.hasPrevPage, currentPage]);

  const handleNextPage = useCallback(() => {
    if (pagination.hasNextPage) {
      setCurrentPage(currentPage + 1);
    }
  }, [pagination.hasNextPage, currentPage]);

  return (
    <div className="p-6 h-full space-y-4">
      <div className="flex justify-between items-center">
        <h2 style={{ fontSize: "1.75rem" }} className="font-bold text-gray-800">
          Call Logs
        </h2>
        
      </div>
      <div className="flex gap-3 items-center">
        <SearchBox
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search call logs by contact, direction, status..."
          style={{
            width: "600px",
            minWidth: "400px",
            height: "2rem",
          }}
          showSearchButton={true}
          onSearch={() => {}}
        />
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-colors">
          Export Logs
        </button>
      </div>
      <DataTable
        headers={headers}
        data={paginatedData}
        onRowClick={(item) => navigate(`${APP_ROUTES.CRM_CONNECT.CALLS}/${item.id}`)}
        emptyMessage="No call logs found"
      />
      <Pagination
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        hasNextPage={pagination.hasNextPage}
        hasPrevPage={pagination.hasPrevPage}
        onPageChange={handlePageChange}
        onPrevPage={handlePrevPage}
        onNextPage={handleNextPage}
      />
    </div>
  );
};

export default CallsList;

