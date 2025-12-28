import React from 'react';
import * as Icons from '../constants/icons';

const OccupancyStats= () => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center text-gray-600 font-semibold mb-6">
                <Icons.OccupancyIcon />
                <h3 className="uppercase tracking-wider ml-2 text-sm">Occupancy Statistics</h3>
            </div>
            <div className="flex justify-between items-center">
                <div className="flex space-x-8">
                    <div>
                        <p className="text-3xl font-bold">0</p>
                        <p className="text-gray-500 text-sm">Vacant</p>
                    </div>
                    <div>
                        <p className="text-3xl font-bold text-green-500">0</p>
                        <p className="text-gray-500 text-sm">Occupied</p>
                    </div>
                </div>
                <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center border-4 border-gray-200">
                    <span className="text-2xl font-bold text-gray-600">0</span>
                </div>
            </div>
        </div>
    );
};

export default OccupancyStats;


