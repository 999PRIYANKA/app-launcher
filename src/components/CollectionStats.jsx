import React, { useState, useMemo } from 'react';
import * as Icons from '../constants/icons';

const MOCK_PAYMENTS = [
    // 2025 Data
    { id: '1', tenant: 'Alice Johnson', unit: 'Apt 101', amount: 1200.00, month: 'November', year: '2025', status: 'Collected' },
    { id: '2', tenant: 'Bob Smith', unit: 'Apt 102', amount: 1150.00, month: 'November', year: '2025', status: 'Collected' },
    { id: '3', tenant: 'Charlie Brown', unit: 'Apt 201', amount: 1300.00, month: 'November', year: '2025', status: 'Processing' },
    { id: '4', tenant: 'David Wilson', unit: 'Apt 305', amount: 1250.00, month: 'October', year: '2025', status: 'Collected' },
    { id: '5', tenant: 'Eve Davis', unit: 'Apt 104', amount: 1200.00, month: 'December', year: '2025', status: 'Coming Due' },
    { id: '6', tenant: 'Frank Miller', unit: 'Apt 202', amount: 1400.00, month: 'November', year: '2025', status: 'Collected' },
    { id: '7', tenant: 'Grace Lee', unit: 'Apt 303', amount: 1100.00, month: 'November', year: '2025', status: 'Collected' },
    { id: '8', tenant: 'Harry Potter', unit: 'Cupboard', amount: 50.00, month: 'October', year: '2025', status: 'Overdue' },
    // 2024 Data
    { id: '9', tenant: 'Hermione Granger', unit: 'Library 1', amount: 2000.00, month: 'November', year: '2024', status: 'Collected' },
    { id: '10', tenant: 'Ron Weasley', unit: 'Burrow', amount: 50.00, month: 'November', year: '2024', status: 'Overdue' },
];

const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
};

