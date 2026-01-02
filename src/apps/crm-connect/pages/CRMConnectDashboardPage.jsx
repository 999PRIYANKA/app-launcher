import React, { useState } from 'react';
import { 
  PhoneIcon, 
  XMarkIcon, 
  ArrowUpRightIcon, 
  ArrowDownLeftIcon, 
  ChatBubbleOvalLeftIcon, 
  ClockIcon, 
  InformationCircleIcon, 
  UserGroupIcon, 
  AppGridIcon, 
  VoicemailIcon 
} from '../../../constants/icons';

const KpiCard = ({ title, value, sub, icon, color = 'indigo', trend }) => (
  <div className="bg-white rounded-2xl shadow-sm p-6 border border-slate-200">
    <div className="flex justify-between items-start mb-4">
      <h3 className="font-bold text-slate-400 uppercase text-[9px] tracking-[0.2em]">{title}</h3>
      {icon || <div className={`w-4 h-4 text-${color}-500`} />}
    </div>
    <div className="text-4xl font-black text-slate-900 mb-2 tracking-tighter">{value}</div>
    <div className={`flex items-center text-[10px] font-bold ${trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-500' : 'text-slate-400'}`}>
      {sub}
    </div>
  </div>
);

const DashboardSectionHeader = ({ title }) => (
  <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-4 px-1 mt-10 first:mt-0">{title}</h2>
);

