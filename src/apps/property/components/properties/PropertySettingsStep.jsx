import React from 'react';
import * as Icons from '../../../../constants/icons';

const PropertySettingsStep = () => {
    return (
        <div>
            <h2 className="text-xl font-bold mb-6">Property Settings</h2>
            
            <div className="p-8 border rounded-lg bg-white mb-8">
                <h3 className="text-lg font-semibold mb-4">Choose a bank account</h3>
                <div className="text-center py-8">
                    <Icons.BanknotesIcon className="w-20 h-20 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 mb-4">Please add a bank account</p>
                    <button className="px-4 py-2 border border-blue-500 text-blue-500 font-semibold rounded-md hover:bg-blue-50">
                        Add Bank Account/Verify
                    </button>
                </div>
            </div>

            <div className="p-8 border rounded-lg bg-white">
                <h3 className="text-lg font-semibold mb-4">Late Fee</h3>
                <div className="text-center py-8">
                    <Icons.CalendarDaysIcon className="w-20 h-20 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 mb-4">No late fee to show</p>
                    <button className="px-4 py-2 border border-blue-500 text-blue-500 font-semibold rounded-md hover:bg-blue-50">
                        Add Late Fee
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PropertySettingsStep;

