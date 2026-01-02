import React, { useState, useEffect, useRef } from 'react';
import * as Icons from '../../../../constants/icons';

const mockAddresses = [
    "3814 Maplewood Dr, La Porte, TX, USA",
    "3814 North Maplewood Drive, La Porte, IN, USA",
    "3814 Maplewood Dr, Michigan City, La Porte, IN, USA",
    "3814 Maplewood Trail, La Porte, IN, USA",
];

const propertyTypes = ["House", "Apartment", "Condo", "Townhouse", "Multi-family"];
const allTags = ["Residential", "Commercial", "Student Housing", "Section 8"];

const PropertyDetailsStep = ({ data, onUpdate }) => {
    const [addressInput, setAddressInput] = useState(data.address);
    const [suggestions, setSuggestions] = useState([]);
    const [isContactInfoVisible, setContactInfoVisible] = useState(false);
    const [isTagsDropdownOpen, setIsTagsDropdownOpen] = useState(false);
    const tagsRef = useRef(null);

    useEffect(() => {
        if (addressInput) {
            const filtered = mockAddresses.filter(addr => 
                addr.toLowerCase().includes(addressInput.toLowerCase())
            );
            setSuggestions(filtered);
        } else {
            setSuggestions([]);
        }
    }, [addressInput]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (tagsRef.current && !tagsRef.current.contains(event.target)) {
                setIsTagsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [tagsRef]);

    const handleAddressSelect = (address) => {
        const propertyName = address.split(',')[0];
        onUpdate({ address, propertyName });
        setAddressInput(address);
        setSuggestions([]);
    };

    const handleTagToggle = (tag) => {
        const newTags = data.tags.includes(tag)
            ? data.tags.filter(t => t !== tag)
            : [...data.tags, tag];
        onUpdate({ tags: newTags });
    };

    return (
        <div>
            <h2 className="text-xl font-bold mb-6">Property Details</h2>
            <div className="flex items-start">
                <div className="mr-8 text-center">
                    <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center relative group overflow-hidden">
                        {data.imageUrl ? (
                            <img src={data.imageUrl} alt="Property" className="w-full h-full object-cover" />
                        ) : (
                            <Icons.PropertiesIcon className="w-16 h-16 text-gray-400" />
                        )}
                        <button className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <Icons.CameraIcon className="w-8 h-8 text-white" />
                        </button>
                    </div>
                </div>

                <div className="flex-1 space-y-6">
                    <div className="relative">
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                        <input
                            type="text"
                            id="address"
                            value={addressInput}
                            onChange={(e) => setAddressInput(e.target.value)}
                            onBlur={() => onUpdate({ address: addressInput })}
                            className="w-full p-2 border rounded-md"
                            placeholder="Enter Location"
                        />
                        {suggestions.length > 0 && (
                            <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg">
                                {suggestions.map(suggestion => (
                                    <div
                                        key={suggestion}
                                        onClick={() => handleAddressSelect(suggestion)}
                                        className="p-3 hover:bg-gray-100 cursor-pointer flex items-center"
                                    >
                                        <Icons.LocationMarkerIcon className="mr-2 text-gray-400"/>
                                        {suggestion}
                                    </div>
                                ))}
                                <div className="text-right p-2 text-xs text-gray-400">powered by Google</div>
                            </div>
                        )}
                    </div>
                    <div>
                        <label htmlFor="propertyName" className="block text-sm font-medium text-gray-700 mb-1">Property Name</label>
                        <input
                            type="text"
                            id="propertyName"
                            value={data.propertyName}
                            onChange={(e) => onUpdate({ propertyName: e.target.value })}
                            className="w-full p-2 border rounded-md"
                            placeholder="e.g. Vine Street Lofts"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
                            <select
                                id="propertyType"
                                value={data.propertyType}
                                onChange={(e) => onUpdate({ propertyType: e.target.value })}
                                className="w-full p-2 border rounded-md bg-white"
                            >
                                <option value="">Select Type</option>
                                {propertyTypes.map(type => <option key={type} value={type}>{type}</option>)}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                            <input
                                type="text"
                                id="imageUrl"
                                value={data.imageUrl || ''}
                                onChange={(e) => onUpdate({ imageUrl: e.target.value })}
                                className="w-full p-2 border rounded-md"
                                placeholder="https://example.com/photo.jpg"
                            />
                        </div>
                    </div>
                    <div className="relative" ref={tagsRef}>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
                        <div
                            onClick={() => setIsTagsDropdownOpen(prev => !prev)}
                            className="w-full p-2 border rounded-md min-h-[42px] flex items-center flex-wrap gap-1 cursor-pointer"
                        >
                            {data.tags.map(tag => (
                                <span key={tag} className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full flex items-center">
                                    {tag}
                                    <button 
                                        onClick={(e) => { e.stopPropagation(); handleTagToggle(tag); }} 
                                        className="ml-1 text-blue-800">&times;</button>
                                </span>
                            ))}
                            {data.tags.length === 0 && <span className="text-gray-400">Select Tags</span>}
                        </div>
                            {isTagsDropdownOpen && (
                            <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg">
                                {allTags.map(tag => (
                                    <div
                                        key={tag}
                                        onClick={() => handleTagToggle(tag)}
                                        className={`p-3 hover:bg-gray-100 cursor-pointer ${data.tags.includes(tag) ? 'font-bold' : ''}`}
                                    >
                                        {tag}
                                    </div>
                                ))}
                            </div>
                            )}
                    </div>
                     <div>
                        <button onClick={() => setContactInfoVisible(!isContactInfoVisible)} className="text-blue-600 font-semibold">
                            Property Contact Info {isContactInfoVisible ? '▲' : '▼'}
                        </button>
                        {isContactInfoVisible && (
                             <div className="mt-4 grid grid-cols-2 gap-4 p-4 border rounded-md">
                                <InputField label="Contact Name" value={data.contactName} onChange={(val) => onUpdate({ contactName: val })} />
                                <InputField label="Contact Email" value={data.contactEmail} onChange={(val) => onUpdate({ contactEmail: val })} />
                                <InputField label="Contact Phone" value={data.contactPhone} onChange={(val) => onUpdate({ contactPhone: val })} />
                                <InputField label="Contact Address" value={data.contactAddress} onChange={(val) => onUpdate({ contactAddress: val })} />
                             </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const InputField = ({label, value, onChange}) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full p-2 border rounded-md"
        />
    </div>
);

export default PropertyDetailsStep;