const CollectionStats = ({ month, year }) => {
    const [selectedCategory, setSelectedCategory] = useState(null);

    const filteredPayments = useMemo(() => {
        return MOCK_PAYMENTS.filter(p => p.month === month && p.year === year);
    }, [month, year]);

    const stats = useMemo(() => {
        const initialStats = {
            Collected: { amount: 0, count: 0 },
            Processing: { amount: 0, count: 0 },
            Overdue: { amount: 0, count: 0 },
            'Coming Due': { amount: 0, count: 0 },
        };

        const result = filteredPayments.reduce((acc, payment) => {
            if (acc[payment.status]) {
                acc[payment.status].amount += payment.amount;
                acc[payment.status].count += 1;
            }
            return acc;
        }, initialStats);

        const totalAmount = Object.values(result).reduce((sum, s) => sum + s.amount, 0);

        return {
            ...result,
            total: totalAmount,
            percentage: totalAmount > 0 ? (result.Collected.amount / totalAmount) * 100 : 0
        };
    }, [filteredPayments]);

    const StatCard = ({ title, amount, count, color, onClick, trend }) => (
        <div 
            onClick={onClick}
            className="bg-white border-l-4 p-5 rounded-r-2xl shadow-sm hover:shadow-md transition-all cursor-pointer group hover:scale-[1.02] transform duration-200"
            style={{ borderLeftColor: color }}
        >
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{title}</p>
                    <p className="text-2xl font-black text-gray-900">{formatCurrency(amount)}</p>
                </div>
                <div className={`p-2 rounded-xl bg-gray-50 text-gray-400 group-hover:text-blue-600 group-hover:bg-blue-50 transition-colors`}>
                    <span className="text-xs font-black">{count}</span>
                </div>
            </div>
            {trend !== undefined && (
                <p className={`text-[10px] mt-2 font-black ${trend > 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}% <span className="text-gray-400 font-bold">VS TARGET</span>
                </p>
            )}
        </div>
    );

    return (
        <div className="bg-gray-50 p-6 rounded-3xl shadow-inner border border-gray-100">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-2xl font-black text-gray-900 tracking-tight uppercase">Financial Pulse</h2>
                    <p className="text-xs text-gray-500 font-bold tracking-widest uppercase opacity-70">Report: {month} {year}</p>
                </div>
                <div className="flex bg-white rounded-xl p-1.5 shadow-sm border border-gray-200">
                    <button className="px-4 py-1.5 text-[10px] font-black text-blue-600 bg-blue-50 rounded-lg uppercase tracking-widest">REALTIME</button>
                </div>
            </div>

            {filteredPayments.length === 0 ? (
                <div className="bg-white rounded-2xl p-16 text-center border border-dashed border-gray-200">
                    <Icons.BanknotesIcon className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                    <p className="text-gray-400 font-black uppercase tracking-widest text-xs">No active transactions for this window</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in">
                    {/* Plecto Main Gauge */}
                    <div className="lg:col-span-4 flex flex-col items-center justify-center bg-white rounded-3xl p-10 shadow-sm border border-gray-100 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-5">
                            <Icons.BanknotesIcon className="w-32 h-32" />
                        </div>
                        <div className="relative w-52 h-52">
                            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                                <circle cx="18" cy="18" r="16" fill="none" stroke="#f3f4f6" strokeWidth="4" />
                                <circle 
                                    cx="18" cy="18" r="16" fill="none" 
                                    stroke="#22c55e" 
                                    strokeWidth="4" 
                                    strokeDasharray={`${stats.percentage}, 100`}
                                    strokeLinecap="round"
                                    className="transition-all duration-1000 ease-out shadow-sm"
                                />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-5xl font-black text-gray-900 tracking-tighter">{Math.round(stats.percentage)}%</span>
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Collected</span>
                            </div>
                        </div>
                        <div className="mt-8 text-center w-full">
                            <div className="flex justify-between text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
                                <span>Target</span>
                                <span>95%</span>
                            </div>
                            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div className="bg-blue-600 h-full transition-all duration-1000" style={{ width: `${Math.min(stats.percentage, 100)}%` }}></div>
                            </div>
                        </div>
                    </div>

                    {/* KPI Breakdown */}
                    <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <StatCard 
                            title="Fully Collected" 
                            amount={stats.Collected.amount} 
                            count={stats.Collected.count}
                            color="#22c55e" 
                            onClick={() => setSelectedCategory('Collected')}
                            trend={year === '2025' ? 4.2 : -2.1}
                        />
                        <StatCard 
                            title="Processing" 
                            amount={stats.Processing.amount} 
                            count={stats.Processing.count}
                            color="#f59e0b" 
                            onClick={() => setSelectedCategory('Processing')}
                        />
                        <StatCard 
                            title="Overdue" 
                            amount={stats.Overdue.amount} 
                            count={stats.Overdue.count}
                            color="#ef4444" 
                            onClick={() => setSelectedCategory('Overdue')}
                            trend={stats.Overdue.count > 0 ? -12 : 0}
                        />
                        <StatCard 
                            title="Future Dues" 
                            amount={stats['Coming Due'].amount} 
                            count={stats['Coming Due'].count}
                            color="#3b82f6" 
                            onClick={() => setSelectedCategory('Coming Due')}
                        />
                    </div>
                </div>
            )}

            {/* FULL UI CATEGORY DETAIL */}
            {selectedCategory && (
                <div className="fixed inset-0 z-[100] bg-white animate-fade-in-up flex flex-col">
                    {/* Full UI Header */}
                    <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0">
                        <div>
                            <div className="flex items-center space-x-3 mb-1">
                                <div className={`w-3 h-3 rounded-full ${
                                    selectedCategory === 'Collected' ? 'bg-green-500' :
                                    selectedCategory === 'Overdue' ? 'bg-red-500' :
                                    selectedCategory === 'Processing' ? 'bg-orange-500' : 'bg-blue-500'
                                }`}></div>
                                <h3 className="text-2xl font-black text-gray-900 tracking-tight uppercase">{selectedCategory} Breakdown</h3>
                            </div>
                            <p className="text-sm text-gray-500 font-bold uppercase tracking-widest">{month} {year} Report Period</p>
                        </div>
                        <button onClick={() => setSelectedCategory(null)} className="p-3 hover:bg-gray-100 rounded-2xl transition-all group">
                            <Icons.XIcon className="w-8 h-8 text-gray-400 group-hover:text-gray-900" />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto bg-gray-50/50 p-8">
                        <div className="max-w-6xl mx-auto">
                            {/* Summary Ribbon */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Total Category Volume</p>
                                    <p className="text-3xl font-black text-gray-900">{formatCurrency(stats[selectedCategory].amount)}</p>
                                </div>
                                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Transaction Count</p>
                                    <p className="text-3xl font-black text-gray-900">{stats[selectedCategory].count}</p>
                                </div>
                                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Portfolio Weight</p>
                                    <p className="text-3xl font-black text-gray-900">{stats.total > 0 ? Math.round((stats[selectedCategory].amount / stats.total) * 100) : 0}%</p>
                                </div>
                            </div>

                            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                                <table className="w-full text-left border-collapse">
                                    <thead className="bg-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">
                                        <tr>
                                            <th className="px-8 py-5">Tenant Name</th>
                                            <th className="px-8 py-5">Property Unit</th>
                                            <th className="px-8 py-5 text-right">Transaction Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {filteredPayments.filter(p => p.status === selectedCategory).map(p => (
                                            <tr key={p.id} className="hover:bg-gray-50/50 transition-colors group">
                                                <td className="px-8 py-6">
                                                    <p className="text-base font-black text-gray-900 group-hover:text-blue-600 transition-colors">{p.tenant}</p>
                                                    <p className="text-xs text-gray-400 font-bold uppercase tracking-tighter mt-0.5">Lease Holder</p>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <p className="text-sm font-bold text-gray-700">{p.unit}</p>
                                                    <p className="text-[10px] text-gray-400 uppercase tracking-widest">Residential Space</p>
                                                </td>
                                                <td className="px-8 py-6 text-right">
                                                    <p className="text-lg font-black text-gray-900">{formatCurrency(p.amount)}</p>
                                                    <p className="text-[10px] text-green-500 font-black uppercase tracking-widest">USD - Settled</p>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    
                    <div className="p-6 bg-white border-t border-gray-100 flex justify-end px-12 shadow-[0_-4px_15px_-1px_rgba(0,0,0,0.05)]">
                        <button 
                            onClick={() => setSelectedCategory(null)} 
                            className="px-12 py-3 bg-blue-700 text-white rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-black transition-all active:scale-95"
                        >
                            Return to Dashboard
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CollectionStats;
