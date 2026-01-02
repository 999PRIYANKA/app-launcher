import React, { useState, useMemo, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DataTable from '../../../../components/common/DataTable';
import SearchBox from '../../../../components/common/SearchBox';
import Pagination from '../../../../components/common/Pagination';
import RecordPanelLayout from '../../components/shared/RecordPanelLayout';
import SectionCard from '../../components/shared/SectionCard';
import { 
  UserGroupIcon, 
  PhoneIcon, 
  InformationCircleIcon, 
  ClockIcon,
  MenuIcon
} from '../../../../constants/icons';
import { APP_ROUTES } from '../../../../config/appRoutes';

// Mock Data
const MOCK_PHONE_NUMBERS = [
  { id: 'pn_1', number: '+1 (555) 123-4567', label: 'Work', type: 'voip', status: 'active', display_number: '+1 (555) 123-4567', e164: '+15551234567', provider: 'twilio', org_id: 'org_123' },
  { id: 'pn_2', number: '+1 (555) 999-8888', label: 'Main', type: 'landline', status: 'active', display_number: '+1 (555) 999-8888', e164: '+15559998888', provider: 'manual', org_id: 'org_123' },
  { id: 'pn_3', number: '+1 (555) 000-1111', label: 'Mobile', type: 'mobile', status: 'active', display_number: '+1 (555) 000-1111', e164: '+15550001111', provider: 'manual', org_id: 'org_123' },
  { id: 'pn_4', number: '+1 (555) 777-7777', label: 'Support', type: 'voip', status: 'active', display_number: '+1 (555) 777-7777', e164: '+15557777777', provider: 'twilio', org_id: 'org_123' },
  { id: 'pn_5', number: '+1 (555) 888-8888', label: 'Direct', type: 'voip', status: 'active', display_number: '+1 (555) 888-8888', e164: '+15558888888', provider: 'twilio', org_id: 'org_123' },
];

let MOCK_ASSIGNMENTS = [
  {
    id: 'asg_1',
    user_id: 'u_1',
    phone_number_id: 'pn_1',
    e164: '+15551234567',
    display_number: '+1 (555) 123-4567',
    label: 'Work',
    assignment_type: 'primary',
    status: 'active',
    assigned_at: '2023-01-15 10:00 AM',
    released_at: null,
    assigned_by_user_id: 'admin_1',
    note: 'Initial setup'
  },
  {
    id: 'asg_2',
    user_id: 'u_1',
    phone_number_id: 'pn_2',
    e164: '+15559998888',
    display_number: '+1 (555) 999-8888',
    label: 'Main',
    assignment_type: 'secondary',
    status: 'active',
    assigned_at: '2023-05-20 02:30 PM',
    released_at: null,
    assigned_by_user_id: 'admin_1',
    note: 'Backup line'
  },
  {
    id: 'asg_3',
    user_id: 'u_1',
    phone_number_id: 'pn_5',
    e164: '+15558888888',
    display_number: '+1 (555) 888-8888',
    label: 'Direct',
    assignment_type: 'primary',
    status: 'released',
    assigned_at: '2022-12-01 09:00 AM',
    released_at: '2023-01-14 05:00 PM',
    assigned_by_user_id: 'admin_1',
    note: 'Old direct line replaced by Work line'
  },
  {
    id: 'asg_4',
    user_id: 'u_2',
    phone_number_id: 'pn_3',
    e164: '+15550001111',
    display_number: '+1 (555) 000-1111',
    label: 'Mobile',
    assignment_type: 'primary',
    status: 'active',
    assigned_at: '2023-02-10 11:15 AM',
    released_at: null,
    assigned_by_user_id: 'admin_1',
    note: 'Personal device assignment'
  }
];

let MOCK_USERS = [
  {
    id: 'u_1',
    user_id: 'u_1',
    user_name: 'Dustin Wyatt',
    user_email: 'dustin@crmconnect.io',
    status: 'enabled',
    role: 'admin',
    primary_phone_number_id: 'pn_1',
    active_numbers_count: 2,
    last_number_change_at: 'Oct 25, 2023'
  },
  {
    id: 'u_2',
    user_id: 'u_2',
    user_name: 'Alice Johnson',
    user_email: 'alice@crmconnect.io',
    status: 'enabled',
    role: 'agent',
    primary_phone_number_id: 'pn_3',
    active_numbers_count: 1,
    last_number_change_at: 'Feb 10, 2023'
  },
  {
    id: 'u_3',
    user_id: 'u_3',
    user_name: 'Bob Williams',
    user_email: 'bob@crmconnect.io',
    status: 'disabled',
    role: 'agent',
    primary_phone_number_id: null,
    active_numbers_count: 0,
    last_number_change_at: null
  },
  {
    id: 'u_4',
    user_id: 'u_4',
    user_name: 'Charlie Brown',
    user_email: 'charlie@crmconnect.io',
    status: 'enabled',
    role: 'supervisor',
    primary_phone_number_id: null,
    active_numbers_count: 0,
    last_number_change_at: 'Oct 26, 2023'
  }
];

export const ParticipantsList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const headers = [
    { 
      value: 'user', 
      label: 'User',
      render: (item) => (
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-black text-slate-600 border border-slate-200">
            {item.user_name.split(' ').map(n => n[0]).join('')}
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-slate-900">{item.user_name}</span>
            <span className="text-[10px] text-slate-400 font-medium">{item.user_email}</span>
          </div>
        </div>
      )
    },
    { 
      value: 'status', 
      label: 'Softphone Access',
      render: (item) => (
        <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${
          item.status === 'enabled' ? 'bg-green-50 text-green-700 border-green-100' : 'bg-slate-50 text-slate-400 border-slate-200'
        }`}>
          {item.status}
        </span>
      )
    },
    { 
      value: 'role', 
      label: 'Role',
      render: (item) => (
        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest bg-indigo-50 text-indigo-700 border border-indigo-100">
          {item.role}
        </span>
      )
    },
    { 
      value: 'primary_number', 
      label: 'Primary Number',
      render: (item) => {
        const pn = MOCK_PHONE_NUMBERS.find(n => n.id === item.primary_phone_number_id);
        return <span className="text-xs font-medium text-slate-600">{pn ? pn.display_number : 'Unassigned'}</span>;
      }
    },
    { 
      value: 'active_numbers_count', 
      label: 'Assigned Numbers',
      render: (item) => (
        <span className="text-xs font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded-md">{item.active_numbers_count}</span>
      )
    },
    { 
      value: 'last_number_change_at', 
      label: 'Last Change',
      render: (item) => <span className="text-xs text-slate-400">{item.last_number_change_at || '—'}</span>
    }
  ];

  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) return MOCK_USERS;
    return MOCK_USERS.filter((item) =>
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
    <div className="p-6 h-full space-y-6">
      <div className="flex justify-between items-center mb-2 px-1">
        <div>
          <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Administration</h2>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Softphone Users</h1>
        </div>
        
      </div>
      <div className="flex gap-3 items-center">
        <SearchBox
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search users by name, email, role, status..."
          style={{
            width: "600px",
            minWidth: "400px",
            height: "2rem",
          }}
          showSearchButton={true}
          onSearch={() => {}}
        />
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-colors">
          Add User Access
        </button>
      </div>
      <DataTable
        headers={headers}
        data={paginatedData}
        onRowClick={(item) => navigate(`${APP_ROUTES.CRM_CONNECT.PARTICIPANTS}/${item.user_id}`)}
        emptyMessage="No users found"
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

export const ParticipantDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [users, setUsers] = useState(MOCK_USERS);
  const [assignments, setAssignments] = useState(MOCK_ASSIGNMENTS);
  const [quickAddNumber, setQuickAddNumber] = useState('');
  const [quickAddExistingId, setQuickAddExistingId] = useState('');

  const user = users.find(u => u.user_id === id);
  const userAssignments = assignments.filter(a => a.user_id === id);
  const activeAssignments = userAssignments.filter(a => a.status === 'active');
  const releasedAssignments = userAssignments.filter(a => a.status === 'released');

  if (!user) return <div className="p-8 text-slate-500 font-medium">User profile not found.</div>;

  const handleToggleStatus = () => {
    setUsers(prev => prev.map(u => u.user_id === id ? { ...u, status: u.status === 'enabled' ? 'disabled' : 'enabled' } : u));
  };

  const handleRoleChange = (role) => {
    setUsers(prev => prev.map(u => u.user_id === id ? { ...u, role } : u));
  };

  const handleSetPrimary = (asgId) => {
    const asg = assignments.find(a => a.id === asgId);
    if (!asg) return;

    setAssignments(prev => prev.map(a => {
      if (a.user_id === id && a.status === 'active') {
        return { ...a, assignment_type: a.id === asgId ? 'primary' : 'secondary' };
      }
      return a;
    }));

    setUsers(prev => prev.map(u => u.user_id === id ? { 
      ...u, 
      primary_phone_number_id: asg.phone_number_id,
      last_number_change_at: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    } : u));
  };

  const handleRelease = (asgId) => {
    setAssignments(prev => prev.map(a => {
      if (a.id === asgId) {
        return { ...a, status: 'released', released_at: new Date().toLocaleString() };
      }
      return a;
    }));

    const removedAsg = assignments.find(a => a.id === asgId);
    if (removedAsg && removedAsg.assignment_type === 'primary') {
      setUsers(prev => prev.map(u => u.user_id === id ? { ...u, primary_phone_number_id: null } : u));
    }

    setUsers(prev => prev.map(u => u.user_id === id ? { 
      ...u, 
      active_numbers_count: Math.max(0, u.active_numbers_count - 1),
      last_number_change_at: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    } : u));
  };

  const handleAssignExisting = () => {
    const pn = MOCK_PHONE_NUMBERS.find(n => n.id === quickAddExistingId);
    if (!pn) return;

    const newAsg = {
      id: `asg_${Date.now()}`,
      user_id: id,
      phone_number_id: pn.id,
      display_number: pn.display_number,
      e164: pn.e164,
      label: pn.label,
      assignment_type: 'secondary',
      status: 'active',
      assigned_at: new Date().toLocaleString(),
      released_at: null,
      assigned_by_user_id: 'admin_1',
      note: 'Assigned from inventory'
    };

    setAssignments(prev => [...prev, newAsg]);
    setUsers(prev => prev.map(u => u.user_id === id ? { ...u, active_numbers_count: u.active_numbers_count + 1 } : u));
    setQuickAddExistingId('');
  };

  return (
    <RecordPanelLayout
      title={user.user_name}
      subtitle={user.user_email}
      onBack={() => navigate(APP_ROUTES.CRM_CONNECT.PARTICIPANTS)}
      actions={
        <div className="flex space-x-2">
          <button className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-slate-50 transition-colors">
            Audit Log
          </button>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-100">
            Save Changes
          </button>
        </div>
      }
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 pb-12">
        <div className="lg:col-span-2 space-y-6">
          {/* A) User + Access */}
          <SectionCard title="Identity & Access">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-xl font-black text-slate-400 border-2 border-slate-50">
                  {user.user_name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="text-xl font-bold text-slate-900">{user.user_name}</p>
                  <p className="text-sm text-slate-400">{user.user_email}</p>
                </div>
              </div>
              <div className="flex flex-col items-end space-y-3">
                <div className="flex items-center space-x-3">
                  <span className={`text-[10px] font-black uppercase tracking-widest ${user.status === 'enabled' ? 'text-green-600' : 'text-slate-400'}`}>
                    Softphone {user.status}
                  </span>
                  <button 
                    onClick={handleToggleStatus}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                      user.status === 'enabled' ? 'bg-indigo-600' : 'bg-slate-200'
                    }`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      user.status === 'enabled' ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>
                <select 
                  value={user.role}
                  onChange={(e) => handleRoleChange(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="agent">Agent Role</option>
                  <option value="supervisor">Supervisor Role</option>
                  <option value="admin">Administrator Role</option>
                </select>
              </div>
            </div>
          </SectionCard>

          {/* C) Assigned Numbers (Current) */}
          <SectionCard title="Active Line Assignments">
            {activeAssignments.length === 0 ? (
              <div className="py-10 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200">
                <PhoneIcon className="w-8 h-8 text-slate-300 mx-auto mb-3" />
                <p className="text-sm text-slate-500 font-medium">No active phone lines assigned to this user.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="border-b border-slate-100">
                    <tr>
                      <th className="pb-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">Number</th>
                      <th className="pb-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">Type</th>
                      <th className="pb-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">Assignment</th>
                      <th className="pb-3 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {activeAssignments.map(asg => (
                      <tr key={asg.id} className="group">
                        <td className="py-4">
                          <p className="text-sm font-bold text-slate-900">{asg.display_number}</p>
                          <p className="text-[10px] text-slate-400">{asg.label}</p>
                        </td>
                        <td className="py-4">
                          <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded uppercase">VOIP</span>
                        </td>
                        <td className="py-4">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-tighter ${
                            asg.assignment_type === 'primary' ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-600'
                          }`}>
                            {asg.assignment_type}
                          </span>
                        </td>
                        <td className="py-4 text-right">
                          <div className="flex items-center justify-end space-x-2">
                            {asg.assignment_type !== 'primary' && (
                              <button 
                                onClick={() => handleSetPrimary(asg.id)}
                                className="text-[10px] font-bold text-indigo-600 hover:underline px-2 py-1"
                              >
                                Make Primary
                              </button>
                            )}
                            <button 
                              onClick={() => handleRelease(asg.id)}
                              className="text-[10px] font-bold text-red-500 hover:bg-red-50 px-2 py-1 rounded"
                            >
                              Release
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </SectionCard>

          {/* E) Number History */}
          <SectionCard title="Assignment Audit History">
            {releasedAssignments.length === 0 ? (
              <p className="text-sm text-slate-400 italic">No previous assignments found for this account.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-slate-100">
                    <tr>
                      <th className="pb-2 font-bold text-slate-400 uppercase">Line</th>
                      <th className="pb-2 font-bold text-slate-400 uppercase">Was Primary</th>
                      <th className="pb-2 font-bold text-slate-400 uppercase">Assigned</th>
                      <th className="pb-2 font-bold text-slate-400 uppercase text-right">Released</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {releasedAssignments.map(asg => (
                      <tr key={asg.id}>
                        <td className="py-3">
                          <span className="font-semibold text-slate-600">{asg.display_number}</span>
                          <p className="text-[10px] text-slate-400">{asg.label}</p>
                        </td>
                        <td className="py-3 text-slate-500">{asg.assignment_type === 'primary' ? 'Yes' : 'No'}</td>
                        <td className="py-3 text-slate-500">{asg.assigned_at.split(' ')[0]}</td>
                        <td className="py-3 text-right text-slate-500">{asg.released_at?.split(',')[0]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </SectionCard>
        </div>

        <div className="lg:col-span-1 space-y-6">
          {/* B) Primary Number Snapshot */}
          <SectionCard title="Primary Identity">
            <div className="space-y-4">
              <div className="p-4 bg-indigo-600 rounded-2xl text-white shadow-lg shadow-indigo-100">
                <p className="text-[9px] font-black uppercase tracking-[0.2em] opacity-70 mb-1">Active Outbound Caller ID</p>
                <div className="flex items-center justify-between">
                  <p className="text-2xl font-black tracking-tighter">
                    {user.primary_phone_number_id ? (
                      MOCK_PHONE_NUMBERS.find(n => n.id === user.primary_phone_number_id)?.display_number
                    ) : 'UNASSIGNED'}
                  </p>
                  <PhoneIcon className="w-6 h-6 opacity-30" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Swap Primary Line</label>
                <select 
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={activeAssignments.find(a => a.assignment_type === 'primary')?.id || ''}
                  onChange={(e) => handleSetPrimary(e.target.value)}
                  disabled={activeAssignments.length < 2}
                >
                  <option value="" disabled>Select active line...</option>
                  {activeAssignments.map(asg => (
                    <option key={asg.id} value={asg.id}>{asg.display_number} ({asg.label})</option>
                  ))}
                </select>
                {activeAssignments.length < 2 && (
                  <p className="text-[10px] text-slate-400 italic">Assign more numbers to enable switching.</p>
                )}
              </div>
            </div>
          </SectionCard>

          {/* D) Assign New Number (Quick Add) */}
          <SectionCard title="Assign New Line">
            <div className="space-y-6">
              <div className="space-y-3">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center">
                  <MenuIcon className="w-3 h-3 mr-2" /> From Inventory
                </label>
                <div className="space-y-2">
                  <select 
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-medium"
                    value={quickAddExistingId}
                    onChange={(e) => setQuickAddExistingId(e.target.value)}
                  >
                    <option value="">Search available numbers...</option>
                    {MOCK_PHONE_NUMBERS.filter(pn => !assignments.some(a => a.phone_number_id === pn.id && a.status === 'active' && a.user_id === id)).map(pn => (
                      <option key={pn.id} value={pn.id}>{pn.display_number} - {pn.label}</option>
                    ))}
                  </select>
                  <button 
                    onClick={handleAssignExisting}
                    disabled={!quickAddExistingId}
                    className="w-full py-2 bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest rounded-lg border border-indigo-100 disabled:opacity-50 hover:bg-indigo-100 transition-colors"
                  >
                    Assign Existing Line
                  </button>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 space-y-3">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center">
                  <InformationCircleIcon className="w-3 h-3 mr-2" /> Manual Provision
                </label>
                <div className="space-y-2">
                  <input 
                    type="text"
                    placeholder="+1 (555) 000-0000"
                    value={quickAddNumber}
                    onChange={(e) => setQuickAddNumber(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-mono"
                  />
                  <button 
                    disabled={!quickAddNumber}
                    className="w-full py-2 bg-slate-100 text-slate-500 text-[10px] font-black uppercase tracking-widest rounded-lg border border-slate-200 disabled:opacity-50"
                  >
                    Provision & Assign
                  </button>
                </div>
              </div>
            </div>
          </SectionCard>

          <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
            <div className="flex items-center space-x-3 mb-3">
              <ClockIcon className="w-4 h-4 text-slate-400" />
              <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Assignment Policy</h4>
            </div>
            <p className="text-[10px] text-slate-400 leading-relaxed">
              Users can have multiple secondary lines but only one primary line. Releasing a line will move it to the Audit History and free it up for other agents.
            </p>
          </div>
        </div>
      </div>
    </RecordPanelLayout>
  );
};

export default ParticipantsList;

