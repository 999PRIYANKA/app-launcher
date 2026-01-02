import React, { createContext, useContext, useState } from 'react';

const HRContext = createContext(null);

export function HRProvider({ children }) {
  // --- Employees State ---
  const [employees, setEmployees] = useState([]);

  const handleAddEmployee = (employee) => {
    setEmployees(prev => [...prev, employee]);
  };

  const handleUpdateEmployee = (updatedEmployee) => {
    setEmployees(prev => prev.map(e => e.id === updatedEmployee.id ? updatedEmployee : e));
  };

  const handleDeleteEmployee = (employeeId) => {
    setEmployees(prev => prev.filter(e => e.id !== employeeId));
  };

  // --- Applicants State ---
  const [applicants, setApplicants] = useState([]);

  const handleAddApplicant = (applicant) => {
    setApplicants(prev => [...prev, applicant]);
  };

  const handleUpdateApplicant = (updatedApplicant) => {
    setApplicants(prev => prev.map(a => a.id === updatedApplicant.id ? updatedApplicant : a));
  };

  const handleDeleteApplicant = (applicantId) => {
    setApplicants(prev => prev.filter(a => a.id !== applicantId));
  };

  // --- Inquiries State ---
  const [inquiries, setInquiries] = useState([]);

  const handleAddInquiry = (inquiry) => {
    setInquiries(prev => [...prev, inquiry]);
  };

  const handleUpdateInquiry = (updatedInquiry) => {
    setInquiries(prev => prev.map(i => i.id === updatedInquiry.id ? updatedInquiry : i));
  };

  const handleDeleteInquiry = (inquiryId) => {
    setInquiries(prev => prev.filter(i => i.id !== inquiryId));
  };

  // --- Training State ---
  const [trainings, setTrainings] = useState([]);

  const handleAddTraining = (training) => {
    setTrainings(prev => [...prev, training]);
  };

  const handleUpdateTraining = (updatedTraining) => {
    setTrainings(prev => prev.map(t => t.id === updatedTraining.id ? updatedTraining : t));
  };

  const handleDeleteTraining = (trainingId) => {
    setTrainings(prev => prev.filter(t => t.id !== trainingId));
  };

  // --- Teams State ---
  const [teams, setTeams] = useState([]);

  const handleAddTeam = (team) => {
    setTeams(prev => [...prev, team]);
  };

  const handleUpdateTeam = (updatedTeam) => {
    setTeams(prev => prev.map(t => t.id === updatedTeam.id ? updatedTeam : t));
  };

  const handleDeleteTeam = (teamId) => {
    setTeams(prev => prev.filter(t => t.id !== teamId));
  };

  // --- Offices State ---
  const [offices, setOffices] = useState([]);

  const handleAddOffice = (office) => {
    setOffices(prev => [...prev, office]);
  };

  const handleUpdateOffice = (updatedOffice) => {
    setOffices(prev => prev.map(o => o.id === updatedOffice.id ? updatedOffice : o));
  };

  const handleDeleteOffice = (officeId) => {
    setOffices(prev => prev.filter(o => o.id !== officeId));
  };

  const value = {
    // Employees
    employees,
    handleAddEmployee,
    handleUpdateEmployee,
    handleDeleteEmployee,
    // Applicants
    applicants,
    handleAddApplicant,
    handleUpdateApplicant,
    handleDeleteApplicant,
    // Inquiries
    inquiries,
    handleAddInquiry,
    handleUpdateInquiry,
    handleDeleteInquiry,
    // Training
    trainings,
    handleAddTraining,
    handleUpdateTraining,
    handleDeleteTraining,
    // Teams
    teams,
    handleAddTeam,
    handleUpdateTeam,
    handleDeleteTeam,
    // Offices
    offices,
    handleAddOffice,
    handleUpdateOffice,
    handleDeleteOffice,
  };

  return (
    <HRContext.Provider value={value}>
      {children}
    </HRContext.Provider>
  );
}

export function useHR() {
  const context = useContext(HRContext);
  if (!context) {
    throw new Error('useHR must be used within HRProvider');
  }
  return context;
}