const CRMConnectDashboardPage = () => {
  const agentStats = [
    { name: 'Dustin Wyatt', calls: 142, outbound: 89, inbound: 53, talkTime: '4h 12m', conversion: '72%', smsSent: 245, smsReceived: 192 },
    { name: 'Alice Johnson', calls: 128, outbound: 70, inbound: 58, talkTime: '3h 45m', conversion: '68%', smsSent: 312, smsReceived: 280 },
    { name: 'Bob Williams', calls: 95, outbound: 40, inbound: 55, talkTime: '2h 10m', conversion: '61%', smsSent: 156, smsReceived: 120 },
    { name: 'Charlie Brown', calls: 88, outbound: 45, inbound: 43, talkTime: '2h 30m', conversion: '55%', smsSent: 98, smsReceived: 82 },
  ];

  const [filters, setFilters] = useState({
    date: 'Last 7 Days',
    team: 'All Teams',
    agent: 'All Agents',
    channel: 'All Channels'
  });

  return (
    <div className="p-4 md:p-8 h-full overflow-y-auto bg-slate-50">
      {/* Header & Filters */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-8 space-y-4 md:space-y-0">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">Communications Intelligence</h1>
          <p className="text-sm md:text-base text-slate-500 mt-1">Global performance and efficiency metrics.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {Object.entries(filters).map(([key, value]) => (
            <div key={key} className="relative group">
              <button className="bg-white border border-slate-200 text-slate-600 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest flex items-center space-x-2 hover:bg-slate-50 transition-all">
                <span>{key}: {value}</span>
                <svg className="w-3 h-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
              </button>
            </div>
          ))}
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-colors">Download Report</button>
        </div>
      </div>

      {/* 1. Voice SLA & Missed Calls */}
      <DashboardSectionHeader title="Voice SLA & Missed Calls" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <KpiCard title="Answer Rate %" value="84.2%" sub="Target: 85%" color="green" trend="neutral" icon={<PhoneIcon className="w-4 h-4 text-emerald-500" />} />
        <KpiCard title="Missed Rate %" value="15.8%" sub="↓ 2.1% vs Last Week" color="red" trend="up" icon={<XMarkIcon className="w-4 h-4 text-red-500" />} />
        <KpiCard title="Avg Time-to-Answer" value="12s" sub="Within SLA threshold" color="indigo" icon={<ClockIcon className="w-4 h-4 text-indigo-500" />} />
        <KpiCard title="Abandon Rate %" value="4.5%" sub="Industry Avg: 6%" color="green" trend="up" />
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-10">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-900 uppercase text-[11px] tracking-widest">Missed Calls Requiring Follow-up</h3>
          <button className="text-[10px] font-bold text-indigo-600 uppercase tracking-tighter">Export CSV</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 text-[9px] font-black text-slate-400 uppercase">Started At</th>
                <th className="px-4 py-4 text-[9px] font-black text-slate-400 uppercase">From</th>
                <th className="px-4 py-4 text-[9px] font-black text-slate-400 uppercase">To/Line</th>
                <th className="px-4 py-4 text-[9px] font-black text-slate-400 uppercase">Reason</th>
                <th className="px-4 py-4 text-[9px] font-black text-slate-400 uppercase">Follow-up</th>
                <th className="px-6 py-4 text-[9px] font-black text-slate-400 uppercase text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr className="hover:bg-slate-50/80 transition-colors">
                <td className="px-6 py-4 text-sm text-slate-600">Today, 11:20 AM</td>
                <td className="px-4 py-4 text-sm font-bold text-slate-900">(555) 010-9988</td>
                <td className="px-4 py-4 text-sm text-slate-500">Sales Line</td>
                <td className="px-4 py-4 text-sm text-red-500 font-semibold">Abandoned</td>
                <td className="px-4 py-4 text-xs font-bold text-amber-600">PENDING</td>
                <td className="px-6 py-4 text-right"><button className="text-indigo-600 font-bold text-xs">DIAL</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 2. Disposition Performance */}
      <DashboardSectionHeader title="Disposition Performance" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <KpiCard title="Meaningful Contact" value="42%" sub="↑ 5% MoM" color="green" trend="up" />
        <KpiCard title="Appointment Set" value="18%" sub="Benchmark: 15%" color="indigo" />
        <KpiCard title="Conversion %" value="12.4%" sub="From connected calls" color="emerald" trend="up" />
        <KpiCard title="Disp. Completion %" value="98%" sub="Data integrity high" color="indigo" />
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-10">
        <div className="p-6 border-b border-slate-100 bg-slate-50/30 flex items-center justify-between">
          <h3 className="font-bold text-slate-900 uppercase text-[11px] tracking-widest">Disposition Breakdown</h3>
          <button className="text-[10px] font-bold text-indigo-600 uppercase tracking-tighter">Export CSV</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 text-[9px] font-black text-slate-400 uppercase">Disposition</th>
                <th className="px-4 py-4 text-[9px] font-black text-slate-400 uppercase text-center">Count</th>
                <th className="px-4 py-4 text-[9px] font-black text-slate-400 uppercase text-center">Conversion %</th>
                <th className="px-4 py-4 text-[9px] font-black text-slate-400 uppercase text-center">Avg Duration</th>
                <th className="px-6 py-4 text-[9px] font-black text-slate-400 uppercase text-right">Top Agent</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { name: 'Meeting Scheduled', count: 124, conv: '100%', dur: '12m 45s', agent: 'Dustin W.' },
                { name: 'Left Voicemail', count: 452, conv: '2%', dur: '0m 45s', agent: 'Alice J.' },
                { name: 'Follow-up Needed', count: 210, conv: '15%', dur: '8m 10s', agent: 'Charlie B.' },
              ].map((d, i) => (
                <tr key={i} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-6 py-4 text-sm font-bold text-slate-900">{d.name}</td>
                  <td className="px-4 py-4 text-sm text-slate-600 text-center">{d.count}</td>
                  <td className="px-4 py-4 text-sm text-emerald-600 text-center font-bold">{d.conv}</td>
                  <td className="px-4 py-4 text-sm text-slate-500 text-center font-mono">{d.dur}</td>
                  <td className="px-6 py-4 text-sm text-slate-900 text-right font-medium">{d.agent}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. Outcome Funnel */}
      <DashboardSectionHeader title="Call Outcome Funnel" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        <div className="lg:col-span-2 bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
          <div className="flex justify-between mb-8">
            <h3 className="text-[11px] font-black uppercase text-slate-400 tracking-widest">Pipeline Transition</h3>
            <div className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">HEALTHY FUNNEL</div>
          </div>
          <div className="space-y-4">
            {[
              { label: 'Attempted', val: 100, color: 'bg-indigo-100 text-indigo-600' },
              { label: 'Connected', val: 72, color: 'bg-indigo-200 text-indigo-700' },
              { label: 'Meaningful', val: 42, color: 'bg-indigo-300 text-indigo-800' },
              { label: 'Opportunity Created', val: 18, color: 'bg-indigo-400 text-white' },
              { label: 'Stage Movement', val: 8, color: 'bg-indigo-600 text-white' },
            ].map((s, i) => (
              <div key={i} className="flex items-center space-x-4">
                <div className="w-32 text-[10px] font-bold text-slate-400 uppercase text-right">{s.label}</div>
                <div className="flex-1 h-10 bg-slate-50 rounded-lg overflow-hidden relative">
                  <div className={`h-full ${s.color} transition-all duration-1000 flex items-center px-4 font-black text-sm`} style={{ width: `${s.val}%` }}>
                    {s.val}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <KpiCard title="Next Step Rate %" value="24.5%" sub="↑ 2% vs Target" color="green" />
          <KpiCard title="Stage Movement Rate" value="11.2%" sub="Benchmark: 10%" color="indigo" />
        </div>
      </div>

      {/* 4. Voicemail Effectiveness */}
      <DashboardSectionHeader title="Voicemail Effectiveness" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <KpiCard title="Voicemails Left" value="1,452" sub="Avg 45 / day" color="slate" />
        <KpiCard title="Listened Rate %" value="68%" sub="High engagement" color="green" trend="up" />
        <KpiCard title="Callback Rate %" value="14.2%" sub="Target: 12%" color="emerald" trend="up" />
        <KpiCard title="Avg Callback Time" value="2h 15m" sub="From delivery" color="indigo" />
      </div>

      {/* 5. SMS Deliverability */}
      <DashboardSectionHeader title="SMS Deliverability & Compliance" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <KpiCard title="Delivery Rate %" value="99.4%" sub="Provider: Twilio" color="green" icon={<ChatBubbleOvalLeftIcon className="w-4 h-4 text-emerald-500" />} />
        <KpiCard title="Failed Rate %" value="0.6%" sub="Filtered or Bad Num" color="red" />
        <KpiCard title="Opt-out Rate %" value="0.2%" sub="Compliance: High" color="green" />
        <KpiCard title="HELP Rate" value="0.05%" sub="Support inquiries" color="slate" />
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-10">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-900 uppercase text-[11px] tracking-widest">Recent Delivery Failures</h3>
          <button className="text-[10px] font-bold text-red-600 uppercase tracking-tighter">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 text-[9px] font-black text-slate-400 uppercase">Date</th>
                <th className="px-4 py-4 text-[9px] font-black text-slate-400 uppercase">To</th>
                <th className="px-4 py-4 text-[9px] font-black text-slate-400 uppercase">Error Code</th>
                <th className="px-4 py-4 text-[9px] font-black text-slate-400 uppercase">Message</th>
                <th className="px-6 py-4 text-[9px] font-black text-slate-400 uppercase text-right">Agent</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr className="hover:bg-red-50/30 transition-colors">
                <td className="px-6 py-4 text-xs text-slate-600">Today, 10:45 AM</td>
                <td className="px-4 py-4 text-xs font-bold text-slate-900">(555) 123-0000</td>
                <td className="px-4 py-4 text-xs font-mono text-red-500">30007</td>
                <td className="px-4 py-4 text-xs text-slate-500 italic">Carrier Filtering</td>
                <td className="px-6 py-4 text-right text-xs font-bold text-slate-900">Dustin W.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 6. SMS Response SLA */}
      <DashboardSectionHeader title="SMS Response SLA & Unreplied" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <KpiCard title="Response <5 min %" value="84%" sub="Target: 80%" color="emerald" trend="up" />
        <KpiCard title="Avg Response Time" value="4m 12s" sub="Business hours" color="indigo" />
        <KpiCard title="Unreplied Threads" value="12" sub="Requiring immediate action" color="red" trend="down" />
        <KpiCard title="Conv. Started" value="428" sub="Today" color="slate" />
      </div>

      {/* 7. Cost & Efficiency */}
      <DashboardSectionHeader title="Cost & Efficiency" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <KpiCard title="Cost / Call Min" value="$0.024" sub="Domestic Average" color="slate" />
        <KpiCard title="Cost / SMS" value="$0.0075" sub="Baseline rate" color="slate" />
        <KpiCard title="Storage Cost" value="$14.20" sub="S3 / Rec. Vault" color="indigo" />
        <KpiCard title="Cost / Conversion" value="$12.45" sub="Weighted average" color="emerald" />
      </div>

      {/* 8. Line Performance */}
      <DashboardSectionHeader title="Phone Line Performance" />
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-10">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-900 uppercase text-[11px] tracking-widest">Active Line Metrics</h3>
          <div className="flex space-x-2">
            <KpiCard title="Active Lines" value="24" sub="All provisioned" color="indigo" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 text-[9px] font-black text-slate-400 uppercase">Line/Number</th>
                <th className="px-4 py-4 text-[9px] font-black text-slate-400 uppercase text-center">Inbound</th>
                <th className="px-4 py-4 text-[9px] font-black text-slate-400 uppercase text-center">Missed %</th>
                <th className="px-4 py-4 text-[9px] font-black text-slate-400 uppercase text-center">SMS Reply %</th>
                <th className="px-6 py-4 text-[9px] font-black text-slate-400 uppercase text-right">Spam Flags</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { num: 'Main Line (4567)', in: 1420, missed: '4%', sms: '89%', spam: 0 },
                { num: 'Support Line (1111)', in: 850, missed: '12%', sms: '94%', spam: 2 },
                { num: 'Outbound Dial (8888)', in: 45, missed: '1%', sms: '12%', spam: 1 },
              ].map((l, i) => (
                <tr key={i}>
                  <td className="px-6 py-4 text-sm font-bold text-slate-900">{l.num}</td>
                  <td className="px-4 py-4 text-sm text-slate-600 text-center">{l.in}</td>
                  <td className="px-4 py-4 text-sm text-red-500 text-center font-bold">{l.missed}</td>
                  <td className="px-4 py-4 text-sm text-emerald-600 text-center font-bold">{l.sms}</td>
                  <td className="px-6 py-4 text-right">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${l.spam > 0 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                      {l.spam === 0 ? 'CLEAN' : `${l.spam} FLAGS`}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 9. Routing / Queue */}
      <DashboardSectionHeader title="Routing & Queue Analytics" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <KpiCard title="Avg Queue Time" value="14s" sub="Target: <20s" color="green" />
        <KpiCard title="Overflow Rate %" value="2.1%" sub="To backup agents" color="indigo" />
        <KpiCard title="Transfer Rate %" value="15%" sub="Target: <18%" color="indigo" />
        <KpiCard title="Abandonment %" value="4.8%" sub="During queue" color="slate" />
      </div>

      {/* 10. AI / QA Insights */}
      <DashboardSectionHeader title="AI / QA Insights" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <KpiCard title="Positive Sentiment %" value="78%" sub="AI Voice Analysis" color="emerald" trend="up" />
        <KpiCard title="Objection Mentions" value="42" sub="Today: Price, Logic" color="amber" />
        <KpiCard title="Competitor Mentions" value="12" sub="Market Intelligence" color="indigo" />
        <KpiCard title="Coaching Flags" value="5" sub="Review Required" color="red" />
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-900 uppercase text-[11px] tracking-widest">AI Coaching Opportunities</h3>
          <button className="text-[10px] font-bold text-indigo-600 uppercase tracking-tighter">View AI Logs</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 text-[9px] font-black text-slate-400 uppercase">Agent</th>
                <th className="px-4 py-4 text-[9px] font-black text-slate-400 uppercase">Calls Reviewed</th>
                <th className="px-4 py-4 text-[9px] font-black text-slate-400 uppercase">Flags</th>
                <th className="px-4 py-4 text-[9px] font-black text-slate-400 uppercase">Conversion %</th>
                <th className="px-6 py-4 text-[9px] font-black text-slate-400 uppercase text-right">Insight</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {agentStats.map((agent, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-6 py-4 flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[9px] font-black text-slate-600">
                      {agent.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span className="font-bold text-sm text-slate-900">{agent.name}</span>
                  </td>
                  <td className="px-4 py-4 text-sm text-slate-600 text-center">42</td>
                  <td className="px-4 py-4 text-sm text-amber-600 text-center font-bold">{Math.floor(Math.random()*5)}</td>
                  <td className="px-4 py-4 text-sm text-slate-900 text-center font-black">{agent.conversion}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:underline">Review Detail</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CRMConnectDashboardPage;

