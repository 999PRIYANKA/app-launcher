import React, { useState, useCallback } from 'react';
import * as Icons from '../../../../constants/icons';
import StepIndicator from './StepIndicator';
import PropertyDetailsStep from './PropertyDetailsStep';
import UnitDetailsStep from './UnitDetailsStep';
import PropertySettingsStep from './PropertySettingsStep';

const initialPropertyState = {
    address: '',
    propertyName: '',
    propertyType: '',
    tags: [],
    contactName: 'Dwellio',
    contactEmail: 'dustin@reintelusa.com',
    contactPhone: '(832) 908-0347',
    contactAddress: 'PO Box 1387, Kemah, Texas-77565',
    units: [],
};

const AddPropertyFlow = ({ onExit, onSave }) => {
  const [step, setStep] = useState(1);
  const [propertyData, setPropertyData] = useState(initialPropertyState);

  const updatePropertyData = useCallback((data) => {
    setPropertyData(prev => ({ ...prev, ...data }));
  }, []);

  const addUnit = useCallback((unit) => {
    setPropertyData(prev => ({ ...prev, units: [...prev.units, unit] }));
  }, []);

  const nextStep = () => setStep(prev => Math.min(prev + 1, 3));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const handleSave = () => {
    // Make sure at least one unit is added if user skips adding one manually
    if (propertyData.units.length === 0) {
       const defaultUnit = {
         unitName: 'Unit 1',
         unitType: 'Residential',
         bedrooms: 1,
         bathrooms: 1,
         squareFeet: 1000,
         rentIncludes: [],
         amenities: [],
       };
       onSave({ ...propertyData, units: [defaultUnit] });
    } else {
       onSave(propertyData);
    }
  };
  
  const renderStep = () => {
    switch (step) {
      case 1:
        return <PropertyDetailsStep data={propertyData} onUpdate={updatePropertyData} />;
      case 2:
        return <UnitDetailsStep onAddUnit={addUnit} units={propertyData.units} />;
      case 3:
        return <PropertySettingsStep />;
      default:
        return null;
    }
  };

  const isStep1Valid = !!(propertyData.address && propertyData.propertyName && propertyData.propertyType);

  return (
    <div className="bg-white min-h-full flex flex-col">
       <div className="sticky top-0 bg-white z-10">
        <div className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center">
                    <button onClick={onExit} className="text-gray-500 hover:text-gray-800 mr-4">
                        <Icons.XIcon />
                    </button>
                    <h2 className="text-xl font-semibold">Add Property</h2>
                </div>
            </div>
            <div className="p-4 bg-blue-50 border-b">
                 <div className="flex items-center">
                    <div className="w-12 h-12 bg-gray-200 rounded-md flex items-center justify-center mr-4">
                        <Icons.PropertiesIcon className="w-8 h-8 text-gray-500" />
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-800">{propertyData.propertyName || 'Property Name'}</h3>
                        <p className="text-sm text-gray-500">{propertyData.address || 'Property Address'}</p>
                    </div>
                    <div className="ml-auto flex items-center space-x-12 text-sm">
                        <div>
                            <span className="text-gray-500">Unit(s)</span>
                            <p className="font-semibold">{propertyData.units.length > 0 ? propertyData.units.length : '-'}</p>
                        </div>
                        {step > 2 && (
                             <>
                                <div>
                                    <span className="text-gray-500">Security Deposit</span>
                                    <p className="font-semibold">-</p>
                                </div>
                                <div>
                                    <span className="text-gray-500">All Other Payments</span>
                                    <p className="font-semibold">-</p>
                                </div>
                             </>
                        )}
                    </div>
                </div>
            </div>
       </div>

        <div className="flex-1 overflow-y-auto">
            <div className="py-8">
                <StepIndicator currentStep={step} setStep={setStep} step1Valid={isStep1Valid} />
            </div>
            <div className="px-8 pb-8">
                {renderStep()}
            </div>
        </div>
      
        <div className="sticky bottom-0 bg-white p-4 border-t flex justify-between items-center">
            <div>
              {step > 1 && (
                  <button onClick={prevStep} className="px-6 py-2 border rounded-md text-gray-700 hover:bg-gray-100">Back</button>
              )}
            </div>
            <div className="flex items-center space-x-2">
                <button onClick={onExit} className="px-6 py-2 border rounded-md text-gray-700 hover:bg-gray-100">Cancel</button>
                <button 
                  onClick={step === 3 ? handleSave : nextStep} 
                  className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-blue-300"
                  disabled={step === 1 && !isStep1Valid}
                >
                    {step === 3 ? 'Save' : 'Next'}
                </button>
            </div>
        </div>
    </div>
  );
};

export default AddPropertyFlow;

