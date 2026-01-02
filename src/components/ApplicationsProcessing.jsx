import React from 'react';
import * as Icons from '../constants/icons';

const ApplicationsProcessing = () => {
    const pendingCount = 3;

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center text-gray-800">
                    <div className="p-2 bg-purple-50 text-purple-600 rounded-lg mr-3">
                        <Icons.ApplicationsIcon className="w-5 h-5" filled />
                    </div>
                    <h3 className="font-black uppercase tracking-widest text-xs">New Leads</h3>
                </div>
                <Icons.ChevronRightIcon className="w-5 h-5 text-gray-300" />
            </div>

            <div className="flex-grow flex items-center justify-between px-4">
                <div>
                    <p className="text-5xl font-black text-gray-900 tracking-tighter">{pendingCount}</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Pending Review</p>
                </div>
                <div className="flex flex-col space-y-1">
                    <div className="h-2 w-16 bg-purple-100 rounded-full overflow-hidden">
                        <div className="bg-purple-600 h-full" style={{ width: '40%' }}></div>
                    </div>
                    <div className="h-2 w-16 bg-purple-100 rounded-full overflow-hidden">
                        <div className="bg-purple-600 h-full" style={{ width: '70%' }}></div>
                    </div>
                    <div className="h-2 w-16 bg-purple-100 rounded-full overflow-hidden">
                        <div className="bg-purple-600 h-full" style={{ width: '20%' }}></div>
                    </div>
                </div>
            </div>

            <div className="mt-8">
                <button className="w-full py-2 bg-gray-50 hover:bg-gray-100 text-blue-600 text-xs font-black uppercase tracking-widest rounded-lg transition-colors border border-gray-100">
                    Review Queue
                </button>
            </div>
        </div>
    );
};

export default ApplicationsProcessing;
