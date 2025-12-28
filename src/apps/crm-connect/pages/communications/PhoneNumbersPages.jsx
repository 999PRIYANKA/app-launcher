import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { StandardListView } from '../../components/shared/StandardListView';
import RecordPanelLayout from '../../components/shared/RecordPanelLayout';
import SectionCard from '../../components/shared/SectionCard';
import { PhoneIcon, InformationCircleIcon, ClockIcon } from '../../../../constants/icons';
import { APP_ROUTES } from '../../../../config/appRoutes';

// Lightweight E.164 formatter
const toE164 = (num) => {
  const digitsOnly = num.replace(/\D/g, '');
  if (num.trim().startsWith('+')) {
    return `+${digitsOnly}`;
  }
  return `+1${digitsOnly}`;
};

// Mock Data persistent within the session for simulation
let MOCK_NUMBERS = [
  { 
    id: '1', 
    number: '+1 (555) 123-4567', 
    label: 'Work', 
    type: 'voip', 
    status: 'active', 
    owner_id: 'User1',
    display_number: '+1 (555) 123-4567',
    e164: '+15551234567',
    provider: 'twilio',
    provider_phone_number_sid: 'PN88888888888888888888888888888888',
    assigned_user_id: 'dustin_01',
    org_id: 'org_123'
  },
  { 
    id: '2', 
    number: '+1 (555) 999-8888', 
    label: 'Main', 
    type: 'landline', 
    status: 'active', 
    owner_id: 'User1',
    display_number: '+1 (555) 999-8888',
    e164: '+15559998888',
    provider: 'manual',
    provider_phone_number_sid: null,
    assigned_user_id: 'alice_02',
    org_id: 'org_123'
  },
  { 
    id: '3', 
    number: '+1 (555) 000-1111', 
    label: 'Mobile', 
    type: 'mobile', 
    status: 'inactive',
    display_number: '+1 (555) 000-1111',
    e164: '+15550001111',
    provider: 'manual',
    provider_phone_number_sid: null,
    assigned_user_id: null,
    org_id: 'org_123'
  },
];

