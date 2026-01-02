import React from 'react';
import * as Icons from '../constants/icons';

const UnsignedLeases = () => {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
            <div className="flex items-center mb-6">
                <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg mr-3">
                    <Icons.LeasesIcon className="w-5 h-5" filled />
                </div>
                <h3 className="font-black uppercase tracking-widest text-xs text-gray-800">Unsigned Leases</h3>
            </div>
            
            <div className="flex-grow flex flex-col items-center justify-center text-center p-8 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                <div className="bg-white p-4 rounded-full shadow-sm mb-4">
                    <Icons.CheckCircleIcon className="w-10 h-10 text-green-500" />
                </div>
                <p className="text-sm font-black text-gray-900 uppercase tracking-tight">All Leases Signed</p>
                <p className="text-xs text-gray-500 mt-1">Excellent work! No pending signatures.</p>
            </div>
        </div>
    );
};

export default UnsignedLeases;
