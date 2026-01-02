import React, { useState } from 'react';
import * as Icons from '../../../../constants/icons';

const initialUnitState = {
    unitName: '',
    unitType: 'Residential',
    bedrooms: 1,
    bathrooms: 1,
    squareFeet: 1000,
    rentIncludes: [],
    amenities: [],
};

const rentIncludesOptions = ["Electricity", "Gas", "Water", "Internet"];
const amenitiesOptions = ["A/C", "Off-street Parking", "Pool", "Furnished", "Balcony/Deck", "Hardwood Floor", "Pets Allowed", "Wheelchair Access"];

const UnitDetailsStep = ({ units, onAddUnit }) => {
    const [currentUnit, setCurrentUnit] = useState(initialUnitState);
    const [isAdding, setIsAdding] = useState(true);

    const handleInputChange = (field, value) => {
        setCurrentUnit(prev => ({ ...prev, [field]: value }));
    };

    const handleCheckboxChange = (field, value) => {
        const currentValues = currentUnit[field];
        const newValues = currentValues.includes(value)
            ? currentValues.filter(item => item !== value)
            : [...currentValues, value];
        handleInputChange(field, newValues);
    };

    const handleAddAnother = () => {
        onAddUnit(currentUnit);
        setCurrentUnit(initialUnitState);
        setIsAdding(true);
    };

    const handleCopyAndAdd = () => {
        onAddUnit(currentUnit);
        setCurrentUnit(prev => ({ ...prev, unitName: ''}));
        setIsAdding(true);
    }
    
    return (
        <div>
            <h2 className="text-xl font-bold mb-6">Unit Details</h2>
            {isAdding && (
                 <div className="p-6 border rounded-lg shadow-md bg-white">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Unit Name</label>
                            <input
                                type="text"
                                value={currentUnit.unitName}
                                onChange={e => handleInputChange('unitName', e.target.value)}
                                placeholder="e.g. Suite 101"
                                className="w-full p-2 border rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Unit Type</label>
                            <select 
                                value={currentUnit.unitType}
                                onChange={e => handleInputChange('unitType', e.target.value)}
                                className="w-full p-2 border rounded-md bg-white">
                                <option>Residential</option>
                                <option>Commercial</option>
                            </select>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mt-4">
                        <NumberInput label="Bedrooms" value={currentUnit.bedrooms} onChange={val => handleInputChange('bedrooms', val)} />
                        <NumberInput label="Bathrooms" value={currentUnit.bathrooms} onChange={val => handleInputChange('bathrooms', val)} />
                        <NumberInput label="Square Feet" value={currentUnit.squareFeet} onChange={val => handleInputChange('squareFeet', val)} />
                    </div>
                    
                    <div className="mt-6">
                        <h3 className="font-semibold text-gray-800">Rent Includes</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                            {rentIncludesOptions.map(opt => <Checkbox key={opt} label={opt} checked={currentUnit.rentIncludes.includes(opt)} onChange={() => handleCheckboxChange('rentIncludes', opt)} />)}
                        </div>
                    </div>

                    <div className="mt-6">
                        <h3 className="font-semibold text-gray-800">Amenities</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                             {amenitiesOptions.map(opt => <Checkbox key={opt} label={opt} checked={currentUnit.amenities.includes(opt)} onChange={() => handleCheckboxChange('amenities', opt)} />)}
                        </div>
                    </div>

                    <div className="mt-6 flex items-center justify-end">
                        <button onClick={handleCopyAndAdd} className="text-blue-600 font-semibold flex items-center">
                            <Icons.ClipboardCopyIcon className="mr-2"/>
                            Copy Details and Add New Unit
                        </button>
                    </div>
                </div>
            )}
            <button onClick={handleAddAnother} className="text-blue-600 font-semibold mt-4">
                + Add Another Unit
            </button>
        </div>
    );
};

const NumberInput = ({label, value, onChange}) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <input
            type="number"
            min="0"
            value={value}
            onChange={e => onChange(parseInt(e.target.value) || 0)}
            className="w-full p-2 border rounded-md"
        />
    </div>
);

const Checkbox = ({label, checked, onChange}) => (
    <label className="flex items-center space-x-2">
        <input type="checkbox" checked={checked} onChange={onChange} className="form-checkbox h-4 w-4 text-blue-600 rounded" />
        <span className="text-sm text-gray-700">{label}</span>
    </label>
);

export default UnitDetailsStep;

