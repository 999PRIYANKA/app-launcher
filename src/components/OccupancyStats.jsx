import React from 'react';
import * as Icons from '../constants/icons';

const OccupancyStats = ({ month, year }) => {
    // Simulated historical jitter based on month/year
    const baseOccupied = year === '2025' ? 118 : 110;
    const monthShift = (month.length % 5) - 2; // Arbitrary shift for visual interactivity
    
    const total = 124;
    const occupied = Math.min(baseOccupied + monthShift, total);
    const vacant = total - occupied;
    const percentage = Math.round((occupied / total) * 100);

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-full flex flex-col transition-all">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center text-gray-800">
                    <div className="p-2 bg-green-50 text-green-600 rounded-lg mr-3">
                        <Icons.OccupancyIcon className="w-5 h-5" />
                    </div>
                    <h3 className="font-black uppercase tracking-widest text-xs">Occupancy Health</h3>
                </div>
                <div className="px-2 py-1 bg-green-100 text-green-700 rounded text-[10px] font-bold tracking-tighter">
                    {year === '2025' ? '↑ 2% this week' : 'Historical Lookback'}
                </div>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center">
                <div className="relative w-40 h-40 mb-8 animate-pulse-slow">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                        <circle cx="18" cy="18" r="16" fill="none" stroke="#f3f4f6" strokeWidth="4" />
                        <circle 
                            cx="18" cy="18" r="16" fill="none" 
                            stroke="#3b82f6" 
                            strokeWidth="4" 
                            strokeDasharray={`${percentage}, 100`}
                            strokeLinecap="round"
                            className="transition-all duration-700 ease-in-out"
                        />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-3xl font-black text-gray-900">{percentage}%</span>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Portfolio</span>
                    </div>
                </div>

                <div className="w-full grid grid-cols-2 gap-4 border-t border-gray-50 pt-6">
                    <div className="text-center border-r border-gray-50">
                        <p className="text-2xl font-black text-gray-900">{vacant}</p>
                        <p className="text-[10px] font-bold text-red-400 uppercase tracking-widest">Vacant Units</p>
                    </div>
                    <div className="text-center">
                        <p className="text-2xl font-black text-gray-900">{occupied}</p>
                        <p className="text-[10px] font-bold text-green-500 uppercase tracking-widest">Occupied</p>
                    </div>
                </div>
            </div>
            
            <div className="mt-4 text-center">
                <p className="text-[10px] font-bold text-gray-300 uppercase">Period: {month.slice(0,3)} {year}</p>
            </div>
        </div>
    );
};

export default OccupancyStats;
