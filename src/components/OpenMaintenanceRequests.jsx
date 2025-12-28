import React from 'react';
import * as Icons from '../constants/icons';

const OpenMaintenanceRequests= () => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-sm h-full flex flex-col">
            <div className="flex items-center text-gray-600 font-semibold mb-4">
                <Icons.MaintenanceIcon filled />
                <h3 className="uppercase tracking-wider ml-2 text-sm">Open Maintenance Requests</h3>
            </div>
            <div className="flex-grow flex flex-col items-center justify-center text-center text-gray-500">
                <Icons.WrenchIcon className="w-16 h-16 text-gray-300 mb-4" />
                <p>There are no maintenance requests</p>
            </div>
        </div>
    );
};

export default OpenMaintenanceRequests;


