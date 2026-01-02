import React, { useState } from 'react';
import ApplicationsList from '../components/applications/ApplicationsList';
import ApplicationDetailView from '../components/applications/ApplicationDetailView';

const ApplicationsPage = ({ applications, properties = [], onUpdateApplication, onOpenWizard }) => {
  const [selectedApplication, setSelectedApplication] = useState(null);

  const handleSave = (updatedApp) => {
      onUpdateApplication(updatedApp);
      setSelectedApplication(null);
  };

  return (
    <div className="relative h-full">
        <ApplicationsList 
            applications={applications} 
            onAddApplicationClick={() => {
                if (onOpenWizard) onOpenWizard('new-draft-id');
            }} 
            onSelectApplication={setSelectedApplication}
        />
        {selectedApplication && (
            <ApplicationDetailView 
                application={selectedApplication}
                properties={properties}
                onBack={() => setSelectedApplication(null)}
                onSave={handleSave}
            />
        )}
    </div>
  );
};

export default ApplicationsPage;

