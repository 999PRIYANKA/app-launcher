import React, { useState, useMemo } from 'react';
import * as Icons from '../constants/icons';

const MOCK_PAYMENTS = [
    { id: '1', tenant: 'Alice Johnson', unit: 'Apt 101', amount: 1200.00, date: 'Nov 1, 2025', status: 'Collected' },
    { id: '2', tenant: 'Bob Smith', unit: 'Apt 102', amount: 1150.00, date: 'Nov 2, 2025', status: 'Collected' },
    { id: '3', tenant: 'Charlie Brown', unit: 'Apt 201', amount: 1300.00, date: 'Nov 3, 2025', status: 'Processing' },
    { id: '4', tenant: 'David Wilson', unit: 'Apt 305', amount: 1250.00, date: 'Oct 1, 2025', status: 'Overdue' },
    { id: '5', tenant: 'Eve Davis', unit: 'Apt 104', amount: 1200.00, date: 'Dec 1, 2025', status: 'Coming Due' },
    { id: '6', tenant: 'Frank Miller', unit: 'Apt 202', amount: 1400.00, date: 'Nov 5, 2025', status: 'Collected' },
    { id: '7', tenant: 'Grace Lee', unit: 'Apt 303', amount: 1100.00, date: 'Nov 6, 2025', status: 'Collected' },
    { id: '8', tenant: 'Harry Potter', unit: 'Cupboard', amount: 50.00, date: 'Oct 28, 2025', status: 'Overdue' },
];

const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
};

