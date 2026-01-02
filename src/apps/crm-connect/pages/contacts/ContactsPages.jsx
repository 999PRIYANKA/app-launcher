import React, { useState, useMemo, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DataTable from '../../../../components/common/DataTable';
import SearchBox from '../../../../components/common/SearchBox';
import Pagination from '../../../../components/common/Pagination';
import RecordPanelLayout from '../../components/shared/RecordPanelLayout';
import SectionCard from '../../components/shared/SectionCard';
import { PhoneIcon, ChatBubbleOvalLeftIcon, ClockIcon } from '../../../../constants/icons';
import { APP_ROUTES } from '../../../../config/appRoutes';

const MOCK_CONTACTS = [
  { id: '1', name: 'Alice Johnson', title: 'Director of Ops', number: '(555) 123-4567', email: 'alice@acme.corp' },
  { id: '2', name: 'Bob Williams', title: 'Purchasing Manager', number: '(555) 333-4444', email: 'bob@globex.com' },
  { id: '3', name: 'Charlie Brown', title: 'VP Sales', number: '(555) 555-6666', email: 'charlie@brown.co' },
];

const MOCK_ACTIVITIES = [
  { id: 'a1', type: 'call', direction: 'outbound', status: 'completed', duration: '5m 12s', timestamp: 'Today, 10:45 AM', summary: 'Discussed Q4 pricing adjustments.' },
  { id: 'a2', type: 'sms', direction: 'inbound', text: 'Thanks for the quick call, Alice!', timestamp: 'Today, 10:52 AM' },
  { id: 'a3', type: 'call', direction: 'inbound', status: 'missed', duration: '0s', timestamp: 'Yesterday, 4:15 PM', summary: 'Missed call from mobile number.' },
  { id: 'a4', type: 'call', direction: 'outbound', status: 'no-answer', duration: '0s', timestamp: 'Oct 24, 02:00 PM', summary: 'Follow-up on initial proposal.' },
];

export const ContactsList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const headers = [
    { value: 'name', label: 'Name' },
    { value: 'title', label: 'Title' },
    { value: 'number', label: 'Phone' },
    { value: 'email', label: 'Email' },
  ];

  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) return MOCK_CONTACTS;
    return MOCK_CONTACTS.filter((item) =>
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
          Contacts
        </h2>
        
      </div>
      <div className="flex gap-3 items-center">
        <SearchBox
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search contacts by name, title, phone, email..."
          style={{
            width: "600px",
            minWidth: "400px",
            height: "2rem",
          }}
          showSearchButton={true}
          onSearch={() => {}}
        />
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-colors">
          + New Contact
        </button>
      </div>
      <DataTable
        headers={headers}
        data={paginatedData}
        onRowClick={(item) => navigate(`${APP_ROUTES.CRM_CONNECT.CONTACTS}/${item.id}`)}
        emptyMessage="No contacts found"
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

export const ContactDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const contact = MOCK_CONTACTS.find(c => c.id === id);

  if (!contact) return <div className="p-8 text-slate-500">Contact not found.</div>;

  const handleCall = () => {
    window.dispatchEvent(new CustomEvent('CRM_DIAL', { detail: { number: contact.number } }));
  };

  return (
    <RecordPanelLayout
      title={contact.name}
      subtitle={`${contact.title} @ Acme Corp`}
      onBack={() => navigate(APP_ROUTES.CRM_CONNECT.CONTACTS)}
      actions={
        <div className="flex space-x-2">
          <button 
            onClick={handleCall}
            className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-indigo-700 transition-colors"
          >
            <PhoneIcon className="w-4 h-4" />
            <span>Call</span>
          </button>
          <button className="flex items-center space-x-2 bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-slate-50 transition-colors">
            <ChatBubbleOvalLeftIcon className="w-4 h-4" />
            <span>Message</span>
          </button>
        </div>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Contact Info */}
        <div className="lg:col-span-1 space-y-6">
          <SectionCard title="Contact Information">
            <dl className="space-y-4">
              <div>
                <dt className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Email Address</dt>
                <dd className="text-sm font-medium text-indigo-600 underline cursor-pointer">{contact.email}</dd>
              </div>
              <div>
                <dt className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Phone Number</dt>
                <dd className="text-sm font-medium text-slate-900">{contact.number}</dd>
              </div>
              <div>
                <dt className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Status</dt>
                <dd className="mt-1">
                  <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-bold rounded uppercase">Active Lead</span>
                </dd>
              </div>
            </dl>
          </SectionCard>

          <SectionCard title="Notes">
            <p className="text-sm text-slate-600 italic">"Client preferred contact via mobile. Interested in enterprise tier licenses for the whole team."</p>
          </SectionCard>
        </div>

        {/* Right: Activity Timeline */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest flex items-center">
                <ClockIcon className="w-4 h-4 mr-2 text-indigo-500" />
                Call Activity Timeline
              </h3>
              <div className="flex space-x-2">
                <button className="text-[10px] font-bold px-2 py-1 bg-white border border-slate-200 rounded hover:border-indigo-500 transition-colors">ALL</button>
                <button className="text-[10px] font-bold px-2 py-1 bg-white border border-slate-200 rounded text-slate-400">CALLS</button>
                <button className="text-[10px] font-bold px-2 py-1 bg-white border border-slate-200 rounded text-slate-400">SMS</button>
              </div>
            </div>
            <div className="p-0">
              <ul className="divide-y divide-slate-100">
                {MOCK_ACTIVITIES.map((activity) => (
                  <li key={activity.id} className="p-6 hover:bg-slate-50 transition-colors group">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className={`mt-1 p-2 rounded-lg ${
                          activity.type === 'call' ? 'bg-indigo-50 text-indigo-600' : 'bg-green-50 text-green-600'
                        }`}>
                          {activity.type === 'call' ? <PhoneIcon className="w-4 h-4" /> : <ChatBubbleOvalLeftIcon className="w-4 h-4" />}
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-bold text-slate-900">
                              {activity.type === 'call' ? (
                                `${activity.direction === 'outbound' ? 'Outbound' : 'Inbound'} Call`
                              ) : 'SMS Message'}
                            </span>
                            <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${
                              activity.status === 'completed' ? 'bg-green-100 text-green-700' : 
                              activity.status === 'missed' ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-600'
                            }`}>
                              {activity.status || 'Delivered'}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5">{activity.timestamp} {activity.duration !== '0s' && `• ${activity.duration}`}</p>
                          <p className="text-sm text-slate-700 mt-2 leading-relaxed">
                            {activity.summary || activity.text}
                          </p>
                        </div>
                      </div>
                      <button className="opacity-0 group-hover:opacity-100 transition-opacity text-indigo-600 text-xs font-bold">
                        View Record →
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              <button className="w-full py-4 text-xs font-bold text-slate-400 bg-slate-50 hover:bg-slate-100 transition-colors tracking-widest uppercase">
                Load Older Activity
              </button>
            </div>
          </div>
        </div>
      </div>
    </RecordPanelLayout>
  );
};

export default ContactsList;