export const PhoneNumbersList = () => {
  const navigate = useNavigate();
  const [data] = useState(() => MOCK_NUMBERS);

  return (
    <div className="p-6 h-full">
      <StandardListView
        title="Phone Numbers"
        data={data}
        onRowClick={(item) => navigate(`${APP_ROUTES.CRM_CONNECT.PHONE_NUMBERS}/${item.id}`)}
        columns={[
          { header: 'Number', accessor: 'display_number', className: 'font-medium' },
          { header: 'Label', accessor: 'label' },
          { header: 'Provider', accessor: (item) => <span className="capitalize">{item.provider}</span> },
          { header: 'Type', accessor: (item) => item.type.toUpperCase() },
          { 
            header: 'Status', 
            accessor: (item) => (
              <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${item.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-700'}`}>
                {item.status}
              </span>
            )
          },
        ]}
        actions={
          <button 
            onClick={() => navigate(`${APP_ROUTES.CRM_CONNECT.PHONE_NUMBERS}/new`)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-colors"
          >
            + Add Number
          </button>
        }
      />
    </div>
  );
};

export const PhoneNumberDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = id === 'new';
  
  const originalRecord = useMemo(() => {
    if (isNew) return null;
    return MOCK_NUMBERS.find(n => n.id === id) || null;
  }, [id, isNew]);

  const [formData, setFormData] = useState({
    number: '',
    label: 'Work',
    type: 'voip',
    status: 'active',
    owner_id: '',
    provider: 'manual',
    assigned_user_id: '',
    provider_phone_number_sid: ''
  });

  useEffect(() => {
    if (originalRecord) {
      setFormData(originalRecord);
    }
  }, [originalRecord]);

  const hasChanges = useMemo(() => {
    if (isNew) return formData.number !== '';
    return JSON.stringify(formData) !== JSON.stringify(originalRecord);
  }, [formData, originalRecord, isNew]);

  const handleSave = () => {
    const display_number = formData.number || '';
    const e164 = toE164(display_number);

    if (isNew) {
      const newRecord = {
        ...formData,
        id: Math.random().toString(36).substr(2, 9),
        display_number,
        e164,
        number: display_number,
        org_id: 'org_123'
      };
      MOCK_NUMBERS.push(newRecord);
    } else {
      MOCK_NUMBERS = MOCK_NUMBERS.map(n => n.id === id ? { 
        ...n, 
        ...formData, 
        display_number, 
        e164, 
        number: display_number 
      } : n);
    }
    
    if (isNew) {
      navigate(APP_ROUTES.CRM_CONNECT.PHONE_NUMBERS);
    } else {
      alert("Number updated successfully");
    }
  };

  const handleCall = () => {
    if (formData.display_number) {
      window.dispatchEvent(new CustomEvent('CRM_DIAL', { detail: { number: formData.display_number } }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleBack = () => navigate(APP_ROUTES.CRM_CONNECT.PHONE_NUMBERS);

  if (!isNew && !originalRecord) {
    return <div className="p-8 text-slate-500">Number not found.</div>;
  }

  return (
    <RecordPanelLayout
      title={isNew ? "New Phone Number" : formData.display_number || "Phone Number"}
      subtitle={isNew ? "Create a new carrier line" : `Configuration for ${formData.label}`}
      onBack={handleBack}
      actions={
        <div className="flex space-x-2">
          {!isNew && (
            <button 
              onClick={handleCall}
              className="bg-emerald-500 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-lg shadow-emerald-100 hover:bg-emerald-600 transition-colors flex items-center space-x-2"
            >
              <PhoneIcon className="w-4 h-4" />
              <span>Call Now</span>
            </button>
          )}
          <button 
            onClick={handleSave}
            disabled={!hasChanges}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all shadow-lg ${
              hasChanges 
              ? 'bg-indigo-600 text-white shadow-indigo-100 hover:bg-indigo-700' 
              : 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none'
            }`}
          >
            {isNew ? 'Provision Number' : 'Update Record'}
          </button>
        </div>
      }
    >
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header Info Banner */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center justify-between shadow-sm">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center">
              <PhoneIcon className="w-6 h-6 text-indigo-500" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Global Format</p>
              <p className="text-lg font-mono font-bold text-slate-900">{toE164(formData.number || '')}</p>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
              formData.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'
            }`}>
              {formData.status}
            </span>
            <p className="text-[10px] text-slate-400 mt-1">ID: {formData.id || 'Pending'}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SectionCard title="Line Identity">
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Phone Number</label>
                <input
                  type="text"
                  name="number"
                  value={formData.number}
                  onChange={handleChange}
                  placeholder="+1 (000) 000-0000"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-base font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Display Label</label>
                  <select
                    name="label"
                    value={formData.label}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm font-semibold focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  >
                    <option value="Work">Work</option>
                    <option value="Mobile">Mobile</option>
                    <option value="Home">Home</option>
                    <option value="Main">Main</option>
                    <option value="Support">Support</option>
                    <option value="Direct">Direct</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm font-bold focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Assignment & Ownership">
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Assigned Agent (User ID)</label>
                <div className="relative">
                  <input
                    type="text"
                    name="assigned_user_id"
                    value={formData.assigned_user_id || ''}
                    onChange={handleChange}
                    placeholder="Enter agent user ID"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <div className="w-7 h-7 bg-indigo-100 rounded-full flex items-center justify-center text-[10px] font-bold text-indigo-600">
                      {formData.assigned_user_id ? formData.assigned_user_id.charAt(0).toUpperCase() : '?'}
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Organization Unit</label>
                <input
                  type="text"
                  readOnly
                  value={formData.org_id || 'Global Sales'}
                  className="w-full bg-slate-100 border border-slate-200 rounded-lg px-4 py-3 text-sm text-slate-500 cursor-not-allowed"
                />
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Carrier Configuration">
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Provider</label>
                  <select
                    name="provider"
                    value={formData.provider}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm font-semibold focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  >
                    <option value="twilio">Twilio</option>
                    <option value="manual">Manual / Ported</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Line Type</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm font-semibold focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  >
                    <option value="voip">VOIP</option>
                    <option value="landline">Landline</option>
                    <option value="mobile">Mobile</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center">
                  Provider SID <InformationCircleIcon className="w-3 h-3 ml-2 text-slate-300" />
                </label>
                <input
                  type="text"
                  name="provider_phone_number_sid"
                  value={formData.provider_phone_number_sid || ''}
                  onChange={handleChange}
                  placeholder="e.g. PN..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-xs font-mono focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                />
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Technical Insights">
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-slate-500">
                <ClockIcon className="w-4 h-4" />
                <span className="text-xs">Last line verification check: <span className="font-bold">Today, 08:45 AM</span></span>
              </div>
              <div className="flex items-center space-x-3 text-slate-500">
                <InformationCircleIcon className="w-4 h-4" />
                <span className="text-xs">SMS Capabilities: <span className="font-bold text-emerald-600">Enabled</span></span>
              </div>
              <div className="mt-4 p-3 bg-indigo-50 rounded-lg border border-indigo-100">
                <p className="text-[10px] text-indigo-700 font-bold uppercase tracking-widest mb-1">Provisioning Note</p>
                <p className="text-[11px] text-indigo-600 leading-relaxed">This number is currently routed through the North America region gateway for optimized latency.</p>
              </div>
            </div>
          </SectionCard>
        </div>

        {!isNew && (
          <div className="flex justify-between items-center pt-8 border-t border-slate-100">
            <div className="text-xs text-slate-400">
              Record created via <span className="font-bold">{formData.provider === 'twilio' ? 'API Integration' : 'Manual Entry'}</span>
            </div>
            <button 
              className="text-red-500 text-[10px] font-black uppercase tracking-widest hover:text-red-700 transition-colors px-4 py-2 rounded-lg hover:bg-red-50"
              onClick={() => {
                if(confirm('Are you sure you want to delete this phone number? This action cannot be undone.')) {
                  MOCK_NUMBERS = MOCK_NUMBERS.filter(n => n.id !== id);
                  handleBack();
                }
              }}
            >
              Decommission Number
            </button>
          </div>
        )}
      </div>
    </RecordPanelLayout>
  );
};

export default PhoneNumbersList;

