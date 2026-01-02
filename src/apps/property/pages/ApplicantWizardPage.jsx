import React, { useState, useEffect } from 'react';
import * as Icons from '../../../constants/icons';

const ApplicantWizardPage = ({ applicationId, onExit, onSubmit }) => {
    // Mock Initial Data - In real app, fetch from API using ID
    const mockApplicationData = {
        id: '1',
        applicationNumber: 'APP-2025-001',
        propertyId: 'p1',
        propertyName: '3809 Billingsley Street # a',
        unit: 'Unit 1',
        applicantName: '',
        applicationStep: 'Start',
        applicationStatus: 'Link Sent',
        desiredMoveInDate: '2025-03-01',
        proposedMonthlyRent: 1650,
        proposedSecurityDeposit: 1650,
        applicationFeeAmount: 50,
        applicationFeePayer: 'Applicant',
        applicationFeeStatus: 'Not Paid',
        
        // Empty fields for wizard
        legalFirstName: '',
        legalLastName: '',
        dateOfBirth: '',
        mobilePhone: '',
        email: '',
        totalStatedMonthlyIncome: 0,
        grossMonthlyIncome: 0,
        otherIncomeAmount: 0,
        totalAdults: 1,
        totalChildren: 0,
        petCount: 0,
        vehicleCount: 0,
        consentCreditCheck: false,
        consentBackgroundCheck: false,
        consentElectronicDelivery: false,
        internalDecision: 'Pending'
    };

    const steps = [
        'Start',
        'Personal Info',
        'Residence History',
        'Employment & Income',
        'Household & Pets',
        'References & Emergency',
        'Terms & Consent',
        'Review & Submit'
    ];

    const [application, setApplication] = useState(mockApplicationData);
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        // Restore step from application record
        const stepIndex = steps.indexOf(application.applicationStep);
        if (stepIndex !== -1) {
            setCurrentStepIndex(stepIndex);
        }
    }, [application.applicationStep]);

    const handleUpdate = (updates) => {
        // Special logic for income calculation
        if (updates.grossMonthlyIncome !== undefined || updates.otherIncomeAmount !== undefined) {
            const gross = updates.grossMonthlyIncome ?? application.grossMonthlyIncome ?? 0;
            const other = updates.otherIncomeAmount ?? application.otherIncomeAmount ?? 0;
            updates.totalStatedMonthlyIncome = gross + other;
        }

        setApplication(prev => ({ ...prev, ...updates }));
    };

    const saveAndContinue = (nextStep) => {
        setIsSaving(true);
        setTimeout(() => {
            setIsSaving(false);
            if (nextStep) {
                setApplication(prev => ({ ...prev, applicationStep: nextStep }));
                setCurrentStepIndex(steps.indexOf(nextStep));
            }
        }, 600);
    };

    const handleNext = () => {
        if (currentStepIndex < steps.length - 1) {
            const nextStep = steps[currentStepIndex + 1];
            saveAndContinue(nextStep);
        }
    };

    const handleBack = () => {
        if (currentStepIndex > 0) {
            const prevStep = steps[currentStepIndex - 1];
            setApplication(prev => ({ ...prev, applicationStep: prevStep }));
            setCurrentStepIndex(currentStepIndex - 1);
        }
    };

    const progressPercentage = ((currentStepIndex + 1) / steps.length) * 100;

    const renderStepContent = () => {
        switch (steps[currentStepIndex]) {
            case 'Start':
                return (
                    <div className="space-y-6">
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                            <h3 className="text-lg font-semibold text-blue-900 mb-2">Welcome!</h3>
                            <p className="text-blue-700">You are applying for <strong>{application.propertyName} - {application.unit}</strong>.</p>
                            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <span className="block text-gray-500">Monthly Rent</span>
                                    <span className="font-semibold text-gray-800">${application.proposedMonthlyRent.toLocaleString()}</span>
                                </div>
                                <div>
                                    <span className="block text-gray-500">Security Deposit</span>
                                    <span className="font-semibold text-gray-800">${application.proposedSecurityDeposit.toLocaleString()}</span>
                                </div>
                                <div>
                                    <span className="block text-gray-500">Move-In Date</span>
                                    <span className="font-semibold text-gray-800">{application.desiredMoveInDate}</span>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <label className="block">
                                <span className="text-gray-700 font-medium">Email Address</span>
                                <input 
                                    type="email" 
                                    value={application.email} 
                                    onChange={e => handleUpdate({ email: e.target.value })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 border" 
                                    placeholder="you@example.com"
                                />
                            </label>
                            <label className="block">
                                <span className="text-gray-700 font-medium">Mobile Phone</span>
                                <input 
                                    type="tel" 
                                    value={application.mobilePhone} 
                                    onChange={e => handleUpdate({ mobilePhone: e.target.value })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 border" 
                                    placeholder="(555) 123-4567"
                                />
                            </label>
                        </div>
                        <p className="text-sm text-gray-500">This application will take approximately 10-15 minutes. Please have your driver's license and proof of income ready.</p>
                    </div>
                );
            case 'Personal Info':
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <label className="block">
                            <span className="text-gray-700 font-medium">First Name</span>
                            <input type="text" value={application.legalFirstName} onChange={e => handleUpdate({ legalFirstName: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 border" />
                        </label>
                        <label className="block">
                            <span className="text-gray-700 font-medium">Last Name</span>
                            <input type="text" value={application.legalLastName} onChange={e => handleUpdate({ legalLastName: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 border" />
                        </label>
                        <label className="block">
                            <span className="text-gray-700 font-medium">Preferred Name (Optional)</span>
                            <input type="text" value={application.preferredName || ''} onChange={e => handleUpdate({ preferredName: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 border" />
                        </label>
                        <label className="block">
                            <span className="text-gray-700 font-medium">Date of Birth</span>
                            <input type="date" value={application.dateOfBirth} onChange={e => handleUpdate({ dateOfBirth: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 border" />
                        </label>
                        <label className="block">
                            <span className="text-gray-700 font-medium">Gov ID Type</span>
                            <select value={application.govIdType || ''} onChange={e => handleUpdate({ govIdType: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 border bg-white">
                                <option value="">Select ID Type</option>
                                <option>Driver's License</option>
                                <option>Passport</option>
                                <option>State ID</option>
                            </select>
                        </label>
                        <label className="block">
                            <span className="text-gray-700 font-medium">Gov ID # (Last 4)</span>
                            <input type="text" maxLength={4} value={application.govIdLast4 || ''} onChange={e => handleUpdate({ govIdLast4: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 border" />
                        </label>
                    </div>
                );
            case 'Residence History':
                return (
                    <div className="space-y-6">
                        <h4 className="font-semibold text-gray-800 border-b pb-2">Current Residence</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <label className="block md:col-span-2">
                                <span className="text-gray-700 font-medium">Housing Type</span>
                                <select value={application.housingTypeCurrent || ''} onChange={e => handleUpdate({ housingTypeCurrent: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 border bg-white">
                                    <option value="">Select Type</option>
                                    <option>Rent</option>
                                    <option>Own</option>
                                    <option>Other</option>
                                </select>
                            </label>
                            <label className="block md:col-span-2">
                                <span className="text-gray-700 font-medium">Address Line 1</span>
                                <input type="text" value={application.currentAddressLine1 || ''} onChange={e => handleUpdate({ currentAddressLine1: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 border" />
                            </label>
                            <label className="block">
                                <span className="text-gray-700 font-medium">City</span>
                                <input type="text" value={application.currentCity || ''} onChange={e => handleUpdate({ currentCity: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 border" />
                            </label>
                            <label className="block">
                                <span className="text-gray-700 font-medium">State</span>
                                <input type="text" value={application.currentState || ''} onChange={e => handleUpdate({ currentState: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 border" />
                            </label>
                            <label className="block">
                                <span className="text-gray-700 font-medium">Time at Address (Months)</span>
                                <input type="number" value={application.timeAtCurrentAddressMonths || ''} onChange={e => handleUpdate({ timeAtCurrentAddressMonths: parseInt(e.target.value) })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 border" />
                            </label>
                            <label className="block">
                                <span className="text-gray-700 font-medium">Current Rent</span>
                                <input type="number" value={application.currentRentAmount || ''} onChange={e => handleUpdate({ currentRentAmount: parseFloat(e.target.value) })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 border" />
                            </label>
                        </div>
                        
                        {(application.timeAtCurrentAddressMonths || 0) < 24 && (
                            <div className="pt-6">
                                <h4 className="font-semibold text-gray-800 border-b pb-2 mb-4">Previous Residence</h4>
                                <div className="grid grid-cols-1 gap-4">
                                    <label className="block">
                                        <span className="text-gray-700 font-medium">Address Line 1</span>
                                        <input type="text" value={application.previousAddressLine1 || ''} onChange={e => handleUpdate({ previousAddressLine1: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 border" />
                                    </label>
                                </div>
                            </div>
                        )}
                    </div>
                );
            case 'Employment & Income':
                return (
                    <div className="space-y-6">
                        <label className="block">
                            <span className="text-gray-700 font-medium">Employment Status</span>
                            <select value={application.employmentStatus || ''} onChange={e => handleUpdate({ employmentStatus: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 border bg-white">
                                <option value="">Select Status</option>
                                <option>Employed</option>
                                <option>Self-Employed</option>
                                <option>Unemployed</option>
                                <option>Retired</option>
                                <option>Student</option>
                            </select>
                        </label>

                        {['Employed', 'Self-Employed'].includes(application.employmentStatus || '') && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg border">
                                <label className="block md:col-span-2">
                                    <span className="text-gray-700 font-medium">Employer Name</span>
                                    <input type="text" value={application.employerName || ''} onChange={e => handleUpdate({ employerName: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 border" />
                                </label>
                                <label className="block">
                                    <span className="text-gray-700 font-medium">Job Title</span>
                                    <input type="text" value={application.jobTitle || ''} onChange={e => handleUpdate({ jobTitle: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 border" />
                                </label>
                                <label className="block">
                                    <span className="text-gray-700 font-medium">Time Employed (Months)</span>
                                    <input type="number" value={application.timeAtEmployerMonths || ''} onChange={e => handleUpdate({ timeAtEmployerMonths: parseInt(e.target.value) })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 border" />
                                </label>
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <label className="block">
                                <span className="text-gray-700 font-medium">Gross Monthly Income</span>
                                <div className="relative mt-1 rounded-md shadow-sm">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"><span className="text-gray-500 sm:text-sm">$</span></div>
                                    <input type="number" value={application.grossMonthlyIncome || ''} onChange={e => handleUpdate({ grossMonthlyIncome: parseFloat(e.target.value) })} className="block w-full rounded-md border-gray-300 pl-7 p-3 border" />
                                </div>
                            </label>
                            <label className="block">
                                <span className="text-gray-700 font-medium">Other Income</span>
                                <div className="relative mt-1 rounded-md shadow-sm">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"><span className="text-gray-500 sm:text-sm">$</span></div>
                                    <input type="number" value={application.otherIncomeAmount || ''} onChange={e => handleUpdate({ otherIncomeAmount: parseFloat(e.target.value) })} className="block w-full rounded-md border-gray-300 pl-7 p-3 border" />
                                </div>
                            </label>
                        </div>
                        
                        <div className="bg-green-50 p-4 rounded-md border border-green-200">
                            <p className="text-green-800 text-sm font-semibold">Total Stated Monthly Income: ${application.totalStatedMonthlyIncome.toLocaleString()}</p>
                        </div>
                    </div>
                );
            case 'Household & Pets':
                return (
                    <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <label className="block">
                                <span className="text-gray-700 font-medium">Total Adults</span>
                                <input type="number" min="1" value={application.totalAdults} onChange={e => handleUpdate({ totalAdults: parseInt(e.target.value) })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 border" />
                            </label>
                            <label className="block">
                                <span className="text-gray-700 font-medium">Total Children</span>
                                <input type="number" min="0" value={application.totalChildren} onChange={e => handleUpdate({ totalChildren: parseInt(e.target.value) })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 border" />
                            </label>
                        </div>
                        <div className="border-t pt-4">
                            <label className="block mb-2">
                                <span className="text-gray-700 font-medium">Pet Count</span>
                                <input type="number" min="0" value={application.petCount} onChange={e => handleUpdate({ petCount: parseInt(e.target.value) })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 border" />
                            </label>
                            {application.petCount > 0 && (
                                <label className="block mt-2">
                                    <span className="text-gray-700 font-medium">Pet Details (Type, Breed, Weight)</span>
                                    <textarea value={application.petDetails || ''} onChange={e => handleUpdate({ petDetails: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 border" rows={3}></textarea>
                                </label>
                            )}
                        </div>
                        <div className="border-t pt-4">
                            <label className="block mb-2">
                                <span className="text-gray-700 font-medium">Vehicle Count</span>
                                <input type="number" min="0" value={application.vehicleCount} onChange={e => handleUpdate({ vehicleCount: parseInt(e.target.value) })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 border" />
                            </label>
                            {application.vehicleCount > 0 && (
                                <label className="block mt-2">
                                    <span className="text-gray-700 font-medium">Vehicle Details (Make, Model, License Plate)</span>
                                    <textarea value={application.vehicleDetails || ''} onChange={e => handleUpdate({ vehicleDetails: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 border" rows={3}></textarea>
                                </label>
                            )}
                        </div>
                    </div>
                );
            case 'References & Emergency':
                return (
                    <div className="space-y-8">
                        <div>
                            <h4 className="font-semibold text-gray-800 border-b pb-2 mb-4">Personal Reference</h4>
                            <div className="grid grid-cols-1 gap-4">
                                <label className="block">
                                    <span className="text-gray-700 font-medium">Name</span>
                                    <input type="text" value={application.personalRefName || ''} onChange={e => handleUpdate({ personalRefName: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 border" />
                                </label>
                                <label className="block">
                                    <span className="text-gray-700 font-medium">Phone</span>
                                    <input type="tel" value={application.personalRefPhone || ''} onChange={e => handleUpdate({ personalRefPhone: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 border" />
                                </label>
                                <label className="block">
                                    <span className="text-gray-700 font-medium">Relationship</span>
                                    <input type="text" value={application.personalRefRelationship || ''} onChange={e => handleUpdate({ personalRefRelationship: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 border" />
                                </label>
                            </div>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-800 border-b pb-2 mb-4">Emergency Contact</h4>
                            <div className="grid grid-cols-1 gap-4">
                                <label className="block">
                                    <span className="text-gray-700 font-medium">Name</span>
                                    <input type="text" value={application.emergencyContactName || ''} onChange={e => handleUpdate({ emergencyContactName: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 border" />
                                </label>
                                <label className="block">
                                    <span className="text-gray-700 font-medium">Phone</span>
                                    <input type="tel" value={application.emergencyContactPhone || ''} onChange={e => handleUpdate({ emergencyContactPhone: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 border" />
                                </label>
                                <label className="block">
                                    <span className="text-gray-700 font-medium">Relationship</span>
                                    <input type="text" value={application.emergencyContactRelationship || ''} onChange={e => handleUpdate({ emergencyContactRelationship: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 border" />
                                </label>
                            </div>
                        </div>
                    </div>
                );
            case 'Terms & Consent':
                return (
                    <div className="space-y-6">
                        <div className="bg-gray-50 p-4 rounded-md text-sm text-gray-700 space-y-2">
                            <p><strong>Property:</strong> {application.propertyName} - {application.unit}</p>
                            <p><strong>Monthly Rent:</strong> ${application.proposedMonthlyRent}</p>
                            <p><strong>Security Deposit:</strong> ${application.proposedSecurityDeposit}</p>
                            <p><strong>Recurring Fees:</strong> Pet Rent (${application.petRentAmount || 0}), Parking (${application.parkingFeeAmount || 0})</p>
                        </div>
                        
                        <div className="space-y-4 pt-4">
                            <label className="flex items-start">
                                <input 
                                    type="checkbox" 
                                    checked={application.consentCreditCheck} 
                                    onChange={e => handleUpdate({ consentCreditCheck: e.target.checked })} 
                                    className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" 
                                />
                                <span className="ml-3 text-gray-700 text-sm">
                                    I hereby authorize the landlord/property manager to obtain a consumer report, and any other information it deems necessary, for the purpose of evaluating my application. I understand that such information may include, but is not limited to, credit history, civil and criminal information, records of arrest, rental history, employment history, vehicle records, licensing records, driving records, and any other information.
                                </span>
                            </label>
                            
                            <label className="flex items-start">
                                <input 
                                    type="checkbox" 
                                    checked={application.consentBackgroundCheck} 
                                    onChange={e => handleUpdate({ consentBackgroundCheck: e.target.checked })} 
                                    className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" 
                                />
                                <span className="ml-3 text-gray-700 text-sm">
                                    I understand that subsequent consumer reports may be obtained and utilized under this authorization in connection with an update, renewal, extension, or collection with respect to or in connection with the rental or lease of a residence for which this application was made.
                                </span>
                            </label>

                            <label className="flex items-start">
                                <input 
                                    type="checkbox" 
                                    checked={application.consentElectronicDelivery} 
                                    onChange={e => handleUpdate({ consentElectronicDelivery: e.target.checked })} 
                                    className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" 
                                />
                                <span className="ml-3 text-gray-700 text-sm">
                                    I consent to receive communications electronically.
                                </span>
                            </label>
                        </div>
                    </div>
                );
            case 'Review & Submit':
                return (
                    <div className="space-y-6">
                        <div className="bg-white border rounded-lg overflow-hidden">
                            <div className="bg-gray-100 px-4 py-2 font-semibold text-gray-700 border-b">Summary</div>
                            <div className="p-4 space-y-2 text-sm">
                                <p><span className="text-gray-500 w-32 inline-block">Name:</span> {application.legalFirstName} {application.legalLastName}</p>
                                <p><span className="text-gray-500 w-32 inline-block">Email:</span> {application.email}</p>
                                <p><span className="text-gray-500 w-32 inline-block">Phone:</span> {application.mobilePhone}</p>
                                <p><span className="text-gray-500 w-32 inline-block">Income:</span> ${application.totalStatedMonthlyIncome}/mo</p>
                                <p><span className="text-gray-500 w-32 inline-block">Occupants:</span> {application.totalAdults} Adults, {application.totalChildren} Children</p>
                                <p><span className="text-gray-500 w-32 inline-block">Pets:</span> {application.petCount}</p>
                            </div>
                        </div>

                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                            <h3 className="text-lg font-semibold text-yellow-900 mb-2">Application Fee</h3>
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-yellow-800">Fee Amount</span>
                                <span className="font-bold text-lg text-gray-800">${application.applicationFeeAmount.toFixed(2)}</span>
                            </div>
                            
                            {application.applicationFeeStatus === 'Paid' ? (
                                <div className="bg-green-100 text-green-800 px-4 py-2 rounded text-center font-semibold">
                                    Fee Paid - Thank You!
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    <p className="text-sm text-yellow-700">Please pay the application fee to complete your submission.</p>
                                    <button 
                                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded shadow"
                                        onClick={() => handleUpdate({ applicationFeeStatus: 'Paid' })}
                                    >
                                        Pay ${application.applicationFeeAmount}
                                    </button>
                                    <p className="text-xs text-center text-gray-500">Secure Payment Simulation</p>
                                </div>
                            )}
                        </div>

                        <div className="flex items-start p-4 border border-gray-200 rounded-md">
                            <input type="checkbox" className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" required />
                            <span className="ml-3 text-gray-700 text-sm">
                                I confirm that all information provided in this application is true and complete to the best of my knowledge. I understand that false or misleading information may result in the rejection of my application or termination of the lease agreement.
                            </span>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    const isStepValid = () => {
        if (steps[currentStepIndex] === 'Personal Info' && (!application.legalFirstName || !application.email)) return false;
        if (steps[currentStepIndex] === 'Terms & Consent' && (!application.consentCreditCheck || !application.consentBackgroundCheck)) return false;
        return true;
    };

    const handleFinalSubmit = () => {
        setIsSaving(true);
        setTimeout(() => {
            const finalApp = { 
                ...application, 
                applicationStatus: 'Submitted', 
                applicationStep: 'Review & Submit',
                applicantName: `${application.legalFirstName} ${application.legalLastName}`
            };
            setApplication(finalApp);
            setIsSaving(false);
            alert("Application Submitted! Redirecting...");
            onSubmit(finalApp);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center pt-8 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-3xl">
                {/* Header */}
                <div className="mb-8 text-center">
                    <Icons.LogoIcon className="w-12 h-12 mx-auto text-blue-600 mb-4" />
                    <h1 className="text-3xl font-bold text-gray-900">Rental Application</h1>
                    <p className="mt-2 text-gray-600">{application.propertyName}</p>
                </div>

                {/* Progress Bar */}
                <div className="bg-white rounded-full h-3 mb-8 overflow-hidden shadow-sm">
                    <div className="bg-blue-600 h-full transition-all duration-500" style={{ width: `${progressPercentage}%` }}></div>
                </div>

                {/* Main Card */}
                <div className="bg-white shadow-xl rounded-lg overflow-hidden">
                    <div className="px-6 py-4 border-b bg-gray-50 flex justify-between items-center">
                        <h2 className="text-xl font-semibold text-gray-800">{steps[currentStepIndex]}</h2>
                        <span className="text-sm text-gray-500">Step {currentStepIndex + 1} of {steps.length}</span>
                    </div>
                    
                    <div className="p-6 md:p-8">
                        {renderStepContent()}
                    </div>

                    <div className="bg-gray-50 px-6 py-4 border-t flex justify-between items-center">
                        {currentStepIndex > 0 ? (
                            <button 
                                onClick={handleBack}
                                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-100 focus:outline-none"
                            >
                                Back
                            </button>
                        ) : (
                            <button onClick={onExit} className="text-gray-500 hover:text-gray-700">Cancel</button>
                        )}

                        {currentStepIndex < steps.length - 1 ? (
                            <div className="flex gap-3">
                                <button 
                                    onClick={() => saveAndContinue()} 
                                    className="text-gray-600 hover:text-gray-900 font-medium px-2"
                                >
                                    Save & Exit
                                </button>
                                <button 
                                    onClick={handleNext}
                                    disabled={!isStepValid()}
                                    className="px-6 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                                >
                                    {isSaving ? 'Saving...' : 'Next'}
                                    {!isSaving && <Icons.ChevronRightIcon className="w-4 h-4 ml-1" />}
                                </button>
                            </div>
                        ) : (
                            <button 
                                onClick={handleFinalSubmit}
                                disabled={application.applicationFeeStatus !== 'Paid'}
                                className="px-8 py-3 bg-green-600 text-white rounded-md font-bold text-lg hover:bg-green-700 focus:outline-none shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transform transition hover:scale-105"
                            >
                                {isSaving ? 'Submitting...' : 'Submit Application'}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ApplicantWizardPage;

