import React from 'react';
import * as Icons from '../constants/icons';

const OpenMaintenanceRequests = ({ month, year }) => {
    // Simulated historical pipeline
    const seed = month.length + parseInt(year);
    const counts = {
        emergency: (seed % 3),
        urgent: (seed % 4) + 1,
        routine: (seed % 6) + 2,
    };
    const total = counts.emergency + counts.urgent + counts.routine;

    return (
        <div className="bg-brand-dark-blue p-6 rounded-2xl shadow-xl h-full flex flex-col text-white relative overflow-hidden transition-all">
            {/* Background Accent */}
            <div className="absolute -bottom-10 -right-10 opacity-10">
                <Icons.WrenchIcon className="w-48 h-48" />
            </div>

            <div className="flex items-center justify-between mb-8 relative z-10">
                <div className="flex items-center">
                    <div className="p-2 bg-white/10 rounded-lg mr-3">
                        <Icons.MaintenanceIcon className="w-5 h-5 text-teal-400" filled />
                    </div>
                    <h3 className="font-black uppercase tracking-widest text-xs">Service Pipeline</h3>
                </div>
                <div className="px-3 py-1 bg-teal-500/20 text-teal-300 rounded-full text-xs font-black">
                    {total} {year === '2025' ? 'ACTIVE' : 'HISTORICAL'}
                </div>
            </div>

            <div className="flex-1 space-y-4 relative z-10">
                {/* Plecto Style Row */}
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
                    <div className="flex items-center">
                        <div className={`w-2 h-2 rounded-full bg-red-500 mr-3 ${counts.emergency > 0 ? 'animate-pulse' : ''}`}></div>
                        <span className="text-sm font-bold">Emergency</span>
                    </div>
                    <span className="text-xl font-black">{counts.emergency}</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
                    <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-orange-500 mr-3"></div>
                        <span className="text-sm font-bold">Urgent</span>
                    </div>
                    <span className="text-xl font-black">{counts.urgent}</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
                    <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-blue-400 mr-3"></div>
                        <span className="text-sm font-bold">Routine</span>
                    </div>
                    <span className="text-xl font-black">{counts.routine}</span>
                </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 relative z-10">
                <div className="flex justify-between items-center text-xs font-bold text-gray-300">
                    <span>AVG RESOLUTION TIME</span>
                    <span className="text-white">{(2.1 + (seed % 10) / 10).toFixed(1)} DAYS</span>
                </div>
                <div className="w-full h-1.5 bg-white/10 rounded-full mt-2 overflow-hidden">
                    <div className="bg-teal-400 h-full transition-all duration-700" style={{ width: `${60 + (seed % 30)}%` }}></div>
                </div>
            </div>
        </div>
    );
};

export default OpenMaintenanceRequests;