const CollectionStats= () => {
    const [leaseFilter, setLeaseFilter] = useState('Active Only');
    const [selectedCategory, setSelectedCategory] = useState(null);

    const stats = useMemo(() => {
        const initialStats = {
            Collected: { amount: 0, count: 0 },
            Processing: { amount: 0, count: 0 },
            Overdue: { amount: 0, count: 0 },
            'Coming Due': { amount: 0, count: 0 },
        };

        const result = MOCK_PAYMENTS.reduce((acc, payment) => {
            if (acc[payment.status]) {
                acc[payment.status].amount += payment.amount;
                acc[payment.status].count += 1;
            }
            return acc;
        }, initialStats);

        const totalAmount = Object.values(result).reduce((sum, s) => sum + s.amount, 0);

        return {
            ...result,
            total: totalAmount
        };
    }, []);

    const getPercentage = (amount) => {
        if (stats.total === 0) return '0.0%';
        return ((amount / stats.total) * 100).toFixed(1) + '%';
    };

    const StatItem = ({ color, title, amount, percentage, showArrow, onClick }) => (
        <div 
            onClick={onClick}
            className="flex items-center justify-between py-3 cursor-pointer hover:bg-gray-50 px-2 -mx-2 rounded transition-colors group"
        >
            <div className="flex items-center">
                <span className={`w-3 h-3 rounded-full ${color}`}></span>
                <p className="ml-3 text-gray-700 font-medium group-hover:text-brand-dark-blue">{title}</p>
            </div>
            <div className="flex items-center">
                <div className="text-right">
                    <p className="font-semibold text-gray-900">{amount}</p>
                    <p className={`text-xs font-semibold rounded-md px-1.5 py-0.5 inline-block mt-0.5 ${color.replace('bg-', 'bg-opacity-20 ')} ${color.replace('bg-', 'text-')}`}>{percentage}</p>
                </div>
                {showArrow && <Icons.ChevronRightIcon className="w-5 h-5 text-gray-400 ml-4 group-hover:text-gray-600" />}
            </div>
        </div>
    );

    const filteredPayments = selectedCategory 
        ? MOCK_PAYMENTS.filter(p => p.status === selectedCategory)
        : [];

    return (
        <>
        <div className="bg-white p-6 rounded-lg shadow-sm relative">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Collection Stats</h3>
                <select className="border rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal">
                    <option>Nov 2025</option>
                    <option>Oct 2025</option>
                    <option>Sep 2025</option>
                </select>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0 w-full md:w-48 text-center">
                    <div className="relative w-40 h-40 mx-auto">
                         <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                            <path
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke="#f3f4f6"
                                strokeWidth="3"
                            />
                            <path
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke="#22c55e"
                                strokeWidth="3"
                                strokeDasharray={`${stats.total > 0 ? (stats.Collected.amount / stats.total) * 100 : 0}, 100`}
                                className="transition-all duration-1000 ease-out"
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-xs text-gray-500">Total</span>
                            <span className="text-2xl font-bold text-gray-800">{formatCurrency(stats.total)}</span>
                        </div>
                    </div>
                    <div className="text-sm text-red-500 mt-2 font-medium cursor-pointer hover:underline" onClick={() => setSelectedCategory('Overdue')}>
                        Past Overdue: {formatCurrency(stats.Overdue.amount)} <Icons.ChevronRightIcon className="inline w-4 h-4" />
                    </div>
                </div>

                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-x-8 content-center">
                    <StatItem 
                        color="bg-green-500" 
                        title="Collected" 
                        amount={formatCurrency(stats.Collected.amount)} 
                        percentage={getPercentage(stats.Collected.amount)} 
                        showArrow={true}
                        onClick={() => setSelectedCategory('Collected')}
                    />
                    <StatItem 
                        color="bg-yellow-500" 
                        title="Processing" 
                        amount={formatCurrency(stats.Processing.amount)} 
                        percentage={getPercentage(stats.Processing.amount)}
                        onClick={() => setSelectedCategory('Processing')}
                    />
                    <StatItem 
                        color="bg-red-500" 
                        title="Overdue" 
                        amount={formatCurrency(stats.Overdue.amount)} 
                        percentage={getPercentage(stats.Overdue.amount)} 
                        showArrow={true}
                        onClick={() => setSelectedCategory('Overdue')}
                    />
                    <StatItem 
                        color="bg-blue-500" 
                        title="Coming Due" 
                        amount={formatCurrency(stats['Coming Due'].amount)} 
                        percentage={getPercentage(stats['Coming Due'].amount)}
                        onClick={() => setSelectedCategory('Coming Due')}
                    />
                </div>
                 <div className="hidden xl:flex flex-col justify-center items-center p-4 border-l border-gray-100">
                    <p className="text-gray-600 text-sm font-medium">Units with Overdue Balance</p>
                    <p className="text-4xl font-bold mt-2 text-gray-800">{stats.Overdue.count}<span className="text-gray-400 text-2xl">/{MOCK_PAYMENTS.length}</span></p>
                </div>
            </div>

            <div className="absolute bottom-0 right-0 m-4 bg-gray-100 p-1 rounded-md flex text-xs font-medium">
                 <button 
                    onClick={() => setLeaseFilter('Active Only')}
                    className={`px-3 py-1 rounded transition-all ${leaseFilter === 'Active Only' ? 'bg-white text-brand-dark-blue shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
                    Active Only
                </button>
                 <button 
                    onClick={() => setLeaseFilter('All Time')}
                    className={`px-3 py-1 rounded transition-all ${leaseFilter === 'All Time' ? 'bg-white text-brand-dark-blue shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
                    All Time
                </button>
            </div>
        </div>

        {/* Modal Overlay */}
        {selectedCategory && (
            <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    
                    {/* Background backdrop */}
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={() => setSelectedCategory(null)}></div>

                    {/* Centering trick */}
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                    {/* Modal Panel */}
                    <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                    {selectedCategory} Payments
                                </h3>
                                <button 
                                    onClick={() => setSelectedCategory(null)}
                                    className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                                >
                                    <Icons.XIcon className="h-6 w-6" />
                                </button>
                            </div>
                            
                            <div className="mt-2">
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tenant</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {filteredPayments.length > 0 ? (
                                                filteredPayments.map((payment) => (
                                                    <tr key={payment.id}>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{payment.tenant}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.unit}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.date}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">{formatCurrency(payment.amount)}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                                                ${payment.status === 'Collected' ? 'bg-green-100 text-green-800' : ''}
                                                                ${payment.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' : ''}
                                                                ${payment.status === 'Overdue' ? 'bg-red-100 text-red-800' : ''}
                                                                ${payment.status === 'Coming Due' ? 'bg-blue-100 text-blue-800' : ''}
                                                            `}>
                                                                {payment.status}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan={5} className="px-6 py-4 text-center text-gray-500 text-sm">
                                                        No records found for {selectedCategory}.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                            <button 
                                type="button" 
                                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                onClick={() => setSelectedCategory(null)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )}
        </>
    );
};

export default CollectionStats;


