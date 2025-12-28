import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { StandardListView } from '../../components/shared/StandardListView';
import RecordPanelLayout from '../../components/shared/RecordPanelLayout';
import SectionCard from '../../components/shared/SectionCard';
import { ChatBubbleOvalLeftIcon, ArrowUpRightIcon, ArrowDownLeftIcon, UserGroupIcon } from '../../../../constants/icons';
import { APP_ROUTES } from '../../../../config/appRoutes';

const MOCK_SMS_LOGS = [
  { id: '1', contact_number: '(555) 123-4567', contact_name: 'Alice Johnson', direction: 'inbound', body: 'Hey Dustin, I saw the Q4 promotion on your website and wanted to get more details.', timestamp: 'Oct 26, 09:10 AM', status: 'read' },
  { id: '2', contact_number: '(555) 123-4567', contact_name: 'Alice Johnson', direction: 'outbound', body: 'Absolutely! We have several tiers depending on your team size. Are you looking at the Pro or Enterprise plan?', timestamp: 'Oct 26, 09:12 AM', status: 'delivered' },
  { id: '3', contact_number: '(555) 999-8888', contact_name: 'Bob Williams', direction: 'outbound', body: 'Your meeting has been scheduled for tomorrow at 10 AM.', timestamp: 'Oct 25, 02:30 PM', status: 'sent' },
  { id: '4', contact_number: '(555) 000-1111', direction: 'inbound', body: 'Is this the office line?', timestamp: 'Oct 24, 11:45 AM', status: 'read' },
];

export const SmsLogsList = () => {
  const navigate = useNavigate();
  return (
    <div className="p-6 h-full">
      <StandardListView
        title="SMS Logs"
        data={MOCK_SMS_LOGS}
        onRowClick={(item) => navigate(`${APP_ROUTES.CRM_CONNECT.SMS}/${item.id}`)}
        columns={[
          { header: 'Timestamp', accessor: 'timestamp', className: 'w-48' },
          { 
            header: 'Contact', 
            accessor: (item) => (
              <div className="flex flex-col">
                <span className="font-bold text-slate-900">{item.contact_name || 'Unknown'}</span>
                <span className="text-[10px] text-slate-500">{item.contact_number}</span>
              </div>
            )
          },
          { 
            header: 'Direction', 
            accessor: (item) => (
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
            header: 'Message Body', 
            accessor: (item) => <div className="max-w-md truncate text-slate-600">{item.body}</div> 
          },
          { 
            header: 'Status', 
            accessor: (item) => (
              <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                item.status === 'delivered' || item.status === 'read' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'
              }`}>
                {item.status}
              </span>
            )
          },
        ]}
        actions={
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-colors">
            Compose SMS
          </button>
        }
      />
    </div>
  );
};

export const SmsLogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const log = MOCK_SMS_LOGS.find(l => l.id === id);

  if (!log) return <div className="p-8 text-slate-500">Log not found.</div>;

  return (
    <RecordPanelLayout 
      title="Message Details" 
      subtitle={log.timestamp}
      onBack={() => navigate(APP_ROUTES.CRM_CONNECT.SMS)}
      actions={
        <button 
          onClick={() => navigate(`${APP_ROUTES.CRM_CONNECT.CONTACTS}/1`)}
          className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-slate-50 transition-colors"
        >
          View Contact
        </button>
      }
    >
      <div className="max-w-3xl mx-auto space-y-6">
        <SectionCard title="Conversation Context">
          <div className={`p-6 rounded-2xl flex flex-col space-y-4 ${
            log.direction === 'inbound' ? 'bg-slate-100 border border-slate-200 self-start' : 'bg-indigo-600 text-white self-end'
          }`}>
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold uppercase tracking-widest opacity-70">
                {log.direction === 'inbound' ? 'Received From' : 'Sent To'} {log.contact_name || log.contact_number}
              </span>
              <span className="text-[10px] font-mono opacity-70">{log.timestamp}</span>
            </div>
            <p className="text-lg leading-relaxed">{log.body}</p>
            <div className="flex justify-end">
              <span className="text-[10px] font-bold uppercase tracking-widest opacity-70">{log.status}</span>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Metadata">
          <dl className="grid grid-cols-2 gap-4">
            <div>
              <dt className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Message ID</dt>
              <dd className="text-sm font-mono text-slate-600">{log.id}</dd>
            </div>
            <div>
              <dt className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Network Status</dt>
              <dd className="text-sm font-semibold capitalize text-green-600">Delivered</dd>
            </div>
            <div>
              <dt className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Segment Count</dt>
              <dd className="text-sm text-slate-600">1</dd>
            </div>
            <div>
              <dt className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Media Attachments</dt>
              <dd className="text-sm text-slate-400 italic">None</dd>
            </div>
          </dl>
        </SectionCard>
      </div>
    </RecordPanelLayout>
  );
};

export default SmsLogsList;

