import React, { useState, useEffect } from 'react';
import * as Icons from '../../../../constants/icons';
import RecordDetail from '../../../../components/common/RecordDetail';
import RecordSection from '../../../../components/common/RecordSection';

const ApplicationDetailView = ({ application, properties = [], onBack, onSave }) => {
  const [formData, setFormData] = useState(application);
  const [activeTab, setActiveTab] = useState('Overview');
  const [isScreeningLoading, setIsScreeningLoading] = useState(false);

  useEffect(() => {
    setFormData(application);
  }, [application]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleRequestScreening = () => {
      setIsScreeningLoading(true);
      setTimeout(() => {
          setFormData(prev => ({
              ...prev,
              applicationStatus: 'Screening Complete',
              screeningStatus: 'Complete',
              screeningScore: 785,
              screeningScoreBand: 'Low Risk',
              screeningRecommendation: 'Accept',
              screeningRequestedAt: new Date().toISOString(),
              screeningCompletedAt: new Date().toISOString(),
              screeningOrderId: 'ORD-' + Math.floor(Math.random() * 10000),
              creditSummaryFlags: ['No Bankruptcies', 'No Evictions'],
              criminalCheckResult: 'Clear'
          }));
          setIsScreeningLoading(false);
      }, 2000);
  };

  const handleCreateLease = () => {
      alert("Lease created successfully! Redirecting to lease record...");
  };

  const statusPath = ['Draft', 'Link Sent', 'In Progress', 'Submitted', 'Screening In Progress', 'Screening Complete', 'Approved'];
  
  const steps = statusPath.map(step => ({
      label: step,
      status: formData.applicationStatus === step ? 'current' : (statusPath.indexOf(formData.applicationStatus) > statusPath.indexOf(step) ? 'completed' : 'upcoming')
  }));

  return (
    <RecordDetail
        title={formData.applicantName || 'New Applicant'}
        subtitle={`${formData.applicationNumber} • ${formData.propertyName || ''}`}
        onClose={onBack}
        onSave={() => onSave && onSave(formData)}
        status={formData.applicationStatus}
        steps={steps}
    >
        <div className="space-y-6">
            {/* Decision & Quick Actions Header */}
            <div className="flex flex-wrap gap-3 mb-2">
                 <button className="flex-1 px-4 py-2 border border-gray-300 rounded text-xs text-gray-700 bg-white hover:bg-gray-50 font-bold uppercase tracking-wider">
                     Email Link
                 </button>
                 {(formData.internalDecision === 'Approved' || formData.internalDecision === 'Conditionally Approved') && (
                    <button 
                        onClick={handleCreateLease}
                        className="flex-1 bg-green-600 text-white px-4 py-2 rounded text-xs font-bold uppercase tracking-wider hover:bg-green-700"
                    >
                        Create Lease
                    </button>
                )}
            </div>

            {/* Main Tabs Container */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
                <div className="flex border-b overflow-x-auto bg-gray-50/50">
                    {['Overview', 'Applicant', 'Employment', 'Household', 'References'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-3 text-xs font-bold uppercase tracking-tight whitespace-nowrap focus:outline-none transition-all ${activeTab === tab ? 'text-blue-600 border-b-2 border-blue-600 bg-white' : 'text-gray-400 hover:text-gray-600'}`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
                
                <div className="p-5">
                    {activeTab === 'Overview' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="col-span-2 bg-blue-50 p-4 rounded-md border border-blue-100 flex justify-between items-center">
                                <div>
                                    <p className="text-xs text-blue-800 font-bold uppercase tracking-wider">Wizard Progress</p>
                                    <p className="text-xs text-blue-600">{formData.applicationStep}</p>
                                </div>
                                <div className="w-24 bg-blue-200 h-1.5 rounded-full overflow-hidden">
                                    <div className="bg-blue-600 h-full" style={{width: '60%'}}></div>
                                </div>
                            </div>
                            
                            <div className="col-span-1 md:col-span-2">
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Property</label>
                                <select
                                    value={formData.propertyId || ''}
                                    onChange={(e) => {
                                        const prop = properties.find(p => p.id === e.target.value);
                                        setFormData(prev => ({ 
                                            ...prev, 
                                            propertyId: e.target.value,
                                            propertyName: prop?.propertyName
                                        }));
                                    }}
                                    className="w-full p-2 border border-gray-300 rounded text-sm bg-white focus:ring-1 focus:ring-blue-500 outline-none"
                                >
                                    <option value="">Select Property</option>
                                    {properties.map(p => (
                                        <option key={p.id} value={p.id}>{p.propertyName}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">Unit</label>
                                <p className="text-sm font-black text-gray-900">{formData.unit}</p>
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">Proposed Rent</label>
                                <p className="text-sm font-black text-gray-900">${formData.proposedMonthlyRent}</p>
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">Deposit</label>
                                <p className="text-sm font-black text-gray-900">${formData.proposedSecurityDeposit}</p>
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">Move-In Date</label>
                                <p className="text-sm font-black text-gray-900">{formData.desiredMoveInDate}</p>
                            </div>
                        </div>
                    )}

                    {activeTab === 'Applicant' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">Full Name</label>
                                <p className="text-sm font-black text-gray-900">{formData.legalFirstName} {formData.legalLastName}</p>
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">Email</label>
                                <p className="text-sm font-bold text-blue-600">{formData.email}</p>
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">Phone</label>
                                <p className="text-sm font-bold text-gray-900">{formData.mobilePhone}</p>
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">Date of Birth</label>
                                <p className="text-sm font-bold text-gray-900">{formData.dateOfBirth}</p>
                            </div>
                            <div className="col-span-2 border-t pt-4 mt-2">
                                <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Current Residence</h4>
                                <p className="text-sm text-gray-900 font-semibold">{formData.currentAddressLine1} {formData.currentAddressLine2}</p>
                                <p className="text-sm text-gray-600">{formData.currentCity}, {formData.currentState} {formData.currentPostalCode}</p>
                                <p className="text-xs text-gray-400 mt-1 italic">Landlord: {formData.currentLandlordName} ({formData.currentLandlordPhone})</p>
                            </div>
                        </div>
                    )}

                    {activeTab === 'Employment' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status</label>
                                <p className="text-sm font-black text-gray-900">{formData.employmentStatus}</p>
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">Employer</label>
                                <p className="text-sm font-black text-gray-900">{formData.employerName}</p>
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">Job Title</label>
                                <p className="text-sm font-bold text-gray-700">{formData.jobTitle}</p>
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">Monthly Income</label>
                                <p className="text-sm font-black text-green-600">${(formData.grossMonthlyIncome || 0).toLocaleString()}</p>
                            </div>
                        </div>
                    )}
                    
                    {activeTab === 'Household' && (
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">Occupants</label>
                                <p className="text-sm font-black text-gray-900">{formData.totalAdults} Adults, {formData.totalChildren} Kids</p>
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">Pets</label>
                                <p className="text-sm font-black text-gray-900">{formData.petCount} ({formData.petDetails || 'None'})</p>
                            </div>
                        </div>
                    )}

                    {activeTab === 'References' && (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Personal Ref</label>
                                <p className="text-sm font-black text-gray-900">{formData.personalRefName} ({formData.personalRefRelationship})</p>
                                <p className="text-xs text-gray-500">{formData.personalRefPhone}</p>
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Emergency Contact</label>
                                <p className="text-sm font-black text-gray-900">{formData.emergencyContactName} ({formData.emergencyContactRelationship})</p>
                                <p className="text-xs text-gray-500">{formData.emergencyContactPhone}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Screening & Decision Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Screening Card */}
                <RecordSection title="Screening Results">
                    {isScreeningLoading ? (
                        <div className="py-8 text-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                            <p className="text-xs text-gray-400 uppercase font-bold">Checking TransUnion...</p>
                        </div>
                    ) : formData.screeningStatus === 'Complete' ? (
                        <div className="space-y-4">
                            <div className="flex justify-between items-center bg-gray-50 p-3 rounded border border-gray-100">
                                <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Score</span>
                                <div className="text-right">
                                    <span className="block text-2xl font-black text-green-600">{formData.screeningScore}</span>
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">{formData.screeningScoreBand}</span>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs font-bold">
                                    <span className="text-gray-400 uppercase tracking-widest">Recommendation</span>
                                    <span className="text-green-600">{formData.screeningRecommendation}</span>
                                </div>
                                <div className="flex justify-between text-xs font-bold">
                                    <span className="text-gray-400 uppercase tracking-widest">Criminal</span>
                                    <span className="text-gray-800">{formData.criminalCheckResult}</span>
                                </div>
                                <div className="flex justify-between text-xs font-bold">
                                    <span className="text-gray-400 uppercase tracking-widest">Eviction</span>
                                    <span className="text-gray-800">{formData.evictionCheckResult}</span>
                                </div>
                            </div>
                            <button className="w-full mt-2 text-blue-600 text-[10px] font-black uppercase tracking-widest hover:underline py-1">View Full Report</button>
                        </div>
                    ) : (
                        <div className="text-center py-6">
                            <p className="text-xs text-gray-400 mb-4 italic">Report not generated.</p>
                            <button 
                                onClick={handleRequestScreening}
                                disabled={formData.applicationStatus !== 'Submitted'}
                                className="w-full bg-blue-600 text-white py-2 rounded text-[10px] font-black uppercase tracking-widest shadow hover:bg-blue-700 disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                                Run Screening
                            </button>
                        </div>
                    )}
                </RecordSection>

                {/* Decision Card */}
                <RecordSection title="Final Decision">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Status</label>
                            <select 
                                value={formData.internalDecision || 'Pending'} 
                                onChange={(e) => handleChange('internalDecision', e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 bg-white font-bold"
                            >
                                <option value="Pending">Pending</option>
                                <option value="Approved">Approved</option>
                                <option value="Conditionally Approved">Conditionally Approved</option>
                                <option value="Denied">Denied</option>
                                <option value="Cancelled">Cancelled</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Notes</label>
                            <textarea 
                                rows={3} 
                                value={formData.decisionNotes || ''} 
                                onChange={(e) => handleChange('decisionNotes', e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded text-xs focus:outline-none"
                                placeholder="Decision rationale..."
                            ></textarea>
                        </div>
                    </div>
                </RecordSection>
            </div>
        </div>
    </RecordDetail>
  );
};

export default ApplicationDetailView;

